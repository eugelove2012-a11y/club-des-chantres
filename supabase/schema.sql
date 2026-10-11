-- =============================================================================
-- GOSPEL STREAM & ACADEMY - FULL DATABASE SCHEMA (SUPABASE POSTGRESQL)
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ENUMS
CREATE TYPE user_role AS ENUM ('GUEST', 'SUBSCRIBER', 'CREATOR', 'ADMIN');
CREATE TYPE creator_category AS ENUM ('VOCALIST', 'PIANIST', 'DRUMMER', 'INSTRUCTOR');
CREATE TYPE subscription_plan AS ENUM ('MEMBER_1000', 'CREATOR_3000');
CREATE TYPE subscription_status AS ENUM ('ACTIVE', 'PAST_DUE', 'CANCELED', 'INCOMPLETE');
CREATE TYPE media_type AS ENUM ('VIDEO', 'AUDIO', 'STREAM_URL');
CREATE TYPE page_category AS ENUM ('FAN_CLUB', 'WEB_TV', 'COURSE', 'SHOW', 'NEWS');

-- 2. TABLE: PROFILES
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    role user_role NOT NULL DEFAULT 'GUEST',
    creator_category creator_category,
    likes_count INTEGER NOT NULL DEFAULT 0 CHECK (likes_count >= 0),
    fans_count INTEGER NOT NULL DEFAULT 0 CHECK (fans_count >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. TABLE: SUBSCRIPTIONS
CREATE TABLE public.subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    plan_type subscription_plan NOT NULL,
    status subscription_status NOT NULL DEFAULT 'INCOMPLETE',
    provider_subscription_id TEXT UNIQUE,
    current_period_start TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    current_period_end TIMESTAMPTZ NOT NULL,
    cancel_at_period_end BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_subscriptions_user_status ON public.subscriptions(user_id, status);

-- 4. TABLE: POSTS_MEDIA
CREATE TABLE public.posts_media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    media_type media_type NOT NULL,
    page_category page_category NOT NULL,
    url TEXT NOT NULL,
    thumbnail_url TEXT,
    difficulty_level VARCHAR(50),
    duration_seconds INTEGER DEFAULT 0,
    view_count INTEGER NOT NULL DEFAULT 0 CHECK (view_count >= 0),
    likes_count INTEGER NOT NULL DEFAULT 0 CHECK (likes_count >= 0),
    is_published BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_posts_category_published ON public.posts_media(page_category, is_published, created_at DESC);

-- 5. TABLE: LIKES
CREATE TABLE public.likes (
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    post_id UUID NOT NULL REFERENCES public.posts_media(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, post_id)
);

-- 6. TABLE: FAN_MEMBERSHIPS
CREATE TABLE public.fan_memberships (
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    creator_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, creator_id),
    CHECK (user_id != creator_id)
);

-- =============================================================================
-- TRIGGERS & FUNCTIONS
-- =============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, avatar_url, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'Membre'),
        NEW.raw_user_meta_data->>'avatar_url',
        'GUEST'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.update_post_likes_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.posts_media SET likes_count = likes_count + 1 WHERE id = NEW.post_id;
        UPDATE public.profiles SET likes_count = likes_count + 1 WHERE id = (SELECT author_id FROM public.posts_media WHERE id = NEW.post_id);
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.posts_media SET likes_count = GREATEST(0, likes_count - 1) WHERE id = OLD.post_id;
        UPDATE public.profiles SET likes_count = GREATEST(0, likes_count - 1) WHERE id = (SELECT author_id FROM public.posts_media WHERE id = OLD.post_id);
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER trigger_update_post_likes
    AFTER INSERT OR DELETE ON public.likes
    FOR EACH ROW EXECUTE FUNCTION public.update_post_likes_count();

CREATE OR REPLACE FUNCTION public.update_creator_fans_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.profiles SET fans_count = fans_count + 1 WHERE id = NEW.creator_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.profiles SET fans_count = GREATEST(0, fans_count - 1) WHERE id = OLD.creator_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER trigger_update_creator_fans
    AFTER INSERT OR DELETE ON public.fan_memberships
    FOR EACH ROW EXECUTE FUNCTION public.update_creator_fans_count();

-- =============================================================================
-- RLS CONFIGURATION
-- =============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fan_memberships ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_active_subscription(target_user_id UUID)
RETURNS BOOLEAN AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.subscriptions
        WHERE user_id = target_user_id
          AND status = 'ACTIVE'
          AND current_period_end > NOW()
    );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

CREATE POLICY "Profiles are readable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own subscription" ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Public can view published posts metadata" ON public.posts_media FOR SELECT USING (is_published = true);

CREATE POLICY "Creators can insert their own posts" ON public.posts_media
    FOR INSERT WITH CHECK (
        auth.uid() = author_id 
        AND EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role IN ('CREATOR', 'ADMIN')
        )
        AND public.has_active_subscription(auth.uid())
    );

CREATE POLICY "Creators can update their own posts" ON public.posts_media FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Creators can delete their own posts" ON public.posts_media FOR DELETE USING (auth.uid() = author_id);

CREATE POLICY "Active members can view likes" ON public.likes FOR SELECT USING (true);
CREATE POLICY "Active members can toggle likes" ON public.likes FOR INSERT WITH CHECK (auth.uid() = user_id AND public.has_active_subscription(auth.uid()));
CREATE POLICY "Users can remove their likes" ON public.likes FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Everyone can view fan counts" ON public.fan_memberships FOR SELECT USING (true);
CREATE POLICY "Active members can join fan clubs" ON public.fan_memberships FOR INSERT WITH CHECK (auth.uid() = user_id AND public.has_active_subscription(auth.uid()));
CREATE POLICY "Users can leave fan clubs" ON public.fan_memberships FOR DELETE USING (auth.uid() = user_id);
