import React, { useState, useEffect } from 'react';
import { Heart, Star, Music, Coffee, Sun, Moon } from 'lucide-react';

const icons = [Heart, Star, Music, Coffee, Sun, Moon];

type Card = {
  id: number;
  icon: typeof Heart;
  isFlipped: boolean;
  isMatched: boolean;
};

export default function MemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const duplicatedIcons = [...icons, ...icons];
    const shuffledCards = duplicatedIcons
      .sort(() => Math.random() - 0.5)
      .map((Icon, index) => ({
        id: index,
        icon: Icon,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatches(0);
    setMoves(0);
  };

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2) return;
    if (cards[id].isMatched) return;
    if (flippedCards.includes(id)) return;

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlippedCards;
      if (cards[first].icon === cards[second].icon) {
        newCards[first].isMatched = true;
        newCards[second].isMatched = true;
        setCards(newCards);
        setMatches(m => m + 1);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          newCards[first].isFlipped = false;
          newCards[second].isFlipped = false;
          setCards(newCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-pink-600 mb-4">Love Letter Match</h2>
        <div className="flex justify-center gap-8">
          <p className="text-lg">Moves: {moves}</p>
          <p className="text-lg">Matches: {matches}/{icons.length}</p>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`aspect-square rounded-xl transition-all duration-300 ${
              card.isFlipped || card.isMatched
                ? 'bg-pink-500 text-white'
                : 'bg-gray-200'
            }`}
          >
            {(card.isFlipped || card.isMatched) && (
              <card.icon className="w-8 h-8 mx-auto" />
            )}
          </button>
        ))}
      </div>
      <button
        onClick={initializeGame}
        className="mt-8 px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors mx-auto block"
      >
        New Game
      </button>
    </div>
  );
}