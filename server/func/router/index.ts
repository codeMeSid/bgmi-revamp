import { Router } from "express";
import { DomainApi } from "./domainApi";
import { RouteManagerList } from "./routeManagerList";

class RouteManager {
  private routes: Array<RouteManagerList> = [];
  private router = Router();
  register(domainUrl: string, domainApis: Array<DomainApi>) {
    this.routes.push({ domain: domainUrl, domainApis });
  }
  generateRoutes() {
    this.routes.map(({ domain, domainApis }) => {
      return domainApis.map(
        ({ url, method, middlewares, controllerFunc }) => {
          return this.router[method](
            `${domain}${url}`,
            ...middlewares,
            controllerFunc
          );
        }
      );
    });
    return this.router;
  }
}

const routeManager = new RouteManager();
export default routeManager;
