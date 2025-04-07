"use client";

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiTrendingUp, FiDollarSign } from 'react-icons/fi';

// Types for Market Items
interface MarketItem {
  id: string;
  name: string;
  type: 'seed' | 'tool' | 'decoration';
  price: number;
  description: string;
  rarity: 'common' | 'rare' | 'legendary';
  inStock: number;
}

// Types for Player Inventory
interface InventoryItem {
  id: string;
  itemId: string;
  quantity: number;
}

const MarketPlace: React.FC = () => {
  const [playerBalance, setPlayerBalance] = useState(1000);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  const marketItems: MarketItem[] = [
    // Seeds
    {
      id: 'seed-carrot',
      name: 'Magical Carrot Seeds',
      type: 'seed',
      price: 50,
      description: 'Grow enchanted carrots with extra nutrition',
      rarity: 'common',
      inStock: 100
    },
    {
      id: 'seed-corn',
      name: 'Rainbow Corn Seeds',
      type: 'seed',
      price: 75,
      description: 'Multicolored corn that brings joy to your farm',
      rarity: 'rare',
      inStock: 50
    },
    // Tools
    {
      id: 'tool-watering-can',
      name: 'Enchanted Watering Can',
      type: 'tool',
      price: 200,
      description: 'Magically waters crops faster and more efficiently',
      rarity: 'rare',
      inStock: 25
    },
    {
      id: 'decoration-scarecrow',
      name: 'Comic Scarecrow',
      type: 'decoration',
      price: 150,
      description: 'A quirky scarecrow that adds humor to your farm',
      rarity: 'legendary',
      inStock: 10
    }
  ];

  const buyItem = useCallback((item: MarketItem) => {
    if (playerBalance >= item.price && item.inStock > 0) {
      // Deduct balance
      setPlayerBalance(prev => prev - item.price);

      // Update inventory
      const existingItemIndex = inventory.findIndex(inv => inv.itemId === item.id);
      if (existingItemIndex > -1) {
        const updatedInventory = [...inventory];
        updatedInventory[existingItemIndex].quantity += 1;
        setInventory(updatedInventory);
      } else {
        setInventory(prev => [...prev, { 
          id: crypto.randomUUID(), 
          itemId: item.id, 
          quantity: 1 
        }]);
      }

      // Reduce stock
      item.inStock -= 1;

      // Notify user
      alert(`Successfully purchased ${item.name}!`);
    } else {
      alert('Not enough balance or item out of stock!');
    }
  }, [playerBalance, inventory]);

  return (
    <div className="marketplace container mx-auto p-6 bg-white/80 rounded-xl shadow-lg">
      <h2 className="text-3xl font-comic text-center mb-6 flex justify-center items-center">
        <FiShoppingCart className="mr-3" /> Farm Market
      </h2>

      {/* Player Balance */}
      <div className="player-balance text-center mb-8 bg-green-100 p-4 rounded-lg">
        <div className="flex justify-center items-center text-2xl font-bold">
          <FiDollarSign className="mr-2 text-green-600" />
          Current Balance: {playerBalance} coins
        </div>
      </div>

      {/* Market Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {marketItems.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.05 }}
            className={`
              p-4 rounded-lg shadow-md 
              ${item.rarity === 'common' ? 'bg-gray-100' : 
                item.rarity === 'rare' ? 'bg-blue-100' : 
                'bg-purple-100'}
            `}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-bold">{item.name}</h3>
              <span 
                className={`
                  px-2 py-1 rounded-full text-xs font-bold
                  ${item.rarity === 'common' ? 'bg-gray-300' : 
                    item.rarity === 'rare' ? 'bg-blue-300' : 
                    'bg-purple-300'}
                `}
              >
                {item.rarity.toUpperCase()}
              </span>
            </div>
            <p className="text-sm mb-2">{item.description}</p>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <FiDollarSign className="mr-1 text-green-600" />
                <span className="font-bold">{item.price} coins</span>
              </div>
              <div className="text-sm text-gray-600">
                In Stock: {item.inStock}
              </div>
            </div>
            <button
              onClick={() => buyItem(item)}
              disabled={playerBalance < item.price || item.inStock === 0}
              className={`
                w-full mt-4 py-2 rounded-lg transition-colors
                ${playerBalance >= item.price && item.inStock > 0 
                  ? 'bg-green-500 hover:bg-green-600 text-white' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
              `}
            >
              Buy Now
            </button>
          </motion.div>
        ))}
      </div>

      {/* Inventory Section */}
      <div className="inventory mt-12">
        <h3 className="text-2xl font-comic mb-6 flex items-center">
          <FiTrendingUp className="mr-3" /> Your Inventory
        </h3>
        {inventory.length === 0 ? (
          <p className="text-center text-gray-600">Your inventory is empty</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {inventory.map((invItem) => {
              const marketItem = marketItems.find(m => m.id === invItem.itemId);
              return marketItem ? (
                <div 
                  key={invItem.id} 
                  className="bg-gray-100 p-4 rounded-lg"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold">{marketItem.name}</h4>
                    <span className="bg-blue-200 px-2 py-1 rounded-full text-sm">
                      x{invItem.quantity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{marketItem.description}</p>
                </div>
              ) : null;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketPlace;
