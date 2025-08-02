'use client';

import React, { useState } from 'react';
import SidebarLayout from "@/components/SidebarLayout";

const workoutVideos = [
  { id: 'VaoV1PrYft4', title: '10-Min Full Body Stretch' },
  { id: 'ml6cT4AZdqI', title: 'Beginner Cardio at Home' },
  { id: 'UoC_O3HzsH0', title: 'No Equipment HIIT Workout' },
  { id: 'eQNZwW4aB0E', title: '20-Min Morning Yoga' },
];

const guides = [
  {
    title: 'Full-Body Home Plan',
    link: 'https://www.example.com/fullbody',
    image: '/fullbody.jpg',
  },
  {
    title: 'Posture Correction',
    link: 'https://www.example.com/posture',
    image: '/posture.jpg',
  },
  {
    title: 'Pre-Workout Nutrition',
    link: 'https://www.example.com/nutrition',
    image: '/nutrition.jpg',
  },
  {
    title: 'Stretching 101',
    link: 'https://www.example.com/stretching',
    image: '/stretch.jpg',
  },
];

export default function WorkoutPage() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <SidebarLayout>
    <div
      className="min-h-screen bg-cover bg-center p-4 md:p-10"
      style={{ backgroundImage: `url('/images/workout-bg.jpg')` }}
    >
      {/* Overlay */}
      <div className="bg-white/80 p-4 md:p-8 rounded-3xl backdrop-blur-md shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-black">Workout Zone</h1>

        {/* Workout Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 text-center shadow hover:scale-105 transition">
            <img src="/yoga.jpg" className="w-12 mx-auto mb-2" />
            <p className="text-black font-medium">Yoga</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow hover:scale-105 transition">
            <img src="/cardio.jpg" className="w-12 mx-auto mb-2" />
            <p className="text-black font-medium">Cardio</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow hover:scale-105 transition">
            <img src="/strength.jpg" className="w-12 mx-auto mb-2" />
            <p className="text-black font-medium">Strength</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow hover:scale-105 transition">
            <img src="/stretch.jpg" className="w-12 mx-auto mb-2" />
            <p className="text-black font-medium">Stretch</p>
          </div>
        </div>

        {/* Workout Videos */}
        <div className="bg-white p-4 rounded-xl mb-6">
          <h2 className="text-lg font-semibold mb-2 text-black">Workout Videos</h2>
          <div className="flex flex-wrap gap-4">
            {workoutVideos.map((video) => (
              <div
                key={video.id}
                className="w-[45%] md:w-[23%] cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setSelectedVideo(video.id)}
              >
                <iframe
                  className="rounded-xl w-full h-32"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <p className="text-xs mt-1 text-black">{video.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Now Playing */}
        {selectedVideo && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-black">Now Playing</h3>
            <iframe
              className="rounded-xl w-full h-64"
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
              title="Selected Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {/* Guide Section */}
        <div className="bg-white p-4 rounded-xl mb-6">
          <h2 className="text-lg font-semibold mb-2 text-black">Workout Guides</h2>
          <div className="flex flex-wrap gap-4">
            {guides.map((guide, index) => (
              <a
                key={index}
                href={guide.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[45%] md:w-[23%] block cursor-pointer hover:scale-105 transition-transform"
              >
                <img
                  src={guide.image}
                  alt={guide.title}
                  className="w-full h-32 object-cover rounded-xl"
                />
                <p className="text-xs mt-1 text-black">{guide.title}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
    </SidebarLayout>
  );
}
