import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Tutorial = {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  github_url?: string;
  author_id: string;
  author_name: string;
  created_at: string;
  updated_at: string;
  is_approved: boolean;
  tags: string[];
};

export type Profile = {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  created_at: string;
};