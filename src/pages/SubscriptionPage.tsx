import React from 'react';
import { Helmet } from 'react-helmet-async';
import SubscriptionPlans from '../components/SubscriptionPlans';
import { useUser } from '../hooks/useUser';
import { cancelSubscription } from '../lib/services/paymentService';
import toast from 'react-hot-toast';

export default function SubscriptionPage() {
  const { user, loading } = useUser();

  const handleCancelSubscription = async () => {
    try {
      await cancelSubscription(user!.uid);
      toast.success('Aboneliğiniz iptal edildi');
    } catch (error) {
      toast.error('Abonelik iptali sırasında bir hata oluştu');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Helmet>
        <title>Premium Abonelik - AkılTek</title>
        <meta
          name="description"
          content="AkılTek premium aboneliği ile tüm AI araçlarına sınırsız erişim"
        />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Premium'a Yükseltin
          </h1>
          <p className="text-xl text-gray-600">
            En gelişmiş AI araçlarına sınırsız erişim için premium üye olun
          </p>
        </div>

        {user?.subscription?.status === 'active' ? (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Mevcut Aboneliğiniz
            </h2>
            <p className="text-gray-600 mb-4">
              Plan: {user.subscription.plan === 'monthly' ? 'Aylık' : 'Yıllık'} Premium
            </p>
            <p className="text-gray-600 mb-6">
              Yenileme Tarihi:{' '}
              {new Date(user.subscription.currentPeriodEnd).toLocaleDateString()}
            </p>
            <button
              onClick={handleCancelSubscription}
              className="text-red-600 hover:text-red-700"
            >
              Aboneliği İptal Et
            </button>
          </div>
        ) : (
          <SubscriptionPlans />
        )}
      </div>
    </>
  );
}