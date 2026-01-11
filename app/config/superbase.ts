import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://nmxiuudlbhlnqbggtkwy.storage.supabase.co"; // must be https
const SUPABASE_ANON_KEY = "21f4bd0b59f93134d0c060cac3357948";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
