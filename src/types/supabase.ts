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
      achievements: {
        Row: {
          category: string;
          created_at: string;
          date: string;
          description: string;
          id: string;
          image_url: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          category: string;
          created_at?: string;
          date: string;
          description: string;
          id?: string;
          image_url?: string;
          title: string;
          updated_at?: string;
        };
        Update: {
          category?: string;
          created_at?: string;
          date?: string;
          description?: string;
          id?: string;
          image_url?: string;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      calendar_events: {
        Row: {
          created_at: string;
          date: string;
          description: string;
          id: string;
          title: string;
          type: "academic" | "cultural" | "sports" | "holiday";
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          date: string;
          description: string;
          id?: string;
          title: string;
          type: "academic" | "cultural" | "sports" | "holiday";
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          date?: string;
          description?: string;
          id?: string;
          title?: string;
          type?: "academic" | "cultural" | "sports" | "holiday";
          updated_at?: string;
        };
        Relationships: [];
      };
      media: {
        Row: {
          created_at: string;
          id: string;
          title: string;
          url: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          title: string;
          url: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          title?: string;
          url?: string;
        };
        Relationships: [];
      };
      news_events: {
        Row: {
          contact_info: string | null;
          created_at: string;
          date: string;
          description: string;
          end_time: string | null;
          id: string;
          image_url: string | null;
          organizer: string | null;
          registration_link: string | null;
          time: string | null;
          title: string;
          type: "news" | "event";
          updated_at: string;
          venue: string | null;
        };
        Insert: {
          contact_info?: string | null;
          created_at?: string;
          date: string;
          description: string;
          end_time?: string | null;
          id?: string;
          image_url?: string | null;
          organizer?: string | null;
          registration_link?: string | null;
          time?: string | null;
          title: string;
          type: "news" | "event";
          updated_at?: string;
          venue?: string | null;
        };
        Update: {
          contact_info?: string | null;
          created_at?: string;
          date?: string;
          description?: string;
          end_time?: string | null;
          id?: string;
          image_url?: string | null;
          organizer?: string | null;
          registration_link?: string | null;
          time?: string | null;
          title?: string;
          type?: "news" | "event";
          updated_at?: string;
          venue?: string | null;
        };
        Relationships: [];
      };
      settings: {
        Row: {
          address: string;
          admission_email: string | null;
          email: string;
          facebook_url: string | null;
          id: string;
          instagram_url: string | null;
          meta_description: string | null;
          meta_keywords: string | null;
          office_hours: string | null;
          phone: string;
          school_name: string;
          support_email: string | null;
          twitter_url: string | null;
        };
        Insert: {
          address: string;
          admission_email?: string | null;
          email: string;
          facebook_url?: string | null;
          id?: string;
          instagram_url?: string | null;
          meta_description?: string | null;
          meta_keywords?: string | null;
          office_hours?: string | null;
          phone: string;
          school_name: string;
          support_email?: string | null;
          twitter_url?: string | null;
        };
        Update: {
          address?: string;
          admission_email?: string | null;
          email?: string;
          facebook_url?: string | null;
          id?: string;
          instagram_url?: string | null;
          meta_description?: string | null;
          meta_keywords?: string | null;
          office_hours?: string | null;
          phone?: string;
          school_name?: string;
          support_email?: string | null;
          twitter_url?: string | null;
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
