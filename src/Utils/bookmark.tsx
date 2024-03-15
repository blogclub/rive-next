export const getBookmarks = () => {
  const values: any = localStorage.getItem("RiveStreamBookmarks");
  return JSON.parse(values);
}

export const setBookmarks = ({ id }: any) => {
  var values = getBookmarks() || [];
  if (!values.includes(id)) {
    values.push(id);
    localStorage.setItem("RiveStreamBookmarks", JSON.stringify(values));
  }
}

export const removeBookmarks = ({ id }: any) => {
  var values = getBookmarks() || [];
  if (values.includes(id)) {
    var newValues = values.filter((ele: any) => ele !== id);
    localStorage.setItem("RiveStreamBookmarks", JSON.stringify(newValues));
  }
}

export const checkBookmarks = ({ id }: any) => {
  var values = getBookmarks() || [];
  if (values.includes(id)) {
    return true;
  }
  return false;
}