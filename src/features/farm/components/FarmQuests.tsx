"use client";

import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  FaClipboardList, 
  FaStar, 
  FaCheck, 
  FaTimes 
} from 'react-icons/fa';

// Quest-Typen definieren
export type QuestDifficulty = 'easy' | 'medium' | 'hard';
export type QuestStatus = 'active' | 'completed' | 'failed';

export interface Quest {
  id: number;
  title: string;
  description: string;
  reward: number;
  difficulty: QuestDifficulty;
  status: QuestStatus;
  progress: number;
  target: number;
}

const FarmQuests: React.FC = () => {
  const [quests, setQuests] = useState<Quest[]>([
    {
      id: 1,
      title: 'First Harvest',
      description: 'Harvest your first crop',
      reward: 50,
      difficulty: 'easy',
      status: 'active',
      progress: 0,
      target: 1
    },
    {
      id: 2,
      title: 'Crop Diversity',
      description: 'Plant 3 different types of crops',
      reward: 100,
      difficulty: 'medium',
      status: 'active',
      progress: 1,
      target: 3
    },
    {
      id: 3,
      title: 'Farm Tycoon',
      description: 'Earn $500 from selling crops',
      reward: 250,
      difficulty: 'hard',
      status: 'active',
      progress: 200,
      target: 500
    }
  ]);

  // Memoized quest filtering
  const filteredQuests = useMemo(() => {
    return {
      active: quests.filter(quest => quest.status === 'active'),
      completed: quests.filter(quest => quest.status === 'completed'),
      failed: quests.filter(quest => quest.status === 'failed')
    };
  }, [quests]);

  // Memoized quest progress rendering
  const renderQuestProgress = useCallback((quest: Quest) => {
    const progressPercentage = (quest.progress / quest.target) * 100;
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
        <div 
          className={`h-2.5 rounded-full ${
            progressPercentage === 100 
              ? 'bg-green-500' 
              : 'bg-blue-500'
          }`} 
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    );
  }, []);

  // Quest status update handler
  const updateQuestStatus = useCallback((questId: number, newStatus: QuestStatus) => {
    setQuests(prevQuests => 
      prevQuests.map(quest => 
        quest.id === questId 
          ? { ...quest, status: newStatus } 
          : quest
      )
    );
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <div className="flex items-center mb-4">
        <FaClipboardList className="mr-2 text-2xl text-blue-500" />
        <h2 className="text-2xl font-bold">Farm Quests</h2>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Active Quests</h3>
          {filteredQuests.active.map((quest) => (
            <motion.div 
              key={quest.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-100 p-4 rounded-lg flex justify-between items-center mb-2"
            >
              <div className="flex-grow mr-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold">{quest.title}</h4>
                  <span 
                    className={`
                      px-2 py-1 rounded-full text-xs 
                      ${quest.difficulty === 'easy' ? 'bg-green-200 text-green-800' : 
                        quest.difficulty === 'medium' ? 'bg-yellow-200 text-yellow-800' : 
                        'bg-red-200 text-red-800'}
                    `}
                  >
                    {quest.difficulty}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{quest.description}</p>
                <div className="flex items-center mt-2">
                  <FaStar className="mr-1 text-yellow-500" />
                  <span>Reward: ${quest.reward}</span>
                </div>
                {renderQuestProgress(quest)}
                <div className="flex space-x-2 mt-2">
                  <button 
                    onClick={() => updateQuestStatus(quest.id, 'completed')}
                    className="text-green-500 hover:text-green-700"
                  >
                    <FaCheck />
                  </button>
                  <button 
                    onClick={() => updateQuestStatus(quest.id, 'failed')}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredQuests.completed.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Completed Quests</h3>
            {filteredQuests.completed.map((quest) => (
              <motion.div 
                key={quest.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-green-100 p-4 rounded-lg flex justify-between items-center mb-2 opacity-70"
              >
                <div>
                  <h4 className="font-bold text-green-800">{quest.title}</h4>
                  <p className="text-sm text-green-700">{quest.description}</p>
                </div>
                <FaCheck className="text-green-600" />
              </motion.div>
            ))}
          </div>
        )}

        {filteredQuests.failed.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Failed Quests</h3>
            {filteredQuests.failed.map((quest) => (
              <motion.div 
                key={quest.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-100 p-4 rounded-lg flex justify-between items-center mb-2 opacity-70"
              >
                <div>
                  <h4 className="font-bold text-red-800">{quest.title}</h4>
                  <p className="text-sm text-red-700">{quest.description}</p>
                </div>
                <FaTimes className="text-red-600" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default FarmQuests;
