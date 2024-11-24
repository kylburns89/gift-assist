const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
const GOOGLE_CX = process.env.NEXT_PUBLIC_GOOGLE_CX;

interface SearchResult {
  title: string;
  link: string;
  displayLink: string;
  snippet: string;
}

export async function searchProducts(query: string, maxPrice: number): Promise<SearchResult[]> {
  if (!GOOGLE_API_KEY || !GOOGLE_CX) {
    console.log('Google Search API credentials not configured - skipping product search');
    console.log('API Key exists:', !!GOOGLE_API_KEY);
    console.log('CX exists:', !!GOOGLE_CX);
    return [];
  }

  console.log('Searching for products:', query, 'under', maxPrice);
  const searchQuery = `${query} buy online price under $${maxPrice}`;
  const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CX}&q=${encodeURIComponent(searchQuery)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error('Google Search API error:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('Error details:', errorText);
      return [];
    }

    const data = await response.json();
    console.log('Search results found:', data.items?.length || 0);
    return data.items?.map((item: any) => ({
      title: item.title,
      link: item.link,
      displayLink: item.displayLink,
      snippet: item.snippet,
    })) || [];
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
}
