import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import type { User } from '../../types';

const STRIPE_PUBLIC_KEY = 'your_stripe_public_key';
const stripe = await loadStripe(STRIPE_PUBLIC_KEY);

export async function createSubscription(userId: string, priceId: string): Promise<string> {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data() as User;

    // Create or retrieve Stripe customer
    let customerId = userData.subscription?.stripeCustomerId;
    if (!customerId) {
      const customerResponse = await fetch('/api/create-customer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, email: userData.email }),
      });
      const customer = await customerResponse.json();
      customerId = customer.id;
    }

    // Create subscription checkout session
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerId,
        priceId,
        userId,
      }),
    });

    const session = await response.json();
    return session.id;
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
}

export async function cancelSubscription(userId: string): Promise<void> {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data() as User;

    if (!userData.subscription?.stripeCustomerId) {
      throw new Error('No active subscription found');
    }

    await fetch('/api/cancel-subscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerId: userData.subscription.stripeCustomerId,
      }),
    });

    await updateDoc(userRef, {
      'subscription.status': 'canceled',
    });
  } catch (error) {
    console.error('Error canceling subscription:', error);
    throw error;
  }
}

export async function checkSubscriptionStatus(userId: string): Promise<void> {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data() as User;

    if (!userData.subscription?.stripeCustomerId) return;

    const response = await fetch('/api/check-subscription-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerId: userData.subscription.stripeCustomerId,
      }),
    });

    const status = await response.json();
    await updateDoc(userRef, {
      'subscription.status': status.status,
      'subscription.currentPeriodEnd': new Date(status.currentPeriodEnd * 1000),
    });
  } catch (error) {
    console.error('Error checking subscription status:', error);
    throw error;
  }
}