"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaShoppingCart, 
  FaCoins, 
  FaSeedling, 
  FaTools 
} from 'react-icons/fa';

export interface MarketItem {
  id: string;
  name: string;
  type: 'seed' | 'tool' | 'upgrade';
  price: number;
  description: string;
}

export const FarmMarket: React.FC = () => {
  const [marketItems, setMarketItems] = useState<MarketItem[]>([
    {
      id: 'seed-wheat',
      name: 'Wheat Seeds',
      type: 'seed',
      price: 10,
      description: 'Basic wheat seeds for beginners'
    },
    {
      id: 'seed-magical',
      name: 'Magical Seeds',
      type: 'seed',
      price: 50,
      description: 'Rare seeds with mysterious properties'
    },
    {
      id: 'tool-basic',
      name: 'Basic Farming Tools',
      type: 'tool',
      price: 100,
      description: 'Starter set of farming tools'
    },
    {
      id: 'upgrade-plot',
      name: 'Farm Plot Expansion',
      type: 'upgrade',
      price: 250,
      description: 'Expand your farmable land'
    }
  ]);

  const [cart, setCart] = useState<MarketItem[]>([]);
  const [balance, setBalance] = useState(500);

  const addToCart = (item: MarketItem) => {
    if (balance >= item.price) {
      setCart(prev => [...prev, item]);
      setBalance(prev => prev - item.price);
    } else {
      alert('Not enough coins!');
    }
  };

  const removeFromCart = (itemId: string) => {
    const itemToRemove = cart.find(item => item.id === itemId);
    if (itemToRemove) {
      setCart(prev => prev.filter(item => item.id !== itemId));
      setBalance(prev => prev + itemToRemove.price);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="farm-market p-6 bg-white rounded-xl shadow-md"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Farm Market</h2>
        <div className="flex items-center">
          <FaCoins className="mr-2 text-yellow-500" />
          <span className="font-semibold">{balance} Coins</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">Available Items</h3>
          <div className="space-y-4">
            {marketItems.map((item) => (
              <motion.div 
                key={item.id}
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-gray-100 rounded-lg flex justify-between items-center"
              >
                <div>
                  <h4 className="font-bold">{item.name}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <div className="flex items-center mt-2">
                    <FaCoins className="mr-2 text-yellow-500" />
                    <span>{item.price} Coins</span>
                  </div>
                </div>
                <button 
                  onClick={() => addToCart(item)}
                  className="bg-green-500 text-white p-2 rounded hover:bg-green-600 flex items-center"
                >
                  <FaShoppingCart className="mr-2" /> Buy
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Shopping Cart</h3>
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <motion.div 
                  key={item.id}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="p-4 bg-blue-100 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <h4 className="font-bold">{item.name}</h4>
                    <div className="flex items-center mt-2">
                      <FaCoins className="mr-2 text-yellow-500" />
                      <span>{item.price} Coins</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
