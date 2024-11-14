export const getStorageItem = (key: string, defaultValue?: string): string | undefined => {
  return (localStorage.getItem(key) !== null && localStorage.getItem(key)) || defaultValue;
};

export const setStorageItem = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

export const removeStorageItem = (key: string): void => {
  localStorage.removeItem(key);
};
