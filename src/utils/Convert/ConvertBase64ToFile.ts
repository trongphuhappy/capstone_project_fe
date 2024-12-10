export const convertBase64ToFile = async (base64: string, fileName: string) => {
  const res = await fetch(base64);
  const buffer = await res.arrayBuffer();
  return new File([buffer], fileName, { type: "image/jpeg" });
};
