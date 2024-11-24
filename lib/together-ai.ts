import { GiftSuggestion, FormData } from './types';
import Together from "together-ai";
import { searchProducts } from './search';

const TOGETHER_API_KEY = process.env.NEXT_PUBLIC_TOGETHER_API_KEY;

if (!TOGETHER_API_KEY) {
  throw new Error('Together AI API key is not configured');
}

const together = new Together({ apiKey: TOGETHER_API_KEY });

export async function generateGiftSuggestions(formData: FormData): Promise<GiftSuggestion[]> {
  const systemPrompt = `You are a gift recommendation expert. You must respond with ONLY a JSON array containing exactly 6 gift suggestions. Do not include any other text before or after the JSON array.

Each object in the array must have these exact properties:
- title: A short, specific product name
- description: A brief description
- price: A price range as a string (e.g. "$20-$30")
- where: General places to buy it
- reason: Why this gift is appropriate

Example response format:
[
  {
    "title": "Wireless Earbuds",
    "description": "High-quality bluetooth earphones",
    "price": "$50-$100",
    "where": "Amazon, Best Buy",
    "reason": "Perfect for music lovers"
  }
]

IMPORTANT: Your response must start with [ and end with ]. Do not include any other text.`;

  const userPrompt = `Generate 6 thoughtful gift suggestions based on the following. Please be creative and provide a variety of options but keep them within the budget range and relevant to the interests and preferences:
- Relationship: ${formData.relationship}
- Age: ${formData.age}
- Interests: ${formData.interests}
- Special preferences: ${formData.preferences || 'None'}
- Budget: $${formData.budget[0]}

Remember to respond with ONLY the JSON array.`;

  try {
    const response = await together.chat.completions.create({
      model: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content received from API');
    }

    // Try to extract JSON array if there's any extra text
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      console.error('No JSON array found in response');
      console.error('Raw Content:', content);
      throw new Error('Invalid response format from API');
    }

    const jsonContent = jsonMatch[0];
    console.log('Extracted JSON:', jsonContent);

    let suggestions: GiftSuggestion[];
    try {
      suggestions = JSON.parse(jsonContent) as GiftSuggestion[];
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.error('Raw Content:', content);
      throw new Error('Failed to parse API response as JSON');
    }

    if (!Array.isArray(suggestions) || suggestions.length === 0) {
      throw new Error('Invalid response format from API');
    }

    console.log('Successfully parsed suggestions:', suggestions.length);

    // Enhance suggestions with product links
    const enhancedSuggestions = await Promise.all(
      suggestions.map(async (suggestion, index) => {
        console.log(`Searching products for suggestion ${index + 1}:`, suggestion.title);
        try {
          const searchResults = await searchProducts(suggestion.title, formData.budget[0]);
          console.log(`Found ${searchResults.length} product links for suggestion ${index + 1}`);
          
          const productLinks = searchResults.slice(0, 3).map(result => {
            const price = extractPrice(result.snippet);
            console.log('Extracted price:', price);
            return {
              title: result.title,
              link: result.link,
              price: price || suggestion.price
            };
          });

          console.log(`Product links for suggestion ${index + 1}:`, productLinks);

          return {
            ...suggestion,
            productLinks
          };
        } catch (searchError) {
          console.error(`Error searching products for suggestion ${index + 1}:`, searchError);
          return {
            ...suggestion,
            productLinks: []
          };
        }
      })
    );

    console.log('Final enhanced suggestions:', JSON.stringify(enhancedSuggestions, null, 2));
    return enhancedSuggestions;
  } catch (error) {
    console.error('Error in generateGiftSuggestions:', error);
    throw new Error(`Failed to generate suggestions: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

function extractPrice(text: string): string | null {
  const priceRegex = /\$\d+(?:\.\d{2})?/;
  const match = text.match(priceRegex);
  return match ? match[0] : null;
}
