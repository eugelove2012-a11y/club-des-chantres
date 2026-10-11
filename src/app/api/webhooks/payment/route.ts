import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-key'
);

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-paystack-signature');
    const secret = process.env.PAYMENT_GATEWAY_SECRET_KEY;

    if (secret && signature) {
      const hash = crypto.createHmac('sha512', secret).update(rawBody).digest('hex');
      if (hash !== signature) {
        return NextResponse.json({ error: 'Signature invalide' }, { status: 401 });
      }
    }

    const payload = JSON.parse(rawBody);

    if (payload.event === 'charge.success') {
      const { metadata, reference, plan } = payload.data;
      const userId = metadata?.user_id;
      const planType = metadata?.plan_type || (plan?.amount === 300000 ? 'CREATOR_3000' : 'MEMBER_1000');

      if (!userId) {
        return NextResponse.json({ error: 'User ID manquant' }, { status: 400 });
      }

      const periodStart = new Date();
      const periodEnd = new Date();
      periodEnd.setMonth(periodEnd.getMonth() + 1);

      // Insertion ou mise à jour de l'abonnement
      await supabaseAdmin.from('subscriptions').upsert(
        {
          user_id: userId,
          plan_type: planType,
          status: 'ACTIVE',
          provider_subscription_id: reference,
          current_period_start: periodStart.toISOString(),
          current_period_end: periodEnd.toISOString(),
          cancel_at_period_end: false,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id' }
      );

      // Attribution de rôle
      if (planType === 'CREATOR_3000') {
        await supabaseAdmin
          .from('profiles')
          .update({ role: 'CREATOR', updated_at: new Date().toISOString() })
          .eq('id', userId);
      } else {
        await supabaseAdmin
          .from('profiles')
          .update({ role: 'SUBSCRIBER', updated_at: new Date().toISOString() })
          .eq('id', userId);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erreur interne';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
