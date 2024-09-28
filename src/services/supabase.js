import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://kbjgtfrxqnrneoqhqtpz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtiamd0ZnJ4cW5ybmVvcWhxdHB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYzNzg4ODgsImV4cCI6MjA0MTk1NDg4OH0.jc1l2gV5zJxKmrGbClMo9qWKU94QpYKaKlo1Z5_USc0";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
