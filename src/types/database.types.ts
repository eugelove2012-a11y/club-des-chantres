export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          avatar_url: string | null
          bio: string | null
          role: 'GUEST' | 'SUBSCRIBER' | 'CREATOR' | 'ADMIN'
          creator_category: 'VOCALIST' | 'PIANIST' | 'DRUMMER' | 'INSTRUCTOR' | null
          likes_count: number
          fans_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          avatar_url?: string | null
          bio?: string | null
          role?: 'GUEST' | 'SUBSCRIBER' | 'CREATOR' | 'ADMIN'
          creator_category?: 'VOCALIST' | 'PIANIST' | 'DRUMMER' | 'INSTRUCTOR' | null
          likes_count?: number
          fans_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          avatar_url?: string | null
          bio?: string | null
          role?: 'GUEST' | 'SUBSCRIBER' | 'CREATOR' | 'ADMIN'
          creator_category?: 'VOCALIST' | 'PIANIST' | 'DRUMMER' | 'INSTRUCTOR' | null
          likes_count?: number
          fans_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          plan_type: 'MEMBER_1000' | 'CREATOR_3000'
          status: 'ACTIVE' | 'PAST_DUE' | 'CANCELED' | 'INCOMPLETE'
          provider_subscription_id: string | null
          current_period_start: string
          current_period_end: string
          cancel_at_period_end: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plan_type: 'MEMBER_1000' | 'CREATOR_3000'
          status?: 'ACTIVE' | 'PAST_DUE' | 'CANCELED' | 'INCOMPLETE'
          provider_subscription_id?: string | null
          current_period_start?: string
          current_period_end: string
          cancel_at_period_end?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plan_type?: 'MEMBER_1000' | 'CREATOR_3000'
          status?: 'ACTIVE' | 'PAST_DUE' | 'CANCELED' | 'INCOMPLETE'
          provider_subscription_id?: string | null
          current_period_start?: string
          current_period_end?: string
          cancel_at_period_end?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      posts_media: {
        Row: {
          id: string
          author_id: string
          title: string
          description: string | null
          media_type: 'VIDEO' | 'AUDIO' | 'STREAM_URL'
          page_category: 'FAN_CLUB' | 'WEB_TV' | 'COURSE' | 'SHOW' | 'NEWS'
          url: string
          thumbnail_url: string | null
          difficulty_level: string | null
          duration_seconds: number
          view_count: number
          likes_count: number
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          author_id: string
          title: string
          description?: string | null
          media_type: 'VIDEO' | 'AUDIO' | 'STREAM_URL'
          page_category: 'FAN_CLUB' | 'WEB_TV' | 'COURSE' | 'SHOW' | 'NEWS'
          url: string
          thumbnail_url?: string | null
          difficulty_level?: string | null
          duration_seconds?: number
          view_count?: number
          likes_count?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          author_id?: string
          title?: string
          description?: string | null
          media_type?: 'VIDEO' | 'AUDIO' | 'STREAM_URL'
          page_category?: 'FAN_CLUB' | 'WEB_TV' | 'COURSE' | 'SHOW' | 'NEWS'
          url?: string
          thumbnail_url?: string | null
          difficulty_level?: string | null
          duration_seconds?: number
          view_count?: number
          likes_count?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      likes: {
        Row: {
          user_id: string
          post_id: string
          created_at: string
        }
        Insert: {
          user_id: string
          post_id: string
          created_at?: string
        }
        Update: {
          user_id?: string
          post_id?: string
          created_at?: string
        }
      }
      fan_memberships: {
        Row: {
          user_id: string
          creator_id: string
          created_at: string
        }
        Insert: {
          user_id: string
          creator_id: string
          created_at?: string
        }
        Update: {
          user_id?: string
          creator_id?: string
          created_at?: string
        }
      }
    }
  }
}
