export const isTMeta = (error: any): error is TMeta => {
  return (
    typeof error === "object" &&
    error !== null &&
    "detail" in error &&
    "errorCode" in error &&
    "status" in error &&
    "title" in error
  );
};

export const isTResponse = (data: any): data is TResponse => {
  return data;
};

export const isTResponseData = (data: any): data is TResponseData => {
  return data;
};
