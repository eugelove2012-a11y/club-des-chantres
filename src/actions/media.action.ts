'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const UploadMediaSchema = z.object({
  title: z.string().min(3, 'Le titre doit contenir au moins 3 caractères').max(255),
  description: z.string().max(2000).optional(),
  pageCategory: z.enum(['FAN_CLUB', 'WEB_TV', 'COURSE', 'SHOW', 'NEWS']),
  mediaType: z.enum(['VIDEO', 'AUDIO', 'STREAM_URL']),
  difficultyLevel: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']).optional(),
  streamUrl: z.string().url('URL de flux invalide').optional(),
});

export type ActionState = {
  success: boolean;
  message?: string;
  error?: string;
  data?: {
    postId: string;
  };
};

export async function uploadCreatorMediaAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const cookieStore = await cookies();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
    },
  });

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: 'Session expirée. Veuillez vous reconnecter.' };
  }

  const [profileRes, subRes] = await Promise.all([
    supabase.from('profiles').select('role').eq('id', user.id).single(),
    supabase
      .from('subscriptions')
      .select('id, plan_type, status')
      .eq('user_id', user.id)
      .eq('status', 'ACTIVE')
      .eq('plan_type', 'CREATOR_3000')
      .gt('current_period_end', new Date().toISOString())
      .maybeSingle(),
  ]);

  if (profileRes.data?.role !== 'CREATOR' && profileRes.data?.role !== 'ADMIN') {
    return {
      success: false,
      error: 'Droits insuffisants. Cette action est réservée aux Créateurs enregistrés.',
    };
  }

  if (profileRes.data?.role !== 'ADMIN' && !subRes.data) {
    return {
      success: false,
      error: 'Un abonnement Créateur actif (3 000 FCFA/mois) est requis pour publier.',
    };
  }

  const parsed = UploadMediaSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description') || undefined,
    pageCategory: formData.get('pageCategory'),
    mediaType: formData.get('mediaType'),
    difficultyLevel: formData.get('difficultyLevel') || undefined,
    streamUrl: formData.get('streamUrl') || undefined,
  });

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.errors[0]?.message || 'Données du formulaire invalides.',
    };
  }

  const { title, description, pageCategory, mediaType, difficultyLevel, streamUrl } = parsed.data;

  let finalMediaUrl = streamUrl || '';
  let finalThumbnailUrl: string | null = null;

  try {
    const mediaFile = formData.get('mediaFile') as File | null;
    if (mediaType !== 'STREAM_URL') {
      if (!mediaFile || mediaFile.size === 0) {
        return { success: false, error: 'Veuillez joindre un fichier vidéo ou audio valide.' };
      }

      const fileExt = mediaFile.name.split('.').pop();
      const mediaPath = `${user.id}/${Date.now()}_media.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('creator_content')
        .upload(mediaPath, mediaFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        throw new Error(`Échec du téléversement média: ${uploadError.message}`);
      }

      const { data: publicUrlData } = supabase.storage
        .from('creator_content')
        .getPublicUrl(mediaPath);

      finalMediaUrl = publicUrlData.publicUrl;
    }

    const thumbFile = formData.get('thumbnailFile') as File | null;
    if (thumbFile && thumbFile.size > 0) {
      const thumbExt = thumbFile.name.split('.').pop();
      const thumbPath = `${user.id}/${Date.now()}_thumb.${thumbExt}`;

      const { error: thumbError } = await supabase.storage
        .from('thumbnails')
        .upload(thumbPath, thumbFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (!thumbError) {
        finalThumbnailUrl = supabase.storage
          .from('thumbnails')
          .getPublicUrl(thumbPath).data.publicUrl;
      }
    }

    const { data: insertedPost, error: insertError } = await supabase
      .from('posts_media')
      .insert({
        author_id: user.id,
        title,
        description: description || null,
        media_type: mediaType,
        page_category: pageCategory,
        difficulty_level: difficultyLevel || null,
        url: finalMediaUrl,
        thumbnail_url: finalThumbnailUrl,
        is_published: true,
      })
      .select('id')
      .single();

    if (insertError) {
      throw insertError;
    }

    revalidatePath('/fan-club');
    revalidatePath('/web-tv');
    revalidatePath('/formation');
    revalidatePath('/dashboard/creator');

    return {
      success: true,
      message: 'Contenu publié avec succès sur la plateforme !',
      data: { postId: insertedPost.id },
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Une erreur inattendue est survenue.';
    return { success: false, error: message };
  }
}
