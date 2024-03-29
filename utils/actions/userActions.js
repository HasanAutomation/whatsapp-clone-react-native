import {
   child,
   endAt,
   get,
   getDatabase,
   orderByChild,
   query,
   ref,
   startAt,
} from 'firebase/database';
import { getFirebaseApp } from '../firebaseHelper';

export const getUserData = async (userId) => {
   try {
      const app = getFirebaseApp();
      const dbRef = ref(getDatabase(app));

      const userRef = child(dbRef, `users/${userId}`);
      const snapshot = await get(userRef);
      return snapshot.val();
   } catch (err) {
      console.log('err', err);
   }
};

export const searchUsers = async (queryText) => {
   try {
      const searchTerm = queryText.toLowerCase();
      const app = getFirebaseApp();
      const dbRef = ref(getDatabase(app));

      const userRef = child(dbRef, 'users');
      const queryRef = query(
         userRef,
         orderByChild('firstLast'),
         startAt(searchTerm),
         endAt(searchTerm + '\uf8ff')
      );

      const snapshot = await get(queryRef);

      if (!snapshot.exists()) return {};

      return snapshot.val();
   } catch (err) {
      console.log(err);
      throw err;
   }
};
