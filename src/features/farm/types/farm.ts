// Farm-related type definitions

/**
 * Represents the types of crops that can be grown in the farm
 */
export type CropType = 'wheat' | 'corn' | 'tomato' | 'potato';

/**
 * Defines the growth stages of a crop
 * 0: Seed, 1: Sprout, 2: Mature, 3: Ready to Harvest
 */
export type GrowthStage = 'seed' | 'sprout' | 'mature' | 'harvest';

/**
 * Represents a single cell in the farm grid
 */
export interface GridCell {
  crop: {
    type: CropType;
    growthStage: GrowthStage;
  } | null;
}

/**
 * Manages farm resources
 */
export interface Resources {
  money: number;
  seeds: Record<CropType, number>;
}

/**
 * Represents the overall state of the farm grid
 */
export interface FarmGridState {
  grid: GridCell[][];
  resources: Resources;
}

/**
 * Configuration for farm progression and achievements
 */
export interface FarmProgressConfig {
  levels: {
    [level: number]: {
      title: string;
      requiredExperience: number;
      rewards: string[];
    }
  };
  achievements: {
    [key: string]: {
      name: string;
      description: string;
      points: number;
      icon: string;
    }
  };
}
