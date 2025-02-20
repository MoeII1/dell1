import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

const loveWords = [
  { word: "ROMANCE", scrambled: "CEMANOR" },
  { word: "HEARTS", scrambled: "THASER" },
  { word: "KISSES", scrambled: "SSEKIS" },
  { word: "CUPID", scrambled: "DIPCU" },
  { word: "FOREVER", scrambled: "REVEROF" },
  { word: "DARLING", scrambled: "GLINDAR" },
  { word: "SWEETHEART", scrambled: "SWEETHRAT" },
  { word: "ADORE", scrambled: "ROADE" },
  { word: "CHERISH", scrambled: "HRISCHE" },
  { word: "BELOVED", scrambled: "DBELOVE" }
];

const loveMessages = [
  "You're so clever! 💖",
  "Word wizard! 💝",
  "Amazing job! 💕",
  "You're brilliant! 💗",
  "Keep going, superstar! 💓"
];

export default function LoveQuiz({ theme }: { theme: any }) {
  const [currentWord, setCurrentWord] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (score > 0 && score % 5 === 0) {
      const randomMessage = loveMessages[Math.floor(Math.random() * loveMessages.length)];
      setMessage(randomMessage);
      setTimeout(() => setMessage(""), 3000);
    }
  }, [score]);

  const checkAnswer = () => {
    if (userInput.toUpperCase() === loveWords[currentWord].word) {
      setScore(score + 1);
      setUserInput("");
      setShowHint(false);
      if (currentWord < loveWords.length - 1) {
        setCurrentWord(currentWord + 1);
      } else {
        setCurrentWord(0);
      }
    }
  };

  const resetGame = () => {
    setCurrentWord(0);
    setUserInput("");
    setScore(0);
    setMessage("");
    setShowHint(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl p-8 shadow-lg">
      <div className="text-center mb-8">
        <h2 className={`text-3xl font-bold ${theme.text} mb-2`}>Love Word Scramble</h2>
        <p className="text-lg">Score: {score}</p>
      </div>

      {message && (
        <div className={`text-center mb-4 p-4 ${theme.light} rounded-lg text-lg font-medium ${theme.text}`}>
          {message}
        </div>
      )}

      <div className={`${theme.light} p-8 rounded-lg text-center`}>
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4">{loveWords[currentWord].scrambled}</h3>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value.toUpperCase())}
            className="w-full max-w-md px-4 py-2 text-xl text-center border-2 rounded-lg focus:outline-none focus:border-pink-500"
            placeholder="Type your answer..."
          />
        </div>

        <div className="flex flex-col items-center gap-4">
          <button
            onClick={checkAnswer}
            className={`px-6 py-2 ${theme.primary} text-white rounded-lg ${theme.hover} transition-colors`}
          >
            Check Answer
          </button>
          
          <button
            onClick={() => setShowHint(true)}
            className={`px-6 py-2 ${theme.secondary} ${theme.text} rounded-lg hover:opacity-80 transition-colors`}
          >
            Show Hint
          </button>

          {showHint && (
            <p className={`mt-4 ${theme.text}`}>
              First letter: {loveWords[currentWord].word[0]}
              <br />
              Letters: {loveWords[currentWord].word.length}
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={resetGame}
          className={`px-6 py-2 ${theme.primary} text-white rounded-lg ${theme.hover} transition-colors`}
        >
          Start Over
        </button>
      </div>
    </div>
  );
}