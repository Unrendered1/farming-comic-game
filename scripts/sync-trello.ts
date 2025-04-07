import TrelloService from '../src/services/trelloService';

async function syncRoadmap() {
  try {
    console.log('🚀 Starte Trello Roadmap Synchronisation...');
    const board = await TrelloService.initializeRoadmap();
    console.log(`✅ Roadmap erfolgreich synchronisiert: ${board.name}`);
    console.log(`🔗 Board-ID: ${board.id}`);
  } catch (error) {
    console.error('❌ Synchronisation fehlgeschlagen:', error);
    process.exit(1);
  }
}

syncRoadmap();
