import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebase';
import type { User } from '../../types';

export async function getUserProfile(uid: string): Promise<User | null> {
  const userRef = doc(db, 'users', uid);
  const userDoc = await getDoc(userRef);
  return userDoc.exists() ? { uid: userDoc.id, ...userDoc.data() } as User : null;
}

export async function saveToolToFavorites(userId: string, toolId: string): Promise<void> {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    savedTools: arrayUnion(toolId)
  });
}

export async function removeToolFromFavorites(userId: string, toolId: string): Promise<void> {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    savedTools: arrayRemove(toolId)
  });
}