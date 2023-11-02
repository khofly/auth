import { create } from 'zustand';

import contentJson from 'public/locales/en.json';
import { IProfile, ITiers } from '@khofly/core';
import { Session } from '@supabase/supabase-js';

export type ITranslations = typeof contentJson;

interface GlobalState {
  language: 'en';
  content: ITranslations; // Content fetched from public/locales

  session: Session | null;
  setSession: (session: Session | null) => void;

  profile: IProfile | null;
  loadingProfile: boolean;
  setProfile: (profile: IProfile | null) => void;

  tier: ITiers;
  loadingTier: boolean;
  setTier: (profile: ITiers) => void;
}

export const useGlobalStore = create<GlobalState>()((set) => ({
  language: 'en',
  content: require(`../../../public/locales/en.json`),
  changeLanguage: (locale) =>
    set({
      language: locale,
      content: require(`../../../public/locales/${locale}.json`),
    }),

  session: null,
  setSession: (session) => set({ session }),

  profile: null,
  loadingProfile: true,
  setProfile: (profile) => set({ profile, loadingProfile: false }),

  tier: 1,
  loadingTier: true,
  setTier: (tier) => set({ tier, loadingTier: false }),
}));

// Export store hooks
export * from './hooks/use-translations';
