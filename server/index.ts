import "express-async-errors";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as cors from "cors";
import helmet from "helmet";
import routeManager from "./func/router";
import { testRoutes } from "./routes/test";
import { systemRoutes } from "./routes/system";
import { requestErrorHandler } from "./func/middlewares/requestErrorHandler";
import { configManager } from "./func/configManager";
import { log } from "./func/pinoLog";
import { mongoConnector } from "./func/mongoConnect";
import { playerRoutes } from "./routes/player";
import { teamRoutes } from "./routes/team";
import { tournamentRoutes } from "./routes/tournament";
import * as path from "path";
import { matchRoutes } from "./routes/match";

// TODO add cookies
(async () => {
  try {
    const app = express();
    const PORT = configManager.get("port");
    // PLUGINS
    app.use(bodyParser.json());
    app.use(compression());
    // app.use(helmet());
    app.use(cors());
    // ROUTES
    routeManager.register("/match", matchRoutes);
    routeManager.register("/tournament", tournamentRoutes);
    routeManager.register("/player", playerRoutes);
    routeManager.register("/team", teamRoutes);
    routeManager.register("/test", testRoutes);
    routeManager.register("/*", systemRoutes);
    app.use("/api/sb/", routeManager.generateRoutes());
    app.use(express.static(__dirname));
    app.use("/*", function (_, res) {
      res.sendFile(path.join(__dirname, "index.html"));
    });
    app.use(requestErrorHandler);
    // SERVER
    await mongoConnector.connect();
    app.listen(PORT, () => log.info(`SERVER AT ${PORT}`, "SREVER RESPONSE"));
  } catch (error: Error | any) {
    log.error(error?.message, "SREVER RESPONSE");
  }
})();
