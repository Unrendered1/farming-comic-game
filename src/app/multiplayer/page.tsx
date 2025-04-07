"use client";

import MultiplayerQuestBoard from '@/features/multiplayer/components/MultiplayerQuestBoard';

export default function MultiplayerPage() {
  return (
    <div className="multiplayer-page container mx-auto px-4 py-8">
      <h1 className="text-4xl font-comic text-center mb-8">Multiplayer Adventures</h1>
      <MultiplayerQuestBoard />
    </div>
  );
}
