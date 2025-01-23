import { supabase } from "./supabase";
import { ApiError } from "./error-handling";
import { PostgrestError } from "@supabase/supabase-js";

export interface NewsEvent {
  id: string;
  title: string;
  description: string;
  type: "news" | "event";
  date: string;
  time?: string | null;
  end_time?: string | null;
  venue?: string | null;
  organizer?: string | null;
  contact_info?: string | null;
  registration_link?: string | null;
  image_url?: string | null;
  created_at: string;
  updated_at: string;
}

const handleSupabaseError = (
  error: PostgrestError,
  operation: string,
  details?: any,
) => {
  console.error(`Database ${operation} error:`, {
    message: error.message,
    code: error.code,
    details: error.details,
    hint: error.hint,
    additionalDetails: details,
  });

  switch (error.code) {
    case "42P01":
      return new ApiError(
        "Database table not found. Please ensure all migrations have been run.",
        500,
      );
    case "23505":
      return new ApiError(
        "A record with this information already exists.",
        400,
      );
    case "23503":
      return new ApiError(
        "This operation would violate database constraints.",
        400,
      );
    case "42703":
      return new ApiError("Invalid column name in the request.", 400);
    case "22007":
      return new ApiError("Invalid date or time format", 400);
    default:
      return new ApiError(
        `${operation} failed: ${error.message}`,
        error.code ? parseInt(error.code) : 500,
      );
  }
};

const convertEmptyToNull = (
  value: string | undefined | null,
): string | null => {
  if (value === undefined || value === null || value.trim() === "") return null;
  return value.trim();
};

// New helper function to clean all optional fields in a news event
const cleanNewsEventData = (
  newsEvent: Partial<NewsEvent>,
): Partial<NewsEvent> => {
  const cleaned: Partial<NewsEvent> = { ...newsEvent };

  // List of optional fields that should be converted from empty string to null
  const optionalFields: (keyof NewsEvent)[] = [
    "time",
    "end_time",
    "venue",
    "organizer",
    "contact_info",
    "registration_link",
    "image_url",
  ];

  // Convert empty strings to null for optional fields
  optionalFields.forEach((field) => {
    if (field in cleaned) {
      cleaned[field] = convertEmptyToNull(cleaned[field] as string);
    }
  });

  // Trim required string fields if they exist
  if (cleaned.title) cleaned.title = cleaned.title.trim();
  if (cleaned.description) cleaned.description = cleaned.description.trim();

  return cleaned;
};

export const api = {
  news: {
    getAll: async (page: number = 1, pageSize: number = 9) => {
      try {
        const from = (page - 1) * pageSize;
        const to = from + pageSize - 1;

        const { data, error, count } = await supabase
          .from("news_events")
          .select("*", { count: "exact" })
          .order("date", { ascending: false })
          .range(from, to);

        if (error) throw handleSupabaseError(error, "fetch");
        return { data: data || [], count: count || 0 };
      } catch (error) {
        console.error("Error fetching all news:", error);
        if (error instanceof ApiError) throw error;
        throw new ApiError("Failed to fetch news items", 500);
      }
    },

    getRecent: async (limit: number = 3) => {
      try {
        const { data, error } = await supabase
          .from("news_events")
          .select("*")
          .order("date", { ascending: false })
          .limit(limit);

        if (error) throw handleSupabaseError(error, "fetch recent");
        return data || [];
      } catch (error) {
        console.error("Error fetching recent news:", error);
        if (error instanceof ApiError) throw error;
        throw new ApiError("Failed to fetch recent news items", 500);
      }
    },

    getById: async (id: string) => {
      try {
        const { data, error } = await supabase
          .from("news_events")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw handleSupabaseError(error, "fetch by id");
        if (!data) throw new ApiError("News item not found", 404);
        return data;
      } catch (error) {
        console.error("Error fetching news by id:", error);
        if (error instanceof ApiError) throw error;
        throw new ApiError("Failed to fetch news item", 500);
      }
    },

    create: async (
      newsEvent: Omit<NewsEvent, "id" | "created_at" | "updated_at">,
    ) => {
      try {
        // Validate required fields
        if (!newsEvent.title) throw new ApiError("Title is required", 400);
        if (!newsEvent.description)
          throw new ApiError("Description is required", 400);
        if (!newsEvent.type) throw new ApiError("Type is required", 400);
        if (!newsEvent.date) throw new ApiError("Date is required", 400);

        // Ensure type is valid
        if (!["news", "event"].includes(newsEvent.type)) {
          throw new ApiError('Type must be either "news" or "event"', 400);
        }

        // Clean up the data
        const cleanedData = {
          ...cleanNewsEventData(newsEvent),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        // Proceed with insert
        const { data, error } = await supabase
          .from("news_events")
          .insert([cleanedData])
          .select()
          .single();

        if (error) {
          console.error("Supabase insert error:", error);
          throw handleSupabaseError(error, "create", { cleanedData });
        }

        if (!data) {
          throw new ApiError("No data returned after creation", 500);
        }

        await api.activities.log(
          "create",
          `Created ${newsEvent.type}: ${newsEvent.title}`,
        );

        return data;
      } catch (error) {
        console.error("Error in news.create:", error);
        if (error instanceof ApiError) throw error;
        throw new ApiError(
          "An unexpected error occurred while creating the news item. Please try again.",
          500,
        );
      }
    },

    update: async (id: string, updates: Partial<NewsEvent>) => {
      try {
        // Clean the update data before sending to database
        const cleanedUpdates = {
          ...cleanNewsEventData(updates),
          updated_at: new Date().toISOString(),
        };

        const { data, error } = await supabase
          .from("news_events")
          .update(cleanedUpdates)
          .eq("id", id)
          .select()
          .single();

        if (error) throw handleSupabaseError(error, "update");
        if (!data) throw new ApiError("News item not found", 404);

        await api.activities.log(
          "update",
          `Updated ${data.type}: ${data.title}`,
        );
        return data;
      } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError("Failed to update news item", 500);
      }
    },

    delete: async (id: string) => {
      try {
        const { data, error } = await supabase
          .from("news_events")
          .delete()
          .eq("id", id)
          .select()
          .single();

        if (error) throw handleSupabaseError(error, "delete");
        if (!data) throw new ApiError("News item not found", 404);

        await api.activities.log(
          "delete",
          `Deleted ${data.type}: ${data.title}`,
        );
        return data;
      } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError("Failed to delete news item", 500);
      }
    },
  },

  activities: {
    log: async (action: string, description: string) => {
      try {
        const { error } = await supabase
          .from("activities")
          .insert([{ action, description }]);

        if (error) console.error("Failed to log activity:", error);
      } catch (error) {
        console.error("Failed to log activity:", error);
      }
    },
  },
};
