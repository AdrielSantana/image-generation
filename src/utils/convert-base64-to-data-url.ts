export const convertBase64ToDataUrl = (base64: string) => {
  if(!base64) return "";
  return "data:image/jpeg;base64," + base64;
};
