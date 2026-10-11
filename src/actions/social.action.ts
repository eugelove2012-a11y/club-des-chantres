'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

async function getSupabase() {
  const cookieStore = await cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
    },
  });
}

export async function togglePostLikeAction(postId: string) {
  const supabase = await getSupabase();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { success: false, error: 'Connexion requise' };

  // Vérifier si déjà liké
  const { data: existingLike } = await supabase
    .from('likes')
    .select('user_id')
    .eq('user_id', user.id)
    .eq('post_id', postId)
    .maybeSingle();

  if (existingLike) {
    await supabase.from('likes').delete().eq('user_id', user.id).eq('post_id', postId);
  } else {
    await supabase.from('likes').insert({ user_id: user.id, post_id: postId });
  }

  revalidatePath('/fan-club');
  return { success: true, liked: !existingLike };
}

export async function toggleFanClubMembershipAction(creatorId: string) {
  const supabase = await getSupabase();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { success: false, error: 'Connexion requise' };
  if (user.id === creatorId) return { success: false, error: 'Action impossible sur son propre profil' };

  const { data: existingFan } = await supabase
    .from('fan_memberships')
    .select('user_id')
    .eq('user_id', user.id)
    .eq('creator_id', creatorId)
    .maybeSingle();

  if (existingFan) {
    await supabase.from('fan_memberships').delete().eq('user_id', user.id).eq('creator_id', creatorId);
  } else {
    await supabase.from('fan_memberships').insert({ user_id: user.id, creator_id: creatorId });
  }

  revalidatePath('/fan-club');
  return { success: true, isFan: !existingFan };
}
