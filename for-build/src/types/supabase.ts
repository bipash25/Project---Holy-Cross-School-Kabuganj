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
          id: string;
          title: string;
          description: string;
          date: string;
          category: string;
          image_url?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          date: string;
          category: string;
          image_url?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          date?: string;
          category?: string;
          image_url?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
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
      };
      news_events: {
        Row: {
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
        };
        Insert: {
          id?: string;
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
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          date?: string;
          type?: "news" | "event";
          time?: string;
          end_time?: string;
          venue?: string;
          organizer?: string;
          contact_info?: string;
          registration_link?: string;
          image_url?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      school_stats: {
        Row: {
          id: string;
          total_students: number;
          total_teachers: number;
          total_staff: number;
          years_of_excellence: number;
          success_rate: number;
          district_toppers: number;
          sports_medals: number;
          cultural_awards: number;
          science_fair_wins: number;
          updated_at: string;
        };
        Insert: {
          id?: string;
          total_students: number;
          total_teachers: number;
          total_staff: number;
          years_of_excellence: number;
          success_rate: number;
          district_toppers: number;
          sports_medals: number;
          cultural_awards: number;
          science_fair_wins: number;
          updated_at?: string;
        };
        Update: {
          id?: string;
          total_students?: number;
          total_teachers?: number;
          total_staff?: number;
          years_of_excellence?: number;
          success_rate?: number;
          district_toppers?: number;
          sports_medals?: number;
          cultural_awards?: number;
          science_fair_wins?: number;
          updated_at?: string;
        };
      };
      settings: {
        Row: {
          id: string;
          school_name: string;
          email: string;
          phone: string;
          address: string;
          facebook_url?: string;
          twitter_url?: string;
          instagram_url?: string;
          admission_email?: string;
          support_email?: string;
          office_hours?: string;
          meta_description?: string;
          meta_keywords?: string;
        };
        Insert: {
          id?: string;
          school_name: string;
          email: string;
          phone: string;
          address: string;
          facebook_url?: string;
          twitter_url?: string;
          instagram_url?: string;
          admission_email?: string;
          support_email?: string;
          office_hours?: string;
          meta_description?: string;
          meta_keywords?: string;
        };
        Update: {
          id?: string;
          school_name?: string;
          email?: string;
          phone?: string;
          address?: string;
          facebook_url?: string;
          twitter_url?: string;
          instagram_url?: string;
          admission_email?: string;
          support_email?: string;
          office_hours?: string;
          meta_description?: string;
          meta_keywords?: string;
        };
      };
    };
  };
}
