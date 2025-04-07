import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Typen für Crop und Grid
export type CropType = 'wheat' | 'corn' | 'tomato' | 'potato';
export type GrowthStage = 0 | 1 | 2 | 3;

// Grid-Zellen-Interface
export interface GridCell {
  type: CropType | null;
  growthStage: GrowthStage;
}

// Ressourcen-Interface
export interface FarmResources {
  money: number;
  seeds: Record<CropType, number>;
}

// Farm Store Interface
interface FarmStore {
  grid: GridCell[][];
  resources: FarmResources;
  actions: {
    plantCrop: (row: number, col: number, cropType: CropType) => void;
    growCrop: (row: number, col: number) => void;
    harvestCrop: (row: number, col: number) => void;
    canPlantCrop: (cropType: CropType) => boolean;
    calculateHarvestReward: (cropType: CropType) => number;
  };
}

// Crop-Preise und Belohnungen
const CROP_PRICES = {
  wheat: { seedCost: 5, harvestReward: 20 },
  corn: { seedCost: 7, harvestReward: 25 },
  tomato: { seedCost: 6, harvestReward: 22 },
  potato: { seedCost: 8, harvestReward: 30 }
};

export const useFarmStore = create<FarmStore>()(
  persist(
    (set, get) => ({
      grid: Array.from({ length: 4 }, () => 
        Array.from({ length: 4 }, () => ({ 
          type: null, 
          growthStage: 0 
        }))
      ),
      resources: {
        money: 100,
        seeds: {
          wheat: 10,
          corn: 10,
          tomato: 10,
          potato: 10
        }
      },
      actions: {
        plantCrop: (row, col, cropType) => {
          const { resources } = get();
          
          if (resources.seeds[cropType] <= 0) return;

          set(state => ({
            grid: state.grid.map((r, rIdx) => 
              rIdx === row 
                ? r.map((cell, cIdx) => 
                    cIdx === col 
                      ? { type: cropType, growthStage: 0 } 
                      : cell
                  )
                : r
            ),
            resources: {
              ...state.resources,
              seeds: {
                ...state.resources.seeds,
                [cropType]: state.resources.seeds[cropType] - 1
              },
              money: state.resources.money - CROP_PRICES[cropType].seedCost
            }
          }));
        },
        
        growCrop: (row, col) => {
          set(state => ({
            grid: state.grid.map((r, rIdx) => 
              rIdx === row 
                ? r.map((cell, cIdx) => 
                    cIdx === col && cell.type && cell.growthStage < 3
                      ? { ...cell, growthStage: (cell.growthStage + 1) as GrowthStage }
                      : cell
                  )
                : r
            )
          }));
        },
        
        harvestCrop: (row, col) => {
          const cell = get().grid[row][col];
          
          if (!cell.type || cell.growthStage !== 3) return;

          set(state => ({
            grid: state.grid.map((r, rIdx) => 
              rIdx === row 
                ? r.map((cell, cIdx) => 
                    cIdx === col 
                      ? { type: null, growthStage: 0 } 
                      : cell
                  )
                : r
            ),
            resources: {
              ...state.resources,
              money: state.resources.money + CROP_PRICES[cell.type].harvestReward
            }
          }));
        },
        
        canPlantCrop: (cropType) => {
          const { resources } = get();
          return resources.seeds[cropType] > 0;
        },
        
        calculateHarvestReward: (cropType) => {
          return CROP_PRICES[cropType].harvestReward;
        }
      }
    }),
    {
      name: 'farm-storage',
      partialize: (state) => ({
        grid: state.grid,
        resources: state.resources
      })
    }
  )
);
