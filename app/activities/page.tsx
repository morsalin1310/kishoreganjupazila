"use client";

import { useState } from "react";
import Image from "next/image";
import { Calendar, Images, MapPin, Sparkles, Award } from "lucide-react";

const pastEvents = [
  {
    title: "বার্ষিক পারিবারিক মিলনমেলা ও সাংস্কৃতিক সন্ধ্যা ২০২৫",
    date: "১৫ ডিসেম্বর, ২০২৫",
    venue: "উত্তরা অফিসার্স ক্লাব মিলনায়তন, ঢাকা",
    description: "ঢাকাস্থ কিশোরগঞ্জ উপজেলাবাসীর আনন্দঘন মিলনমেলা, স্মৃতিচারণ ও ঐতিহ্যবাহী পিঠা উৎসব।",
  },
  {
    title: "বিনামূল্যে ব্লাড গ্রুপিং ও স্বেচ্ছায় রক্তদান ক্যাম্প",
    date: "২৬ মার্চ, ২০২৫",
    venue: "সমিতির অস্থায়ী কার্যালয় প্রাঙ্গণ, উত্তরা",
    description: "স্বাধীনতা দিবস উপলক্ষে দেড় শতাধিক তরুণ-যুবকের রক্তের গ্রুপ নির্ণয় ও স্বেচ্ছায় রক্তদান।",
  },
  {
    title: "মেধাবী শিক্ষার্থী সংবর্ধনা ও বৃত্তি প্রদান অনুষ্ঠান",
    date: "১০ আগস্ট, ২০২৫",
    venue: "রমনা ইঞ্জিনিয়ার্স ইনস্টিটিউশন, ঢাকা",
    description: "এসএসসি ও এইচএসসিতে জিপিএ-৫ প্রাপ্ত কিশোরগঞ্জের কৃতি শিক্ষার্থীদের ক্রেস্ট ও বৃত্তি প্রদান।",
  },
];

const galleryImages = [
  { title: "মিলনমেলার স্মৃতিচারণ পর্ব", year: "২০২৫", category: "মিলনমেলা" },
  { title: "কৃতি ছাত্র-ছাত্রীদের সংবর্ধনা প্রদান", year: "২০২৫", category: "শিক্ষা" },
  { title: "রক্তদান ক্যাম্পের উদ্বোধন মুহূর্ত", year: "২০২৫", category: "ব্লাড ব্যাংক" },
  { title: "সাধারণ পরিষদের দ্বি-বার্ষিক নির্বাচন", year: "২০২৪", category: "সভা" },
  { title: "ইফতার ও দোয়া মাহফিল", year: "২০২৪", category: "ধর্মীয়" },
  { title: "কিশোরগঞ্জের কৃতি সন্তানদের সম্মাননা স্মারক", year: "২০২৪", category: "সম্মাননা" },
];

export default function ActivitiesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredGallery = galleryImages.filter(
    (img) => selectedCategory === "all" || img.category === selectedCategory
  );

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7] font-bangla">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-[#0B3B2C] text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#FBBF24]" />
            কার্যক্রম ও স্মৃতিকথা
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B3B2C]">
            সমিতির অনুষ্ঠান ও ফটো গ্যালারি
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-2">
            অতীতের সকল সুন্দর আয়োজন, মিলনমেলা ও সামাজিক সেবামূলক কর্মকাণ্ডের স্মরণীয় চিত্রগাথা।
          </p>
        </div>

        {/* Major Events */}
        <div>
          <h2 className="text-xl font-bold text-[#0B3B2C] mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#00A3E0]" />
            সাম্প্রতিক অনুষ্ঠান ও আয়োজন
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pastEvents.map((event, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 inline-block mb-3">
                    {event.date}
                  </span>
                  <h3 className="font-bold text-base text-slate-800 mb-2 leading-snug">
                    {event.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {event.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#00A3E0] shrink-0" />
                  <span className="line-clamp-1">{event.venue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Photo Gallery Grid */}
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold text-[#0B3B2C] flex items-center gap-2">
              <Images className="w-5 h-5 text-[#FBBF24]" />
              ফটো গ্যালারি
            </h2>

            {/* Category filter */}
            <div className="flex flex-wrap gap-1.5">
              {["all", "মিলনমেলা", "শিক্ষা", "ব্লাড ব্যাংক", "সম্মাননা"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? "bg-[#0B3B2C] text-[#FBBF24]"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {cat === "all" ? "সকল ছবি" : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredGallery.map((item, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-lg transition-all"
              >
                {/* Image Placeholder Frame */}
                <div className="h-48 bg-gradient-to-tr from-[#0B3B2C] to-[#166534] flex flex-col items-center justify-center text-white p-4 text-center relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mb-2 ring-2 ring-[#FBBF24] p-0.5 bg-white/20">
                    <Image src="/logo.png" alt="লোগো" fill className="object-contain" />
                  </div>
                  <span className="text-xs font-bold text-[#FBBF24]">{item.category}</span>
                  <span className="text-[11px] text-emerald-100">{item.year}</span>
                </div>

                <div className="p-4 bg-white">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-800 line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">কিশোরগঞ্জ উপজেলা সমিতি আর্কাইভ</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

