import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://awmagyuhmvntfhqtiwgu.supabase.co";
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3bWFneXVobXZudGZocXRpd2d1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA3NjEwNTAsImV4cCI6MjAxNjMzNzA1MH0.6wTV4oZwxFoYcQ7qLqP-3o4EqR_HRICTLDW_Zv3V_ho`;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
