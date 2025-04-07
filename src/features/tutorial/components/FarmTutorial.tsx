"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBook, 
  FaArrowRight, 
  FaArrowLeft, 
  FaCheck 
} from 'react-icons/fa';

export interface TutorialStep {
  id: number;
  title: string;
  content: string;
  image?: string;
}

interface FarmTutorialProps {
  onComplete?: () => void;
}

export const FarmTutorial: React.FC<FarmTutorialProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  const tutorialSteps: TutorialStep[] = [
    {
      id: 0,
      title: 'Welcome to Farming Comic Game!',
      content: 'Learn the basics of farming, managing your resources, and creating your own comic story.',
      image: '/tutorial/welcome.png'
    },
    {
      id: 1,
      title: 'Understanding the Farm Grid',
      content: 'Each grid cell represents a plot where you can plant crops. Click on a cell to start planting!',
      image: '/tutorial/farm-grid.png'
    },
    {
      id: 2,
      title: 'Crop Management',
      content: 'Different crops have different growth times and values. Watch them grow and harvest at the right moment!',
      image: '/tutorial/crop-management.png'
    },
    {
      id: 3,
      title: 'Comic Panel Creation',
      content: 'As you progress, you can create comic panels that tell the story of your farm adventure.',
      image: '/tutorial/comic-panel.png'
    }
  ];

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setCompleted(true);
      onComplete && onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  if (completed) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="tutorial-completed p-6 bg-green-100 rounded-xl text-center"
      >
        <FaCheck className="mx-auto text-6xl text-green-600 mb-4" />
        <h2 className="text-2xl font-bold mb-4">Tutorial Completed!</h2>
        <p>You're now ready to start your farming adventure!</p>
        <button 
          onClick={() => {
            setCompleted(false);
            onComplete && onComplete();
          }}
          className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Start Farming
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="farm-tutorial p-6 bg-white rounded-xl shadow-md"
    >
      <div className="flex items-center mb-6">
        <FaBook className="mr-4 text-4xl text-blue-500" />
        <h2 className="text-2xl font-bold">Farm Adventure Tutorial</h2>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="tutorial-step"
        >
          <h3 className="text-xl font-semibold mb-4">{tutorialSteps[currentStep].title}</h3>
          
          {tutorialSteps[currentStep].image && (
            <div className="mb-4 rounded-lg overflow-hidden">
              <img 
                src={tutorialSteps[currentStep].image} 
                alt={tutorialSteps[currentStep].title} 
                className="w-full h-64 object-cover"
              />
            </div>
          )}
          
          <p className="mb-6">{tutorialSteps[currentStep].content}</p>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between">
        <button 
          onClick={prevStep}
          disabled={currentStep === 0}
          className={`flex items-center ${
            currentStep === 0 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'text-blue-500 hover:text-blue-600'
          }`}
        >
          <FaArrowLeft className="mr-2" /> Previous
        </button>

        <button 
          onClick={nextStep}
          className="flex items-center bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {currentStep === tutorialSteps.length - 1 ? 'Finish' : 'Next'}
          <FaArrowRight className="ml-2" />
        </button>
      </div>
    </motion.div>
  );
};
