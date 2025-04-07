"use client";

import PlayerProgressionTracker from '@/features/progression/components/PlayerProgressionTracker';

export default function ProgressionPage() {
  const progressionStages = [
    { 
      title: 'Novice Farmer', 
      description: 'Start your farming journey',
      completed: true,
      rewards: ['Basic Seeds', 'Small Farm Plot']
    },
    { 
      title: 'Crop Master', 
      description: 'Successfully grow 10 different crops',
      completed: false,
      rewards: ['Advanced Seeds', 'Farm Expansion']
    },
    { 
      title: 'Comic Creator', 
      description: 'Generate 5 unique comic panels',
      completed: false,
      rewards: ['Comic Style Unlock', 'Narrative Points']
    }
  ];

  return (
    <div className="progression-page container mx-auto px-4 py-8">
      <h1 className="text-4xl font-comic text-center mb-8">Player Progression</h1>
      
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Progression Stages</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {progressionStages.map((stage, index) => (
            <div 
              key={index} 
              className={`
                p-6 rounded-lg shadow-md 
                ${stage.completed 
                  ? 'bg-green-100 border-2 border-green-500' 
                  : 'bg-gray-100 border-2 border-gray-300'
                }
              `}
            >
              <h3 className="text-xl font-semibold mb-3">{stage.title}</h3>
              <p className="mb-4">{stage.description}</p>
              <div className="font-bold mb-2">Rewards:</div>
              <ul className="list-disc list-inside">
                {stage.rewards.map((reward, idx) => (
                  <li key={idx}>{reward}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <PlayerProgressionTracker />
    </div>
  );
}
