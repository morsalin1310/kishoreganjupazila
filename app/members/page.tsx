"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSiteStore } from "@/lib/siteStore";
import { NILPHAMARI_KISHOREGANJ_UNIONS } from "@/lib/types";
import { Search, MapPin, Briefcase, Droplet, ShieldCheck, UserCheck, Phone, Compass } from "lucide-react";

export default function MembersDirectoryPage() {
  const { members } = useSiteStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUnion, setSelectedUnion] = useState("all");
  const [selectedBlood, setSelectedBlood] = useState("all");

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.member_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.permanent_village.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.profession.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesUnion =
      selectedUnion === "all" || m.permanent_union === selectedUnion;
    const matchesBlood =
      selectedBlood === "all" || m.blood_group === selectedBlood;

    return matchesSearch && matchesUnion && matchesBlood;
  });

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7] font-bangla">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-[#0B3B2C] text-xs font-bold mb-3">
            <UserCheck className="w-3.5 h-3.5 text-[#FBBF24]" />
            সদস্য ডিরেক্টরি
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B3B2C]">
            কিশোরগঞ্জ উপজেলা সমিতি সদস্য ডিরেক্টরি
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-2">
            নীলফামারী জেলার কিশোরগঞ্জ উপজেলার ৯টি ইউনিয়নের ঢাকায় অবস্থানরত সম্মানিত সদস্যবৃন্দের তালিকা।
          </p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="নাম, পেশা বা গ্রাম দিয়ে খুঁজুন..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-[#0B3B2C] outline-none"
              />
            </div>

            {/* Union Filter */}
            <div>
              <select
                value={selectedUnion}
                onChange={(e) => setSelectedUnion(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-[#0B3B2C] outline-none bg-white font-medium"
              >
                <option value="all">সকল ইউনিয়ন (৯টি ইউনিয়ন)</option>
                {NILPHAMARI_KISHOREGANJ_UNIONS.map((u) => (
                  <option key={u} value={u}>
                    {u} ইউনিয়ন
                  </option>
                ))}
              </select>
            </div>

            {/* Blood Group Filter */}
            <div>
              <select
                value={selectedBlood}
                onChange={(e) => setSelectedBlood(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-[#0B3B2C] outline-none bg-white font-medium"
              >
                <option value="all">সকল রক্তের গ্রুপ</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Members Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-700 border border-slate-200">
                    {member.member_no}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-[#0B3B2C]">
                    {member.member_type === "lifetime" ? "আজীবন সদস্য" : "সাধারণ সদস্য"}
                  </span>
                </div>

                <div className="text-center mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-[#0B3B2C] ring-2 ring-emerald-200 flex items-center justify-center font-bold text-xl mx-auto mb-2 shadow-xs">
                    {member.full_name.slice(0, 1)}
                  </div>
                  <h3 className="font-bold text-base text-slate-800">{member.full_name}</h3>
                  <div className="inline-flex items-center gap-1 text-[11px] text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded-full mt-1">
                    <Droplet className="w-3 h-3 fill-rose-600" />
                    রক্তের গ্রুপ: {member.blood_group}
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-600 border-t pt-3">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{member.profession}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Compass className="w-3.5 h-3.5 text-[#00A3E0] shrink-0" />
                    <span>ইউনিয়ন: {member.permanent_union}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>গ্রাম: {member.permanent_village}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="line-clamp-1">{member.present_dhaka_address}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  ভেরিফাইড
                </span>
                <a
                  href={`tel:${member.phone}`}
                  className="px-3 py-1.5 rounded-full bg-[#00A3E0] text-white hover:bg-[#0284C7] font-semibold flex items-center gap-1 transition-all"
                >
                  <Phone className="w-3 h-3" />
                  যোগাযোগ
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
