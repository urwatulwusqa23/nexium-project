"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

const moodEmojis = ["😔", "😊", "😡", "😫", "😐", "😎", "😎"];
const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

const videos = [
  {
    id: "2OEL4P1Rz04",
    title: "Relaxing Nature",
  },
  {
    id: "5yx6BWlEVcY",
    title: "Peaceful Piano",
  },
  {
    id: "DWcJFNfaw9c",
    title: "Deep Focus Music",
  },
  {
    id: "y8Yv4pnO7qc",
    title: "Soothing Rain Sounds",
  },
];
const guides = [
  {
    title: "Deep Breathing Guide",
    link: "https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/breathing-exercises-for-stress/",
    image: "/breathing.jpg",
  },
  {
    title: "Sleep Hygiene Tips",
    link: "https://www.sleepfoundation.org/sleep-hygiene",
    image: "/sleep.jpg",
  },
  {
    title: "Mindfulness for Beginners",
    link: "https://www.mayoclinic.org/healthy-lifestyle/consumer-health/in-depth/mindfulness-exercises/art-20046356",
    image: "/mindfulness.jpg",
  },
  {
    title: "Overcoming Anxiety",
    link: "https://believehim.org/how-to-come-out-of-anxieties-worries-and-the-fear/?gad_source=1&gad_campaignid=16827367332&gbraid=0AAAAAC1H534lBID0g-EA25SMsLC_cefpw&gclid=CjwKCAjw7rbEBhB5EiwA1V49nX5nccWtmwS2KwmFUVYd-EH8viMnHElNh23c0zCJH9-oe7FZ1CpdmxoCweQQAvD_BwE",
    image: "/anxiety.jpg",
  },
  {
    title: "Overcoming Stress",
    link: "https://www.medicalnewstoday.com/articles/145855#types",
    image: "/stress.jpg",
  },
];

export default function Dashboard() {
  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");
  const [day, setDay] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  const submitMood = async () => {
    await fetch("/api/mood", {
      method: "POST",
      body: JSON.stringify({ user: user?.email, mood, note, day }),
    });
    alert("Mood submitted!");
  };

  return (
    <div className="min-h-screen  p-6 font-sans " style={{ backgroundImage: "url('/Images/bg2.jpg')" }}>
      <div className=" text-black bg-[#db8dc9] rounded-xl px-6 py-4 text-xl font-bold w-fit mb-6">
        Welcome {user?.email?.split("@")[0] || "Guest"}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Weekly Mood */}
        <div className="bg-[#e2d1f9] rounded-xl p-4">
          <h2 className="text-xl font-semibold mb-1 text-black">Weekly Mood</h2>
          <div className="flex justify-between gap-x-1">
            {moodEmojis.map((emoji, index) => (
              <div key={index} className="flex flex-col items-center gap-7">
                <span className="text-5xl">{emoji}</span>
                <span className="text-s font-medium text-black">
                  {days[index]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Mood Input */}
        <div className="bg-[#db8dc9] rounded-xl p-4">
          <h2 className="text-lg font-semibold mb-1 text-black">
            How do you feel today?
          </h2>
          <select
            className="w-full mb-1 p-2 rounded-md text-black text-sm"
            onChange={(e) => setMood(e.target.value)}
          >
            <option>Feeling</option>
            <option>Happy</option>
            <option>Sad</option>
            <option>Angry</option>
            <option>Neutral</option>
          </select>
          <textarea
            className="w-full p-2 rounded-md text-black text-sm mb-1"
            rows={2}
            placeholder="Describe"
            onChange={(e) => setNote(e.target.value)}
          />
          <button
            onClick={submitMood}
            className="w-full bg-black text-white text-sm py-1.5 rounded-md"
          >
            Submit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Actions */}
        <div className="bg-[#e2d1f9] rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-black">Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/Journal"
              className="flex flex-col items-center cursor-pointer"
            >
              <img
                src="/Images/Journal.jpg"
                alt="Meditate"
                className="h-[102px] rounded-md"
              />
              <span className="mt-2 text-sm font-medium text-black">
                Journal
              </span>
            </Link>

            <Link
              href="/food"
              className="flex flex-col items-center cursor-pointer"
            >
              <img
                src="/food.jpg"
                alt="Food"
                className="h-[102px] rounded-md"
              />
              <span className="mt-2 text-sm font-medium text-black">Food</span>
            </Link>

            <Link
              href="/Sleep"
              className="flex flex-col items-center cursor-pointer"
            >
              <img
                src="/slepp.jpg"
                alt="Sleep"
                className="h-[102px] rounded-md"
              />
              <span className="mt-2 text-sm font-medium text-black">Sleep</span>
            </Link>

            <Link
              href="/workout"
              className="flex flex-col items-center cursor-pointer"
            >
              <img
                src="/workout.jpg"
                alt="Workout"
                className="h-[102px] rounded-md"
              />
              <span className="mt-2 text-sm font-medium text-black">
                Workout
              </span>
            </Link>
          </div>
        </div>

        {/* Quote Widget */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-xl min-h-[220px] p-4">
          <div className="bg-white rounded-2xl overflow-hidden shadow-xl h-full p-0">
  <iframe
    src="https://nexium-urwa-assign1-git-main-urwatulwusqa23s-projects.vercel.app"
    className="w-full h-full min-h-[300px] rounded-2xl border-none"
    allow="clipboard-write"
    style={{ minHeight: '300px', height: '100%' }}
  />
</div>
        </div>
      </div>

      {/* Videos */}
      <div className="bg-white p-4 rounded-xl mb-6">
        <h2 className="text-lg font-semibold mb-2 text-black">
          Recommended Videos for You
        </h2>
        <div className="flex flex-wrap gap-4">
          {videos.map((video) => (
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
              <p className="text-xs mt-1">{video.title}</p>
            </div>
          ))}
        </div>
      </div>

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

      <div className="bg-white p-4 rounded-xl mb-4">
        <h2 className="text-xl font-bold mb-2 text-black">Helpful Guides</h2>
        <div className="flex flex-wrap gap-4 justify-between">
          {guides.map((guide, index) => (
            <a
              key={index}
              href={guide.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-[18%] block cursor-pointer hover:scale-105 transition-transform"
            >
              <img
                src={guide.image}
                alt={guide.title}
                className="w-full h-32 object-cover rounded-xl"
              />
              <p className="text-xs mt-1 text-black text-center">
                {guide.title}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
