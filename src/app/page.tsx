"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FaTractor as FarmIcon, 
  FaBook as BookIcon, 
  FaTrophy as TrophyIcon, 
  FaCoins as CoinsIcon, 
  FaPlay as PlayIcon 
} from 'react-icons/fa';

import { ComicPanel } from '@/features/comic-panel/components/ComicPanel';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { useAuthStore } from '@/features/auth/stores/authStore';
import { ComicPanelGenerator } from '@/features/comic-panel/generators/comic-panel-generator';
import { 
  ComicPanelGenerationConfig, 
  ComicPanelLayout, 
  SpeechBubbleStyle, 
  NarrativeStyle,
  DialogueGenerationStrategy
} from '@/types/comic-panel';

export default function Home() {
  const { user } = useAuthStore();
  const [activeSection, setActiveSection] = useState<'overview' | 'login'>('overview');

  // Temporary comic panel generation config
  const comicPanelGenerationConfig: ComicPanelGenerationConfig = {
    templateComponents: {
      panelLayouts: [{
        id: 'default',
        name: 'Standard Layout',
        panelCount: 3,
        gridTemplate: 'repeat(3, 1fr)',
        styleConstraints: [
          { type: 'layout', rule: 'grid-based' }
        ]
      } as ComicPanelLayout],
      speechBubbleStyles: [{
        type: 'speech',
        shape: 'rounded',
        tailPosition: 'right'
      } as SpeechBubbleStyle],
      narrativeStyles: [{
        genre: 'comedy',
        humorLevel: 7,
        pacing: 'moderate'
      } as NarrativeStyle]
    },
    aiAssistance: {
      dialogueGeneration: {
        contextAwareness: true,
        humorLevel: 7,
        characterVoicePreservation: true
      } as DialogueGenerationStrategy,
      colorPaletteGeneration: {
        generationMethod: 'contextual',
        consistencyLevel: 8
      },
      contentVariation: {
        variationTypes: ['dialogue', 'layout'],
        complexityLevel: 5
      }
    },
    themeConstraints: [{
      category: 'farming',
      restrictionLevel: 6
    }]
  };

  const comicPanelGenerator = new ComicPanelGenerator(comicPanelGenerationConfig);
  const comicPanel = comicPanelGenerator.generatePanel('Farming adventure begins');

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="text-center mb-12">
        <motion.h1 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold text-green-700 mb-4"
        >
          Farming Comic Game
        </motion.h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Embark on a whimsical farming adventure where creativity meets agriculture!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Game Features Section */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h2 className="text-2xl font-semibold mb-4 text-green-600">Game Features</h2>
          <div className="space-y-4">
            {[
              { 
                icon: <FarmIcon className="text-green-500" />, 
                title: 'Farm Management', 
                description: 'Grow crops, manage resources, and expand your farm' 
              },
              { 
                icon: <BookIcon className="text-blue-500" />, 
                title: 'Comic Storytelling', 
                description: 'Generate unique comic panels with AI assistance' 
              },
              { 
                icon: <TrophyIcon className="text-purple-500" />, 
                title: 'Progression System', 
                description: 'Level up, unlock achievements, and become a farming legend' 
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg"
              >
                <div className="text-3xl">{feature.icon}</div>
                <div>
                  <h3 className="font-bold">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Comic Panel or Login Section */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-6"
        >
          {/* Toggle between Comic Panel and Login */}
          <div className="flex justify-center space-x-4 mb-4">
            <button 
              onClick={() => setActiveSection('overview')}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeSection === 'overview' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Game Overview
            </button>
            <button 
              onClick={() => setActiveSection('login')}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeSection === 'login' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Login / Register
            </button>
          </div>

          {activeSection === 'overview' ? (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-center">Comic Panel Preview</h2>
              <ComicPanel panel={comicPanel} />
            </div>
          ) : (
            <LoginForm />
          )}
        </motion.div>
      </div>

      {/* Quick Access Buttons */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-12 flex justify-center space-x-6"
      >
        {[
          { 
            href: '/farm', 
            icon: <FarmIcon />, 
            label: 'Start Farming',
            color: 'bg-green-500'
          },
          { 
            href: '/progression', 
            icon: <TrophyIcon />, 
            label: 'View Progression',
            color: 'bg-purple-500'
          },
          { 
            href: '/comic-panel', 
            icon: <BookIcon />, 
            label: 'Comic Panels',
            color: 'bg-blue-500'
          }
        ].map((button, index) => (
          <Link 
            key={index} 
            href={button.href}
            className={`
              ${button.color} text-white 
              px-6 py-3 rounded-lg 
              flex items-center space-x-2
              hover:scale-105 transition-transform
            `}
          >
            {button.icon}
            <span>{button.label}</span>
          </Link>
        ))}
      </motion.div>
    </motion.main>
  );
}
