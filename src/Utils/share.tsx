export const navigatorShare = async ({ text, url }: any) => {
  const shareData = {
    title: "RiveStream",
    text: text,
    url: url,
  };

  try {
    await navigator.share(shareData);
  } catch (e) {
    console.error(e);
  }
};
