import { AxiosResponse } from "axios";

export type ResponseType = {
  onSuccess: (response: AxiosResponse) => void;
  onError: () => void;
};
