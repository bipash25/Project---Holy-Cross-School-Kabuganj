import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Missing Supabase environment variables. Please check your .env file.",
    { supabaseUrl: !!supabaseUrl, supabaseAnonKey: !!supabaseAnonKey },
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Test database connection
const testConnection = async () => {
  try {
    const { data, error } = await supabase
      .from("news_events")
      .select("count", { count: "exact", head: true });

    if (error) {
      console.error("Database connection test failed:", {
        error,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });
    } else {
      console.log("Database connection test successful:", { data });
    }
  } catch (error) {
    console.error("Unexpected error during database connection test:", error);
  }
};

// Run the test immediately
testConnection();
