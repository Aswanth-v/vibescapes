import React, { useState, useEffect } from "react";
import sampleMoods from "../utils/ModelColor";
import MoodCard from "./MoodCrad";

const MoodSelector = () => {
  const [moodEntries, setMoodEntries] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null);
  const [situation, setSituation] = useState("");
  const [isLoaded, setIsLoaded] = useState(false); // prevents overwriting on mount

  // ✅ Load from localStorage on first render
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

  // ✅ Save to localStorage only after initial load
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("moodEntries", JSON.stringify(moodEntries));
    }
  }, [moodEntries, isLoaded]);

  const handleMoodClick = (moodName) => {
    setSelectedMood(moodName);
  };

  const handleAddMoodEntry = (e) => {
    e.preventDefault(); // ✅ prevent default form submission if in form

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

  const Timer = ({ seconds }) => {
  // initialize timeLeft with the seconds prop
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft) return;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);

  return (
    <div>
      <h1>{timeLeft}</h1>
    </div>
  );
};


const handleDeleteMood = (idToDelete) => {
  setMoodEntries((prev) => prev.filter((entry) => entry.id !== idToDelete));
};
  return (
    <div className="min-h-screen bg-[var(--color-background-light)] dark:bg-[var(--color-background-dark)] transition-colors duration-300 text-gray-800 dark:text-gray-100">
      <header className="text-center py-10">
        <h1 className="text-4xl font-bold mb-2">🌈 MoodBoard</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400">
          Track your emotions visually
        </p>
      </header>

      <main className="flex flex-col items-center justify-center px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-4xl w-full mb-10">
          {sampleMoods.map(({ mood, emoji, color }) => (
            <button
              key={mood}
              className="rounded-lg p-4 shadow text-white font-semibold"
              style={{ backgroundColor: color }}
              onClick={() => handleMoodClick(mood)}
            >
              {emoji} {mood}
            </button>
          ))}
        </div>

        {selectedMood && (
          <form
            onSubmit={handleAddMoodEntry}
            className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-10 relative"
          >
            <button
              onClick={handleCancelSelection}
              type="button"
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-xl"
            >
              ×
            </button>
            <h2 className="text-lg font-semibold mb-2">
              You selected <span className="text-blue-600">{selectedMood}</span>
            </h2>
            <textarea
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              rows="4"
              placeholder="Describe your current situation..."
              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800 focus:outline-none focus:ring focus:border-blue-400"
            />
            <button
              type="submit"
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save Entry
            </button>
          </form>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
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
