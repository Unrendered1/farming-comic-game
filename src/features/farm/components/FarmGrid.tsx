"use client";

import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  FaSeedling, 
  FaApple,
  FaWater,
  FaRecycle,
  FaExclamationTriangle 
} from 'react-icons/fa';

import { useFarmActions } from '../hooks/useFarmActions';
import { 
  CropType, 
  GrowthStage, 
  GridCell, 
  Resources 
} from '../types/farm';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

// Define possible toolbar actions for farm interaction
type ToolbarAction = 'plant' | 'water' | 'harvest';

/**
 * Toolbar component for farm interaction
 * Provides tools for planting, watering, and harvesting crops
 * 
 * @component
 * @param {Object} props - Component properties
 * @param {ToolbarAction} props.selectedTool - Currently selected farm tool
 * @param {CropType} props.selectedCrop - Currently selected crop type
 * @param {Resources} props.resources - Player's current farm resources
 * @param {Function} props.onToolChange - Callback for changing active tool
 * @param {Function} props.onCropChange - Callback for changing selected crop
 * @param {Function} props.getCropIcon - Function to retrieve crop icons
 */
const FarmToolbar: React.FC<{
  selectedTool: ToolbarAction;
  selectedCrop: CropType;
  resources: Resources;
  onToolChange: (tool: ToolbarAction) => void;
  onCropChange: (crop: CropType) => void;
  getCropIcon: (type: CropType | null, growthStage: GrowthStage) => React.ReactElement;
}> = ({ 
  selectedTool, 
  selectedCrop, 
  resources, 
  onToolChange, 
  onCropChange, 
  getCropIcon 
}) => {
  // Available crop types for planting
  const cropOptions: CropType[] = ['wheat', 'corn', 'tomato', 'potato'];

  return (
    <div className="flex flex-col space-y-2 p-2 bg-gray-100 rounded-lg">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">Farm Tools</h3>
        <span className="text-sm text-gray-600">Money: ${resources.money}</span>
      </div>

      <div className="flex space-x-2">
        {(['plant', 'water', 'harvest'] as ToolbarAction[]).map(tool => (
          <motion.button
            key={tool}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onToolChange(tool)}
            className={`
              p-2 rounded-lg transition-colors 
              ${selectedTool === tool 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }
            `}
          >
            {tool === 'plant' && <FaSeedling className="mr-2" />}
            {tool === 'water' && <FaWater className="mr-2" />}
            {tool === 'harvest' && <FaApple className="mr-2" />}
            {tool.charAt(0).toUpperCase() + tool.slice(1)}
          </motion.button>
        ))}
      </div>

      {/* Crop selection section */}
      <div className="grid grid-cols-4 gap-2 mt-2">
        {cropOptions.map(crop => (
          <motion.button
            key={crop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onCropChange(crop)}
            className={`
              p-2 rounded-lg flex items-center justify-center 
              ${selectedCrop === crop 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }
            `}
          >
            {getCropIcon(crop, 'seed')}
            <span className="ml-2 text-sm">{crop.charAt(0).toUpperCase() + crop.slice(1)}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

/**
 * Main farm grid component for managing crop interactions
 * Provides an interactive grid for planting, growing, and harvesting crops
 * 
 * @component
 * @returns {React.ReactElement} Rendered farm grid with toolbar and interactive cells
 */
const FarmGrid: React.FC = () => {
  // Farm actions and state management hook
  const { 
    grid, 
    resources, 
    plantCrop, 
    waterCrop, 
    harvestCrop,
    getCropIcon 
  } = useFarmActions();

  // State for current toolbar interactions
  const [selectedTool, setSelectedTool] = useState<ToolbarAction>('plant');
  const [selectedCrop, setSelectedCrop] = useState<CropType>('wheat');

  // Memoized grid rendering to optimize performance
  const renderedGrid = useMemo(() => {
    return grid.map((row, rowIndex) => 
      row.map((cell, colIndex) => {
        const handleCellInteraction = () => {
          switch (selectedTool) {
            case 'plant':
              plantCrop(rowIndex, colIndex, selectedCrop);
              break;
            case 'water':
              waterCrop(rowIndex, colIndex);
              break;
            case 'harvest':
              harvestCrop(rowIndex, colIndex);
              break;
          }
        };

        return (
          <motion.div
            key={`${rowIndex}-${colIndex}`}
            whileHover={{ scale: 1.05 }}
            className={`
              p-2 border rounded-lg flex items-center justify-center 
              ${cell.crop ? 'bg-green-100' : 'bg-gray-100'}
              cursor-pointer hover:bg-green-200 transition-colors
            `}
            onClick={handleCellInteraction}
          >
            {cell.crop && getCropIcon(cell.crop.type, cell.crop.growthStage)}
          </motion.div>
        );
      })
    );
  }, [grid, selectedTool, selectedCrop]);

  return (
    <ErrorBoundary fallback={
      <div className="error-message flex items-center text-red-500">
        <FaExclamationTriangle className="mr-2" />
        Farm grid could not be loaded. Please refresh.
      </div>
    }>
      <div className="farm-grid-container flex space-x-4">
        {/* Farm toolbar for tool and crop selection */}
        <FarmToolbar 
          selectedTool={selectedTool}
          selectedCrop={selectedCrop}
          resources={resources}
          onToolChange={setSelectedTool}
          onCropChange={setSelectedCrop}
          getCropIcon={getCropIcon}
        />

        {/* Interactive farm grid */}
        <div className="grid grid-cols-5 gap-2 flex-grow">
          {renderedGrid}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default FarmGrid;
