"use client";

import React, { useState } from "react";
import SidebarLayout from "@/components/SidebarLayout"; // Make sure this exists and is a valid component

const SleepPage: React.FC = () => {
  const [activeAudio, setActiveAudio] = useState<HTMLAudioElement | null>(null);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  const sounds = [
    {
      title: "Brown Noise",
      image: "/brown-noise.jpg",
      src: "/sounds/brown-noise-257801.mp3",
    },
    {
      title: "White Noise",
      image: "/white-noise.jpg",
      src: "sounds/white-noise-50127.mp3",
    },
    {
      title: "Nature Sounds",
      image: "/birds.jpg",
      src: "sounds/birds-19624.mp3",
    },
    {
      title: "Rain Sounds",
      image: "/rain.jpg",
      src: "/sounds/real-rain-sound-379215.mp3",
    },
    {
      title: "Calming River",
      image: "/river.jpg",
      src: "sounds/river-in-the-heart-of-nature_nature-sound-222599.mp3",
    },
  ];

  const playSound = (src: string) => {
    if (activeAudio) activeAudio.pause();
    const newAudio = new Audio(src);
    newAudio.loop = true;
    newAudio.play();
    setActiveAudio(newAudio);
  };

  const stopSound = () => {
    if (activeAudio) {
      activeAudio.pause();
      setActiveAudio(null);
    }
  };

  const startTimer = (minutes: number) => {
    const seconds = minutes * 60;
    setRemainingTime(seconds);

    const id = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          stopSound();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setTimerId(id);
  };

  const stopTimer = () => {
    if (timerId) clearInterval(timerId);
    setTimerId(null);
    setRemainingTime(0);
    stopSound();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <SidebarLayout>
      <div className="min-h-screen bg-[url('/sleep-bg.jpg')] bg-cover bg-center p-4 md:p-10 text-black">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="bg-[#e7dfff] rounded-xl p-6">
              <h1 className="text-2xl font-bold mb-2">Peaceful Sleep</h1>
              <p className="text-sm">
                Let calming sounds and sleep hygiene help you rest deeply.
              </p>
            </div>
            <div className="bg-[#faf3e0] rounded-xl p-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h1 className="text-xl font-bold mb-1">Sleep Timer</h1>
                <p className="text-sm">Set a timer to auto-stop the music</p>
              </div>
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => startTimer(5)}
                  className="bg-[#b0e0e6] px-3 py-1 rounded-lg text-sm"
                >
                  5 min
                </button>
                <button
                  onClick={() => startTimer(15)}
                  className="bg-[#b0e0e6] px-3 py-1 rounded-lg text-sm"
                >
                  15 min
                </button>
                <button
                  onClick={() => startTimer(30)}
                  className="bg-[#b0e0e6] px-3 py-1 rounded-lg text-sm"
                >
                  30 min
                </button>
                <button
                  onClick={stopTimer}
                  className="bg-[#ffb3b3] px-3 py-1 rounded-lg text-sm"
                >
                  Stop Timer
                </button>
              </div>
              {remainingTime > 0 && (
                <p className="text-sm font-semibold text-gray-700">
                  ⏱️ Time left: {formatTime(remainingTime)}
                </p>
              )}
            </div>
          </div>

          {/* Music Panel */}
          <div className="bg-[#f5f5dc] rounded-xl p-4">
            <h2 className="text-lg font-semibold mb-4">Soothing Sounds</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {sounds.map((sound, index) => (
                <button
                  key={index}
                  className="bg-white rounded-xl p-2 hover:scale-105 transition-transform"
                  onClick={() => playSound(sound.src)}
                >
                  <img
                    src={sound.image}
                    alt={sound.title}
                    className="rounded-lg h-24 w-full object-cover"
                  />
                  <p className="mt-2 text-sm font-medium text-center">
                    {sound.title}
                  </p>
                </button>
              ))}
            </div>
            {activeAudio && (
              <div className="mt-4 text-center">
                <button
                  onClick={stopSound}
                  className="bg-red-200 text-sm px-3 py-1 rounded-lg hover:bg-red-300"
                >
                  ⏹️ Stop Sound
                </button>
              </div>
            )}
          </div>

          {/* Bottom Section: Tips & Hygiene */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="bg-[#d1f2eb] rounded-xl p-4 flex-1">
              <h2 className="text-base font-semibold mb-2">Sleep Tips</h2>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Maintain a consistent sleep schedule.</li>
                <li>Avoid caffeine in the evening.</li>
                <li>Keep your bedroom dark and quiet.</li>
                <li>Put away screens 30 minutes before bed.</li>
              </ul>
            </div>

            <div className="bg-[#fcd5ce] rounded-xl p-4 flex-1">
              <h2 className="text-base font-semibold mb-2">Sleep Hygiene</h2>
              <p className="text-sm">
                Practicing good sleep hygiene helps regulate your body’s natural
                clock. Try setting a wind-down routine with relaxing activities
                like reading, stretching, or journaling.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default SleepPage;
  