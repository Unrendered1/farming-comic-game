import React from 'react';
import { GeneratedComicPanel } from '@/types/comic-panel';

export interface ComicPanelProps {
  panel?: GeneratedComicPanel;
  className?: string;
}

export const ComicPanel: React.FC<ComicPanelProps> = ({ 
  panel = {} as GeneratedComicPanel, 
  className = ''
}) => {
  const { layout, dialogue, style } = panel;

  return (
    <div 
      className={`comic-panel 
        grid 
        gap-4 
        p-4 
        rounded-lg 
        shadow-md 
        ${className}`}
      style={{
        gridTemplateColumns: layout?.gridTemplate,
        backgroundColor: style?.colorPalette[0],
        color: style?.colorPalette[1]
      }}
    >
      <div className="comic-panel-header">
        <h3 className="text-lg font-bold">{layout?.name}</h3>
      </div>
      
      <div className="comic-panel-dialogue">
        {dialogue?.map((text, index) => (
          <div 
            key={index} 
            className="speech-bubble"
            style={{
              backgroundColor: style?.colorPalette[2],
              borderColor: style?.colorPalette[3]
            }}
          >
            {text}
          </div>
        ))}
      </div>

      <div className="comic-panel-metadata text-xs opacity-50">
        <p>Generated at: {new Date(panel.metadata?.generationTimestamp).toLocaleString()}</p>
        <p>Variation Seed: {panel.metadata?.variationSeed}</p>
      </div>
    </div>
  );
};
