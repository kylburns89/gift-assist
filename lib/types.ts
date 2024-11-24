export interface GiftSuggestion {
  title: string;
  description: string;
  price: string;
  where: string;
  reason: string;
  productLinks: {
    title: string;
    link: string;
    price?: string;
  }[];
}

export interface FormData {
  relationship: string;
  age: string;
  interests: string;
  preferences: string;
  budget: number[];
}
