// Client-side rendering enabled
"use client";

// Import necessary dependencies from React and Framer Motion
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import icons from React Icons library
import { 
  FaHome, 
  FaShoppingCart, 
  FaBook, 
  FaPaintBrush, 
  FaTrophy 
} from 'react-icons/fa';

// Import various components for different game views
import FarmGrid from '../farm/components/FarmGrid';
import FarmProgressOverview from '../farm/components/FarmProgressOverview';
import FarmQuests from '../farm/components/FarmQuests';
import FarmInventory from '../farm/components/FarmInventory';
import { ComicPanelGenerator } from '../comic/components/ComicPanelGenerator';
import { FarmMarket } from '../market/components/FarmMarket';
import { FarmTutorial } from '../tutorial/components/FarmTutorial';

// Define the possible view modes for the farming game interface
/**
 * Enum for different view modes in the farming game
 * @enum {string}
 */
type ViewMode = 'farm' | 'market' | 'comic' | 'quests' | 'tutorial';

/**
 * Main component for the farming game interface
 * @returns {JSX.Element} The farming game interface
 */
const FarmingView: React.FC = () => {
  // State management for current view and tutorial completion
  const [currentView, setCurrentView] = useState<ViewMode>('farm');
  const [isTutorialCompleted, setIsTutorialCompleted] = useState(false);

  /**
   * Render the appropriate component based on the current view mode
   * @returns {JSX.Element} The rendered component for the current view mode
   */
  const renderCurrentView = () => {
    switch (currentView) {
      case 'farm':
        // Main farm view with grid and sidebar components
        return (
          <div className="farm-layout grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <FarmGrid />
            </div>
            <div className="farm-sidebar space-y-6">
              <FarmProgressOverview />
              <FarmInventory />
            </div>
          </div>
        );
      case 'market':
        // In-game market for purchasing items
        return <FarmMarket />;
      case 'comic':
        // Comic panel generation studio
        return <ComicPanelGenerator />;
      case 'quests':
        // Active quests and challenges
        return <FarmQuests />;
      case 'tutorial':
        // Interactive tutorial for new players
        return (
          <FarmTutorial 
            onComplete={() => {
              setIsTutorialCompleted(true);
              setCurrentView('farm');
            }} 
          />
        );
      default:
        return null;
    }
  };

  return (
    // Main container for the farming game interface
    <div className="farming-view min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto">
        {/* Animated header with game title and tutorial button */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="header flex justify-between items-center mb-8"
        >
          <h1 className="text-3xl font-bold text-green-800">
            Farming Comic Game
          </h1>
          
          {/* Show tutorial button if not completed */}
          {!isTutorialCompleted && (
            <button 
              onClick={() => setCurrentView('tutorial')}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 flex items-center"
            >
              <FaBook className="mr-2" /> Start Tutorial
            </button>
          )}
        </motion.div>

        {/* Navigation menu for different game views */}
        <div className="navigation mb-6">
          <div className="flex space-x-4 justify-center">
            {[
              { mode: 'farm', icon: FaHome, label: 'Farm' },
              { mode: 'market', icon: FaShoppingCart, label: 'Market' },
              { mode: 'comic', icon: FaPaintBrush, label: 'Comic Studio' },
              { mode: 'quests', icon: FaTrophy, label: 'Quests' }
            ].map(({ mode, icon: Icon, label }) => (
              <motion.button
                key={mode}
                onClick={() => setCurrentView(mode as ViewMode)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  flex items-center p-3 rounded-lg 
                  ${currentView === mode 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }
                `}
              >
                <Icon className="mr-2" /> {label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Animated view rendering with smooth transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {renderCurrentView()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FarmingView;
