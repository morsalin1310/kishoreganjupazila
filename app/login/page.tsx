"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn, Phone, KeyRound, ShieldCheck, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Instant simulation login
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 600);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7]">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xl font-bangla">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="relative w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden ring-4 ring-[#FBBF24] p-0.5 shadow-md">
            <Image src="/logo.png" alt="সমিতি লোগো" fill className="object-contain" priority />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B3B2C]">
            কিশোরগঞ্জ উপজেলা সমিতি, ঢাকা
          </h2>
          <p className="text-[#FBBF24] text-xs font-semibold mt-0.5">
            শেকড়ের টানে একতার বন্ধনে
          </p>
          <div className="mt-3 text-slate-500 text-xs">
            সদস্য পোর্টাল ও ড্যাশবোর্ড লগইন
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              মোবাইল নম্বর
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="০১৭১১-XXXXXX"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#0B3B2C] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              পাসওয়ার্ড / পিন নম্বর
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#0B3B2C] outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-1.5 text-slate-600 cursor-pointer">
              <input type="checkbox" className="rounded text-[#0B3B2C]" defaultChecked />
              <span>আমাকে মনে রাখুন</span>
            </label>
            <a href="#" className="text-[#00A3E0] hover:underline">
              পাসওয়ার্ড ভুলে গেছেন?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-bold text-sm bg-[#0B3B2C] text-[#FBBF24] hover:bg-[#145A43] shadow-md transition-all flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-[#FBBF24] border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>লগইন করুন</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-600">
          <span>এখনও সদস্য হননি? </span>
          <Link href="/register" className="font-bold text-[#0B3B2C] hover:underline">
            নতুন সদস্যের আবেদন করুন
          </Link>
        </div>

        <div className="mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-800 text-center flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>অ্যাডমিন ড্যাশবোর্ড দেখতে চান? </span>
          <Link href="/admin" className="font-bold underline ml-1">
            অ্যাডমিন প্যানেল
          </Link>
        </div>
      </div>
    </div>
  );
}

