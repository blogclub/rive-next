// continueWatching :{
//   movie:[],
//   tv:["this is going to be episode id not the series id, so we can call this episode. Now this contains the showid"],
// }

export const getContinueWatching = () => {
  const values: any = localStorage.getItem("RiveStreamContinueWatching");
  return JSON.parse(values);
};

export const setContinueWatching = ({ type, id }: any) => {
  var values = getContinueWatching() || { movie: [], tv: [] };
  if (!values[type]?.includes(id)) {
    if (values[type]?.length > 20) values[type]?.pop();
    values[type] = values[type]?.reverse();
    values[type]?.push(id);
    // if (values[type]?.length > 20) values[type].shift();
    values[type] = values[type]?.reverse();
    localStorage.setItem("RiveStreamContinueWatching", JSON.stringify(values));
  }
  // special for continue watching, elements already present are removed then added at the very begining of the list
  else {
    removeContinueWatching({ type: type, id: id });
    setContinueWatching({ type: type, id: id });
  }
};

export const removeContinueWatching = ({ type, id }: any) => {
  var values = getContinueWatching() || { movie: [], tv: [] };
  if (values[type]?.includes(id)) {
    values[type] = values[type].filter((ele: any) => ele !== id); // Update the array after filtering
    localStorage.setItem("RiveStreamContinueWatching", JSON.stringify(values));
  }
};

export const checkContinueWatching = ({ type, id }: any) => {
  var values = getContinueWatching() || { movie: [], tv: [] };
  if (values[type]?.includes(id)) {
    return true;
  }
  return false;
};
