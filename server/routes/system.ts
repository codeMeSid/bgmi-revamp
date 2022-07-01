import { CustomError } from "../func/error";
import { DomainApi } from "../func/router/domainApi";

export const systemRoutes: Array<DomainApi> = [
  {
    url: "/",
    method: "all",
    middlewares: [],
    controllerFunc: (req, res) => {
      throw new CustomError("NotFoundError", ["api route not found"]);
    },
  },
];
