// watchlist :{
//   movie:[],
//   tv:[],
// }

export const getBookmarks = () => {
  const values: any = localStorage.getItem("RiveStreamWatchlist");
  return JSON.parse(values);
}

export const setBookmarks = ({ type, id }: any) => {
  var values = getBookmarks() || { movie: [], tv: [] };
  if (!values[type]?.includes(id)) {
    values[type] = values[type].reverse();
    values[type]?.push(id);
    values[type] = values[type].reverse();
    localStorage.setItem("RiveStreamWatchlist", JSON.stringify(values));
  }
}

export const removeBookmarks = ({ type, id }: any) => {
  var values = getBookmarks() || { movie: [], tv: [] };
  if (values[type]?.includes(id)) {
    values[type] = values[type].filter((ele: any) => ele !== id); // Update the array after filtering
    localStorage.setItem("RiveStreamWatchlist", JSON.stringify(values));
  }
}

export const checkBookmarks = ({ type, id }: any) => {
  var values = getBookmarks() || { movie: [], tv: [] };
  if (values[type]?.includes(id)) {
    return true;
  }
  return false;
}