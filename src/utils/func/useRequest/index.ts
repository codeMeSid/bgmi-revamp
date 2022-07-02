import axios, { AxiosError } from "axios";
import { useActionDispatch } from "../useActionDispatch";
import { HttpMethod } from "./HttpMethod";
import { RequestType } from "./RequestType";

export const useRequest = (method: HttpMethod) => {
  const dispatchAction = useActionDispatch();
  return function request(attrs: RequestType) {
    let requestAxios;
    if (method === "get") requestAxios = axios.get;
    else if (method === "post") requestAxios = axios.post;
    else if (method === "put") requestAxios = axios.put;
    else requestAxios = axios.delete;
    requestAxios(`/api/sb${attrs.url}`, { payload: attrs.payload })
      .then((response) => {
        const { success, payload } = response.data;
        if (success && attrs?.onSuccess) attrs.onSuccess(payload);
        else if (!success && attrs?.onFail) attrs.onFail();
      })
      .catch((error: AxiosError) => {
        const errors = error.response?.data.payload?.errors?.map(
          (errMsg: string) => ({
            meesage: errMsg,
            type: "error",
          })
        );
        if (errors && !!errors.length) {
          if (attrs?.onError) attrs.onError(errors);
          dispatchAction({ type: "NOTIFICATION:ADD", payload: errors });
          setTimeout(
            () => dispatchAction({ type: "NOTIFICATION:REMOVE" }),
            3000
          );
        } else {
          dispatchAction({
            type: "NOTIFICATION:ADD",
            payload: [{ message: "Something went wrong !!!", type: "error" }],
          });
        }
      });
  };
};
