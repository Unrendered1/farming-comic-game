"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiTrendingUp, FiStar } from 'react-icons/fi';

// Types for Player Progression
interface SkillLevel {
  name: string;
  level: number;
  experience: number;
  maxExperience: number;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  completed: boolean;
}

const PlayerProgressionTracker: React.FC = () => {
  const [skills, setSkills] = useState<SkillLevel[]>([
    { name: 'Farming', level: 1, experience: 0, maxExperience: 100 },
    { name: 'Crafting', level: 1, experience: 0, maxExperience: 100 },
    { name: 'Trading', level: 1, experience: 0, maxExperience: 100 }
  ]);

  const [achievements, setAchievements] = useState<Achievement[]>([
    { 
      id: 'first-harvest', 
      name: 'First Harvest', 
      description: 'Harvest your first crop', 
      completed: false 
    },
    { 
      id: 'master-farmer', 
      name: 'Master Farmer', 
      description: 'Reach level 10 in Farming', 
      completed: false 
    },
    { 
      id: 'trading-master', 
      name: 'Trading Master', 
      description: 'Complete 50 successful trades', 
      completed: false 
    }
  ]);

  const gainExperience = (skillName: string, amount: number) => {
    setSkills(prevSkills => 
      prevSkills.map(skill => {
        if (skill.name === skillName) {
          const newExperience = skill.experience + amount;
          const newLevel = Math.floor(newExperience / skill.maxExperience) + 1;
          
          return {
            ...skill,
            experience: newExperience % skill.maxExperience,
            level: newLevel
          };
        }
        return skill;
      })
    );
  };

  const completeAchievement = (achievementId: string) => {
    setAchievements(prevAchievements => 
      prevAchievements.map(achievement => 
        achievement.id === achievementId 
          ? { ...achievement, completed: true }
          : achievement
      )
    );
  };

  return (
    <div className="player-progression container mx-auto p-6 bg-white/80 rounded-xl shadow-lg">
      <h2 className="text-3xl font-comic text-center mb-6">Player Progression</h2>
      
      <div className="skills-section mb-8">
        <h3 className="text-2xl font-bold mb-4 flex items-center">
          <FiTrendingUp className="mr-2" /> Skills
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {skills.map((skill) => (
            <motion.div 
              key={skill.name}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-100 p-4 rounded-lg"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold">{skill.name}</span>
                <span>Level {skill.level}</span>
              </div>
              <div className="bg-gray-300 rounded-full h-4 overflow-hidden">
                <div 
                  className="bg-green-500 h-full" 
                  style={{ 
                    width: `${(skill.experience / skill.maxExperience) * 100}%` 
                  }}
                />
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {skill.experience} / {skill.maxExperience} XP
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="achievements-section">
        <h3 className="text-2xl font-bold mb-4 flex items-center">
          <FiAward className="mr-2" /> Achievements
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <motion.div 
              key={achievement.id}
              whileHover={{ scale: 1.05 }}
              className={`p-4 rounded-lg ${
                achievement.completed 
                  ? 'bg-green-100 border-2 border-green-500' 
                  : 'bg-gray-100'
              }`}
            >
              <div className="flex items-center mb-2">
                <FiStar 
                  className={`mr-2 ${
                    achievement.completed ? 'text-yellow-500' : 'text-gray-400'
                  }`} 
                />
                <span className="font-bold">{achievement.name}</span>
              </div>
              <p className="text-sm text-gray-600">{achievement.description}</p>
              {!achievement.completed && (
                <button 
                  onClick={() => completeAchievement(achievement.id)}
                  className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm"
                >
                  Mark Complete
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Debugging buttons for demonstration */}
      <div className="mt-6 flex justify-center space-x-4">
        <button 
          onClick={() => gainExperience('Farming', 25)}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Gain Farming XP
        </button>
        <button 
          onClick={() => gainExperience('Crafting', 25)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Gain Crafting XP
        </button>
      </div>
    </div>
  );
};

export default PlayerProgressionTracker;
