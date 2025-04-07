import { z } from 'zod';

// Utility function for random element selection
function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Zod schema for type safety and validation
export const ComicPanelSchema = z.object({
  id: z.string().uuid(),
  background: z.string(),
  characters: z.array(z.object({
    name: z.string(),
    mood: z.enum(['happy', 'sad', 'excited', 'surprised', 'thoughtful']),
    role: z.string()
  })),
  dialogue: z.object({
    speaker: z.string(),
    text: z.string(),
    tone: z.enum(['humorous', 'dramatic', 'philosophical', 'whimsical'])
  }),
  narrative: z.object({
    theme: z.enum(['adventure', 'slice-of-life', 'fantasy', 'comedy']),
    complexity: z.number().min(1).max(5)
  }),
  visualStyle: z.object({
    artStyle: z.enum(['cartoon', 'manga', 'watercolor', 'comic-book']),
    colorPalette: z.enum(['vibrant', 'pastel', 'monochrome', 'vintage'])
  })
});

export type ComicPanel = z.infer<typeof ComicPanelSchema>;

// Mock AI Generation Service
export class AIPanelGeneratorService {
  private farmThemeWords = [
    'harvest', 'crops', 'sunlight', 'growth', 'nature', 
    'seeds', 'soil', 'seasons', 'magic', 'adventure'
  ];

  private characterNames = [
    'Farmer Jane', 'Magical Scarecrow', 'Talking Seed', 
    'Wind Spirit', 'Crop Guardian', 'Moonlight Farmer'
  ];

  private dialogueTones = ComicPanelSchema.shape.dialogue.shape.tone.options;
  private narrativeThemes = ComicPanelSchema.shape.narrative.shape.theme.options;
  private artStyles = ComicPanelSchema.shape.visualStyle.shape.artStyle.options;
  private colorPalettes = ComicPanelSchema.shape.visualStyle.shape.colorPalette.options;

  generatePanel(): ComicPanel {
    const generateDialogue = () => {
      const speaker = randomElement(this.characterNames);
      const words = this.farmThemeWords;
      const text = this.generateSentence(words);

      return {
        speaker,
        text,
        tone: randomElement(this.dialogueTones)
      };
    };

    return {
      id: crypto.randomUUID(),
      background: `${randomElement(this.farmThemeWords)} landscape`,
      characters: [{
        name: randomElement(this.characterNames),
        mood: randomElement(['happy', 'excited', 'thoughtful']),
        role: 'protagonist'
      }],
      dialogue: generateDialogue(),
      narrative: {
        theme: randomElement(this.narrativeThemes),
        complexity: Math.floor(Math.random() * 5) + 1
      },
      visualStyle: {
        artStyle: randomElement(this.artStyles),
        colorPalette: randomElement(this.colorPalettes)
      }
    };
  }

  private generateSentence(words: string[]): string {
    const sentenceStructures = [
      () => `The ${randomElement(words)} whispers a secret.`,
      () => `In the realm of ${randomElement(words)}, magic unfolds.`,
      () => `A journey through ${randomElement(words)} begins.`,
      () => `Wisdom grows like a ${randomElement(words)}.`
    ];

    return randomElement(sentenceStructures)();
  }

  // More advanced generation methods can be added here
  generatePanelSeries(count: number): ComicPanel[] {
    return Array.from({ length: count }, () => this.generatePanel());
  }

  // Potential future method for more context-aware generation
  generatePanelWithContext(previousPanel?: ComicPanel): ComicPanel {
    const newPanel = this.generatePanel();
    
    // Simple context-based adjustment logic
    if (previousPanel) {
      newPanel.narrative.theme = previousPanel.narrative.theme;
    }

    return newPanel;
  }
}

// Singleton instance for easy import
export const aiPanelGenerator = new AIPanelGeneratorService();
