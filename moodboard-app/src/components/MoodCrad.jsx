import React, { useEffect, useRef, useState } from "react";
import sad1 from "../assets/sad/sad1.mp4";
import sad2 from "../assets/sad/sad2.mp4";
import sad3 from "../assets/sad/sad3.mp4";
import happy1 from "../assets/happy/happy1.mp4"
import happy2 from '../assets/happy/happy2.mp4'
import happy3 from '../assets/happy/happy3.mp4'



const sadVd = [sad1, sad2, sad3];
const happyvs=[happy1,happy2,happy3]
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
  useEffect(() => {
    if (mood.toLowerCase() === "happy") {
      const randomIndex = Math.floor(Math.random() * happyvs.length);
      setVideoSrc(happyvs[randomIndex]);
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
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 sm:p-6 m-2 rounded-2xl shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg transition hover:shadow-xl">
      <div className="flex justify-between items-start">
        <span className="text-3xl sm:text-4xl">{emoji}</span>
        <button
          onClick={() => onDelete(id)}
          className="text-red-500 font-bold text-lg sm:text-xl hover:scale-110 transition"
          title="Delete Entry"
        >
          ×
        </button>
      </div>

      <h3 className="text-base sm:text-lg font-semibold mt-2">{mood}</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {new Date(timestamp).toLocaleString()}
      </p>

      {note && (
        <div className="mt-3 text-sm text-gray-800 dark:text-gray-200">
          <strong className="block text-gray-500 dark:text-gray-400">
            Note:{note}
          </strong>
          
        </div>
      )}

      {videoSrc && (
        <div className="relative mt-4 aspect-video w-full h-60 rounded-xl overflow-hidden">
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
            className="absolute top-2 right-2 bg-black/50 text-white rounded-full px-3 py-1 text-sm hover:bg-black/70 transition"
          >
            {isPlaying ? "❚❚" : "▶️"}
          </button>
        </div>
      )}
    </div>
  );
};

export default MoodCard;
