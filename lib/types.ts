export type MemberType = 'general' | 'lifetime' | 'donor';

export type MemberStatus = 'pending' | 'approved' | 'rejected';

export type UserRole = 'super_admin' | 'admin' | 'member' | 'guest';

export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

// কিশোরগঞ্জ উপজেলা, নীলফামারী জেলার ৯টি ইউনিয়ন
export const NILPHAMARI_KISHOREGANJ_UNIONS = [
  "কিশোরগঞ্জ সদর",
  "পুটিমারী",
  "চাঁদখানা",
  "বাহাগিলি",
  "রণচণ্ডী",
  "বড়ভিটা",
  "নিতাই",
  "মাগুড়া",
  "গাড়াগ্রাম",
] as const;

export type KishoreganjUnion = typeof NILPHAMARI_KISHOREGANJ_UNIONS[number];

export interface SiteSettings {
  siteTitle: string;
  subTitle: string;
  slogan: string;
  announcementTicker: string;
  heroHeadline: string;
  heroSubheadline: string;
  contactAddress: string;
  contactPhone: string;
  contactEmail: string;
  statMembers: string;
  statExecutive: string;
  statDonors: string;
  statUnions: string;
}

export interface MemberProfile {
  id: string;
  member_no: string; // e.g. KUSD-2026-0001
  full_name: string;
  father_name: string;
  mother_name: string;
  member_type: MemberType;
  phone: string;
  email?: string;
  blood_group: BloodGroup;
  permanent_district: "নীলফামারী";
  permanent_upazila: "কিশোরগঞ্জ";
  permanent_union: KishoreganjUnion;
  permanent_village: string;
  present_dhaka_address: string;
  dhaka_area: string;
  profession: string;
  workplace?: string;
  education?: string;
  nid_no?: string;
  photo_url?: string;
  status: MemberStatus;
  created_at: string;
  approved_at?: string;
}

export interface PaymentRecord {
  id: string;
  member_id: string;
  member_name: string;
  member_no?: string;
  fee_type: 'registration' | 'monthly_fee' | 'welfare_donation';
  amount: number;
  payment_method: 'bkash' | 'nagad' | 'rocket' | 'bank';
  sender_number: string;
  trx_id: string;
  receipt_no: string;
  status: 'pending' | 'verified' | 'rejected';
  created_at: string;
}

export interface NoticeItem {
  id: string;
  title: string;
  slug: string;
  content: string;
  published_date: string;
  is_pinned: boolean;
  category: 'general' | 'meeting' | 'emergency' | 'event';
  attachment_url?: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  banner_url?: string;
}

export interface CommitteeMember {
  id: string;
  name: string;
  designation: string;
  committee_type: 'advisory' | 'executive';
  order_index: number;
  phone: string;
  email?: string;
  union: KishoreganjUnion;
  village: string;
  photo_url?: string;
}

export interface BloodDonor {
  id: string;
  name: string;
  blood_group: BloodGroup;
  dhaka_area: string;
  phone: string;
  union: KishoreganjUnion;
  last_donation_date?: string;
  is_available: boolean;
}

export interface WelfareApplication {
  id: string;
  applicant_name: string;
  phone: string;
  union: KishoreganjUnion;
  village: string;
  category: 'education' | 'treatment' | 'emergency';
  amount_requested: number;
  description: string;
  documents_url?: string;
  status: 'submitted' | 'under_review' | 'approved' | 'disbursed';
  created_at: string;
}
