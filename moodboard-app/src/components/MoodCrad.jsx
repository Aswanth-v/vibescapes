import React, { useState } from 'react';

const MoodCard = ({ emoji, mood, timestamp, note }) => {
  const [card, setCard] = useState(true);

  if (!card) return null;  

  return (
    <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow ">
    <div className='flex justify-end'>  <button onClick={() => setCard(false)} >x</button></div>
      <div className="text-3xl">{emoji}</div>
      <h3 className="text-lg font-bold mt-2">{mood}</h3>
      <p className="text-sm text-gray-500">{new Date(timestamp).toLocaleString()}</p>
      {note && (
        <p className="mt-2 text-gray-800 dark:text-gray-100">
          <strong>Situation:</strong> {note}
        </p>
      )}
    </div>
  );
};

export default MoodCard;
