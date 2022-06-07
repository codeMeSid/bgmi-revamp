import { DomainApi } from "../func/router/domainApi";
import { generateShortname } from "../func/utils/generateShortname";

export const testRoutes: Array<DomainApi> = [
  {
    url: "/",
    method: "get",
    middlewares: [],
    controllerFunc: (req, res) => {
      res.json({
        success: true,
        payload: { uid: generateShortname("sid dis pi") },
      });
    },
  },
];
