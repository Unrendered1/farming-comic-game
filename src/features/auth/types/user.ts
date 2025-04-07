export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  farmLevel: number;
  experience: number;
  achievements: string[];
  resources: {
    money: number;
    seeds: Record<string, number>;
  };
  lastLogin: Date;
}

export interface UserProgressConfig {
  levels: {
    [level: number]: {
      title: string;
      requiredExperience: number;
      rewards: string[];
    };
  };
  achievements: {
    [key: string]: {
      name: string;
      description: string;
      points: number;
      icon: string;
    };
  };
}
