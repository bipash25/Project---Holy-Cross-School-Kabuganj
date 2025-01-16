import { supabase } from "./supabase";
import { ApiError } from "./error-handling";
import { PostgrestError } from "@supabase/supabase-js";

export interface NewsEvent {
  id: string;
  title: string;
  description: string;
  type: "news" | "event";
  date: string;
  time?: string;
  end_time?: string;
  venue?: string;
  organizer?: string;
  contact_info?: string;
  registration_link?: string;
  image_url?: string;
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
  if (!value || value.trim() === "") return null;
  return value.trim();
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

        // Clean up the data - convert empty strings to null for optional fields
        const cleanedData = {
          title: newsEvent.title.trim(),
          description: newsEvent.description.trim(),
          type: newsEvent.type,
          date: newsEvent.date,
          time: convertEmptyToNull(newsEvent.time),
          end_time: convertEmptyToNull(newsEvent.end_time),
          venue: convertEmptyToNull(newsEvent.venue),
          organizer: convertEmptyToNull(newsEvent.organizer),
          contact_info: convertEmptyToNull(newsEvent.contact_info),
          registration_link: convertEmptyToNull(newsEvent.registration_link),
          image_url: convertEmptyToNull(newsEvent.image_url),
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
        const { data, error } = await supabase
          .from("news_events")
          .update({ ...updates, updated_at: new Date().toISOString() })
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
