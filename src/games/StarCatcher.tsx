import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

const loveMessages = [
  "You're a star! ⭐",
  "Keep shining bright! 🌟",
  "Making wishes come true! ✨",
  "Starlight, star bright! 💫",
  "You're stellar! ⭐"
];

export default function StarCatcher({ theme }: { theme: any }) {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (score > 0 && score % 5 === 0) {
      const randomMessage = loveMessages[Math.floor(Math.random() * loveMessages.length)];
      setMessage(randomMessage);
      setTimeout(() => setMessage(""), 3000);
    }
  }, [score]);

  useEffect(() => {
    if (gameOver) return;

    const handleMouseMove = (e: MouseEvent) => {
      const container = document.getElementById('game-area');
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      setPosition({
        x: Math.max(0, Math.min(90, x)),
        y: Math.max(0, Math.min(90, y))
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    const spawnStar = setInterval(() => {
      setStars(prev => [...prev, {
        id: Date.now(),
        x: Math.random() * 90,
        y: -10
      }]);
    }, 1000);

    const gameLoop = setInterval(() => {
      setStars(prev => {
        const newStars = prev.map(star => ({
          ...star,
          y: star.y + 2
        }));

        // Check for collisions
        newStars.forEach(star => {
          if (Math.abs(star.x - position.x) < 10 && Math.abs(star.y - position.y) < 10) {
            setScore(s => s + 1);
            newStars.splice(newStars.indexOf(star), 1);
          }
        });

        // Game over if stars reach bottom
        if (newStars.some(star => star.y > 100)) {
          setGameOver(true);
        }

        return newStars.filter(star => star.y <= 100);
      });
    }, 50);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearInterval(spawnStar);
      clearInterval(gameLoop);
    };
  }, [position, gameOver]);

  const resetGame = () => {
    setStars([]);
    setScore(0);
    setGameOver(false);
    setMessage("");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl p-8 shadow-lg">
      <div className="text-center mb-4">
        <h2 className={`text-3xl font-bold ${theme.text} mb-2`}>Star Catcher</h2>
        <p className="text-lg">Score: {score}</p>
      </div>

      {message && (
        <div className={`text-center mb-4 p-4 ${theme.light} rounded-lg text-lg font-medium ${theme.text}`}>
          {message}
        </div>
      )}

      <div 
        id="game-area"
        className={`relative ${theme.light} w-full h-[400px] rounded-lg overflow-hidden cursor-none`}
      >
        {stars.map(star => (
          <Star
            key={star.id}
            className={`absolute ${theme.text} w-8 h-8`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
            }}
          />
        ))}
        
        <div
          className={`absolute ${theme.primary} w-16 h-16 rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2`}
          style={{
            left: `${position.x}%`,
            top: `${position.y}%`,
          }}
        >
          <Star className="w-8 h-8 text-white" />
        </div>
      </div>

      {gameOver && (
        <div className="text-center mt-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Game Over!</h3>
          <p className="mb-4">You caught {score} stars!</p>
          <button
            onClick={resetGame}
            className={`px-6 py-2 ${theme.primary} text-white rounded-lg ${theme.hover} transition-colors`}
          >
            Play Again
          </button>
        </div>
      )}

      <div className="mt-4 text-center text-gray-600">
        Move your mouse to catch the falling stars!
      </div>
    </div>
  );
}