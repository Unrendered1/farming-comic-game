"use client";

import ComicPanelGenerator from '@/features/comic-panel/components/ComicPanelGenerator';

export default function ComicPanelPage() {
  return (
    <div className="comic-panel-page container mx-auto px-4 py-8">
      <h1 className="text-4xl font-comic text-center mb-8">Comic Panel Studio</h1>
      <ComicPanelGenerator />
    </div>
  );
}
