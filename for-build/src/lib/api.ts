import { supabase } from "./supabase";

export interface NewsEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  type: "news" | "event";
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

const convertEmptyToNull = (value: string) =>
  value.trim() === "" ? null : value;

const cleanNewsEventData = (data: Partial<NewsEvent>) => {
  const cleaned = { ...data };
  const nullableFields = [
    "time",
    "end_time",
    "venue",
    "organizer",
    "contact_info",
    "registration_link",
    "image_url",
  ];

  nullableFields.forEach((field) => {
    if (
      field in cleaned &&
      typeof cleaned[field as keyof typeof cleaned] === "string"
    ) {
      const value = cleaned[field as keyof typeof cleaned] as string;
      cleaned[field as keyof typeof cleaned] = convertEmptyToNull(value) as any;
    }
  });

  return cleaned;
};

export const api = {
  news: {
    getAll: async (page = 1, pageSize = 10) => {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      const [{ data, error }, { count }] = await Promise.all([
        supabase
          .from("news_events")
          .select("*")
          .order("date", { ascending: false })
          .range(from, to),
        supabase
          .from("news_events")
          .select("*", { count: "exact", head: true }),
      ]);

      if (error) throw error;

      return {
        data: data || [],
        count: count || 0,
      };
    },

    getRecent: async (limit = 3) => {
      const { data, error } = await supabase
        .from("news_events")
        .select("*")
        .order("date", { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data || [];
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

    create: async (
      newsEvent: Omit<NewsEvent, "id" | "created_at" | "updated_at">,
    ) => {
      const cleanedData = cleanNewsEventData({
        ...newsEvent,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      const { data, error } = await supabase
        .from("news_events")
        .insert([cleanedData])
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    update: async (id: string, updates: Partial<NewsEvent>) => {
      const cleanedData = cleanNewsEventData({
        ...updates,
        updated_at: new Date().toISOString(),
      });

      const { data, error } = await supabase
        .from("news_events")
        .update(cleanedData)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    delete: async (id: string) => {
      const { error } = await supabase
        .from("news_events")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
  },
};
