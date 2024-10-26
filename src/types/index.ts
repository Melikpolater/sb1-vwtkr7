export interface AITool {
  id: string;
  name: string;
  description: string;
  category: string;
  popularity: number;
  rating: number;
  imageUrl: string;
  websiteUrl: string;
  tags: string[];
  pricing: {
    type: 'free' | 'premium';
    price?: number;
    interval?: 'month' | 'year';
  };
  apiProvider: string;
  lastUpdated: Date;
}

export interface UserReview {
  id: string;
  userId: string;
  toolId: string;
  rating: number;
  comment: string;
  createdAt: Date;
  userName: string;
}

export interface User {
  uid: string;
  email: string;
  displayName: string;
  savedTools: string[];
  subscription?: {
    status: 'active' | 'canceled' | 'past_due';
    plan: 'monthly' | 'yearly';
    currentPeriodEnd: Date;
    stripeCustomerId?: string;
  };
}

export interface APIProvider {
  id: string;
  name: string;
  baseUrl: string;
  apiKey: string;
  type: 'openai' | 'anthropic' | 'google' | 'custom';
}