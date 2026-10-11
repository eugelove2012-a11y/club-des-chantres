export interface InitializePaymentParams {
  userId: string;
  email: string;
  amount: 1000 | 3000;
  planType: 'MEMBER_1000' | 'CREATOR_3000';
  currency?: string;
  callbackUrl: string;
}

export interface PaymentInitResult {
  checkoutUrl: string;
  transactionReference: string;
}

export async function initializeFcfPayment(
  params: InitializePaymentParams
): Promise<PaymentInitResult> {
  const secretKey = process.env.PAYMENT_GATEWAY_SECRET_KEY;
  if (!secretKey) {
    // Mode démo / fallback en développement
    return {
      checkoutUrl: `/checkout/simulate?ref=${Date.now()}&plan=${params.planType}&userId=${params.userId}`,
      transactionReference: `SIM_${Date.now()}`,
    };
  }

  const response = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secretKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: params.email,
      amount: params.amount * 100,
      currency: 'XOF',
      callback_url: params.callbackUrl,
      metadata: {
        user_id: params.userId,
        plan_type: params.planType,
        custom_fields: [
          { display_name: 'Plateforme', variable_name: 'platform', value: 'Club des Chantres' },
        ],
      },
    }),
  });

  const data = await response.json();
  if (!data.status) {
    throw new Error(data.message || 'Erreur lors de l’initialisation du paiement');
  }

  return {
    checkoutUrl: data.data.authorization_url,
    transactionReference: data.data.reference,
  };
}
