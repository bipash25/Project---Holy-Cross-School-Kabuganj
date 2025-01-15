import { supabase } from "./supabase";
import { ApiError } from "./error-handling";

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

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
}

export const api = {
  news: {
    getAll: async (page: number = 1, pageSize: number = 9) => {
      try {
        const from = (page - 1) * pageSize;
        const to = from + pageSize - 1;

        const [{ data, error }, { count, error: countError }] =
          await Promise.all([
            supabase
              .from("news_events")
              .select("*")
              .order("date", { ascending: false })
              .range(from, to),
            supabase
              .from("news_events")
              .select("*", { count: "exact", head: true }),
          ]);

        if (error) throw new ApiError(error.message, error.code);
        if (countError) throw new ApiError(countError.message, countError.code);
        if (!data) throw new ApiError("No data returned from the server");

        return { data, count: count || 0 };
      } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError("Failed to fetch news", 500);
      }
    },

    getRecent: async (limit: number = 3) => {
      try {
        const { data, error } = await supabase
          .from("news_events")
          .select("*")
          .order("date", { ascending: false })
          .limit(limit);

        if (error) throw new ApiError(error.message, error.code);
        if (!data) throw new ApiError("No data returned from the server");

        return data;
      } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError("Failed to fetch recent news", 500);
      }
    },

    getByType: async (
      type: "news" | "event",
      page: number = 1,
      pageSize: number = 9,
    ) => {
      try {
        const from = (page - 1) * pageSize;
        const to = from + pageSize - 1;

        const [{ data, error }, { count, error: countError }] =
          await Promise.all([
            supabase
              .from("news_events")
              .select("*")
              .eq("type", type)
              .order("date", { ascending: false })
              .range(from, to),
            supabase
              .from("news_events")
              .select("*", { count: "exact", head: true })
              .eq("type", type),
          ]);

        if (error) throw new ApiError(error.message, error.code);
        if (countError) throw new ApiError(countError.message, countError.code);
        if (!data) throw new ApiError("No data returned from the server");

        return { data, count: count || 0 };
      } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError(`Failed to fetch ${type} items`, 500);
      }
    },

    getById: async (id: string) => {
      try {
        const { data, error } = await supabase
          .from("news_events")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw new ApiError(error.message, error.code);
        if (!data) throw new ApiError("News item not found", 404);

        return data;
      } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError("Failed to fetch news item", 500);
      }
    },
  },
};
