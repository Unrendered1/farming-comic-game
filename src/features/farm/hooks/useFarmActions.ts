"use client";

import React, { useState } from 'react';
import { 
  FaSeedling, 
  FaApple,
  FaLeaf,
  FaPepperHot 
} from 'react-icons/fa';

import * as FarmTypes from '../types/farm';

/**
 * Custom hook for managing farm actions and state
 * @returns {Object} Farm actions and state management methods
 */
export const useFarmActions = () => {
  // Initialize grid with null crops
  const [grid, setGrid] = useState<FarmTypes.GridCell[][]>(
    Array.from({ length: 5 }, () => 
      Array.from({ length: 5 }, () => ({ crop: null }))
    )
  );

  // Initial farm resources
  const [resources, setResources] = useState<FarmTypes.Resources>({
    money: 1000,
    seeds: {
      wheat: 10,
      corn: 8,
      tomato: 5,
      potato: 7
    }
  });

  // Crop planting and harvesting details
  const cropDetails: Record<FarmTypes.CropType, { seedCost: number, harvestReward: number }> = {
    wheat: { seedCost: 5, harvestReward: 20 },
    corn: { seedCost: 6, harvestReward: 25 },
    tomato: { seedCost: 7, harvestReward: 35 },
    potato: { seedCost: 8, harvestReward: 30 }
  };

  /**
   * Get the icon for a specific crop type and growth stage
   * @param {CropType | null} type - Type of crop
   * @param {GrowthStage} growthStage - Current growth stage of the crop
   * @returns {React.ReactElement} Crop icon
   */
  const getCropIcon = (type: FarmTypes.CropType | null, growthStage: FarmTypes.GrowthStage): React.ReactElement => {
    if (!type) return React.createElement('div'); // Return an empty div instead of fragment

    const iconMap: Record<FarmTypes.CropType, () => React.ReactElement> = {
      wheat: () => React.createElement(FaSeedling),
      corn: () => React.createElement(FaLeaf),
      tomato: () => React.createElement(FaApple),
      potato: () => React.createElement(FaPepperHot)
    };

    return iconMap[type]();
  };

  /**
   * Check if a crop can be planted
   * @param {CropType} cropType - Type of crop to check
   * @returns {boolean} Whether the crop can be planted
   */
  const canPlantCrop = (cropType: FarmTypes.CropType): boolean => {
    return resources.seeds[cropType] > 0;
  };

  /**
   * Plant a crop in a specific grid cell
   * @param {number} row - Row index of the grid cell
   * @param {number} col - Column index of the grid cell
   * @param {CropType} cropType - Type of crop to plant
   */
  const plantCrop = (row: number, col: number, cropType: FarmTypes.CropType): void => {
    if (!canPlantCrop(cropType)) return;

    const newGrid: FarmTypes.GridCell[][] = [...grid];
    newGrid[row][col] = { 
      crop: { 
        type: cropType, 
        growthStage: 'seed' 
      } 
    };

    setGrid(newGrid);
    setResources((prev: FarmTypes.Resources) => ({
      ...prev,
      seeds: { ...prev.seeds, [cropType]: prev.seeds[cropType] - 1 }
    }));
  };

  /**
   * Water a crop to progress its growth stage
   * @param {number} row - Row index of the grid cell
   * @param {number} col - Column index of the grid cell
   */
  const waterCrop = (row: number, col: number): void => {
    const cell = grid[row][col];
    if (!cell.crop) return;

    const growthStageMap: Record<FarmTypes.GrowthStage, FarmTypes.GrowthStage> = {
      'seed': 'sprout',
      'sprout': 'mature',
      'mature': 'harvest',
      'harvest': 'harvest'
    };

    const newGrid: FarmTypes.GridCell[][] = [...grid];
    newGrid[row][col] = {
      crop: {
        ...cell.crop,
        growthStage: growthStageMap[cell.crop.growthStage]
      }
    };

    setGrid(newGrid);
  };

  /**
   * Harvest a crop from a specific grid cell
   * @param {number} row - Row index of the grid cell
   * @param {number} col - Column index of the grid cell
   */
  const harvestCrop = (row: number, col: number): void => {
    const cell = grid[row][col];
    if (!cell.crop || cell.crop.growthStage !== 'harvest') return;

    const newGrid: FarmTypes.GridCell[][] = [...grid];
    const harvestedCrop = cell.crop.type;
    newGrid[row][col] = { crop: null };

    setGrid(newGrid);
    setResources((prev: FarmTypes.Resources) => ({
      money: prev.money + cropDetails[harvestedCrop].harvestReward,
      seeds: { ...prev.seeds, [harvestedCrop]: prev.seeds[harvestedCrop] + 1 }
    }));
  };

  return {
    grid,
    resources,
    plantCrop,
    waterCrop,
    harvestCrop,
    getCropIcon,
    canPlantCrop
  };
};
