import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, UserProgressConfig } from '../types/user';
import { persistenceService } from '@/features/persistence/services/persistenceService';

const progressConfig: UserProgressConfig = {
  levels: {
    1: {
      title: 'Novice Farmer',
      requiredExperience: 0,
      rewards: ['Basic Seeds', 'Small Farm Plot']
    },
    2: {
      title: 'Crop Apprentice',
      requiredExperience: 100,
      rewards: ['Advanced Seeds', 'Farm Expansion']
    },
    3: {
      title: 'Farm Master',
      requiredExperience: 500,
      rewards: ['Rare Crops', 'Advanced Tools']
    }
  },
  achievements: {
    firstHarvest: {
      name: 'First Harvest',
      description: 'Harvest your first crop',
      points: 10,
      icon: '🌾'
    },
    comicCreator: {
      name: 'Comic Creator',
      description: 'Generate 5 unique comic panels',
      points: 25,
      icon: '📖'
    }
  }
};

interface AuthState {
  user: User | null;
  progressConfig: UserProgressConfig;
  login: (userData: Partial<User>) => Promise<void>;
  logout: () => void;
  updateUserProgress: (experience: number, achievements?: string[]) => Promise<void>;
  loadUserProgress: (userId: string) => Promise<void>;
  saveUserProgress: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      progressConfig,
      login: async (userData) => {
        const newUser = {
          id: userData.id || '',
          username: userData.username || 'Guest',
          email: userData.email || '',
          farmLevel: 1,
          experience: 0,
          achievements: [],
          resources: {
            money: 100,
            seeds: {
              wheat: 5,
              corn: 3,
              tomato: 2
            }
          },
          lastLogin: new Date(),
          ...userData
        };

        set({ user: newUser });
        await get().saveUserProgress();
      },
      logout: () => set({ user: null }),
      updateUserProgress: async (experience, achievements = []) => {
        set((state) => {
          if (!state.user) return state;

          const newExperience = state.user.experience + experience;
          const currentLevel = Object.entries(progressConfig.levels)
            .reverse()
            .find(([_, levelData]) => newExperience >= levelData.requiredExperience)?.[0];

          return {
            user: {
              ...state.user,
              experience: newExperience,
              farmLevel: currentLevel ? parseInt(currentLevel) : state.user.farmLevel,
              achievements: Array.from(new Set([...state.user.achievements, ...achievements]))
            }
          };
        });

        await get().saveUserProgress();
      },
      loadUserProgress: async (userId) => {
        const loadedUser = await persistenceService.loadUserProgress(userId);
        if (loadedUser) {
          set({ user: loadedUser });
        }
      },
      saveUserProgress: async () => {
        const { user } = get();
        if (user) {
          return await persistenceService.saveUserProgress(user);
        }
        return false;
      }
    }),
    {
      name: 'farming-game-auth',
      version: 1
    }
  )
);
