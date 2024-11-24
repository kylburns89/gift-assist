import { GiftSuggestion } from '../lib/types';
import { Card } from './ui/card';
import { Gift, ShoppingBag, ExternalLink } from 'lucide-react';

interface GiftSuggestionsProps {
  suggestions: GiftSuggestion[];
}

export function GiftSuggestions({ suggestions }: GiftSuggestionsProps) {
  if (!suggestions.length) return null;

  return (
    <div className="space-y-12 py-12">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center">
          <Gift className="w-8 h-8 text-primary/60 animate-float" />
          <h2 className="text-3xl font-bold mx-4 relative">
            <span className="relative bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Your Personalized Gift Suggestions
            </span>
          </h2>
          <Gift className="w-8 h-8 text-primary/60 animate-float" style={{ animationDelay: '1s' }} />
        </div>
        <p className="text-muted-foreground text-lg">
          We've carefully selected these gifts based on your preferences
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto">
        {suggestions.map((suggestion, index) => (
          <Card 
            key={index} 
            className="festive-card group bg-background/50"
          >
            <div className="absolute top-4 right-4">
              <ShoppingBag className="w-6 h-6 text-muted-foreground group-hover:text-accent transition-colors duration-300" />
            </div>

            <h3 className="text-xl font-semibold mb-4 pr-8 relative">
              <span className="relative bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {suggestion.title}
              </span>
            </h3>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              {suggestion.description}
            </p>

            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors duration-300">
                <span className="font-medium">Price Range:</span>
                <span className="text-primary font-semibold">
                  {suggestion.price}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors duration-300">
                <span className="font-medium">Where to Buy:</span>
                <span className="text-primary">
                  {suggestion.where}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors duration-300">
                <p className="font-medium mb-2">Why this gift:</p>
                <p className="text-muted-foreground leading-relaxed">
                  {suggestion.reason}
                </p>
              </div>
              
              {suggestion.productLinks && suggestion.productLinks.length > 0 && (
                <div className="mt-6 border-t border-border/30 pt-6">
                  <p className="font-medium mb-4 flex items-center gap-2 text-base">
                    🎁 Shop Online
                  </p>
                  <ul className="space-y-3">
                    {suggestion.productLinks.map((product, pIndex) => (
                      <li 
                        key={pIndex} 
                        className="group/item overflow-hidden rounded-lg bg-muted/50 hover:bg-muted/70 transition-all duration-300"
                      >
                        <a
                          href={product.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-3"
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="text-primary/90 font-medium truncate group-hover/item:text-primary transition-colors flex items-center gap-2">
                                {product.title}
                                <ExternalLink className="w-4 h-4 opacity-40 group-hover/item:opacity-70 transition-opacity shrink-0" />
                              </div>
                              {product.price && (
                                <span className="text-primary/70 text-sm block mt-1">
                                  {product.price}
                                </span>
                              )}
                            </div>
                            <div className="w-6 h-6 flex items-center justify-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover/item:bg-primary/70 transition-all duration-300 group-hover/item:scale-125" />
                            </div>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
