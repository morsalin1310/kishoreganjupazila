import Image from "next/image";
import Link from "next/link";
import { initialMembers } from "@/lib/dataStore";
import { ShieldCheck, CheckCircle2, User, Phone, Droplet, MapPin, Calendar, Award } from "lucide-react";

export default function VerifyMemberPage({ params }: { params: { id: string } }) {
  const member = initialMembers.find(
    (m) => m.member_no === params.id || m.id === params.id
  ) || initialMembers[0];

  return (
    <div className="min-h-[85vh] py-16 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7] flex items-center justify-center font-bangla">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border-2 border-emerald-900/20 shadow-2xl text-center">
        {/* Header Logo */}
        <div className="relative w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden ring-4 ring-[#FBBF24] p-0.5 shadow-md">
          <Image src="/logo.png" alt="লোগো" fill className="object-contain" priority />
        </div>
        <h2 className="text-lg font-bold text-[#0B3B2C]">কিশোরগঞ্জ উপজেলা সমিতি, ঢাকা</h2>
        <p className="text-[#FBBF24] text-xs font-semibold">জেলা: নীলফামারী | শেকড়ের টানে একতার বন্ধনে</p>

        {/* Verification Status Banner */}
        <div className="my-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          </div>
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
            সদস্যপদ বৈধ ও নিশ্চিতকৃত
          </span>
          <p className="text-[11px] text-emerald-700 mt-0.5">
            এই ব্যক্তি নীলফামারীর কিশোরগঞ্জ উপজেলা সমিতির একজন নিবন্ধিত ও সক্রিয় সদস্য।
          </p>
        </div>

        {/* Member Details */}
        <div className="text-left space-y-2.5 text-xs bg-slate-50 p-5 rounded-2xl border border-slate-200 mb-6">
          <div className="flex justify-between border-b pb-2">
            <span className="text-slate-500">সদস্য নম্বর:</span>
            <span className="font-mono font-bold text-slate-800">{member.member_no}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-slate-500">নাম:</span>
            <span className="font-bold text-[#0B3B2C] text-sm">{member.full_name}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-slate-500">ক্যাটাগরি:</span>
            <span className="font-bold text-slate-800">
              {member.member_type === "lifetime" ? "আজীবন সদস্য" : "সাধারণ সদস্য"}
            </span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-slate-500">রক্তের গ্রুপ:</span>
            <span className="font-bold text-rose-600">{member.blood_group}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-slate-500">মূল ইউনিয়ন ও গ্রাম:</span>
            <span className="font-medium text-slate-800">{member.permanent_union}, {member.permanent_village}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-slate-500">উপজেলা ও জেলা:</span>
            <span className="font-medium text-slate-800">কিশোরগঞ্জ, নীলফামারী</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">অনুমোদনের তারিখ:</span>
            <span className="font-medium text-slate-800">{member.approved_at || "২০২৬"}</span>
          </div>
        </div>

        <Link
          href="/"
          className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#0B3B2C] text-white hover:bg-[#145A43] transition-all block"
        >
          সমিতির মূল ওয়েবসাইটে প্রবেশ করুন
        </Link>
      </div>
    </div>
  );
}

