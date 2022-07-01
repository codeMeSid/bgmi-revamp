import pino, { Logger } from "pino";
import { configManager } from "../configManager";
import { LogByType } from "./logByType";

class PinoLogger {
  private log: Logger;
  constructor() {
    this.log = pino({
      level: configManager.get("logLevel"),
      transport: { target: "pino-pretty", options: { colorize: true } },
    });
  }
  info(message: string, by?: LogByType) {
    if (!this.log) return;
    this.log.info(message, by);
  }
  error(message: string, by?: LogByType) {
    if (!this.log) return;
    this.log.error(message, by);
  }
}

export const log = new PinoLogger();
