"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaCoins, 
  FaSeedling, 
  FaTrophy, 
  FaChartLine 
} from 'react-icons/fa';

import { useFarmActions } from '../hooks/useFarmActions';

export const FarmProgressOverview: React.FC = () => {
  const { resources } = useFarmActions();

  const progressSections = [
    {
      icon: <FaCoins className="text-yellow-500" />,
      label: 'Total Money',
      value: `$${resources.money}`,
      color: 'bg-yellow-100'
    },
    {
      icon: <FaSeedling className="text-green-500" />,
      label: 'Total Seeds',
      value: Object.values(resources.seeds).reduce((a, b) => a + b, 0),
      color: 'bg-green-100'
    },
    {
      icon: <FaTrophy className="text-purple-500" />,
      label: 'Achievements',
      value: '0/10',
      color: 'bg-purple-100'
    },
    {
      icon: <FaChartLine className="text-blue-500" />,
      label: 'Farm Level',
      value: '1',
      color: 'bg-blue-100'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-2 gap-4 p-4 bg-white rounded-xl shadow-md"
    >
      {progressSections.map((section, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.05 }}
          className={`
            flex items-center space-x-4 p-4 rounded-lg 
            ${section.color} hover:shadow-md transition-all
          `}
        >
          <div className="text-3xl">{section.icon}</div>
          <div>
            <h3 className="text-sm text-gray-600">{section.label}</h3>
            <p className="text-xl font-bold">{section.value}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FarmProgressOverview;
