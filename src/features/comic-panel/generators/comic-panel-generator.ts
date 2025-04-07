import { 
  ComicPanelGenerationConfig, 
  GeneratedComicPanel, 
  ComicPanelLayout, 
  SpeechBubbleStyle, 
  NarrativeStyle 
} from '@/types/comic-panel';

export class ComicPanelGenerator {
  private config: ComicPanelGenerationConfig;
  private seed: number;

  constructor(config: ComicPanelGenerationConfig) {
    this.config = config;
    this.seed = Date.now();
  }

  private seededRandom(seed: number): number {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }

  private selectRandomItem<T>(items: T[], seed: number): T {
    const randomIndex = Math.floor(this.seededRandom(seed) * items.length);
    return items[randomIndex];
  }

  private generateDialogue(context: string): string[] {
    const { dialogueGeneration } = this.config.aiAssistance;
    const dialogues = [
      `A typical farming day begins... ${context}`,
      `Hmm, something interesting is happening... ${context}`,
      `Just another adventure in the comic farm! ${context}`
    ];

    const selectedDialogue = this.selectRandomItem(dialogues, this.seed);
    return [selectedDialogue];
  }

  private selectPanelLayout(context: string): ComicPanelLayout {
    const layouts = this.config.templateComponents.panelLayouts;
    const selectedLayout = this.selectRandomItem(layouts, this.seed);

    return {
      ...selectedLayout,
      styleConstraints: [
        { type: 'layout', rule: 'grid-based' },
        { type: 'color', rule: 'comic-style-palette' }
      ]
    };
  }

  private generateColorPalette(): string[] {
    const { colorPaletteGeneration } = this.config.aiAssistance;
    const basePalette = ['#FFC300', '#DAF7A6', '#FF5733', '#C70039'];
    
    return basePalette.slice(0, Math.floor(this.seededRandom(this.seed) * 4) + 2);
  }

  private selectSpeechBubbleStyle(): SpeechBubbleStyle {
    const styles = this.config.templateComponents.speechBubbleStyles;
    const selectedStyle = this.selectRandomItem(styles, this.seed);

    return {
      ...selectedStyle,
      tailPosition: 'right'
    };
  }

  private selectNarrativeStyle(): NarrativeStyle {
    return {
      genre: 'comedy',
      humorLevel: 7,
      pacing: 'moderate'
    };
  }

  generatePanel(context: string): GeneratedComicPanel {
    const layout = this.selectPanelLayout(context);
    const dialogue = this.generateDialogue(context);
    const colorPalette = this.generateColorPalette();
    const speechBubbleStyle = this.selectSpeechBubbleStyle();
    const narrativeStyle = this.selectNarrativeStyle();

    return {
      layout,
      dialogue,
      style: {
        colorPalette,
        speechBubbleStyle,
        narrativeStyle
      },
      metadata: {
        generationTimestamp: Date.now(),
        variationSeed: this.seed
      }
    };
  }
}
