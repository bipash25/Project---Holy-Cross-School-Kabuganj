import { supabase } from "./supabase";

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

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
}

export const api = {
  news: {
    getAll: async (page: number = 1, pageSize: number = 9) => {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      const [{ data, error }, { count, error: countError }] = await Promise.all(
        [
          supabase
            .from("news_events")
            .select("*")
            .order("date", { ascending: false })
            .range(from, to),
          supabase
            .from("news_events")
            .select("*", { count: "exact", head: true }),
        ],
      );

      if (error || countError) throw error || countError;
      return { data: data || [], count: count || 0 };
    },

    getRecent: async (limit: number = 3) => {
      const { data, error } = await supabase
        .from("news_events")
        .select("*")
        .order("date", { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data;
    },

    getByType: async (
      type: "news" | "event",
      page: number = 1,
      pageSize: number = 9,
    ) => {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      const [{ data, error }, { count, error: countError }] = await Promise.all(
        [
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
        ],
      );

      if (error || countError) throw error || countError;
      return { data: data || [], count: count || 0 };
    },

    getById: async (id: string) => {
      const { data, error } = await supabase
        .from("news_events")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
  },
};
