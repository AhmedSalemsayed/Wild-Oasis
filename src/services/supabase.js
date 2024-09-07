import { createClient } from "@supabase/supabase-js";
 export const supabaseUrl = "https://lebebwjgvgavccphckur.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlYmVid2pndmdhdmNjcGhja3VyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgzMjcyNDAsImV4cCI6MjAyMzkwMzI0MH0.bK6-6vXriTX-jqC6NW2XoBkW9pRL2QfWIPYnUKxzLa8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
