import axios from 'axios';

// Trello API configuration
const TRELLO_API_BASE_URL = 'https://api.trello.com/1';
const TRELLO_API_KEY = process.env.NEXT_PUBLIC_TRELLO_API_KEY;
const TRELLO_TOKEN = process.env.NEXT_PUBLIC_TRELLO_TOKEN;

// Interfaces for Trello entities
interface TrelloBoard {
  id: string;
  name: string;
}

interface TrelloList {
  id: string;
  name: string;
}

interface TrelloCard {
  id?: string;
  name: string;
  desc?: string;
  idList: string;
  pos?: number;
}

class TrelloService {
  private apiKey: string;
  private token: string;

  constructor() {
    if (!TRELLO_API_KEY || !TRELLO_TOKEN) {
      throw new Error('Trello API credentials are missing');
    }
    this.apiKey = TRELLO_API_KEY;
    this.token = TRELLO_TOKEN;
  }

  // Create a board for the Farming Comic Game project
  async createProjectBoard(): Promise<TrelloBoard> {
    const response = await axios.post(`${TRELLO_API_BASE_URL}/boards/`, {
      name: 'Farming Comic Game - Project Roadmap',
      desc: 'Roadmap and task tracking for the Farming Comic Game project',
      prefs_permissionLevel: 'private',
      key: this.apiKey,
      token: this.token
    });
    return response.data;
  }

  // Create lists based on roadmap sections
  async createRoadmapLists(boardId: string): Promise<TrelloList[]> {
    const listNames = [
      'Completed',
      'In Progress',
      'Next Steps',
      'Technical Improvements',
      'Future Enhancements'
    ];

    const lists: TrelloList[] = [];
    for (const name of listNames) {
      const response = await axios.post(`${TRELLO_API_BASE_URL}/lists`, {
        name,
        idBoard: boardId,
        key: this.apiKey,
        token: this.token
      });
      lists.push(response.data);
    }
    return lists;
  }

  // Sync roadmap tasks to Trello
  async syncRoadmapTasks(boardId: string, lists: TrelloList[]) {
    const tasksMapping = {
      'Completed': [
        'Next.js Setup',
        'TypeScript Configuration',
        'Comic Panel Generator',
        'Farm Module Implementation',
        'State Management Setup'
      ],
      'In Progress': [
        'Performance Optimization',
        'Supabase Row-Level Security',
        'Additional Feature Development'
      ],
      'Next Steps': [
        'Extend Comic Panel Generator',
        'Develop Additional Game Components',
        'Global State Persistence',
        'Authentication Implementation'
      ],
      'Technical Improvements': [
        'Advanced Typing',
        'Code Splitting',
        'Lazy Loading',
        'Build Optimizations'
      ],
      'Future Enhancements': [
        'Multiplayer Functions',
        'Advanced AI Generation',
        'Mobile Responsiveness',
        'In-Game Economy System'
      ]
    };

    for (const [listName, tasks] of Object.entries(tasksMapping)) {
      const list = lists.find(l => l.name === listName);
      if (!list) continue;

      for (const taskName of tasks) {
        await this.createCard({
          name: taskName,
          idList: list.id
        });
      }
    }
  }

  // Create a new card
  async createCard(cardData: TrelloCard): Promise<TrelloCard> {
    const response = await axios.post(`${TRELLO_API_BASE_URL}/cards`, {
      ...cardData,
      key: this.apiKey,
      token: this.token
    });
    return response.data;
  }

  // Sync entire roadmap
  async initializeRoadmap() {
    try {
      const board = await this.createProjectBoard();
      const lists = await this.createRoadmapLists(board.id);
      await this.syncRoadmapTasks(board.id, lists);
      return board;
    } catch (error) {
      console.error('Error initializing Trello roadmap:', error);
      throw error;
    }
  }
}

export default new TrelloService();
