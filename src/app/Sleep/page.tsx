'use client';

import React, { useState } from 'react';
import './sleepPage.css'; // Ensure this file exists

const SleepPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);

  const sleepHygieneTips: string[] = [
    "Maintain a consistent sleep schedule",
    "Keep your bedroom cool, dark, and quiet",
    "Invest in a comfortable mattress and pillows",
    "Avoid caffeine and heavy meals before bedtime",
    "Limit daytime naps to 20-30 minutes"
  ];

  const meditationSteps: string[] = [
    "Find a comfortable position in bed",
    "Close your eyes and take deep breaths",
    "Focus on your breathing for 5 minutes",
    "Gradually relax each part of your body from toes to head",
    "If your mind wanders, gently return focus to your breath"
  ];

  const noScreenTips: string[] = [
    "Read a physical book instead of e-books",
    "Try journaling or writing down thoughts",
    "Practice gentle stretching or yoga",
    "Listen to an audiobook or podcast",
    "Prepare for the next day to clear your mind"
  ];

  const audioOptions = [
    { label: 'Rain Sounds', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { label: 'White Noise', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    { label: 'Brown Noise', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
    { label: 'Ocean Waves', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
    { label: 'Forest Sounds', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' }
  ];

  const playAudio = (src: string) => {
    if (currentAudio === src) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentAudio(src);
      setIsPlaying(true);
    }
  };

  const toggleSection = (section: string) => {
    if (activeSection === section) {
      setActiveSection(null);
    } else {
      setActiveSection(section);
    }
  };

  return (
    <div className="sleep-page">
      <h1>Sleep Tips & Activities</h1>
      
      <div className="sleep-tip-card" onClick={() => toggleSection('music')}>
        <div className="tip-header">
          <span>🌙</span>
          <h2>Listen to calming music</h2>
        </div>
        {activeSection === 'music' && (
          <div className="tip-content">
            <h3>Select a Sound:</h3>
            <ul>
              {audioOptions.map((audio, index) => (
                <li key={index}>
                  <button className="play-button" onClick={() => playAudio(audio.src)}>
                    {isPlaying && currentAudio === audio.src ? '❚❚' : '▶'} {audio.label}
                  </button>
                </li>
              ))}
            </ul>
            {isPlaying && currentAudio && (
              <div className="audio-player">
                <p>Playing {audioOptions.find(option => option.src === currentAudio)?.label}...</p>
                <audio src={currentAudio} autoPlay loop />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="sleep-tip-card" onClick={() => toggleSection('hygiene')}>
        <div className="tip-header">
          <span>🛌</span>
          <h2>Follow sleep hygiene</h2>
        </div>
        {activeSection === 'hygiene' && (
          <div className="tip-content">
            <h3>Good Sleep Hygiene Practices:</h3>
            <ul>
              {sleepHygieneTips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="sleep-tip-card" onClick={() => toggleSection('meditation')}>
        <div className="tip-header">
          <span>🕯️</span>
          <h2>Night meditation routine</h2>
        </div>
        {activeSection === 'meditation' && (
          <div className="tip-content">
            <h3>5-Minute Bedtime Meditation:</h3>
            <ol>
              {meditationSteps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
            <button className="start-button">Start Guided Meditation</button>
          </div>
        )}
      </div>

      <div className="sleep-tip-card" onClick={() => toggleSection('screens')}>
        <div className="tip-header">
          <span>📴</span>
          <h2>Avoid screens 1 hour before sleep</h2>
        </div>
        {activeSection === 'screens' && (
          <div className="tip-content">
            <h3>Why avoid screens?</h3>
            <p>Blue light from devices suppresses melatonin production, making it harder to fall asleep.</p>
            <h3>Alternative activities:</h3>
            <ul>
              {noScreenTips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SleepPage;
