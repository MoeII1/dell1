import React, { useState } from 'react';
import { Heart, Car as Cards, BrainCircuit, Target, Sparkles } from 'lucide-react';
import MemoryGame from './games/MemoryGame';
import HeartCatcher from './games/HeartCatcher';
import LoveQuiz from './games/LoveQuiz';
import BubblePop from './games/BubblePop';
import StarCatcher from './games/StarCatcher';

function App() {
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const [theme, setTheme] = useState<string | null>(null);

  const themeColors = {
    pink: {
      primary: 'bg-pink-500',
      secondary: 'bg-pink-100',
      text: 'text-pink-600',
      gradient: 'from-pink-100 to-purple-100',
      hover: 'hover:bg-pink-600',
      light: 'bg-pink-50'
    },
    green: {
      primary: 'bg-emerald-500',
      secondary: 'bg-emerald-100',
      text: 'text-emerald-600',
      gradient: 'from-emerald-100 to-teal-100',
      hover: 'hover:bg-emerald-600',
      light: 'bg-emerald-50'
    }
  };

  const games = [
    {
      id: 'memory',
      name: 'Love Letter Match',
      icon: Cards,
      description: 'Find matching pairs of love-themed cards!',
      component: MemoryGame
    },
    {
      id: 'catcher',
      name: 'Heart Catcher',
      icon: Heart,
      description: 'Catch falling hearts to score points!',
      component: HeartCatcher
    },
    {
      id: 'quiz',
      name: 'Love Quiz',
      icon: BrainCircuit,
      description: 'Test your knowledge about love and relationships!',
      component: LoveQuiz
    },
    {
      id: 'bubble',
      name: 'Bubble Pop',
      icon: Target,
      description: 'Pop the love bubbles before they float away!',
      component: BubblePop
    },
    {
      id: 'stars',
      name: 'Star Catcher',
      icon: Sparkles,
      description: 'Catch falling stars to make wishes come true!',
      component: StarCatcher
    }
  ];

  const GameComponent = currentGame 
    ? games.find(g => g.id === currentGame)?.component 
    : null;

  if (!theme) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8">Choose Your Theme</h1>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setTheme('pink')}
              className="px-8 py-4 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition-all transform hover:scale-105"
            >
              Pink Theme
            </button>
            <button
              onClick={() => setTheme('green')}
              className="px-8 py-4 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all transform hover:scale-105"
            >
              Green Theme
            </button>
          </div>
        </div>
      </div>
    );
  }

  const colors = themeColors[theme as keyof typeof themeColors];

  return (
    <div 
      className={`min-h-screen bg-gradient-to-br ${colors.gradient}`}
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1517191434949-5e90cd67d2b6?q=80&w=2070&auto=format&fit=crop')`
      }}
    >
      <div className="container mx-auto px-4 py-8">
        {!currentGame ? (
          <>
            <div className="text-center mb-12">
              <h1 className={`text-4xl font-bold ${colors.text} mb-4`}>Dell's Games</h1>
              <p className={`text-lg ${colors.text}`}>Choose a game to play!</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {games.map((game) => (
                <button
                  key={game.id}
                  onClick={() => setCurrentGame(game.id)}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                >
                  <div className={`${colors.primary} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <game.icon className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{game.name}</h2>
                  <p className="text-gray-600">{game.description}</p>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => setCurrentGame(null)}
                className={`px-4 py-2 ${colors.primary} text-white rounded-lg ${colors.hover} transition-colors`}
              >
                ← Back to Games
              </button>
              <button
                onClick={() => setTheme(null)}
                className={`px-4 py-2 ${colors.primary} text-white rounded-lg ${colors.hover} transition-colors`}
              >
                Change Theme
              </button>
            </div>
            {GameComponent && <GameComponent theme={colors} />}
          </div>
        )}
      </div>
    </div>
  );
}

export default App