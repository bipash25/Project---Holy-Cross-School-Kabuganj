export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      achievements: {
        Row: {
          category: string
          created_at: string
          date: string
          description: string
          id: string
          image_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          date: string
          description: string
          id?: string
          image_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          date?: string
          description?: string
          id?: string
          image_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      activities: {
        Row: {
          action: string
          created_at: string
          description: string
          id: string
        }
        Insert: {
          action: string
          created_at?: string
          description: string
          id?: string
        }
        Update: {
          action?: string
          created_at?: string
          description?: string
          id?: string
        }
        Relationships: []
      }
      media: {
        Row: {
          created_at: string
          id: string
          title: string
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          title: string
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      news_events: {
        Row: {
          contact_info: string | null
          created_at: string
          date: string
          description: string
          end_time: string | null
          id: string
          image_url: string | null
          organizer: string | null
          registration_link: string | null
          time: string | null
          title: string
          type: string
          updated_at: string
          venue: string | null
        }
        Insert: {
          contact_info?: string | null
          created_at?: string
          date: string
          description: string
          end_time?: string | null
          id?: string
          image_url?: string | null
          organizer?: string | null
          registration_link?: string | null
          time?: string | null
          title: string
          type: string
          updated_at?: string
          venue?: string | null
        }
        Update: {
          contact_info?: string | null
          created_at?: string
          date?: string
          description?: string
          end_time?: string | null
          id?: string
          image_url?: string | null
          organizer?: string | null
          registration_link?: string | null
          time?: string | null
          title?: string
          type?: string
          updated_at?: string
          venue?: string | null
        }
        Relationships: []
      }
      school_stats: {
        Row: {
          cultural_awards: number
          district_toppers: number
          id: string
          science_fair_wins: number
          sports_medals: number
          success_rate: number
          total_staff: number
          total_students: number
          total_teachers: number
          updated_at: string
          years_of_excellence: number
        }
        Insert: {
          cultural_awards: number
          district_toppers: number
          id?: string
          science_fair_wins: number
          sports_medals: number
          success_rate: number
          total_staff: number
          total_students: number
          total_teachers: number
          updated_at?: string
          years_of_excellence: number
        }
        Update: {
          cultural_awards?: number
          district_toppers?: number
          id?: string
          science_fair_wins?: number
          sports_medals?: number
          success_rate?: number
          total_staff?: number
          total_students?: number
          total_teachers?: number
          updated_at?: string
          years_of_excellence?: number
        }
        Relationships: []
      }
      students: {
        Row: {
          admission_date: string
          class: string
          created_at: string
          id: string
          name: string
          roll_number: string
          section: string
          updated_at: string
        }
        Insert: {
          admission_date: string
          class: string
          created_at?: string
          id?: string
          name: string
          roll_number: string
          section: string
          updated_at?: string
        }
        Update: {
          admission_date?: string
          class?: string
          created_at?: string
          id?: string
          name?: string
          roll_number?: string
          section?: string
          updated_at?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          author: string
          created_at: string
          id: string
          image_url: string | null
          quote: string
          role: string
          updated_at: string
        }
        Insert: {
          author: string
          created_at?: string
          id?: string
          image_url?: string | null
          quote: string
          role: string
          updated_at?: string
        }
        Update: {
          author?: string
          created_at?: string
          id?: string
          image_url?: string | null
          quote?: string
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
