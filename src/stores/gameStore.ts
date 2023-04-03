import { ref } from 'vue';
import { defineStore } from 'pinia';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  limit,
  doc,
  addDoc,
  serverTimestamp,
  setDoc,
  orderBy,
  startAt,
} from 'firebase/firestore';
import type { GameData } from '@/types';

export const gameStore = defineStore('gameStore', () => {
  const games = ref<GameData[]>();

  const firestore = getFirestore();

  const collectionName = 'keys';

  const getKeyRange = async (start: number, count: number = 20) => {
    const foundGames: GameData[] = [];
    const keysRef = collection(firestore, collectionName);
    const q = query(keysRef, where('active', '==', true), orderBy('title'), startAt(start), limit(count));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      foundGames.push(doc.data() as GameData);
    });
    games.value = [...foundGames];
  };

  const addGame = async (uid: string, gameName: string, gameUrl: string, gameId: number) => {
    const docRef = await addDoc(
      collection(firestore, collectionName),
      createGameObject(uid, gameName, gameUrl, gameId)
    );
    console.log('Document written with ID: ', docRef.id);
    return docRef;
  };

  const createGameObject = (uid: string, gameName: string, gameUrl: string, gameId: number) => {
    const newCard: GameData = {
      active: true,
      gameId: gameId,
      humble_url: gameUrl,
      title: gameName,
      uid: uid,
    } as GameData;
    return newCard;
  };

  return {
    games,
    addGame,
    getKeyRange,
  };
});
