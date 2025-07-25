import React, { useState, useEffect } from "react";
import sampleMoods from "../utils/ModelColor";
import MoodCard from "./MoodCrad";

const MoodSelector = () => {
  const [moodEntries, setMoodEntries] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null);
  const [situation, setSituation] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("moodEntries");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setMoodEntries(parsed);
        }
      } catch (err) {
        console.error("Error parsing localStorage:", err);
        localStorage.removeItem("moodEntries");
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("moodEntries", JSON.stringify(moodEntries));
    }
  }, [moodEntries, isLoaded]);

  const handleMoodClick = (moodName) => {
    setSelectedMood(moodName);
  };

  const handleAddMoodEntry = (e) => {
    e.preventDefault();
    const matchedMood = sampleMoods.find((m) => m.mood === selectedMood);
    if (matchedMood) {
      const entry = {
        ...matchedMood,
        id: Date.now(),
        timestamp: new Date().toISOString(),
        note: situation,
      };
      setMoodEntries((prev) => [entry, ...prev]);
      setSelectedMood(null);
      setSituation("");
    }
  };

  const handleCancelSelection = () => {
    setSelectedMood(null);
    setSituation("");
  };

  const handleDeleteMood = (idToDelete) => {
    setMoodEntries((prev) => prev.filter((entry) => entry.id !== idToDelete));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-100 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300 text-gray-800 dark:text-gray-100">
      <header className="text-center py-10">
        <h1 className="text-5xl font-bold mb-2 text-purple-600 dark:text-purple-300">MoodBoard</h1>
   <p className="text-lg text-gray-500 dark:text-gray-400 text-center">
Lift your vibe up ♨♨
</p>

      </header>

      <main className="flex flex-col items-center justify-center px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-4xl w-full mb-10">
          {sampleMoods.map(({ mood, emoji, color }) => (
            <button
              key={mood}
              className="rounded-xl p-4 shadow-md transition transform hover:scale-105 hover:shadow-xl text-white font-semibold"
              style={{ backgroundColor: color }}
              onClick={() => handleMoodClick(mood)}
            >
              <span className="text-xl">{emoji}</span> {mood}
            </button>
          ))}
        </div>

        {selectedMood && (
          <form
            onSubmit={handleAddMoodEntry}
            className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg mb-10 relative animate-fadeIn"
          >
            <button
              onClick={handleCancelSelection}
              type="button"
              className="absolute top-2 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold"
            >
              ×
            </button>
            <h2 className="text-lg font-semibold mb-4">
              You selected <span className="text-blue-600 dark:text-blue-400">{selectedMood}</span>
            </h2>
            <textarea
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              rows="4"
              placeholder="Describe your current situation..."
              className="w-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 rounded px-3 py-2 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              type="submit"
              className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition"
            >
              Save Entry
            </button>
          </form>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl px-4">
          {moodEntries.map(({ id, emoji, mood, timestamp, note }) => (
            <MoodCard
              key={id}
              emoji={emoji}
              mood={mood}
              timestamp={timestamp}
              note={note}
              id={id}
              onDelete={handleDeleteMood}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default MoodSelector;
