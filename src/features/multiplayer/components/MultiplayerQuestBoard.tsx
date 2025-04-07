"use client";

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiTrophy, FiCheckCircle, FiClock } from 'react-icons/fi';

// Types for Multiplayer Quests
interface MultiplayerQuest {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  reward: {
    coins: number;
    experience: number;
  };
  participants: {
    current: number;
    max: number;
  };
  timeLimit: number; // in minutes
  status: 'open' | 'in-progress' | 'completed';
}

const MultiplayerQuestBoard: React.FC = () => {
  const [quests, setQuests] = useState<MultiplayerQuest[]>([
    {
      id: 'quest-1',
      title: 'Community Harvest',
      description: 'Collaborate to harvest 1000 magical crops across all farms',
      difficulty: 'medium',
      reward: {
        coins: 500,
        experience: 100
      },
      participants: {
        current: 3,
        max: 10
      },
      timeLimit: 60,
      status: 'open'
    },
    {
      id: 'quest-2',
      title: 'Comic Farm Story',
      description: 'Create a collaborative comic panel about farm adventures',
      difficulty: 'hard',
      reward: {
        coins: 750,
        experience: 200
      },
      participants: {
        current: 5,
        max: 6
      },
      timeLimit: 120,
      status: 'in-progress'
    },
    {
      id: 'quest-3',
      title: 'Market Trade Challenge',
      description: 'Complete 50 unique trades in the farm market',
      difficulty: 'easy',
      reward: {
        coins: 250,
        experience: 50
      },
      participants: {
        current: 1,
        max: 15
      },
      timeLimit: 30,
      status: 'open'
    }
  ]);

  const joinQuest = useCallback((questId: string) => {
    setQuests(prevQuests => 
      prevQuests.map(quest => {
        if (quest.id === questId && quest.participants.current < quest.participants.max) {
          return {
            ...quest,
            participants: {
              ...quest.participants,
              current: quest.participants.current + 1
            },
            status: quest.participants.current + 1 === quest.participants.max 
              ? 'in-progress' 
              : quest.status
          };
        }
        return quest;
      })
    );
  }, []);

  const completeQuest = useCallback((questId: string) => {
    setQuests(prevQuests => 
      prevQuests.map(quest => 
        quest.id === questId 
          ? { ...quest, status: 'completed' }
          : quest
      )
    );
  }, []);

  return (
    <div className="multiplayer-quest-board container mx-auto p-6 bg-white/80 rounded-xl shadow-lg">
      <h2 className="text-3xl font-comic text-center mb-6 flex justify-center items-center">
        <FiUsers className="mr-3" /> Multiplayer Quests
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quests.map((quest) => (
          <motion.div
            key={quest.id}
            whileHover={{ scale: 1.05 }}
            className={`
              p-6 rounded-lg shadow-md 
              ${quest.status === 'completed' ? 'bg-green-100' : 
                quest.status === 'in-progress' ? 'bg-blue-100' : 
                'bg-gray-100'}
            `}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">{quest.title}</h3>
              <span 
                className={`
                  px-2 py-1 rounded-full text-xs font-bold
                  ${quest.difficulty === 'easy' ? 'bg-green-300' : 
                    quest.difficulty === 'medium' ? 'bg-yellow-300' : 
                    'bg-red-300'}
                `}
              >
                {quest.difficulty.toUpperCase()}
              </span>
            </div>

            <p className="text-sm mb-4">{quest.description}</p>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="flex items-center">
                <FiUsers className="mr-2 text-blue-600" />
                <span>
                  {quest.participants.current}/{quest.participants.max}
                </span>
              </div>
              <div className="flex items-center">
                <FiClock className="mr-2 text-gray-600" />
                <span>{quest.timeLimit} mins</span>
              </div>
            </div>

            <div className="flex items-center mb-4">
              <FiTrophy className="mr-2 text-yellow-600" />
              <span className="font-bold">
                {quest.reward.coins} coins, {quest.reward.experience} XP
              </span>
            </div>

            <div className="quest-actions flex space-x-2">
              <button
                onClick={() => joinQuest(quest.id)}
                disabled={
                  quest.status !== 'open' || 
                  quest.participants.current >= quest.participants.max
                }
                className={`
                  w-full py-2 rounded-lg transition-colors
                  ${quest.status === 'open' && 
                    quest.participants.current < quest.participants.max
                    ? 'bg-green-500 hover:bg-green-600 text-white' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
                `}
              >
                {quest.status === 'open' ? 'Join Quest' : 
                 quest.status === 'in-progress' ? 'In Progress' : 
                 'Completed'}
              </button>

              {quest.status === 'in-progress' && (
                <button
                  onClick={() => completeQuest(quest.id)}
                  className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  <FiCheckCircle className="inline mr-2" /> Complete Quest
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MultiplayerQuestBoard;
