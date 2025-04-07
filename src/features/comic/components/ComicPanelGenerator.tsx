"use client";

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaImage, FaMagic, FaSave, FaTrash, FaRobot } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

export interface ComicPanel {
  id: string;
  background: string;
  character: string;
  dialogue: string;
  mood?: 'happy' | 'sad' | 'excited' | 'mysterious';
  complexity?: 'simple' | 'moderate' | 'complex';
}

export const ComicPanelGenerator: React.FC = () => {
  const [panels, setPanels] = useState<ComicPanel[]>([]);
  const [currentPanel, setCurrentPanel] = useState<Partial<ComicPanel>>({});
  const [aiAssistMode, setAiAssistMode] = useState(false);

  const backgrounds = [
    'Farm Sunset', 
    'Magical Crop Field', 
    'Rustic Barn', 
    'Moonlit Garden',
    'Enchanted Forest',
    'Steampunk Farm'
  ];

  const characters = [
    'Farmer Joe', 
    'Magical Seed Sprite', 
    'Talking Scarecrow', 
    'Harvest Witch',
    'Robot Farmer',
    'Time-Traveling Gardener'
  ];

  const dialogueTemplates = [
    'Another day, another harvest!',
    'Magic grows where passion flows.',
    'Every seed tells a story.',
    'The farm is alive with wonder!',
    'Technology meets agriculture.',
    'Farming is an art, not just a science.'
  ];

  const generateRandomPanel = useCallback(() => {
    const newPanel: ComicPanel = {
      id: uuidv4(),
      background: backgrounds[Math.floor(Math.random() * backgrounds.length)],
      character: characters[Math.floor(Math.random() * characters.length)],
      dialogue: dialogueTemplates[Math.floor(Math.random() * dialogueTemplates.length)],
      mood: ['happy', 'sad', 'excited', 'mysterious'][Math.floor(Math.random() * 4)] as ComicPanel['mood'],
      complexity: ['simple', 'moderate', 'complex'][Math.floor(Math.random() * 3)] as ComicPanel['complexity']
    };

    setPanels(prev => [...prev, newPanel]);
  }, []);

  const aiAssistedGeneration = useCallback(() => {
    // Simulated AI generation logic
    const aiPanel: ComicPanel = {
      id: uuidv4(),
      background: 'AI-Generated Magical Farm',
      character: 'AI Storyteller',
      dialogue: 'In the realm of infinite possibilities, a story unfolds...',
      mood: 'mysterious',
      complexity: 'complex'
    };

    setPanels(prev => [...prev, aiPanel]);
  }, []);

  const savePanel = useCallback(() => {
    if (currentPanel.background && currentPanel.character && currentPanel.dialogue) {
      const newPanel: ComicPanel = {
        id: uuidv4(),
        background: currentPanel.background,
        character: currentPanel.character,
        dialogue: currentPanel.dialogue,
        mood: currentPanel.mood || 'happy',
        complexity: currentPanel.complexity || 'simple'
      };
      setPanels(prev => [...prev, newPanel]);
      setCurrentPanel({});
    }
  }, [currentPanel]);

  const deletePanel = useCallback((id: string) => {
    setPanels(prev => prev.filter(panel => panel.id !== id));
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="comic-panel-generator p-6 bg-white rounded-xl shadow-md"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Comic Panel Generator</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => setAiAssistMode(!aiAssistMode)}
            className={`flex items-center p-2 rounded ${
              aiAssistMode 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            <FaRobot className="mr-2" /> AI Assist
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold mb-2">Create Custom Panel</h3>
          <input 
            type="text"
            placeholder="Background"
            value={currentPanel.background || ''}
            onChange={(e) => setCurrentPanel(prev => ({ ...prev, background: e.target.value }))}
            className="w-full mb-2 p-2 border rounded"
          />
          <input 
            type="text"
            placeholder="Character"
            value={currentPanel.character || ''}
            onChange={(e) => setCurrentPanel(prev => ({ ...prev, character: e.target.value }))}
            className="w-full mb-2 p-2 border rounded"
          />
          <textarea 
            placeholder="Dialogue"
            value={currentPanel.dialogue || ''}
            onChange={(e) => setCurrentPanel(prev => ({ ...prev, dialogue: e.target.value }))}
            className="w-full mb-2 p-2 border rounded"
          />
          <div className="grid grid-cols-2 gap-2 mb-2">
            <select 
              value={currentPanel.mood || 'happy'}
              onChange={(e) => setCurrentPanel(prev => ({ ...prev, mood: e.target.value as ComicPanel['mood'] }))}
              className="w-full p-2 border rounded"
            >
              <option value="happy">Happy</option>
              <option value="sad">Sad</option>
              <option value="excited">Excited</option>
              <option value="mysterious">Mysterious</option>
            </select>
            <select 
              value={currentPanel.complexity || 'simple'}
              onChange={(e) => setCurrentPanel(prev => ({ ...prev, complexity: e.target.value as ComicPanel['complexity'] }))}
              className="w-full p-2 border rounded"
            >
              <option value="simple">Simple</option>
              <option value="moderate">Moderate</option>
              <option value="complex">Complex</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={savePanel}
              className="flex items-center bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              <FaSave className="mr-2" /> Save Panel
            </button>
            <button 
              onClick={generateRandomPanel}
              className="flex items-center bg-purple-500 text-white p-2 rounded hover:bg-purple-600"
            >
              <FaMagic className="mr-2" /> Random Panel
            </button>
            {aiAssistMode && (
              <button 
                onClick={aiAssistedGeneration}
                className="flex items-center bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                <FaRobot className="mr-2" /> AI Generate
              </button>
            )}
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold mb-2">Generated Panels</h3>
          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {panels.map((panel) => (
              <motion.div 
                key={panel.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gray-100 p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <p><strong>Background:</strong> {panel.background}</p>
                  <p><strong>Character:</strong> {panel.character}</p>
                  <p><strong>Dialogue:</strong> {panel.dialogue}</p>
                  <div className="text-sm text-gray-600 mt-2">
                    <span className="mr-2">Mood: {panel.mood}</span>
                    <span>Complexity: {panel.complexity}</span>
                  </div>
                </div>
                <button 
                  onClick={() => deletePanel(panel.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
