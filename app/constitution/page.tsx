"use client";

import { useState } from "react";
import { BookOpen, Download, Search, ChevronDown, ChevronUp, FileText, CheckCircle2 } from "lucide-react";

const constitutionClauses = [
  {
    clause: "ধারা ১",
    title: "সংগঠনের নাম",
    content: "এই সংগঠনের নাম হইবে 'ঢাকাস্থ কিশোরগঞ্জ উপজেলা সমিতি, নীলফামারী' (সংক্ষেপে 'কিশোরগঞ্জ উপজেলা সমিতি, ঢাকা')।",
  },
  {
    clause: "ধারা ২",
    title: "কার্যালয়",
    content: "সমিতির প্রধান/অস্থায়ী কার্যালয় ঢাকা মহানগরীতে অবস্থিত হইবে (বর্তমান ঠিকানা: বাড়ি-১৬, রোড-৩/১, ব্লক-এ, সেক্টর-১৬, উত্তরা, ঢাকা-১২৩০)। প্রয়োজনবোধে কার্যনির্বাহী পরিষদ কার্যালয়ের স্থান পরিবর্তন করিতে পারিবে।",
  },
  {
    clause: "ধারা ৩",
    title: "কর্ম এলাকা ও সদস্যভুক্তির পরিধি",
    content: "সমিতির সাংগঠনিক কর্ম এলাকা হইবে সমগ্র ঢাকা জেলা ও সংলগ্ন এলাকা, যেখানে নীলফামারী জেলার কিশোরগঞ্জ উপজেলার ৯টি ইউনিয়নের (কিশোরগঞ্জ সদর, পুটিমারী, চাঁদখানা, বাহাগিলি, রণচণ্ডী, বড়ভিটা, নিতাই, মাগুড়া ও গাড়াগ্রাম) স্থায়ী নাগরিকগণ বসবাস করিতেছেন বা কর্মরত আছেন।",
  },
  {
    clause: "ধারা ৪",
    title: "লক্ষ্য ও উদ্দেশ্য",
    content: "নীলফামারীর কিশোরগঞ্জ উপজেলাবাসীর মধ্যে পারস্পরিক ভ্রাতৃত্ব ও সৌহার্দ্য বৃদ্ধি করা, শিক্ষা বৃত্তি ও চিকিৎসা সহায়তা প্রদান, জরুরি রক্তদান কর্মসূচি পরিচালনা, দুর্যোগে আর্তমানবতার সেবা এবং চাড়ালকাটা ও উত্তরবঙ্গের মাটির সংস্কৃতি ও ঐতিহ্য সংরক্ষণ করা। সংগঠনটি সম্পূর্ণ অরাজনৈতিক ও জনকল্যাণমুখী।",
  },
  {
    clause: "ধারা ৫",
    title: "সদস্যপদের যোগ্যতা",
    content: "নীলফামারী জেলার কিশোরগঞ্জ উপজেলার যেকোনো স্থায়ী বাসিন্দা বা বংশোদ্ভূত নাগরিক যিনি বর্তমানে ঢাকায় বসবাস করিতেছেন বা কর্মরত আছেন, প্রাপ্তবয়স্ক ও সুস্থ মস্তিষ্কের অধিকারী হইয়া গঠনতন্ত্র মানিয়া চলিতে সম্মত হইলে তিনি সদস্য হইতে পারিবেন।",
  },
  {
    clause: "ধারা ৬",
    title: "সদস্যের শ্রেণিবিভাগ",
    content: "সমিতির সদস্যপদ মূলত ৩টি প্রধান শ্রেণিতে বিভক্ত থাকিবে: (ক) সাধারণ সদস্য, (খ) আজীবন সদস্য, এবং (গ) দাতা সদস্য।",
  },
  {
    clause: "ধারা ৭",
    title: "ভর্তি ফি ও চাঁদার হার",
    content: "(ক) সাধারণ সদস্য: ভর্তি ফি এককালীন ৫০০/- (পাঁচশত) টাকা এবং মাসিক চাঁদা ২৫/- (পঁচিশ) টাকা। (খ) আজীবন সদস্য: এককালীন ১০,০০০/- (দশ হাজার) টাকা অনুদান প্রদান সাপেক্ষে। (গ) দাতা সদস্য: এককালীন সর্বনিম্ন ৫০,০০০/- (পঞ্চাশ হাজার) টাকা অনুদান প্রদান সাপেক্ষে।",
  },
  {
    clause: "ধারা ৮",
    title: "সদস্যপদ বাতিল ও পদত্যাগ",
    content: "কোনো সদস্য স্বেচ্ছায় পদত্যাগ করিলে, সমিতির স্বার্থবিরোধী কার্যকলাপে জড়িত হইলে বা একাধারে ১ বছর চাঁদা পরিশোধ না করিলে কার্যনির্বাহী পরিষদের দুই-তৃতীয়াংশ সদস্যের ভোটে সদস্যপদ স্থগিত বা বাতিল হইতে পারে।",
  },
  {
    clause: "ধারা ৯",
    title: "সাংগঠনিক কাঠামো",
    content: "সমিতির সার্বিক কার্যক্রম পরিচালনার জন্য দুইটি প্রধান পরিষদ থাকিবে: (১) সাধারণ পরিষদ এবং (২) কার্যনির্বাহী পরিষদ। এছাড়া একটি সম্মানিত উপদেষ্টা পরিষদ থাকিবে।",
  },
  {
    clause: "ধারা ১০",
    title: "উপদেষ্টা পরিষদ (Advisory Board)",
    content: "সমিতির প্রবীণ, বিজ্ঞ ও গুণী ব্যক্তিবর্গের সমন্বয়ে অনধিক ১৫ (পনের) সদস্য বিশিষ্ট একটি উপদেষ্টা পরিষদ থাকিবে, যাঁহারা সমিতিকে দিকনির্দেশনা ও সার্বিক পরামর্শ প্রদান করিবেন।",
  },
  {
    clause: "ধারা ১১",
    title: "কার্যনির্বাহী পরিষদ (Executive Council)",
    content: "সমিতির দৈনন্দিন ও নীতিনির্ধারণী কার্যক্রম পরিচালনার জন্য মোট ৫১ (একান্ন) সদস্য বিশিষ্ট একটি কার্যনির্বাহী পরিষদ থাকিবে।",
  },
  {
    clause: "ধারা ১২",
    title: "কার্যনির্বাহী পরিষদের মেয়াদ",
    content: "কার্যনির্বাহী পরিষদের কার্যকাল হইবে দায়িত্ব গ্রহণের দিন হইতে পরবর্তী ২ (দুই) বছর পর্যন্ত।",
  },
  {
    clause: "ধারা ১৩",
    title: "বার্ষিক সাধারণ সভা (AGM)",
    content: "প্রতি বছর অন্তত একবার সাধারণ পরিষদের সভা (AGM) আহ্বান করিতে হইবে। সাধারণ সম্পাদক সভাপতির সহিত পরামর্শক্রমে নোটিশ জারি করিবেন।",
  },
  {
    clause: "ধারা ১৪",
    title: "তহবিল পরিচালনা ও ব্যাংক হিসাব",
    content: "সমিতির তহবিল কোনো তফসিলি ব্যাংকে সভাপতি, সাধারণ সম্পাদক ও কোষাধ্যক্ষের যৌথ স্বাক্ষরে পরিচালিত হইবে। চেক উত্তোলনে কোষাধ্যক্ষ ও সাধারণ সম্পাদক অথবা সভাপতির স্বাক্ষর বাধ্যতামূলক।",
  },
  {
    clause: "ধারা ১৫ থেকে ৩৫",
    title: "নির্বাচন পদ্ধতি, অডিট ও গঠনতন্ত্র সংশোধন",
    content: "নির্বাচন কমিশন গঠন, প্রতি দুই বছর পর নিরপেক্ষ ভোটাভুটি, অনুমোদিত অডিটর দ্বারা প্রতি বছরের আয়-ব্যয়ের হিসাব নিরীক্ষা এবং সাধারণ সভার দুই-তৃতীয়াংশ সংখ্যাগরিষ্ঠতার মাধ্যমে গঠনতন্ত্রের যেকোনো ধারা সংশোধনের বিধান সংরক্ষিত।",
  },
];

export default function ConstitutionPage() {
  const [openClause, setOpenClause] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClauses = constitutionClauses.filter(
    (c) =>
      c.clause.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7] font-bangla">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-[#0B3B2C] text-xs font-bold mb-3">
            <BookOpen className="w-3.5 h-3.5 text-[#FBBF24]" />
            গঠনতন্ত্র ও বিধিমালা
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B3B2C]">
            কিশোরগঞ্জ উপজেলা সমিতি — পূর্ণাঙ্গ গঠনতন্ত্র
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-xl mx-auto">
            সমিতির আদর্শ, সদস্যপদের নিয়মাবলী, অধিকার, নির্বাচন ও সাংগঠনিক তহবিল পরিচালনার ১ থেকে ৩৫টি ধারা।
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => window.print()}
              className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-[#0B3B2C] text-[#FBBF24] hover:bg-[#145A43] shadow-md transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-[#FBBF24]" />
              সম্পূর্ণ গঠনতন্ত্র (PDF) ডাউনলোড
            </button>
          </div>
        </div>

        {/* Search Filter */}
        <div className="relative mb-8">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ধারা নম্বর বা বিষয় দিয়ে গঠনতন্ত্রে খুঁজুন (উদা: চাঁদা, নির্বাচন, সদস্যপদ)..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 bg-white text-sm focus:border-[#0B3B2C] shadow-xs outline-none"
          />
        </div>

        {/* Clauses Accordion */}
        <div className="space-y-3">
          {filteredClauses.map((item, index) => {
            const isOpen = openClause === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenClause(isOpen ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-[#0B3B2C] font-mono text-xs font-bold border border-emerald-200">
                      {item.clause}
                    </span>
                    <span className="font-bold text-slate-800 text-sm sm:text-base">
                      {item.title}
                    </span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#0B3B2C]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-2 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-emerald-50/20">
                    <p>{item.content}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

