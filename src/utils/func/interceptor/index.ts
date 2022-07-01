import axios from "axios";
import { RequestType } from "./RequestType";
import { ResponseType } from "./ResponseType";

export default function useInterceptor() {
  return {
    request: (props: RequestType) => {
      const { onError, onSuccess } = props;
      return axios.interceptors.request.use(
        (config) => {
          onSuccess(config);
          return config;
        },
        (errors) => {
          onError();
          return Promise.reject(errors);
        }
      );
    },
    response: (props: ResponseType) => {
      const { onError, onSuccess } = props;
      return axios.interceptors.response.use(
        (response) => {
          onSuccess(response);
          return Promise.resolve(response);
        },
        (errors) => {
          onError();
          return Promise.reject(errors);
        }
      );
    },
    ejectRequest: (id: number) => axios.interceptors.request.eject(id),
    ejectResponse: (id: number) => axios.interceptors.response.eject(id),
  };
}
