"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DigitalIdCard from "@/components/dashboard/DigitalIdCard";
import { initialMembers } from "@/lib/dataStore";
import {
  User,
  CreditCard,
  Bell,
  Droplet,
  CheckCircle,
  Clock,
  Printer,
  Calendar,
  ShieldCheck,
  LogOut,
  ChevronRight,
} from "lucide-react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"idcard" | "payments" | "profile">("idcard");
  const member = initialMembers[0]; // Example logged in member

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7] font-bangla">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-[#0B3B2C] via-[#0E4432] to-[#145A43] text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden ring-4 ring-[#FBBF24] shrink-0 bg-white p-0.5 shadow-md">
              <Image src="/logo.png" alt="লোগো" fill className="object-contain" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-800/80 border border-emerald-500/40 text-[#FBBF24] text-xs font-semibold mb-1">
                <CheckCircle className="w-3.5 h-3.5 text-[#FBBF24]" />
                ভেরিফাইড সদস্য
              </div>
              <h1 className="text-xl sm:text-2xl font-bold">{member.full_name}</h1>
              <p className="text-emerald-200/80 text-xs sm:text-sm">
                সদস্য নম্বর: <strong className="text-white font-mono">{member.member_no}</strong> | ক্যাটাগরি: আজীবন সদস্য
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="px-4 py-2 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 border border-white/20 transition-all flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              লগআউট
            </Link>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-8 overflow-x-auto">
          {[
            { id: "idcard", label: "ডিজিটাল আইডি কার্ড" },
            { id: "payments", label: "পেমেন্ট ও চাঁদার হিসাব" },
            { id: "profile", label: "প্রোফাইল তথ্য" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-[#0B3B2C] text-[#FBBF24] shadow-md"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Digital ID Card */}
        {activeTab === "idcard" && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm flex flex-col items-center">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-[#0B3B2C] mb-1">
                আপনার অফিসিয়াল ডিজিটাল সদস্য কার্ড
              </h2>
              <p className="text-slate-500 text-xs max-w-md mx-auto">
                এই কার্ডটি সমিতির যেকোনো সভা, নির্বাচন বা মিলনমেলায় শনাক্তকরণ হিসেবে গ্রহণযোগ্য। আপনি এটি মোবাইলে সেভ করে রাখতে পারেন।
              </p>
            </div>

            <DigitalIdCard member={member} />
          </div>
        )}

        {/* Tab 2: Payments & Dues */}
        {activeTab === "payments" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4">
              <div>
                <h2 className="text-lg font-bold text-[#0B3B2C]">পেমেন্ট ও চাঁদার ইতিহাস</h2>
                <p className="text-slate-500 text-xs">আপনার সকল পরিশোধিত ফি ও রসিদসমূহ</p>
              </div>
              <div className="px-4 py-2 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold border border-emerald-200">
                স্ট্যাটাস: নিয়মিত পরিশোধিত (কোনো বকেয়া নেই)
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-700 uppercase font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">রসিদ নম্বর</th>
                    <th className="p-3">বিবরণ</th>
                    <th className="p-3">পদ্ধতি</th>
                    <th className="p-3">TrxID</th>
                    <th className="p-3">পরিমাণ</th>
                    <th className="p-3">স্ট্যাটাস</th>
                    <th className="p-3 text-right">রসিদ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-slate-800">REC-2026-0001</td>
                    <td className="p-3 font-medium text-slate-800">আজীবন সদস্য এককালীন অনুদান</td>
                    <td className="p-3 uppercase font-sans">bKash</td>
                    <td className="p-3 font-mono text-slate-600">BKG92817K3L</td>
                    <td className="p-3 font-bold text-[#0B3B2C]">৳ ১০,০০০</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        ভেরিফাইড
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => window.print()}
                        className="text-[#00A3E0] hover:underline flex items-center justify-end gap-1 font-semibold ml-auto"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        রসিদ
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Profile Info */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-[#0B3B2C] border-b pb-3">ব্যক্তিগত তথ্যাবলি</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">পিতার নাম</span>
                <span className="text-slate-800 font-bold">{member.father_name}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">মাতার নাম</span>
                <span className="text-slate-800 font-bold">{member.mother_name}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">মোবাইল</span>
                <span className="text-slate-800 font-bold">{member.phone}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">রক্তের গ্রুপ</span>
                <span className="text-rose-600 font-bold">{member.blood_group}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">স্থায়ী ইউনিয়ন ও গ্রাম</span>
                <span className="text-slate-800 font-bold">{member.permanent_union}, {member.permanent_village}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">উপজেলা ও জেলা</span>
                <span className="text-slate-800 font-bold">কিশোরগঞ্জ, নীলফামারী</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">বর্তমান ঢাকা ঠিকানা</span>
                <span className="text-slate-800 font-bold">{member.present_dhaka_address}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

