"use client";

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FiRefreshCw, FiSave, FiTrash2 } from 'react-icons/fi';
import { aiPanelGenerator, ComicPanel } from '../services/aiPanelGenerator';

const ComicPanelGenerator: React.FC = () => {
  const [currentPanel, setCurrentPanel] = useState<ComicPanel | null>(null);
  const [panelHistory, setPanelHistory] = useState<ComicPanel[]>([]);

  const generatePanel = useCallback(() => {
    const newPanel = aiPanelGenerator.generatePanel();
    setCurrentPanel(newPanel);
    
    // Update panel history, keeping only last 5
    setPanelHistory(prev => {
      const updated = [newPanel, ...prev];
      return updated.slice(0, 5);
    });
  }, []);

  const savePanel = useCallback(() => {
    if (currentPanel) {
      // TODO: Implement actual save logic (e.g., to Supabase)
      alert(`Panel saved: ${currentPanel.id}`);
    }
  }, [currentPanel]);

  const deletePanel = useCallback((panelId: string) => {
    setPanelHistory(prev => prev.filter(panel => panel.id !== panelId));
  }, []);

  // Generate initial panel on component mount
  React.useEffect(() => {
    generatePanel();
  }, [generatePanel]);

  return (
    <div className="comic-panel-generator container mx-auto p-6 bg-white/80 rounded-xl shadow-lg">
      {/* Current Panel Display */}
      {currentPanel && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="current-panel mb-8 p-6 bg-gray-100 rounded-lg"
        >
          <div className="panel-details">
            <h2 className="text-2xl font-bold mb-4">
              {currentPanel.narrative.theme} Comic Panel
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Background</h3>
                <p>{currentPanel.background}</p>
              </div>
              
              <div>
                <h3 className="font-semibold">Characters</h3>
                {currentPanel.characters.map((character: ComicPanel['characters'][number], index: number) => (
                  <div key={index} className="mb-2">
                    <p>{character.name} - {character.mood}</p>
                  </div>
                ))}
              </div>
              
              <div>
                <h3 className="font-semibold">Dialogue</h3>
                <blockquote className="italic">
                  "{currentPanel.dialogue.text}"
                  <footer className="text-sm mt-1">
                    - {currentPanel.dialogue.speaker}
                  </footer>
                </blockquote>
              </div>
              
              <div>
                <h3 className="font-semibold">Visual Style</h3>
                <p>
                  Art Style: {currentPanel.visualStyle.artStyle}
                  <br />
                  Color Palette: {currentPanel.visualStyle.colorPalette}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="panel-actions flex justify-center space-x-4 mt-6">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={generatePanel}
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              <FiRefreshCw className="mr-2" /> Regenerate
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={savePanel}
              className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              <FiSave className="mr-2" /> Save Panel
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Panel History */}
      <div className="panel-history">
        <h3 className="text-2xl font-bold mb-4">Panel History</h3>
        {panelHistory.length === 0 ? (
          <p className="text-gray-600">No panels generated yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {panelHistory.map((panel: ComicPanel, index: number) => (
              <motion.div
                key={panel.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gray-100 p-4 rounded-lg relative"
              >
                <div className="mb-2">
                  <h4 className="font-semibold">{panel.narrative.theme}</h4>
                  <p className="text-sm">{panel.dialogue.text}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => deletePanel(panel.id)}
                  className="absolute top-2 right-2 text-red-500"
                >
                  <FiTrash2 />
                </motion.button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComicPanelGenerator;
