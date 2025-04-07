"use client";

import React from 'react';
import { motion } from 'framer-motion';

import FarmGrid from '@/features/farm/components/FarmGrid';
import FarmProgressOverview from '@/features/farm/components/FarmProgressOverview';
import FarmQuests from '@/features/farm/components/FarmQuests';
import FarmInventory from '@/features/farm/components/FarmInventory';

export default function FarmPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <div className="md:col-span-2 lg:col-span-2">
        <FarmGrid />
      </div>
      
      <div className="space-y-6">
        <FarmProgressOverview />
        <FarmQuests />
      </div>
      
      <div className="md:col-span-2 lg:col-span-1">
        <FarmInventory />
      </div>
    </motion.div>
  );
}
