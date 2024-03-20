import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";
import { doc, setDoc, addDoc, collection, query, where, getDocs, deleteDoc } from "firebase/firestore";
import { toast } from 'sonner';

export const signupUserManual = async ({ username, email, password }: any) => {
  if (!username || !email || !password) {
    return toast("empty fields");
  } else {
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCred.user;
      const colRef = doc(db, "users", user.uid);
      await setDoc(colRef, { username: username });
      return toast("user created");
    } catch (error: any) {
      console.log({ error });

      return toast(error.message);
    }
  }
};

export const loginUserManual = async ({ email, password }: any) => {

  const isEmailCorrect = /\S+@\S+\.\S+/.test(email);

  try {
    if (!email || !password) {
      toast("Fill all fields");
      return false;
    } else {
      if (!isEmailCorrect) {
        toast("Please enter a valid email");
        return false;
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast("welcome back")
        return true
      }
    }
  } catch (error: any) {
    if (error.message.includes("not-found")) {
      toast("user not found, signup first");
    } else if (error.message.includes("wrong-password")) {
      toast("incorrect password");
    }
    // toast(error.message);
    return false;
  }
};

export const logoutUser = () => {
  signOut(auth)
    .then(() => {
      // toast("Now using browser's storage");
      toast("Cloud : Will be missing you!");
    })
    .catch((error) => {
      console.log(error);
      toast(error.message);
    });
};

export const resetPassword = ({ email }: any) => {
  if (email) {
    sendPasswordResetEmail(auth, email, {
      url: `/login?email=${email}`,
    })
      .then(() => {
        toast("check your email for further process");
      })
      .catch((error) => {
        toast(error.message);
      });
  } else {
    toast("Provide the email associated with the account");
  }
};

export const fetchFbWatchlist = async ({ userID = null }: any) => {
  const q = query(collection(db, "watchlist"), where("userID", "==", userID));
  const querySnapshot = await getDocs(q);

  const userWatchlist: any = { movie: [], tv: [] };
  querySnapshot.forEach((doc) => {
    userWatchlist[doc.data().type].push(doc.data().id);
  });

  return userWatchlist;
}

export const removeFromFbWatchlist = async ({ userID = null, type, id }: any) => {
  const q = query(collection(db, "watchlist"), where("userID", "==", userID));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(async (doc) => {
    const data = doc.data();
    if (data.type == type && data.id == id) {
      const docRef = doc.ref;
      await deleteDoc(docRef);
      // id removed
    }
  });
};
export const checkInFbWatchlist = async ({ userID = null, type, id }: any) => {
  const q = query(collection(db, "watchlist"), where("userID", "==", userID));
  const querySnapshot = await getDocs(q);

  for (const doc of querySnapshot.docs) {
    const data = doc.data();
    if (data.type === type && data.id === id) {
      return true;
    }
  }

  return false;
};
export const addToFbWatchlist = async ({ userID = null, type, id, }: any) => {
  if (userID === null) {
    return toast("Try again");
  }
  const docRef = await addDoc(collection(db, "watchlist"), { type, id, userID });
};