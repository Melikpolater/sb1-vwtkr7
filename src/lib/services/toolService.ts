import { collection, doc, getDoc, getDocs, addDoc, updateDoc, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import type { AITool, UserReview } from '../../types';

export async function getAllTools(): Promise<AITool[]> {
  const toolsRef = collection(db, 'tools');
  const snapshot = await getDocs(toolsRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AITool));
}

export async function getToolById(id: string): Promise<AITool | null> {
  const toolRef = doc(db, 'tools', id);
  const toolDoc = await getDoc(toolRef);
  return toolDoc.exists() ? { id: toolDoc.id, ...toolDoc.data() } as AITool : null;
}

export async function getToolReviews(toolId: string): Promise<UserReview[]> {
  const reviewsRef = collection(db, 'reviews');
  const q = query(reviewsRef, where('toolId', '==', toolId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt.toDate(),
  }) as UserReview);
}

export async function addReview(review: Omit<UserReview, 'id'>): Promise<string> {
  const reviewsRef = collection(db, 'reviews');
  const docRef = await addDoc(reviewsRef, {
    ...review,
    createdAt: new Date(),
  });
  return docRef.id;
}

export async function updateToolRating(toolId: string, newRating: number): Promise<void> {
  const toolRef = doc(db, 'tools', toolId);
  await updateDoc(toolRef, { rating: newRating });
}