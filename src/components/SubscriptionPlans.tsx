import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { createSubscription } from '../lib/services/paymentService';
import toast from 'react-hot-toast';

const PLANS = [
  {
    id: 'price_monthly',
    name: 'Aylık Premium',
    price: 49.99,
    interval: 'month',
    features: [
      'Tüm premium AI araçlarına erişim',
      'Sınırsız kullanım',
      'Öncelikli destek',
      'API entegrasyonu',
    ],
  },
  {
    id: 'price_yearly',
    name: 'Yıllık Premium',
    price: 499.99,
    interval: 'year',
    features: [
      'Tüm premium AI araçlarına erişim',
      'Sınırsız kullanım',
      'Öncelikli destek',
      'API entegrasyonu',
      '2 ay ücretsiz',
    ],
  },
];

export default function SubscriptionPlans() {
  const { user } = useAuth();

  const handleSubscribe = async (priceId: string) => {
    if (!user) {
      toast.error('Abonelik için giriş yapmalısınız');
      return;
    }

    try {
      const sessionId = await createSubscription(user.uid, priceId);
      const stripe = await loadStripe(process.env.STRIPE_PUBLIC_KEY!);
      await stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      toast.error('Abonelik işlemi başlatılırken bir hata oluştu');
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {PLANS.map((plan) => (
        <div
          key={plan.id}
          className="bg-white rounded-xl shadow-sm p-6 border-2 border-transparent hover:border-indigo-500 transition-colors"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
          <div className="mb-6">
            <span className="text-4xl font-bold text-indigo-600">
              ₺{plan.price}
            </span>
            <span className="text-gray-600">/{plan.interval}</span>
          </div>
          <ul className="space-y-4 mb-8">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-center text-gray-600">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                {feature}
              </li>
            ))}
          </ul>
          <button
            onClick={() => handleSubscribe(plan.id)}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Hemen Başla
          </button>
        </div>
      ))}
    </div>
  );
}