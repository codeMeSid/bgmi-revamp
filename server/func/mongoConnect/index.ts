import * as mongoose from "mongoose";
import { configManager } from "../configManager";
import { log } from "../pinoLog";

class MongoConnector {
  async connect() {
    return new Promise((res, rej) => {
      return mongoose.connect(configManager.get("mongoUri"), (error) => {
        if (error) {
          log.error(error.message, "SREVER RESPONSE");
          rej(error.message);
        } else {
          log.info("MONGO DB CONNECTED", "SREVER RESPONSE");
          res(true);
        }
      });
    });
  }
}

export const mongoConnector = new MongoConnector();
