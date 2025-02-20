import React, { useState, useEffect, useRef } from 'react';
import { Heart } from 'lucide-react';

const loveMessages = [
  "You're doing amazing! 💖",
  "Keep spreading the love! 💝",
  "You're a heart-catching pro! 💕",
  "Love is in the air! 💗",
  "You're absolutely wonderful! 💓"
];

export default function HeartCatcher({ theme }: { theme: any }) {
  const [position, setPosition] = useState(50);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [message, setMessage] = useState("");
  const gameAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (score > 0 && score % 5 === 0) {
      const randomMessage = loveMessages[Math.floor(Math.random() * loveMessages.length)];
      setMessage(randomMessage);
      setTimeout(() => setMessage(""), 3000);
    }
  }, [score]);

  const moveLeft = () => {
    setPosition(p => Math.max(0, p - 5));
  };

  const moveRight = () => {
    setPosition(p => Math.min(90, p + 5));
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver) return;
      if (e.key === 'ArrowLeft') moveLeft();
      if (e.key === 'ArrowRight') moveRight();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameOver]);

  useEffect(() => {
    if (gameOver) return;

    const spawnHeart = setInterval(() => {
      setHearts(prev => [
        ...prev,
        { id: Date.now(), x: Math.random() * 90, y: 0 }
      ]);
    }, 2000);

    const gameLoop = setInterval(() => {
      setHearts(prev => {
        const newHearts = prev.map(heart => ({
          ...heart,
          y: heart.y + 2
        }));

        newHearts.forEach(heart => {
          if (Math.abs(heart.x - position) < 10 && heart.y > 80) {
            setScore(s => s + 1);
          }
        });

        const filtered = newHearts.filter(heart => heart.y < 100);
        
        if (filtered.length < newHearts.length) {
          setGameOver(true);
          setHighScore(prev => Math.max(prev, score));
        }

        return filtered;
      });
    }, 50);

    return () => {
      clearInterval(spawnHeart);
      clearInterval(gameLoop);
    };
  }, [position, gameOver, score]);

  const resetGame = () => {
    setScore(0);
    setHearts([]);
    setGameOver(false);
    setPosition(50);
    setMessage("");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl p-8 shadow-lg">
      <div className="text-center mb-4">
        <h2 className={`text-3xl font-bold ${theme.text} mb-2`}>Heart Catcher</h2>
        <p className="text-lg">Score: {score} | High Score: {highScore}</p>
      </div>

      {message && (
        <div className={`text-center mb-4 p-4 ${theme.light} rounded-lg text-lg font-medium ${theme.text}`}>
          {message}
        </div>
      )}

      <div 
        ref={gameAreaRef}
        className={`relative ${theme.light} w-full h-[400px] rounded-lg overflow-hidden border-2 ${theme.secondary}`}
      >
        {hearts.map(heart => (
          <Heart
            key={heart.id}
            className={`absolute ${theme.text} w-8 h-8`}
            style={{
              left: `${heart.x}%`,
              top: `${heart.y}%`,
            }}
          />
        ))}
        
        <div
          className="absolute bottom-0 w-20 h-20 flex items-center justify-center"
          style={{ left: `${position}%` }}
        >
          <div className={`w-16 h-16 rounded-full ${theme.primary} flex items-center justify-center`}>
            <svg viewBox="0 0 100 100" className="w-12 h-12 text-white">
              <circle cx="50" cy="35" r="20" fill="currentColor"/> {/* Head */}
              <rect x="35" y="55" width="30" height="40" rx="15" fill="currentColor"/> {/* Body */}
              <circle cx="40" cy="32" r="4" fill="white"/> {/* Left eye */}
              <circle cx="60" cy="32" r="4" fill="white"/> {/* Right eye */}
              <path d="M 45 40 Q 50 45 55 40" stroke="white" strokeWidth="3" fill="none"/> {/* Smile */}
            </svg>
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
          <button
            onClick={moveLeft}
            className={`${theme.primary} text-white p-4 rounded-full ${theme.hover}`}
          >
            ←
          </button>
          <button
            onClick={moveRight}
            className={`${theme.primary} text-white p-4 rounded-full ${theme.hover}`}
          >
            →
          </button>
        </div>
      </div>

      {gameOver && (
        <div className="text-center mt-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Game Over!</h3>
          <button
            onClick={resetGame}
            className={`px-6 py-2 ${theme.primary} text-white rounded-lg ${theme.hover} transition-colors`}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}