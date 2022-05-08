import { DomainApi } from "../func/router/domainApi";

export const testRoutes: Array<DomainApi> = [
  {
    url: "/",
    method: "get",
    middlewares: [],
    controllerFunc: (req, res) => {
      res.json({ success: true });
    },
  },
];
