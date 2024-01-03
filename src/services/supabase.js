import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://ynufssvizvlbtsniryxv.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InludWZzc3ZpenZsYnRzbmlyeXh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE4NDkzMjUsImV4cCI6MjAxNzQyNTMyNX0.mN8qqR6TsGMitvbrxVotgXYn7l0pxzYOoFIKWqpXlxI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;