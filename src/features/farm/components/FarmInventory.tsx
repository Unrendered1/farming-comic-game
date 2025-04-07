"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaBox, 
  FaCarrot, 
  FaApple, 
  FaCube, 
  FaShoppingBasket 
} from 'react-icons/fa';

// Typen für Inventar-Artikel
export type ProductType = 'wheat' | 'corn' | 'tomato' | 'potato';

export interface InventoryItem {
  type: ProductType;
  quantity: number;
  sellPrice: number;
}

export const FarmInventory: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { type: 'wheat', quantity: 50, sellPrice: 2 },
    { type: 'corn', quantity: 30, sellPrice: 3 },
    { type: 'tomato', quantity: 20, sellPrice: 4 },
    { type: 'potato', quantity: 40, sellPrice: 2.5 }
  ]);

  const [selectedItem, setSelectedItem] = useState<ProductType | null>(null);

  const productIcons = {
    wheat: FaCarrot,
    corn: FaCube,
    tomato: FaApple,
    potato: FaCarrot
  };

  const sellItem = (item: InventoryItem) => {
    const totalValue = item.quantity * item.sellPrice;
    setInventory(prev => 
      prev.map(i => 
        i.type === item.type ? { ...i, quantity: 0 } : i
      )
    );
    // TODO: Implementiere Geldtransaktion
    console.log(`Sold ${item.quantity} ${item.type} for $${totalValue}`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 bg-white rounded-xl shadow-md"
    >
      <div className="flex items-center mb-4">
        <FaBox className="mr-2 text-2xl text-green-500" />
        <h2 className="text-xl font-bold">Farm Inventory</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {inventory.map(item => {
          const ProductIcon = productIcons[item.type];
          
          return (
            <motion.div
              key={item.type}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedItem(item.type)}
              className={`
                border p-4 rounded-lg flex items-center justify-between
                ${selectedItem === item.type 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200'}
                cursor-pointer
              `}
            >
              <div className="flex items-center space-x-4">
                <ProductIcon className="text-3xl text-green-600" />
                <div>
                  <h3 className="font-bold capitalize">{item.type}</h3>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm">Price: ${item.sellPrice}/unit</p>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    sellItem(item);
                  }}
                  disabled={item.quantity === 0}
                  className={`
                    mt-2 px-3 py-1 rounded flex items-center
                    ${item.quantity > 0 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-300 text-gray-500'}
                  `}
                >
                  <FaShoppingBasket className="mr-2" /> Sell
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {selectedItem && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 p-4 bg-gray-100 rounded-lg"
        >
          <h4 className="font-bold capitalize">
            {selectedItem} Details
          </h4>
          {/* Hier könnten weitere Details zum ausgewählten Produkt stehen */}
        </motion.div>
      )}
    </motion.div>
  );
};

export default FarmInventory;
