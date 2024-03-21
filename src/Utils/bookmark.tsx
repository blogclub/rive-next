// watchlist :{
//   movie:[],
//   tv:[],
// }

import {
  addToFbWatchlist,
  checkInFbWatchlist,
  fetchFbWatchlist,
  removeFromFbWatchlist,
} from "./firebaseUser";

export const getBookmarks = (userId: any) => {
  // console.log({ userId });
  if (userId !== null && userId !== undefined) {
    // console.log(await fetchFbWatchlist({ userID: userId }));
    return fetchFbWatchlist({ userID: userId });
  } else {
    const values: any = localStorage.getItem("RiveStreamWatchlist");
    return JSON.parse(values);
  }
  return {};
};

export const setBookmarks = ({ userId = null, type, id }: any) => {
  if (userId !== null) {
    addToFbWatchlist({ userID: userId, type, id });
  } else {
    var values: any = getBookmarks(userId) || { movie: [], tv: [] };
    if (!values[type]?.includes(id)) {
      values[type] = values[type].reverse();
      values[type]?.push(id);
      values[type] = values[type].reverse();
      localStorage.setItem("RiveStreamWatchlist", JSON.stringify(values));
    }
  }
};

export const removeBookmarks = ({ userId = null, type, id }: any) => {
  if (userId !== null) {
    return removeFromFbWatchlist({ userID: userId, type, id });
  } else {
    var values: any = getBookmarks(userId) || { movie: [], tv: [] };
    if (values[type]?.includes(id)) {
      values[type] = values[type].filter((ele: any) => ele !== id); // Update the array after filtering
      return localStorage.setItem(
        "RiveStreamWatchlist",
        JSON.stringify(values),
      );
    }
  }
};

export const checkBookmarks = ({ userId = null, type, id }: any) => {
  if (userId !== null) {
    return checkInFbWatchlist({ userID: userId, type, id });
  } else {
    var values: any = getBookmarks(userId) || { movie: [], tv: [] };
    if (values[type]?.includes(id)) {
      return true;
    }
    return false;
  }
};
