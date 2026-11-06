"use client";

import { useState } from "react";
import Image from "next/image";
import { useSiteStore } from "@/lib/siteStore";
import { Users, Phone, MapPin, Award, Compass, Sparkles } from "lucide-react";

export default function CommitteePage() {
  const [activeTab, setActiveTab] = useState<"executive" | "advisory">("executive");
  const { committee } = useSiteStore();

  const list = committee.filter((m) => m.committee_type === activeTab);

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7] font-bangla">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-[#0B3B2C] text-xs font-bold mb-3">
            <Award className="w-3.5 h-3.5 text-[#FBBF24]" />
            নেতৃত্ব ও সাংগঠনিক কাঠামো
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B3B2C]">
            উপদেষ্টা ও কার্যনির্বাহী পরিষদ
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-2">
            ঢাকাস্থ কিশোরগঞ্জ উপজেলা সমিতি (নীলফামারী)-র ২০২৬-২০২৮ মেয়াদের সম্মানিত উপদেষ্টা ও কার্যনির্বাহী পরিষদের নেতৃত্ব।
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <button
            onClick={() => setActiveTab("executive")}
            className={`px-7 py-3 rounded-full text-xs sm:text-sm font-bold transition-all shadow-sm ${
              activeTab === "executive"
                ? "bg-[#0B3B2C] text-[#FBBF24] ring-2 ring-emerald-600 shadow-md scale-105"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            কার্যনির্বাহী পরিষদ ({committee.filter((c) => c.committee_type === "executive").length} জন)
          </button>
          <button
            onClick={() => setActiveTab("advisory")}
            className={`px-7 py-3 rounded-full text-xs sm:text-sm font-bold transition-all shadow-sm ${
              activeTab === "advisory"
                ? "bg-[#0B3B2C] text-[#FBBF24] ring-2 ring-emerald-600 shadow-md scale-105"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            উপদেষ্টা পরিষদ ({committee.filter((c) => c.committee_type === "advisory").length} জন)
          </button>
        </div>

        {/* Members Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(11,59,44,0.08)] transition-all duration-300 flex items-start gap-4 group"
            >
              {/* Photo Frame with initial */}
              <div className="relative w-20 h-24 rounded-2xl overflow-hidden ring-2 ring-[#0B3B2C]/20 bg-emerald-50 text-emerald-900 flex items-center justify-center font-bold text-2xl shrink-0 group-hover:ring-[#FBBF24] transition-all">
                {member.name.slice(0, 1)}
              </div>

              {/* Info */}
              <div className="flex-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-[#0B3B2C] inline-block mb-1.5">
                  {member.designation}
                </span>
                <h3 className="font-bold text-base text-slate-800 leading-snug mb-1">
                  {member.name}
                </h3>
                <p className="text-xs text-slate-500 flex items-center gap-1 mb-1">
                  <Compass className="w-3 h-3 text-[#00A3E0]" />
                  <span>ইউনিয়ন: {member.union}</span>
                </p>
                <p className="text-xs text-slate-400 flex items-center gap-1 mb-3">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>গ্রাম: {member.village}</span>
                </p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={`tel:${member.phone}`}
                    className="text-xs text-[#00A3E0] hover:text-[#0284C7] font-semibold flex items-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    {member.phone}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
