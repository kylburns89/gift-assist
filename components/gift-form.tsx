"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { useState } from "react";
import { Gift, PackageSearch, Heart, DollarSign, Sparkles } from "lucide-react";
import { GiftSuggestions } from "./gift-suggestions";
import { generateGiftSuggestions } from "../lib/together-ai";
import { GiftSuggestion } from "../lib/types";

const formSchema = z.object({
  relationship: z.string().min(1, "Please select a relationship"),
  age: z.string().min(1, "Please enter the recipient's age"),
  interests: z.string().min(3, "Please enter at least one interest"),
  preferences: z.string(),
  budget: z.array(z.number()).min(1).max(1),
});

const relationships = [
  "Parent",
  "Sibling",
  "Friend",
  "Partner",
  "Child",
  "Colleague",
  "Other",
];

export function GiftForm() {
  const [suggestions, setSuggestions] = useState<GiftSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      relationship: "",
      age: "",
      interests: "",
      preferences: "",
      budget: [100],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(null);
    try {
      const suggestions = await generateGiftSuggestions(values);
      setSuggestions(suggestions);
    } catch (err) {
      setError("Failed to generate gift suggestions. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 space-y-8">
      <div className="text-center space-y-3 mb-8">
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-background/50 rounded-2xl p-6 shadow-xl border border-border/50">
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="relationship"
              render={({ field }) => (
                <FormItem className="bg-background/30 rounded-xl p-4 transition-all duration-300 hover:bg-background/40">
                  <FormLabel className="festive-label flex items-center gap-2">
                    <Heart className="w-4 h-4 text-primary/70" />
                    Relationship to Recipient
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="festive-input">
                        <SelectValue placeholder="Select relationship" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {relationships.map((rel) => (
                        <SelectItem 
                          key={rel} 
                          value={rel.toLowerCase()}
                          className="cursor-pointer hover:bg-muted"
                        >
                          {rel}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem className="bg-background/30 rounded-xl p-4 transition-all duration-300 hover:bg-background/40">
                  <FormLabel className="festive-label flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-accent/70" />
                    Recipient's Age
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Enter age" 
                      className="festive-input" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="interests"
            render={({ field }) => (
              <FormItem className="bg-background/30 rounded-xl p-4 transition-all duration-300 hover:bg-background/40">
                <FormLabel className="festive-label flex items-center gap-2">
                  <Gift className="w-4 h-4 text-primary/70" />
                  Interests & Hobbies
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., reading, cooking, photography"
                    className="festive-input"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="preferences"
            render={({ field }) => (
              <FormItem className="bg-background/30 rounded-xl p-4 transition-all duration-300 hover:bg-background/40">
                <FormLabel className="festive-label flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent/70" />
                  Special Preferences or Restrictions (Optional)
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., no electronics, eco-friendly only"
                    className="festive-input"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem className="bg-background/30 rounded-xl p-4 transition-all duration-300 hover:bg-background/40">
                <FormLabel className="festive-label flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-primary/70" />
                  Budget (USD)
                </FormLabel>
                <FormControl>
                  <div className="space-y-3">
                    <div className="relative pt-5 pb-3">
                      <Slider
                        min={10}
                        max={500}
                        step={10}
                        value={field.value}
                        onValueChange={field.onChange}
                        className="[&>[role=slider]]:h-5 [&>[role=slider]]:w-5 [&>[role=slider]]:rounded-full [&>[role=slider]]:border [&>[role=slider]]:border-primary/30 [&>[role=slider]]:bg-background [&>[role=slider]]:shadow-md [&>[role=slider]]:transition-all hover:[&>[role=slider]]:scale-105"
                      />
                    </div>
                    <div className="text-center font-medium text-primary">
                      ${field.value}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && (
            <div className="p-4 rounded-lg bg-destructive/5 text-destructive text-sm text-center border border-destructive/10">
              {error}
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-primary/90 via-accent/90 to-primary/90 hover:from-primary hover:via-accent hover:to-primary text-white shadow-lg hover:shadow-xl transition-all py-6 text-lg font-medium rounded-xl"
            disabled={loading}
          >
            {loading ? (
              <>
                <PackageSearch className="mr-2 h-5 w-5 animate-spin" />
                Finding Perfect Gifts...
              </>
            ) : (
              <>
                <Gift className="mr-2 h-5 w-5" />
                Get Gift Suggestions
              </>
            )}
          </Button>
        </form>
      </Form>

      <GiftSuggestions suggestions={suggestions} />
    </div>
  );
}
