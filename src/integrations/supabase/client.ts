// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://rvmzysvxxoaagfewvzia.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2bXp5c3Z4eG9hYWdmZXd2emlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMDI1MDAsImV4cCI6MjA2NDc3ODUwMH0.adUqhkehkCbvSyEuLVDgAheHS_L3ZImZwgfuiL2tjd4";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);