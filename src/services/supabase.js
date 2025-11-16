import { createClient } from "@supabase/supabase-js";
//supabase url
const supabaseUrl = "https://tjmbfzoqmumrtwrygfuq.supabase.co";
//supubase key
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqbWJmem9xbXVtcnR3cnlnZnVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0Njk1NTAsImV4cCI6MjA3NjA0NTU1MH0.TMV38p7sowGR-s6FJYccAZCMo6r2qAPq8oFwLuOzPLs";
//create client
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
