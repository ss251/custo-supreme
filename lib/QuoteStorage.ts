// lib/quoteStorage.ts

import { v4 as uuidv4 } from 'uuid';
import type { QuoteFormData } from '@/components/QuoteSection';

interface QuoteData extends QuoteFormData {
  id: string;
  initialQuote: number;
  finalQuote?: number;
  walkthrough?: {
    date: string;
    notes: string;
  };
}

class QuoteStorage {
  private quotes: QuoteData[] = [];

  saveQuote(formData: QuoteFormData, initialQuote: number): string {
    const id = uuidv4();
    const newQuote: QuoteData = {
      id,
      ...formData,
      initialQuote,
    };
    this.quotes.push(newQuote);
    return id;
  }

  getQuote(id: string): QuoteData | undefined {
    return this.quotes.find(quote => quote.id === id);
  }

  updateQuoteAfterWalkthrough(id: string, finalQuote: number, walkthroughNotes: string): void {
    const quote = this.getQuote(id);
    if (quote) {
      quote.finalQuote = finalQuote;
      quote.walkthrough = {
        date: new Date().toISOString(),
        notes: walkthroughNotes,
      };
    }
  }
}

export const quoteStorage = new QuoteStorage();