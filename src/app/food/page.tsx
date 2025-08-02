'use client';

import React from 'react';
import SidebarLayout from "@/components/SidebarLayout";
const FoodPage = () => {
  const foodTips = [
    {
      title: 'Balanced Diet',
      image: '/Images/balancedDiet.jpg',
      link: 'https://www.who.int/news-room/fact-sheets/detail/healthy-diet',
    },
    {
      title: 'Mindful Eating',
      image: '/food-mindful.jpg',
      link: 'https://www.healthline.com/nutrition/mindful-eating-guide',
    },
    {
      title: 'Meal Planning',
      image: '/food-mealplan.jpg',
      link: 'https://www.eatright.org/food/planning-and-prep/planning-ahead/meal-planning',
    },
    {
      title: 'Hydration Tips',
      image: '/Hydration Tips.jpg',
      link: 'https://www.cdc.gov/healthyweight/healthy_eating/water-and-healthier-drinks.html',
    },
  ];

  return (
    <SidebarLayout>
    <div className="min-h-screen bg-[url('/Images/food-bg.jpg')] bg-cover bg-center p-4 md:p-10">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Heading */}
        <div className="bg-[#fce1e4] rounded-xl p-6 text-black">
          <h1 className="text-2xl font-bold mb-2">Nourish Your Body</h1>
          <p className="text-sm">Explore tips, guides, and resources for a healthier food lifestyle.</p>
        </div>

        {/* Grid of Food Tips */}
        <div className="bg-[#fff5d7] rounded-xl p-4 text-black">
          <h2 className="text-lg font-semibold mb-4">Explore Food Guides</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {foodTips.map((tip, index) => (
              <a
                key={index}
                href={tip.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl p-2 hover:scale-105 transition-transform text-center"
              >
                <img src={tip.image} alt={tip.title} className="rounded-lg h-24 w-full object-cover" />
                <p className="mt-2 text-sm font-medium">{tip.title}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Additional Section - Daily Healthy Eating Tip */}
        <div className="bg-[#d1f2eb] rounded-xl p-4 text-black">
          <h2 className="text-base font-semibold mb-2">Daily Tip</h2>
          <p className="text-sm">
            Start your day with a fiber-rich breakfast. Oats, fruits, and nuts can keep you full and energized.
          </p>
        </div>
      </div>
    </div>
    </SidebarLayout>
  );
};

export default FoodPage;
