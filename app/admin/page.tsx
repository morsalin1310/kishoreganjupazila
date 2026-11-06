"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSiteStore } from "@/lib/siteStore";
import {
  MemberProfile,
  NoticeItem,
  CommitteeMember,
  NILPHAMARI_KISHOREGANJ_UNIONS,
  KishoreganjUnion,
} from "@/lib/types";
import {
  Users,
  CreditCard,
  Bell,
  Droplet,
  ShieldCheck,
  CheckCircle,
  XCircle,
  Download,
  PlusCircle,
  FileText,
  Search,
  Check,
  X,
  ExternalLink,
  Settings,
  Edit3,
  Trash2,
  Pin,
  RefreshCw,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Save,
} from "lucide-react";

export default function AdminDashboardPage() {
  const {
    settings,
    notices,
    committee,
    members,
    donors,
    updateSettings,
    updateNotices,
    updateCommittee,
    updateMembers,
    resetToDefault,
  } = useSiteStore();

  const [activeTab, setActiveTab] = useState<
    "settings" | "members" | "notices" | "committee" | "payments"
  >("settings");

  // Site Settings Form state
  const [formSettings, setFormSettings] = useState(settings);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // New Notice state
  const [newNoticeTitle, setNewNoticeTitle] = useState("");
  const [newNoticeContent, setNewNoticeContent] = useState("");
  const [newNoticeCategory, setNewNoticeCategory] = useState<any>("general");
  const [newNoticePinned, setNewNoticePinned] = useState(false);
  const [noticeAdded, setNoticeAdded] = useState(false);

  // New Committee Member state
  const [newCommName, setNewCommName] = useState("");
  const [newCommDesignation, setNewCommDesignation] = useState("");
  const [newCommType, setNewCommType] = useState<"executive" | "advisory">("executive");
  const [newCommUnion, setNewCommUnion] = useState<KishoreganjUnion>("কিশোরগঞ্জ সদর");
  const [newCommVillage, setNewCommVillage] = useState("");
  const [newCommPhone, setNewCommPhone] = useState("");
  const [commAdded, setCommAdded] = useState(false);

  // Pending members simulation state
  const [pendingMembers, setPendingMembers] = useState<MemberProfile[]>([
    {
      id: "pending-1",
      member_no: "অপেক্ষমাণ",
      full_name: "মো. রবিউল ইসলাম",
      father_name: "আব্দুল কাদের",
      mother_name: "জাহানারা বেগম",
      member_type: "general",
      phone: "০১৭১২-৩৪৫৬৭৮",
      email: "robiul@gmail.com",
      blood_group: "B+",
      permanent_district: "নীলফামারী",
      permanent_upazila: "কিশোরগঞ্জ",
      permanent_union: "রণচণ্ডী",
      permanent_village: "রণচণ্ডী স্কুলপাড়া",
      present_dhaka_address: "রোড-৭, সেক্টর-৩, উত্তরা",
      dhaka_area: "উত্তরা",
      profession: "ব্যাংক কর্মকর্তা",
      status: "pending",
      created_at: "২০২৬-১১-০৫",
    },
    {
      id: "pending-2",
      member_no: "অপেক্ষমাণ",
      full_name: "আফসানা আক্তার নিপা",
      father_name: "মোজাম্মেল হক",
      mother_name: "সালমা খাতুন",
      member_type: "lifetime",
      phone: "০১৮১৯-৮৭৬৫৪৩",
      email: "nipa@gmail.com",
      blood_group: "A+",
      permanent_district: "নীলফামারী",
      permanent_upazila: "কিশোরগঞ্জ",
      permanent_union: "চাঁদখানা",
      permanent_village: "মুকুটপাড়া",
      present_dhaka_address: "ফ্ল্যাট-২বি, ধানমন্ডি",
      dhaka_area: "ধানমন্ডি",
      profession: "শিক্ষিকা",
      status: "pending",
      created_at: "২০২৬-১১-০৪",
    },
  ]);

  // Handle Site Settings Save
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formSettings);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  // Handle Approve Member
  const handleApprove = (id: string) => {
    const target = pendingMembers.find((m) => m.id === id);
    if (!target) return;

    const newMemberNo = `KUSD-2026-${String(members.length + 1).padStart(4, "0")}`;
    const approved: MemberProfile = {
      ...target,
      member_no: newMemberNo,
      status: "approved",
      approved_at: new Date().toISOString().slice(0, 10),
    };

    updateMembers([approved, ...members]);
    setPendingMembers(pendingMembers.filter((m) => m.id !== id));
  };

  // Handle Reject Member
  const handleReject = (id: string) => {
    setPendingMembers(pendingMembers.filter((m) => m.id !== id));
  };

  // Handle Add Notice
  const handleAddNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitle || !newNoticeContent) return;

    const created: NoticeItem = {
      id: `not-${Date.now()}`,
      title: newNoticeTitle,
      slug: `notice-${Date.now()}`,
      category: newNoticeCategory,
      published_date: new Date().toLocaleDateString("bn-BD"),
      is_pinned: newNoticePinned,
      content: newNoticeContent,
    };

    updateNotices([created, ...notices]);
    setNewNoticeTitle("");
    setNewNoticeContent("");
    setNewNoticePinned(false);
    setNoticeAdded(true);
    setTimeout(() => setNoticeAdded(false), 2500);
  };

  // Handle Delete Notice
  const handleDeleteNotice = (id: string) => {
    if (confirm("আপনি কি নিশ্চিত এই নোটিশটি ওয়েবসাইট থেকে মুছে ফেলতে চান?")) {
      updateNotices(notices.filter((n) => n.id !== id));
    }
  };

  // Handle Toggle Pin Notice
  const handleTogglePin = (id: string) => {
    const updated = notices.map((n) =>
      n.id === id ? { ...n, is_pinned: !n.is_pinned } : n
    );
    updateNotices(updated);
  };

  // Handle Add Committee Member
  const handleAddCommitteeMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommName || !newCommDesignation) return;

    const created: CommitteeMember = {
      id: `comm-${Date.now()}`,
      name: newCommName,
      designation: newCommDesignation,
      committee_type: newCommType,
      order_index: committee.length + 1,
      phone: newCommPhone || "০১৭১১-XXXXXX",
      union: newCommUnion,
      village: newCommVillage || "কিশোরগঞ্জ",
    };

    updateCommittee([created, ...committee]);
    setNewCommName("");
    setNewCommDesignation("");
    setNewCommPhone("");
    setNewCommVillage("");
    setCommAdded(true);
    setTimeout(() => setCommAdded(false), 2500);
  };

  // Handle Delete Committee Member
  const handleDeleteCommittee = (id: string) => {
    if (confirm("আপনি কি নিশ্চিত এই সদস্যকে কমিটি তালিকা থেকে মুছে ফেলতে চান?")) {
      updateCommittee(committee.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7] font-bangla">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0B3B2C] text-white p-6 sm:p-8 rounded-3xl shadow-xl border-b-2 border-[#FBBF24]">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#FBBF24] bg-white p-0.5">
              <Image src="/logo.png" alt="লোগো" fill className="object-contain" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#FBBF24] uppercase tracking-wider block">
                অফিসিয়াল প্রশাসনিক প্যানেল ও লাইভ CMS
              </span>
              <h1 className="text-xl sm:text-2xl font-black">
                {settings.heroHeadline} (নীলফামারী)
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="px-4 py-2 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 border border-white/20 transition-all flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              মূল সাইট দেখুন
            </Link>
          </div>
        </div>

        {/* 4 Analytics Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#0B3B2C] flex items-center justify-center mb-3">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-xs text-slate-500 block">অনুমোদিত সদস্য</span>
            <span className="text-2xl font-extrabold text-[#0B3B2C]">
              {members.length} জন
            </span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-xs text-slate-500 block">অপেক্ষমাণ আবেদন</span>
            <span className="text-2xl font-extrabold text-amber-600">
              {pendingMembers.length} টি
            </span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 text-[#00A3E0] flex items-center justify-center mb-3">
              <CreditCard className="w-5 h-5" />
            </div>
            <span className="text-xs text-slate-500 block">মোট সংগৃহীত তহবিল</span>
            <span className="text-2xl font-extrabold text-slate-800">৳ ১,৬৫,৫০০</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#DC2626] flex items-center justify-center mb-3">
              <Droplet className="w-5 h-5 fill-rose-600" />
            </div>
            <span className="text-xs text-slate-500 block">সক্রিয় রক্তদাতা</span>
            <span className="text-2xl font-extrabold text-[#DC2626]">
              {donors.length} জন
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
          {[
            { id: "settings", label: "সাইট ও হোমপেজ কাস্টমাইজার (CMS)", icon: Settings },
            { id: "members", label: `সদস্য আবেদন (${pendingMembers.length})`, icon: Users },
            { id: "notices", label: `নোটিশ বোর্ড (${notices.length})`, icon: Bell },
            { id: "committee", label: `কমিটি পরিষদ (${committee.length})`, icon: ShieldCheck },
            { id: "payments", label: "পেমেন্ট অডিট", icon: CreditCard },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-[#0B3B2C] text-[#FBBF24] shadow-md"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: SITE SETTINGS & HOMEPAGE CMS */}
        {activeTab === "settings" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4">
              <div>
                <h2 className="text-lg font-bold text-[#0B3B2C]">
                  ওয়েবসাইট সেটিংস ও হোমপেজ কাস্টমাইজার
                </h2>
                <p className="text-xs text-slate-500">
                  এখান থেকে যে তথ্য পরিবর্তন করবেন, তা সাথে সাথে পুরো ওয়েবসাইটে লাইভ প্রদর্শিত হবে।
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={resetToDefault}
                  className="px-4 py-2 rounded-full text-xs font-semibold border border-rose-200 text-rose-600 hover:bg-rose-50 flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  ডিফল্টে রিস্টোর করুন
                </button>
              </div>
            </div>

            {saveSuccess && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-2xl font-bold flex items-center gap-2 animate-in fade-in">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                অভিনন্দন! আপনার পরিবর্তনসমূহ সফলভাবে ওয়েবসাইটে সংরক্ষণ ও আপডেট করা হয়েছে!
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    ওয়েবসাইটের মূল নাম (Header & Site Title)
                  </label>
                  <input
                    type="text"
                    value={formSettings.heroHeadline}
                    onChange={(e) =>
                      setFormSettings({ ...formSettings, heroHeadline: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-[#0B3B2C] outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    সমিতির স্লোগান
                  </label>
                  <input
                    type="text"
                    value={formSettings.slogan}
                    onChange={(e) =>
                      setFormSettings({ ...formSettings, slogan: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-[#0B3B2C] outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    হিরো সেকশনের সাবটাইটেল / বিবরণ
                  </label>
                  <textarea
                    rows={2}
                    value={formSettings.heroSubheadline}
                    onChange={(e) =>
                      setFormSettings({ ...formSettings, heroSubheadline: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-[#0B3B2C] outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    টপ অ্যানাউন্সমেন্ট ব্যানার / স্ক্রলিং নোটিশ বার
                  </label>
                  <textarea
                    rows={2}
                    value={formSettings.announcementTicker}
                    onChange={(e) =>
                      setFormSettings({ ...formSettings, announcementTicker: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-[#0B3B2C] outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    অফিশিয়াল হেল্পলাইন মোবাইল নম্বর
                  </label>
                  <input
                    type="text"
                    value={formSettings.contactPhone}
                    onChange={(e) =>
                      setFormSettings({ ...formSettings, contactPhone: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-[#0B3B2C] outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    দাপ্তরিক ইমেইল ঠিকানা
                  </label>
                  <input
                    type="email"
                    value={formSettings.contactEmail}
                    onChange={(e) =>
                      setFormSettings({ ...formSettings, contactEmail: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-[#0B3B2C] outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    অস্থায়ী কার্যালয়ের ঠিকানা (ঢাকা)
                  </label>
                  <input
                    type="text"
                    value={formSettings.contactAddress}
                    onChange={(e) =>
                      setFormSettings({ ...formSettings, contactAddress: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-[#0B3B2C] outline-none"
                  />
                </div>
              </div>

              {/* Stats Counters */}
              <div className="border-t pt-4">
                <h4 className="text-xs font-bold text-slate-800 mb-3">
                  📊 হোমপেজ ইমপ্যাক্ট কাউন্টারস (পরিসংখ্যান)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="text-[11px] text-slate-500 block mb-1">মোট সদস্য</label>
                    <input
                      type="text"
                      value={formSettings.statMembers}
                      onChange={(e) =>
                        setFormSettings({ ...formSettings, statMembers: e.target.value })
                      }
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:border-[#0B3B2C] outline-none font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-500 block mb-1">ইউনিয়ন সংখ্যা</label>
                    <input
                      type="text"
                      value={formSettings.statUnions}
                      onChange={(e) =>
                        setFormSettings({ ...formSettings, statUnions: e.target.value })
                      }
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:border-[#0B3B2C] outline-none font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-500 block mb-1">কার্যনির্বাহী পরিষদ</label>
                    <input
                      type="text"
                      value={formSettings.statExecutive}
                      onChange={(e) =>
                        setFormSettings({ ...formSettings, statExecutive: e.target.value })
                      }
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:border-[#0B3B2C] outline-none font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-500 block mb-1">রক্তদাতা সংখ্যা</label>
                    <input
                      type="text"
                      value={formSettings.statDonors}
                      onChange={(e) =>
                        setFormSettings({ ...formSettings, statDonors: e.target.value })
                      }
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:border-[#0B3B2C] outline-none font-bold"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t">
                <button
                  type="submit"
                  className="px-8 py-3 rounded-full font-bold text-xs sm:text-sm bg-[#0B3B2C] text-[#FBBF24] hover:bg-[#145A43] shadow-md transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>পরিবর্তন সংরক্ষণ করুন</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 2: MEMBER VERIFICATION & APPROVALS */}
        {activeTab === "members" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h2 className="text-lg font-bold text-[#0B3B2C]">
                  অপেক্ষমাণ সদস্যপদ আবেদনসমূহ ({pendingMembers.length})
                </h2>
                <p className="text-xs text-slate-500">
                  সঠিক তথ্য যাচাই করে এক ক্লিকে অনুমোদন বা বাতিল করুন
                </p>
              </div>
            </div>

            {pendingMembers.length === 0 ? (
              <div className="text-center py-10 text-slate-400 text-sm">
                🎉 কোনো অপেক্ষমাণ আবেদন নেই! সকল আবেদন যাচাই সম্পন্ন হয়েছে।
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-700 uppercase font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">আবেদনকারী</th>
                      <th className="p-3">মোবাইল</th>
                      <th className="p-3">রক্ত</th>
                      <th className="p-3">ক্যাটাগরি</th>
                      <th className="p-3">ইউনিয়ন ও গ্রাম</th>
                      <th className="p-3">বর্তমান ঢাকা ঠিকানা</th>
                      <th className="p-3 text-right">পদক্ষেপ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {pendingMembers.map((m) => (
                      <tr key={m.id} className="hover:bg-slate-50">
                        <td className="p-3">
                          <span className="font-bold text-slate-800 block">{m.full_name}</span>
                          <span className="text-[10px] text-slate-400">{m.profession}</span>
                        </td>
                        <td className="p-3 font-medium text-slate-700">{m.phone}</td>
                        <td className="p-3 font-bold text-rose-600">{m.blood_group}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-semibold text-[10px] border border-emerald-200">
                            {m.member_type === "lifetime" ? "আজীবন সদস্য" : "সাধারণ সদস্য"}
                          </span>
                        </td>
                        <td className="p-3 text-slate-700 font-medium">
                          {m.permanent_union}, {m.permanent_village}
                        </td>
                        <td className="p-3 text-slate-600 max-w-xs truncate">
                          {m.present_dhaka_address}
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleApprove(m.id)}
                              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1 shadow-xs transition-all"
                            >
                              <Check className="w-3.5 h-3.5" />
                              অনুমোদন
                            </button>
                            <button
                              onClick={() => handleReject(m.id)}
                              className="px-2.5 py-1.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 font-semibold border border-rose-200 transition-all"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: NOTICE BOARD CMS */}
        {activeTab === "notices" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-lg font-bold text-[#0B3B2C]">
                নোটিশ বোর্ড ম্যানেজমেন্ট ও প্রকাশনা (CMS)
              </h2>
              <p className="text-xs text-slate-500">
                নতুন নোটিশ পোস্ট করুন অথবা বর্তমান নোটিশগুলো সম্পাদন/মুছে ফেলুন
              </p>
            </div>

            {noticeAdded && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-2xl font-bold flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                নোটিশটি সফলভাবে ওয়েবসাইটে প্রকাশিত হয়েছে!
              </div>
            )}

            {/* Create Notice Form */}
            <form onSubmit={handleAddNotice} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <PlusCircle className="w-4 h-4 text-emerald-600" />
                নতুন নোটিশ যোগ করুন
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    নোটিশের শিরোনাম *
                  </label>
                  <input
                    type="text"
                    required
                    value={newNoticeTitle}
                    onChange={(e) => setNewNoticeTitle(e.target.value)}
                    placeholder="শিরোনাম লিখুন..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:border-[#0B3B2C] outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    ক্যাটাগরি
                  </label>
                  <select
                    value={newNoticeCategory}
                    onChange={(e) => setNewNoticeCategory(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:border-[#0B3B2C] outline-none bg-white"
                  >
                    <option value="general">সাধারণ</option>
                    <option value="meeting">সভা ও মিটিং</option>
                    <option value="emergency">জরুরি</option>
                    <option value="event">অনুষ্ঠান</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  বিস্তারিত বিষয়বস্তু *
                </label>
                <textarea
                  required
                  rows={3}
                  value={newNoticeContent}
                  onChange={(e) => setNewNoticeContent(e.target.value)}
                  placeholder="নোটিশের বিস্তারিত বিবরণ..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:border-[#0B3B2C] outline-none"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newNoticePinned}
                    onChange={(e) => setNewNoticePinned(e.target.checked)}
                    className="rounded text-[#0B3B2C]"
                  />
                  <span>উপরে পিন করে রাখুন (Pinned Notice)</span>
                </label>

                <button
                  type="submit"
                  className="px-6 py-2 rounded-full font-bold text-xs bg-[#0B3B2C] text-[#FBBF24] hover:bg-[#145A43] shadow-md transition-all flex items-center gap-1.5"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  প্রকাশ করুন
                </button>
              </div>
            </form>

            {/* Existing Notice List */}
            <div className="space-y-3 pt-3">
              <h3 className="text-xs font-bold text-slate-700">বর্তমান নোটিশসমূহ ({notices.length})</h3>
              {notices.map((n) => (
                <div
                  key={n.id}
                  className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {n.is_pinned && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold">
                          পিন করা
                        </span>
                      )}
                      <span className="text-[10px] text-slate-400">{n.published_date}</span>
                    </div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-800">{n.title}</h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{n.content}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleTogglePin(n.id)}
                      className={`p-2 rounded-xl text-xs transition-colors ${
                        n.is_pinned
                          ? "bg-amber-100 text-amber-700"
                          : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                      }`}
                      title={n.is_pinned ? "আনপিন করুন" : "পিন করুন"}
                    >
                      <Pin className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteNotice(n.id)}
                      className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs transition-colors"
                      title="ডিলিট করুন"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: COMMITTEE CMS */}
        {activeTab === "committee" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-lg font-bold text-[#0B3B2C]">
                কমিটি পরিষদ ম্যানেজমেন্ট (CMS)
              </h2>
              <p className="text-xs text-slate-500">
                কার্যনির্বাহী ও উপদেষ্টা পরিষদের সদস্যদের তথ্য আপডেট ও সংযোজন
              </p>
            </div>

            {commAdded && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-2xl font-bold flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                কমিটি সদস্য সফলভাবে যুক্ত হয়েছে!
              </div>
            )}

            {/* Add Member Form */}
            <form onSubmit={handleAddCommitteeMember} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <PlusCircle className="w-4 h-4 text-emerald-600" />
                নতুন কমিটি সদস্য যুক্ত করুন
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    সদস্যের নাম *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCommName}
                    onChange={(e) => setNewCommName(e.target.value)}
                    placeholder="নাম লিখুন"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:border-[#0B3B2C] outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    পদবি *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCommDesignation}
                    onChange={(e) => setNewCommDesignation(e.target.value)}
                    placeholder="উদা: সভাপতি / সহ-সভাপতি"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:border-[#0B3B2C] outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    পরিষদ ক্যাটাগরি
                  </label>
                  <select
                    value={newCommType}
                    onChange={(e) => setNewCommType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:border-[#0B3B2C] outline-none bg-white font-semibold"
                  >
                    <option value="executive">কার্যনির্বাহী পরিষদ</option>
                    <option value="advisory">উপদেষ্টা পরিষদ</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    কিশোরগঞ্জের ইউনিয়ন *
                  </label>
                  <select
                    value={newCommUnion}
                    onChange={(e) => setNewCommUnion(e.target.value as KishoreganjUnion)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:border-[#0B3B2C] outline-none bg-white font-semibold"
                  >
                    {NILPHAMARI_KISHOREGANJ_UNIONS.map((u) => (
                      <option key={u} value={u}>
                        {u} ইউনিয়ন
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    গ্রামের নাম
                  </label>
                  <input
                    type="text"
                    value={newCommVillage}
                    onChange={(e) => setNewCommVillage(e.target.value)}
                    placeholder="গ্রামের নাম"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:border-[#0B3B2C] outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    মোবাইল নম্বর
                  </label>
                  <input
                    type="text"
                    value={newCommPhone}
                    onChange={(e) => setNewCommPhone(e.target.value)}
                    placeholder="০১৭১১-XXXXXX"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:border-[#0B3B2C] outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full font-bold text-xs bg-[#0B3B2C] text-[#FBBF24] hover:bg-[#145A43] shadow-md transition-all flex items-center gap-1.5"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  কমিটিতে যুক্ত করুন
                </button>
              </div>
            </form>

            {/* List */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-700">বর্তমান কমিটির সদস্যবৃন্দ ({committee.length})</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {committee.map((c) => (
                  <div
                    key={c.id}
                    className="p-3 bg-white rounded-2xl border border-slate-200 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-slate-800 block">{c.name}</span>
                      <span className="text-[10px] text-emerald-800 font-semibold block">
                        {c.designation} ({c.committee_type === "executive" ? "কার্যনির্বাহী" : "উপদেষ্টা"})
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {c.union}, {c.village}
                      </span>
                    </div>

                    <button
                      onClick={() => handleDeleteCommittee(c.id)}
                      className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                      title="মুছে ফেলুন"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: PAYMENTS & AUDIT */}
        {activeTab === "payments" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4">
              <div>
                <h2 className="text-lg font-bold text-[#0B3B2C]">
                  আর্থিক লেনদেন ও ট্রানজেকশন অডিট
                </h2>
                <p className="text-xs text-slate-500">বিকাশ ও নগদ পেমেন্টের রেকর্ড তালিকা</p>
              </div>
              <button
                onClick={() => alert("সকল আর্থিক রেকর্ড এক্সেল/CSV আকারে ডাউনলোড হচ্ছে...")}
                className="px-4 py-2 rounded-full text-xs font-bold bg-[#0B3B2C] text-[#FBBF24] hover:bg-[#145A43] flex items-center gap-1.5 shadow-xs"
              >
                <Download className="w-3.5 h-3.5 text-[#FBBF24]" />
                এক্সপোর্ট CSV
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-700 uppercase font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">রসিদ নম্বর</th>
                    <th className="p-3">সদস্যের নাম</th>
                    <th className="p-3">মেথড</th>
                    <th className="p-3">প্রেরক নম্বর</th>
                    <th className="p-3">TrxID</th>
                    <th className="p-3">পরিমাণ</th>
                    <th className="p-3">স্ট্যাটাস</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-slate-800">REC-2026-0001</td>
                    <td className="p-3 font-semibold text-slate-800">মো. কামরুল হাসান</td>
                    <td className="p-3 uppercase font-sans">bKash</td>
                    <td className="p-3 font-mono text-slate-600">০১৩৫৩-৭৪৩৫৪৭</td>
                    <td className="p-3 font-mono text-slate-600">BKG92817K3L</td>
                    <td className="p-3 font-bold text-[#0B3B2C]">৳ ১০,০০০</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        ভেরিফাইড
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-slate-800">REC-2026-0002</td>
                    <td className="p-3 font-semibold text-slate-800">কাজী তানভীর আহমেদ</td>
                    <td className="p-3 uppercase font-sans">Nagad</td>
                    <td className="p-3 font-mono text-slate-600">০১৭২০-XXXXXX</td>
                    <td className="p-3 font-mono text-slate-600">NGD7162981</td>
                    <td className="p-3 font-bold text-[#0B3B2C]">৳ ১০,০০০</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        ভেরিফাইড
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
