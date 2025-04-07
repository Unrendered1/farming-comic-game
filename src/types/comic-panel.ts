export interface ComicPanelGenerationConfig {
  templateComponents: {
    panelLayouts: ComicPanelLayout[];
    speechBubbleStyles: SpeechBubbleStyle[];
    narrativeStyles: NarrativeStyle[];
  };
  aiAssistance: {
    dialogueGeneration: DialogueGenerationStrategy;
    colorPaletteGeneration: ColorPaletteStrategy;
    contentVariation: ContentVariationStrategy;
  };
  themeConstraints: ThemeConstraint[];
}

export interface ComicPanelLayout {
  id: string;
  name: string;
  panelCount: number;
  gridTemplate: string;
  styleConstraints: StyleRule[];
}

export interface SpeechBubbleStyle {
  type: 'thought' | 'speech' | 'whisper' | 'shout';
  shape: 'rounded' | 'jagged' | 'cloud' | 'rectangular';
  tailPosition: 'left' | 'right' | 'center' | 'none';
}

export interface NarrativeStyle {
  genre: 'comedy' | 'slice_of_life' | 'adventure';
  humorLevel: number;
  pacing: 'slow' | 'moderate' | 'fast';
}

export interface DialogueGenerationStrategy {
  contextAwareness: boolean;
  humorLevel: number;
  characterVoicePreservation: boolean;
}

export interface ColorPaletteStrategy {
  generationMethod: 'contextual' | 'random' | 'mood_based';
  consistencyLevel: number;
}

export interface ContentVariationStrategy {
  variationTypes: string[];
  complexityLevel: number;
}

export interface ThemeConstraint {
  category: 'farming' | 'comedy' | 'character_development';
  restrictionLevel: number;
}

export interface StyleRule {
  type: 'layout' | 'color' | 'typography';
  rule: string;
}

export interface GeneratedComicPanel {
  layout: ComicPanelLayout;
  dialogue: string[];
  style: {
    colorPalette: string[];
    speechBubbleStyle: SpeechBubbleStyle;
    narrativeStyle: NarrativeStyle;
  };
  metadata: {
    generationTimestamp: number;
    variationSeed: number;
  };
}
