import { getStorageItem } from "@/utils/local-storage";
import axios, { AxiosError } from "axios";
import useToast from "@/hooks/use-toast";
import { TMeta } from "@/typings";

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const errorHandler = async (error: AxiosError) => {
  const { addToast } = useToast();
  const responseMeta: TMeta = error.response?.data as TMeta;
  if (!error?.response) {
    const result: TMeta = {
      statusCode: 503,
      message: "Network not available!",
      error: "Network not available!",
    };
    addToast({
      type: "error",
      description: result.message,
      duration: 5000,
    });
    return Promise.reject(result);
  } else {
    switch (responseMeta.error) {
    }
    if (responseMeta.statusCode === 401 && error.config) {
      addToast({
        type: "error",
        description: responseMeta.message,
        duration: 5000,
      });
      // window.location.href = "/login";
    }
  }

  return Promise.reject(responseMeta);
};

request.interceptors.request.use(
  (config) => {
    const token = getStorageItem("accessToken");
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return errorHandler(error);
  }
);

export default request;
