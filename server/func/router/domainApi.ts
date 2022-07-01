import { ControllerFunction } from "./controllerFunction";
import { HttpMethod } from "./httpMethod";

export type DomainApi = {
  url: string;
  method: HttpMethod;
  middlewares: Array<ControllerFunction>;
  controllerFunc: ControllerFunction;
};
