"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { MemberProfile } from "@/lib/types";
import { Download, Printer, ShieldCheck, Sparkles, CheckCircle2, MapPin } from "lucide-react";
import html2canvas from "html2canvas";

interface DigitalIdCardProps {
  member: MemberProfile;
}

export default function DigitalIdCard({ member }: DigitalIdCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const getMemberTypeTitle = (type: string) => {
    switch (type) {
      case "lifetime":
        return { label: "আজীবন সদস্য", color: "bg-amber-100 text-amber-900 border-amber-300" };
      case "donor":
        return { label: "দাতা সদস্য", color: "bg-purple-100 text-purple-900 border-purple-300" };
      default:
        return { label: "সাধারণ সদস্য", color: "bg-emerald-100 text-emerald-900 border-emerald-300" };
    }
  };

  const typeInfo = getMemberTypeTitle(member.member_type);

  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    try {
      setDownloading(true);
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#ffffff",
      });
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `ID-CARD-${member.member_no || "KUSD"}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("ID Card download error:", err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center font-bangla">
      {/* Printable ID Card */}
      <div
        ref={cardRef}
        className="w-[340px] sm:w-[380px] rounded-3xl overflow-hidden shadow-2xl border-2 border-emerald-900/40 bg-white select-none print:shadow-none print:border-slate-300 text-slate-800"
      >
        {/* Card Header */}
        <div className="bg-[#0B3B2C] text-white p-4 relative overflow-hidden text-center border-b-2 border-[#FBBF24]">
          <div className="flex items-center justify-center gap-2.5 relative z-10 mb-1">
            <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-[#FBBF24] bg-white p-0.5 shrink-0 shadow-md">
              <Image
                src="/logo.png"
                alt="সমিতি লোগো"
                fill
                sizes="44px"
                className="object-contain"
              />
            </div>
            <div className="text-left">
              <h3 className="text-base font-extrabold text-white tracking-tight leading-tight">
                কিশোরগঞ্জ উপজেলা সমিতি, ঢাকা
              </h3>
              <p className="text-[10px] text-[#FBBF24] font-semibold">
                জেলা: নীলফামারী | শেকড়ের টানে একতার বন্ধনে
              </p>
            </div>
          </div>

          <div className="inline-block bg-[#06261C] border border-[#FBBF24]/60 rounded-full px-3 py-0.5 text-[9px] font-bold text-[#FBBF24] tracking-wider uppercase mt-1">
            ডিজিটাল স্মার্ট সদস্য কার্ড
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 bg-gradient-to-b from-emerald-50/40 via-white to-slate-50 relative">
          <div className="flex items-start gap-4">
            {/* Member Photo */}
            <div className="flex flex-col items-center shrink-0">
              <div className="relative w-24 h-28 rounded-2xl overflow-hidden ring-2 ring-[#0B3B2C] shadow-md bg-slate-100 flex items-center justify-center">
                {member.photo_url ? (
                  <Image
                    src={member.photo_url}
                    alt={member.full_name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-emerald-50 text-emerald-800">
                    <span className="text-2xl font-bold">
                      {member.full_name.slice(0, 1)}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500">ছবি</span>
                  </div>
                )}
              </div>

              {/* Blood Group Badge */}
              <div className="mt-2 bg-rose-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                <span>রক্ত:</span>
                <span>{member.blood_group}</span>
              </div>
            </div>

            {/* Member Details */}
            <div className="flex-1 text-xs space-y-1.5">
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">নাম</span>
                <span className="text-sm font-extrabold text-[#0B3B2C] leading-snug block">
                  {member.full_name}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 block uppercase">সদস্য নম্বর</span>
                <span className="text-xs font-bold text-slate-900 tracking-wider font-mono bg-slate-100 px-2 py-0.5 rounded border border-slate-200 inline-block">
                  {member.member_no || "অনুমোদনাধীন"}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 block uppercase">সদস্যের ধরন</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md border inline-block ${typeInfo.color}`}
                >
                  {typeInfo.label}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 block uppercase">মূল ইউনিয়ন ও গ্রাম</span>
                <span className="text-xs font-semibold text-slate-800">
                  {member.permanent_union}, {member.permanent_village}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 block uppercase">উপজেলা ও জেলা</span>
                <span className="text-xs font-medium text-slate-700">
                  কিশোরগঞ্জ, নীলফামারী
                </span>
              </div>
            </div>
          </div>

          {/* QR Code & Sign */}
          <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-white rounded-lg border border-slate-200 shadow-xs">
                <QRCodeSVG
                  value={`https://kusd.org.bd/verify/${member.member_no || member.id}`}
                  size={46}
                  level="M"
                />
              </div>
              <div className="text-[10px] text-slate-500 leading-tight">
                <span className="font-bold text-emerald-800 block flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  যাচাইকৃত স্মার্ট কার্ড
                </span>
                <span>স্ক্যান করে বৈধতা যাচাই করুন</span>
              </div>
            </div>

            <div className="text-right">
              <div className="h-6 flex items-end justify-end">
                <span className="font-serif italic text-xs text-slate-700 font-semibold border-b border-slate-400 pb-0.5">
                  কাজী তানভীর
                </span>
              </div>
              <span className="text-[9px] text-slate-500 block mt-0.5">
                সাধারণ সম্পাদক
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-100 px-4 py-2 text-center text-[10px] text-slate-600 border-t border-slate-200">
          <span>অস্থায়ী কার্যালয়: উত্তরা, ঢাকা-১২৩০ | হেল্পলাইন: ০১৩৫৩-৭৪৩৫৪৭</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mt-6 no-print">
        <button
          onClick={handleDownloadImage}
          disabled={downloading}
          className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-[#0B3B2C] text-white hover:bg-[#145A43] shadow-md transition-all flex items-center gap-2 active:scale-95"
        >
          {downloading ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
            <Download className="w-4 h-4 text-[#FBBF24]" />
          )}
          <span>আইডি কার্ড ডাউনলোড (PNG)</span>
        </button>

        <button
          onClick={() => window.print()}
          className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 shadow-sm transition-all flex items-center gap-2 active:scale-95"
        >
          <Printer className="w-4 h-4 text-[#00A3E0]" />
          <span>প্রিন্ট করুন</span>
        </button>
      </div>
    </div>
  );
}
