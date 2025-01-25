export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      calendar_events: {
        Row: {
          id: string;
          title: string;
          description: string;
          date: string;
          type: "academic" | "cultural" | "sports" | "holiday";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          date: string;
          type: "academic" | "cultural" | "sports" | "holiday";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          date?: string;
          type?: "academic" | "cultural" | "sports" | "holiday";
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      media: {
        Row: {
          id: string;
          title: string;
          url: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          url: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          url?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      news_events: {
        Row: {
          id: string;
          title: string;
          description: string;
          date: string;
          type: "news" | "event";
          time?: string | null;
          end_time?: string | null;
          venue?: string | null;
          organizer?: string | null;
          contact_info?: string | null;
          registration_link?: string | null;
          image_url?: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          date: string;
          type: "news" | "event";
          time?: string | null;
          end_time?: string | null;
          venue?: string | null;
          organizer?: string | null;
          contact_info?: string | null;
          registration_link?: string | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          date?: string;
          type?: "news" | "event";
          time?: string | null;
          end_time?: string | null;
          venue?: string | null;
          organizer?: string | null;
          contact_info?: string | null;
          registration_link?: string | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      settings: {
        Row: {
          id: string;
          school_name: string;
          email: string;
          phone: string;
          address: string;
          facebook_url?: string | null;
          twitter_url?: string | null;
          instagram_url?: string | null;
          admission_email?: string | null;
          support_email?: string | null;
          office_hours?: string | null;
          meta_description?: string | null;
          meta_keywords?: string | null;
        };
        Insert: {
          id?: string;
          school_name: string;
          email: string;
          phone: string;
          address: string;
          facebook_url?: string | null;
          twitter_url?: string | null;
          instagram_url?: string | null;
          admission_email?: string | null;
          support_email?: string | null;
          office_hours?: string | null;
          meta_description?: string | null;
          meta_keywords?: string | null;
        };
        Update: {
          id?: string;
          school_name?: string;
          email?: string;
          phone?: string;
          address?: string;
          facebook_url?: string | null;
          twitter_url?: string | null;
          instagram_url?: string | null;
          admission_email?: string | null;
          support_email?: string | null;
          office_hours?: string | null;
          meta_description?: string | null;
          meta_keywords?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
