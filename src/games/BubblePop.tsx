import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

const loveMessages = [
  "You're popping with love! 💖",
  "Bubble master extraordinaire! 💝",
  "Keep the love flowing! 💕",
  "You're absolutely amazing! 💗",
  "Love bubbles everywhere! 💓"
];

export default function BubblePop({ theme }: { theme: any }) {
  const [bubbles, setBubbles] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
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

    const interval = setInterval(() => {
      setBubbles(prev => {
        if (prev.length >= 15) {
          setGameOver(true);
          return prev;
        }
        return [...prev, {
          id: Date.now(),
          x: Math.random() * 90,
          y: 100 + Math.random() * 20,
          size: 30 + Math.random() * 40
        }];
      });
    }, 1000);

    const moveInterval = setInterval(() => {
      setBubbles(prev => prev.map(bubble => ({
        ...bubble,
        y: bubble.y - 0.5
      })).filter(bubble => bubble.y > -20));
    }, 50);

    return () => {
      clearInterval(interval);
      clearInterval(moveInterval);
    };
  }, [gameOver]);

  const popBubble = (id: number) => {
    setBubbles(prev => prev.filter(bubble => bubble.id !== id));
    setScore(prev => prev + 1);
  };

  const resetGame = () => {
    setBubbles([]);
    setScore(0);
    setGameOver(false);
    setMessage("");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl p-8 shadow-lg">
      <div className="text-center mb-4">
        <h2 className={`text-3xl font-bold ${theme.text} mb-2`}>Bubble Pop</h2>
        <p className="text-lg">Score: {score}</p>
      </div>

      {message && (
        <div className={`text-center mb-4 p-4 ${theme.light} rounded-lg text-lg font-medium ${theme.text}`}>
          {message}
        </div>
      )}

      <div className={`relative ${theme.light} w-full h-[500px] rounded-lg overflow-hidden`}>
        {bubbles.map(bubble => (
          <button
            key={bubble.id}
            onClick={() => popBubble(bubble.id)}
            className={`absolute ${theme.primary} rounded-full transition-transform hover:scale-110 flex items-center justify-center`}
            style={{
              left: `${bubble.x}%`,
              bottom: `${bubble.y}%`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
            }}
          >
            <Heart className="text-white w-1/2 h-1/2" />
          </button>
        ))}
      </div>

      {gameOver && (
        <div className="text-center mt-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Game Over!</h3>
          <p className="mb-4">You popped {score} bubbles!</p>
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