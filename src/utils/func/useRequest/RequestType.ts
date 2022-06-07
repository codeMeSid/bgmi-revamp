export type RequestType = {
  url: string;
  payload?: any;
  onSuccess?: (data: any) => void;
  onFail?: () => void;
  onError?: (errors: Array<{ message: string }>) => any;
};
