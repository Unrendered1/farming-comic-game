import type { NextApiRequest, NextApiResponse } from 'next';
import TrelloService from '@/services/trelloService';

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  try {
    const board = await TrelloService.initializeRoadmap();
    res.status(200).json({
      message: 'Roadmap erfolgreich synchronisiert',
      boardId: board.id,
      boardName: board.name
    });
  } catch (error) {
    console.error('Trello Synchronisation Fehler:', error);
    res.status(500).json({ 
      message: 'Fehler bei der Trello-Synchronisation',
      error: error instanceof Error ? error.message : 'Unbekannter Fehler'
    });
  }
}
