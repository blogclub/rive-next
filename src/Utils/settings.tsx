export const getSettings = () => {
  const values: any = localStorage.getItem("RiveStreamSettings");
  return JSON.parse(values);
};

export const setSettings = ({ values }: any) => {
  // var values = getSettings() || {
  //   theme: "", mode: "", ascent_color: ""
  // };
  // values[type] = value;
  localStorage.setItem("RiveStreamSettings", JSON.stringify(values));
};
