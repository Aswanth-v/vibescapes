import React, { useEffect, useRef, useState } from "react";
import sad1 from "../assets/sad/sad1.mp4";
import sad2 from "../assets/sad/sad2.mp4";
import sad3 from "../assets/sad/sad3.mp4";

const sadVd = [sad1, sad2, sad3];

const MoodCard = ({ emoji, mood, timestamp, note, id, onDelete }) => {
  const [videoSrc, setVideoSrc] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    if (mood.toLowerCase() === "sad") {
      const randomIndex = Math.floor(Math.random() * sadVd.length);
      setVideoSrc(sadVd[randomIndex]);
    }
  }, [mood]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl shadow-lg w-full max-w-md transition hover:shadow-xl">
      <div className="flex justify-between items-start">
        <span className="text-4xl">{emoji}</span>
        <button
          onClick={() => onDelete(id)}
          className="text-red-500 font-bold text-xl hover:scale-110 transition"
          title="Delete Entry"
        >
          ×
        </button>
      </div>

      <h3 className="text-lg font-semibold mt-2">{mood}</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {new Date(timestamp).toLocaleString()}
      </p>

      {note && (
        <div className="mt-3 text-sm text-gray-800 dark:text-gray-200">
          <strong className="block text-gray-500 dark:text-gray-400">Note:</strong>
          {note}
        </div>
      )}

      {videoSrc && (
        <div className="relative mt-4 aspect-video w-full rounded overflow-hidden">
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            loop
            playsInline
            muted={false}
            className="w-full h-full object-cover"
          />
          <button
            onClick={togglePlay}
            className="absolute top-2 right-2 bg-black/60 text-white rounded-full px-3 py-1 text-sm hover:bg-black/80 transition"
          >
            {isPlaying ? "❚❚" : "▶️"}
          </button>
        </div>
      )}
    </div>
  );
};

export default MoodCard;
