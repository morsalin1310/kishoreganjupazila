"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AnimatedLogo from "@/components/common/AnimatedLogo";
import { MemberType, BloodGroup, NILPHAMARI_KISHOREGANJ_UNIONS, KishoreganjUnion } from "@/lib/types";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  Droplet,
  CreditCard,
  CheckCircle,
  FileText,
  Printer,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  Compass,
} from "lucide-react";

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [memberType, setMemberType] = useState<MemberType>("general");

  // Form Fields
  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    motherName: "",
    phone: "",
    email: "",
    bloodGroup: "B+" as BloodGroup,
    district: "নীলফামারী",
    upazila: "কিশোরগঞ্জ",
    union: "কিশোরগঞ্জ সদর" as KishoreganjUnion,
    village: "",
    dhakaArea: "উত্তরা",
    dhakaAddress: "",
    profession: "",
    workplace: "",
    education: "",
    nidNo: "",
    paymentMethod: "bkash",
    senderNumber: "",
    trxId: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [receiptNumber, setReceiptNumber] = useState("");

  const feeAmount =
    memberType === "general"
      ? 500
      : memberType === "lifetime"
      ? 10000
      : 50000;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedReceipt = `REC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setReceiptNumber(generatedReceipt);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7] font-bangla">
      <div className="max-w-3xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-10">
          <div className="mb-4">
            <AnimatedLogo size="md" />
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100/90 text-[#0B3B2C] text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#FBBF24]" />
            অনলাইন সদস্য নিবন্ধন পোর্টাল
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B3B2C]">
            কিশোরগঞ্জ উপজেলা সমিতি, ঢাকা (নীলফামারী)
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-lg mx-auto">
            নীলফামারী জেলার কিশোরগঞ্জ উপজেলার ৯টি ইউনিয়নের ঢাকায় বসবাসরত ভাই-বোনদের জন্য অনলাইন সদস্যপদ আবেদন ফরম।
          </p>
        </div>

        {/* Steps Progress Indicator */}
        {!submitted && (
          <div className="mb-10">
            <div className="flex items-center justify-between max-w-md mx-auto relative">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 z-0"></div>
              <div
                className="absolute top-1/2 left-0 h-1 bg-[#0B3B2C] -translate-y-1/2 z-0 transition-all duration-300"
                style={{ width: `${((step - 1) / 3) * 100}%` }}
              ></div>

              {[
                { num: 1, title: "সদস্যপদ" },
                { num: 2, title: "ব্যক্তিগত তথ্য" },
                { num: 3, title: "ঠিকানা ও পেশা" },
                { num: 4, title: "ফি ও পেমেন্ট" },
              ].map((s) => (
                <div key={s.num} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                      step >= s.num
                        ? "bg-[#0B3B2C] text-[#FBBF24] ring-4 ring-emerald-100"
                        : "bg-white text-slate-400 border-2 border-slate-300"
                    }`}
                  >
                    {s.num}
                  </div>
                  <span
                    className={`text-[11px] font-medium mt-1 ${
                      step >= s.num ? "text-[#0B3B2C] font-bold" : "text-slate-400"
                    }`}
                  >
                    {s.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Form Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xl">
          {submitted ? (
            /* Submission & Money Receipt View */
            <div className="text-center font-bangla">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#0B3B2C] flex items-center justify-center mx-auto mb-4 ring-8 ring-emerald-50">
                <CheckCircle className="w-10 h-10 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-[#0B3B2C] mb-1">
                আবেদন সফলভাবে গৃহীত হয়েছে!
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mb-8">
                আপনার আবেদনটি যাচাইকরণের পর সদস্য নম্বর অ্যালট হবে ও ডিজিটাল স্মার্ট আইডি কার্ড সক্রিয় হবে।
              </p>

              {/* Digital Money Receipt */}
              <div className="bg-gradient-to-b from-slate-50 to-white rounded-2xl p-6 border-2 border-emerald-900/20 text-left max-w-lg mx-auto shadow-sm mb-8 print:border-black">
                <div className="flex items-center justify-between border-b pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden ring-1 ring-[#FBBF24]">
                      <Image src="/logo.png" alt="লোগো" fill className="object-contain" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#0B3B2C]">
                        কিশোরগঞ্জ উপজেলা সমিতি, ঢাকা (নীলফামারী)
                      </h4>
                      <p className="text-[10px] text-[#FBBF24] font-semibold">
                        অফিশিয়াল ডিজিটাল মানি রসিদ
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block">রসিদ নম্বর</span>
                    <span className="text-xs font-mono font-bold text-slate-800">
                      {receiptNumber}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                  <div>
                    <span className="text-[10px] text-slate-500 block">আবেদনকারীর নাম</span>
                    <span className="font-bold text-slate-800">{formData.fullName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">মোবাইল নম্বর</span>
                    <span className="font-medium text-slate-800">{formData.phone}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">স্থায়ী ইউনিয়ন ও গ্রাম</span>
                    <span className="font-bold text-slate-800">
                      {formData.union}, {formData.village}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">সদস্যপদের ধরন</span>
                    <span className="font-bold text-emerald-800">
                      {memberType === "general"
                        ? "সাধারণ সদস্য"
                        : memberType === "lifetime"
                        ? "আজীবন সদস্য"
                        : "দাতা সদস্য"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">রক্তের গ্রুপ</span>
                    <span className="font-bold text-rose-600">{formData.bloodGroup}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">পেমেন্ট মেথড ও TrxID</span>
                    <span className="font-mono text-slate-800 uppercase">
                      {formData.paymentMethod} - {formData.trxId || "N/A"}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-3 flex items-center justify-between bg-emerald-50/70 p-3 rounded-xl border border-emerald-200">
                  <span className="font-bold text-[#0B3B2C] text-sm">পরিশোধিত মোট অর্থ:</span>
                  <span className="text-lg font-extrabold text-[#0B3B2C]">
                    ৳ {feeAmount.toLocaleString("bn-BD")} টাকা
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-[#0B3B2C] text-white hover:bg-[#145A43] shadow-md transition-all flex items-center gap-2"
                >
                  <Printer className="w-4 h-4 text-[#FBBF24]" />
                  রসিদ প্রিন্ট করুন
                </button>
                <Link
                  href="/dashboard"
                  className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-[#00A3E0] text-white hover:bg-[#0284C7] shadow-md transition-all"
                >
                  ড্যাশবোর্ডে যান
                </Link>
                <Link
                  href="/"
                  className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold border border-slate-300 text-slate-700 hover:bg-slate-50"
                >
                  হোমে ফিরে যান
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={step === 4 ? handleFinalSubmit : handleNext}>
              {/* STEP 1: Member Tier Selection */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-[#0B3B2C] mb-1">
                      ধাপ ১: আপনার সদস্যপদের ধরন নির্বাচন করুন
                    </h3>
                    <p className="text-slate-500 text-xs">
                      গঠনতন্ত্র অনুযায়ী আপনি যে ক্যাটাগরির সদস্য হতে চান সেটি নির্বাচন করুন।
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* General Member */}
                    <div
                      onClick={() => setMemberType("general")}
                      className={`cursor-pointer rounded-2xl p-5 border-2 transition-all relative ${
                        memberType === "general"
                          ? "border-[#0B3B2C] bg-emerald-50/50 shadow-md ring-2 ring-emerald-200"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                          ভোটাধিকার সহ
                        </span>
                        {memberType === "general" && (
                          <CheckCircle className="w-5 h-5 text-[#0B3B2C]" />
                        )}
                      </div>
                      <h4 className="text-base font-bold text-slate-800">সাধারণ সদস্য</h4>
                      <div className="mt-3 mb-2">
                        <span className="text-2xl font-black text-[#0B3B2C]">৳ ৫০০</span>
                        <span className="text-xs text-slate-500 block">
                          এককালীন নিবন্ধন ফি + ২৫ টাকা/মাস
                        </span>
                      </div>
                      <ul className="text-xs text-slate-600 space-y-1.5 mt-3 pt-3 border-t border-slate-100">
                        <li>✓ নির্বাচন ও ভোটাধিকার</li>
                        <li>✓ ডিজিটাল আইডি কার্ড</li>
                        <li>✓ সকল কার্যক্রমে অংশগ্রহণ</li>
                      </ul>
                    </div>

                    {/* Lifetime Member */}
                    <div
                      onClick={() => setMemberType("lifetime")}
                      className={`cursor-pointer rounded-2xl p-5 border-2 transition-all relative ${
                        memberType === "lifetime"
                          ? "border-[#0B3B2C] bg-amber-50/40 shadow-md ring-2 ring-amber-200"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                          জনপ্রিয় পছন্দ
                        </span>
                        {memberType === "lifetime" && (
                          <CheckCircle className="w-5 h-5 text-[#0B3B2C]" />
                        )}
                      </div>
                      <h4 className="text-base font-bold text-slate-800">আজীবন সদস্য</h4>
                      <div className="mt-3 mb-2">
                        <span className="text-2xl font-black text-[#0B3B2C]">৳ ১০,০০০</span>
                        <span className="text-xs text-slate-500 block">এককালীন অনুদান (মাসিক চাঁদা মুক্ত)</span>
                      </div>
                      <ul className="text-xs text-slate-600 space-y-1.5 mt-3 pt-3 border-t border-slate-100">
                        <li>✓ কোনো মাসিক চাঁদা দিতে হবে না</li>
                        <li>✓ বিশেষ গোল্ডেন ডিজিটাল আইডি কার্ড</li>
                        <li>✓ বিশেষ সম্মাননা ও ভোটাধিকার</li>
                      </ul>
                    </div>

                    {/* Donor Member */}
                    <div
                      onClick={() => setMemberType("donor")}
                      className={`cursor-pointer rounded-2xl p-5 border-2 transition-all relative ${
                        memberType === "donor"
                          ? "border-[#0B3B2C] bg-purple-50/40 shadow-md ring-2 ring-purple-200"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                          দাতা সদস্য
                        </span>
                        {memberType === "donor" && (
                          <CheckCircle className="w-5 h-5 text-[#0B3B2C]" />
                        )}
                      </div>
                      <h4 className="text-base font-bold text-slate-800">দাতা সদস্য</h4>
                      <div className="mt-3 mb-2">
                        <span className="text-2xl font-black text-[#0B3B2C]">৳ ৫০,০০০+</span>
                        <span className="text-xs text-slate-500 block">এককালীন সর্বোচ্চ সহায়তা</span>
                      </div>
                      <ul className="text-xs text-slate-600 space-y-1.5 mt-3 pt-3 border-t border-slate-100">
                        <li>✓ সমিতির স্থায়ী দাতা তালিকায় নাম</li>
                        <li>✓ আজীবন বিশেষ মর্যাদা</li>
                        <li>✓ স্মারক ক্রেস্ট ও সম্মাননা</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      className="px-8 py-3 rounded-full text-sm font-bold bg-[#0B3B2C] text-[#FBBF24] hover:bg-[#145A43] shadow-md transition-all flex items-center gap-2"
                    >
                      <span>পরবর্তী ধাপ</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Personal Information */}
              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-[#0B3B2C] mb-1">
                    ধাপ ২: ব্যক্তিগত ও পারিবারিক তথ্যাবলি
                  </h3>
                  <p className="text-slate-500 text-xs mb-4">
                    সদস্য কার্ডে প্রদর্শনের জন্য আপনার সঠিক তথ্য প্রদান করুন।
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        পূর্ণ নাম (বাংলায়) *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder="উদা: মো. কামরুল হাসান"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#0B3B2C] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        মোবাইল নম্বর *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="০১৭১১-XXXXXX"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#0B3B2C] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        পিতার নাম *
                      </label>
                      <input
                        type="text"
                        name="fatherName"
                        value={formData.fatherName}
                        onChange={handleChange}
                        required
                        placeholder="পিতার নাম"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#0B3B2C] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        মাতার নাম *
                      </label>
                      <input
                        type="text"
                        name="motherName"
                        value={formData.motherName}
                        onChange={handleChange}
                        required
                        placeholder="মাতার নাম"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#0B3B2C] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        রক্তের গ্রুপ *
                      </label>
                      <select
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#0B3B2C] outline-none bg-white"
                      >
                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                          <option key={bg} value={bg}>
                            {bg}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        ইমেইল (যদি থাকে)
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@mail.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#0B3B2C] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        জাতীয় পরিচয়পত্র (NID) নম্বর
                      </label>
                      <input
                        type="text"
                        name="nidNo"
                        value={formData.nidNo}
                        onChange={handleChange}
                        placeholder="১০ বা ১৭ ডিজিটের এনআইডি"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#0B3B2C] outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-6 py-2.5 rounded-full text-xs font-semibold border border-slate-300 text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      পেছনে
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3 rounded-full text-sm font-bold bg-[#0B3B2C] text-[#FBBF24] hover:bg-[#145A43] shadow-md transition-all flex items-center gap-2"
                    >
                      <span>পরবর্তী ধাপ</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Address (Kishoreganj, Nilphamari 9 Unions) */}
              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-[#0B3B2C] mb-1">
                    ধাপ ৩: কিশোরগঞ্জ (নীলফামারী) ও বর্তমান ঢাকার ঠিকানা
                  </h3>
                  <p className="text-slate-500 text-xs mb-4">
                    কিশোরগঞ্জ উপজেলার আপনার মূল ইউনিয়ন ও বর্তমান ঢাকার ঠিকানার বিবরণ দিন।
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        স্থায়ী জেলা
                      </label>
                      <input
                        type="text"
                        value="নীলফামারী"
                        disabled
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-bold text-sm"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        উপজেলা
                      </label>
                      <input
                        type="text"
                        value="কিশোরগঞ্জ"
                        disabled
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-bold text-sm"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        কিশোরগঞ্জ উপজেলার ইউনিয়ন নির্বাচন করুন *
                      </label>
                      <select
                        name="union"
                        value={formData.union}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#0B3B2C] outline-none bg-white font-semibold text-[#0B3B2C]"
                      >
                        {NILPHAMARI_KISHOREGANJ_UNIONS.map((u) => (
                          <option key={u} value={u}>
                            {u} ইউনিয়ন
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        মূল গ্রাম / পাড়ার নাম *
                      </label>
                      <input
                        type="text"
                        name="village"
                        value={formData.village}
                        onChange={handleChange}
                        required
                        placeholder="উদা: কেশবা / ভেড়ভেড়ী / মেলাবর"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#0B3B2C] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        ঢাকায় বর্তমান এলাকা *
                      </label>
                      <select
                        name="dhakaArea"
                        value={formData.dhakaArea}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#0B3B2C] outline-none bg-white"
                      >
                        {[
                          "উত্তরা",
                          "মিরপুর",
                          "ধানমন্ডি",
                          "গুলশান-বনানী",
                          "মোহাম্মদপুর",
                          "বাড্ডা-রামপুরা",
                          "খিলগাঁও-বাসাবো",
                          "যাত্রাবাড়ী",
                          "পুরান ঢাকা",
                          "অন্যান্য",
                        ].map((area) => (
                          <option key={area} value={area}>
                            {area}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        পেশা *
                      </label>
                      <input
                        type="text"
                        name="profession"
                        value={formData.profession}
                        onChange={handleChange}
                        required
                        placeholder="উদা: সরকারি কর্মকর্তা / ব্যবসায়ী / চাকরিজীবী / ছাত্র"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#0B3B2C] outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        বর্তমান ঢাকার বিস্তারিত ঠিকানা *
                      </label>
                      <textarea
                        name="dhakaAddress"
                        value={formData.dhakaAddress}
                        onChange={handleChange}
                        required
                        rows={2}
                        placeholder="বাড়ি নম্বর, রোড নম্বর, সেক্টর/ব্লক..."
                        className="w-full px-4 py-2 rounded-xl border border-slate-300 text-sm focus:border-[#0B3B2C] outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-6 py-2.5 rounded-full text-xs font-semibold border border-slate-300 text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      পেছনে
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3 rounded-full text-sm font-bold bg-[#0B3B2C] text-[#FBBF24] hover:bg-[#145A43] shadow-md transition-all flex items-center gap-2"
                    >
                      <span>পেমেন্ট ধাপে যান</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: Payment */}
              {step === 4 && (
                <div className="space-y-5">
                  <h3 className="text-lg font-bold text-[#0B3B2C] mb-1">
                    ধাপ ৪: নিবন্ধন ফি ও পেমেন্ট সম্পন্নকরণ
                  </h3>
                  <p className="text-slate-500 text-xs mb-4">
                    বিকাশ বা নগদের মাধ্যমে সমিতির অফিশিয়াল নম্বরে ফি প্রেরণ করে TrxID প্রদান করুন।
                  </p>

                  <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-700 font-semibold">নির্বাচিত সদস্যপদ:</span>
                      <span className="font-bold text-[#0B3B2C]">
                        {memberType === "general"
                          ? "সাধারণ সদস্য"
                          : memberType === "lifetime"
                          ? "আজীবন সদস্য"
                          : "দাতা সদস্য"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-base mt-2 pt-2 border-t border-emerald-200/80">
                      <span className="font-bold text-[#0B3B2C]">পরিশোধযোগ্য মোট ফি:</span>
                      <span className="text-xl font-extrabold text-[#0B3B2C]">
                        ৳ {feeAmount.toLocaleString("bn-BD")} টাকা
                      </span>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-4 border border-slate-200 text-xs space-y-2">
                    <div className="font-bold text-slate-800">
                      💡 পেমেন্ট নির্দেশিকা (Send Money / Payment):
                    </div>
                    <p className="text-slate-600">
                      ১. আপনার বিকাশ বা নগদ অ্যাপ থেকে <strong>০১৩৫৩-৭৪৩৫৪৭</strong> নম্বরে ৳ {feeAmount} টাকা Send Money করুন।
                    </p>
                    <p className="text-slate-600">
                      ২. ট্রানজেকশন সফল হলে পাওয়া <strong>TrxID</strong> এবং আপনার প্রেরক নম্বরটি নিচের বক্সে লিখুন।
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        পেমেন্ট মেথড
                      </label>
                      <select
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#0B3B2C] outline-none bg-white font-sans"
                      >
                        <option value="bkash">বিকাশ (bKash)</option>
                        <option value="nagad">নগদ (Nagad)</option>
                        <option value="rocket">রকেট (Rocket)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        যে নম্বর থেকে টাকা পাঠিয়েছেন *
                      </label>
                      <input
                        type="tel"
                        name="senderNumber"
                        value={formData.senderNumber}
                        onChange={handleChange}
                        required
                        placeholder="০১৭XXXXXXXX"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#0B3B2C] outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        ট্রানজেকশন আইডি (TrxID) *
                      </label>
                      <input
                        type="text"
                        name="trxId"
                        value={formData.trxId}
                        onChange={handleChange}
                        required
                        placeholder="উদা: BKG9271K3L"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:border-[#0B3B2C] outline-none uppercase"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-6 py-2.5 rounded-full text-xs font-semibold border border-slate-300 text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      পেছনে
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3 rounded-full text-sm font-bold bg-[#FBBF24] text-[#0B3B2C] hover:bg-[#F59E0B] shadow-lg transition-all flex items-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5 text-[#0B3B2C]" />
                      <span>আবেদন ও পেমেন্ট জমা দিন</span>
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
