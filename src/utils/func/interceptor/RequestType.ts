import { AxiosRequestConfig } from "axios";

export type RequestType = {
  onSuccess: (config: AxiosRequestConfig) => void;
  onError: () => void;
};
