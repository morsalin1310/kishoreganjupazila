"use client";

import { useState, useEffect } from "react";
import {
  defaultSiteSettings,
  initialNotices,
  initialCommittee,
  initialMembers,
  initialDonors,
} from "./dataStore";
import {
  SiteSettings,
  NoticeItem,
  CommitteeMember,
  MemberProfile,
  BloodDonor,
} from "./types";

const SETTINGS_KEY = "kusd_site_settings_v1";
const NOTICES_KEY = "kusd_notices_v1";
const COMMITTEE_KEY = "kusd_committee_v1";
const MEMBERS_KEY = "kusd_members_v1";
const DONORS_KEY = "kusd_donors_v1";

export function useSiteStore() {
  const [settings, setSettingsState] = useState<SiteSettings>(defaultSiteSettings);
  const [notices, setNoticesState] = useState<NoticeItem[]>(initialNotices);
  const [committee, setCommitteeState] = useState<CommitteeMember[]>(initialCommittee);
  const [members, setMembersState] = useState<MemberProfile[]>(initialMembers);
  const [donors, setDonorsState] = useState<BloodDonor[]>(initialDonors);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedSettings = localStorage.getItem(SETTINGS_KEY);
      if (storedSettings) setSettingsState(JSON.parse(storedSettings));

      const storedNotices = localStorage.getItem(NOTICES_KEY);
      if (storedNotices) setNoticesState(JSON.parse(storedNotices));

      const storedCommittee = localStorage.getItem(COMMITTEE_KEY);
      if (storedCommittee) setCommitteeState(JSON.parse(storedCommittee));

      const storedMembers = localStorage.getItem(MEMBERS_KEY);
      if (storedMembers) setMembersState(JSON.parse(storedMembers));

      const storedDonors = localStorage.getItem(DONORS_KEY);
      if (storedDonors) setDonorsState(JSON.parse(storedDonors));
    } catch (e) {
      console.warn("Storage read error:", e);
    } finally {
      setIsLoaded(true);
    }

    const handleStorageChange = () => {
      try {
        const storedSettings = localStorage.getItem(SETTINGS_KEY);
        if (storedSettings) setSettingsState(JSON.parse(storedSettings));

        const storedNotices = localStorage.getItem(NOTICES_KEY);
        if (storedNotices) setNoticesState(JSON.parse(storedNotices));

        const storedCommittee = localStorage.getItem(COMMITTEE_KEY);
        if (storedCommittee) setCommitteeState(JSON.parse(storedCommittee));

        const storedMembers = localStorage.getItem(MEMBERS_KEY);
        if (storedMembers) setMembersState(JSON.parse(storedMembers));
      } catch (e) {
        console.warn(e);
      }
    };

    window.addEventListener("kusd_store_updated", handleStorageChange);
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("kusd_store_updated", handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const triggerUpdate = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("kusd_store_updated"));
    }
  };

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettingsState((prev) => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
      } catch (e) {}
      triggerUpdate();
      return updated;
    });
  };

  const updateNotices = (newNotices: NoticeItem[]) => {
    setNoticesState(newNotices);
    try {
      localStorage.setItem(NOTICES_KEY, JSON.stringify(newNotices));
    } catch (e) {}
    triggerUpdate();
  };

  const updateCommittee = (newCommittee: CommitteeMember[]) => {
    setCommitteeState(newCommittee);
    try {
      localStorage.setItem(COMMITTEE_KEY, JSON.stringify(newCommittee));
    } catch (e) {}
    triggerUpdate();
  };

  const updateMembers = (newMembers: MemberProfile[]) => {
    setMembersState(newMembers);
    try {
      localStorage.setItem(MEMBERS_KEY, JSON.stringify(newMembers));
    } catch (e) {}
    triggerUpdate();
  };

  const updateDonors = (newDonors: BloodDonor[]) => {
    setDonorsState(newDonors);
    try {
      localStorage.setItem(DONORS_KEY, JSON.stringify(newDonors));
    } catch (e) {}
    triggerUpdate();
  };

  const resetToDefault = () => {
    localStorage.removeItem(SETTINGS_KEY);
    localStorage.removeItem(NOTICES_KEY);
    localStorage.removeItem(COMMITTEE_KEY);
    localStorage.removeItem(MEMBERS_KEY);
    localStorage.removeItem(DONORS_KEY);
    setSettingsState(defaultSiteSettings);
    setNoticesState(initialNotices);
    setCommitteeState(initialCommittee);
    setMembersState(initialMembers);
    setDonorsState(initialDonors);
    triggerUpdate();
  };

  return {
    settings,
    notices,
    committee,
    members,
    donors,
    isLoaded,
    updateSettings,
    updateNotices,
    updateCommittee,
    updateMembers,
    updateDonors,
    resetToDefault,
  };
}
