export type UserRole = 'GUEST' | 'SUBSCRIBER' | 'CREATOR' | 'ADMIN';
export type CreatorCategory = 'VOCALIST' | 'PIANIST' | 'DRUMMER' | 'INSTRUCTOR';
export type SubscriptionPlan = 'MEMBER_1000' | 'CREATOR_3000';
export type SubscriptionStatus = 'ACTIVE' | 'PAST_DUE' | 'CANCELED' | 'INCOMPLETE';
export type MediaType = 'VIDEO' | 'AUDIO' | 'STREAM_URL';
export type PageCategory = 'FAN_CLUB' | 'WEB_TV' | 'COURSE' | 'SHOW' | 'NEWS';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  bio: string | null;
  role: UserRole;
  creator_category: CreatorCategory | null;
  likes_count: number;
  fans_count: number;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan_type: SubscriptionPlan;
  status: SubscriptionStatus;
  provider_subscription_id: string | null;
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  created_at: string;
  updated_at: string;
}

export interface PostMedia {
  id: string;
  author_id: string;
  title: string;
  description: string | null;
  media_type: MediaType;
  page_category: PageCategory;
  url: string;
  thumbnail_url: string | null;
  difficulty_level?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | null;
  duration_seconds: number;
  view_count: number;
  likes_count: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  author?: Profile;
}

export interface CreatorCardData {
  id: string;
  full_name: string;
  avatar_url: string | null;
  creator_category: CreatorCategory;
  bio: string | null;
  likes_count: number;
  fans_count: number;
  has_liked?: boolean;
  is_fan?: boolean;
  preview_media_url?: string;
}
