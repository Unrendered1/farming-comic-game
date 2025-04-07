import { supabase } from '@/lib/supabase/client';
import { User, UserProgressConfig } from '@/features/auth/types/user';

export interface PersistenceService {
  saveUserProgress: (user: User) => Promise<boolean>;
  loadUserProgress: (userId: string) => Promise<User | null>;
  saveGameState: (userId: string, gameState: any) => Promise<boolean>;
  loadGameState: (userId: string) => Promise<any>;
}

export const persistenceService: PersistenceService = {
  async saveUserProgress(user) {
    try {
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          username: user.username,
          farm_level: user.farmLevel,
          experience: user.experience,
          achievements: user.achievements,
          resources: JSON.stringify(user.resources),
          last_login: user.lastLogin
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error saving user progress:', error);
      return false;
    }
  },

  async loadUserProgress(userId) {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;

      if (!data) return null;

      return {
        id: data.user_id,
        username: data.username,
        email: '',
        farmLevel: data.farm_level,
        experience: data.experience,
        achievements: data.achievements,
        resources: JSON.parse(data.resources),
        lastLogin: new Date(data.last_login)
      };
    } catch (error) {
      console.error('Error loading user progress:', error);
      return null;
    }
  },

  async saveGameState(userId, gameState) {
    try {
      const { error } = await supabase
        .from('game_states')
        .upsert({
          user_id: userId,
          state: JSON.stringify(gameState),
          updated_at: new Date()
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error saving game state:', error);
      return false;
    }
  },

  async loadGameState(userId) {
    try {
      const { data, error } = await supabase
        .from('game_states')
        .select('state')
        .eq('user_id', userId)
        .single();

      if (error) throw error;

      return data ? JSON.parse(data.state) : null;
    } catch (error) {
      console.error('Error loading game state:', error);
      return null;
    }
  }
};
