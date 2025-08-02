"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

const SidebarLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const logout = () => {
    router.push("/signup");
  };

  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-[#eed1ee] flex flex-col justify-between">
        <div className="pt-6">
          <h1 className="text-xl font-bold text-black text-center mb-10">🧘‍♂️ Moodify</h1>
          <nav className="flex flex-col gap-3 px-2">
            <Link
              href="/dashboard"
              className="block w-full px-4 py-3 rounded-md border border-gray-300 bg-white text-black font-medium hover:bg-purple-100 hover:text-purple-700 transition"
            >
              🏠 Home
            </Link>
            <Link
              href="/Sleep"
              className="block w-full px-4 py-3 rounded-md border border-gray-300 bg-white text-black font-medium hover:bg-purple-100 hover:text-purple-700 transition"
            >
              🌙 Sleep
            </Link>
            <Link
              href="/food"
              className="block w-full px-4 py-3 rounded-md border border-gray-300 bg-white text-black font-medium hover:bg-purple-100 hover:text-purple-700 transition"
            >
              🍎 Food
            </Link>
            <Link
              href="/workout"
              className="block w-full px-4 py-3 rounded-md border border-gray-300 bg-white text-black font-medium hover:bg-purple-100 hover:text-purple-700 transition"
            >
              💪 Workout
            </Link>
            <Link
              href="/Journal"
              className="block w-full px-4 py-3 rounded-md border border-gray-300 bg-white text-black font-medium hover:bg-purple-100 hover:text-purple-700 transition"
            >
             📖  Journal
            </Link>
          </nav>
        </div>

        <div className="px-2 pb-6">
          <button
            onClick={logout}
            className="w-full bg-[#ffcccc] text-sm px-4 py-3 rounded-md text-black hover:bg-[#ffb3b3] transition"
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-white overflow-y-auto">{children}</div>
    </div>
  );
};

export default SidebarLayout;
