"use client";

import MarketPlace from '@/features/economy/components/MarketPlace';

export default function MarketPage() {
  return (
    <div className="market-page container mx-auto px-4 py-8">
      <h1 className="text-4xl font-comic text-center mb-8">Farm Market</h1>
      <MarketPlace />
    </div>
  );
}
