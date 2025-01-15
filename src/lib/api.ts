import { supabase } from "./supabase";
import { ApiError } from "./error-handling";

export interface NewsEvent {
  id: string;
  title: string;
  description: string;
  type: "news" | "event";
  date: string;
  time?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id?: string;
  name: string;
  message: string;
  designation?: string;
  created_at?: string;
  updated_at?: string;
  author?: string;
  role?: string;
  quote?: string;
  image_url?: string;
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

        if (error) throw new ApiError(error.message, parseInt(error.code || '500'));
        if (countError) throw new ApiError(countError.message, parseInt(countError.code || '500'));
        if (!data) throw new ApiError("No data returned from the server", 404);

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

        if (error) throw new ApiError(error.message, parseInt(error.code || '500'));
        if (!data) throw new ApiError("No data returned from the server", 404);

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

        if (error) throw new ApiError(error.message, parseInt(error.code || '500'));
        if (countError) throw new ApiError(countError.message, parseInt(countError.code || '500'));
        if (!data) throw new ApiError("No data returned from the server", 404);

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

        if (error) throw new ApiError(error.message, parseInt(error.code || '500'));
        if (!data) throw new ApiError("News item not found", 404);

        return data;
      } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError("Failed to fetch news item", 500);
      }
    },
  },

  testimonials: {
    create: async (testimonial: Testimonial) => {
      try {
        const { data, error } = await supabase
          .from("testimonials")
          .insert(testimonial)
          .select();

        if (error) throw new ApiError(error.message, parseInt(error.code || '500'));
        if (!data) throw new ApiError("Failed to create testimonial", 500);

        return data[0];
      } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError("Failed to create testimonial", 500);
      }
    },

    getRecent: async (limit: number = 3) => {
      try {
        const { data, error } = await supabase
          .from("testimonials")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(limit);

        if (error) throw new ApiError(error.message, parseInt(error.code || '500'));
        if (!data) throw new ApiError("No testimonials found", 404);

        return data;
      } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError("Failed to fetch recent testimonials", 500);
      }
    },
  },
};
