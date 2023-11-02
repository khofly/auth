import { SupabaseClient } from '@supabase/supabase-js';
import { create } from 'zustand';

interface SupabaseState {
  supabaseClient: SupabaseClient | null;
  setSupabaseClient: (c: SupabaseClient) => void;
}

export const useSupabaseStore = create<SupabaseState>()((set) => ({
  supabaseClient: null,
  setSupabaseClient: (c) => set({ supabaseClient: c }),
}));

// Export store hooks
// export * from './hooks/use-';
