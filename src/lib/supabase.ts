import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qykkwuyxxcncrwgdewblc.supabase.co';
const supabaseAnonKey = 'sb_publishable_VXNe2TRP-cFZkBi5B8JJUQ_1MEL_J1O';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);