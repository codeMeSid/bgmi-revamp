import * as convict from "convict";
import { EnvType } from "./envType";

export const configManager = convict({
  port: {
    doc: "server port for application",
    default: 4000,
    arg: "port",
    env: "PORT",
  },
  env: {
    doc: "application environment",
    format: Object.values(EnvType),
    default: EnvType.DEVELOPMENT,
    arg: "env",
    env: "NODE_ENV",
  },
  mongoUri: {
    doc: "connection uri for mongoDb",
    default:
      "mongodb+srv://siddhant:tAOdBjJMrQd97RbY@ugh.0clqp.mongodb.net/manager",
    arg: "mongoUri",
    env: "MONGO_URI",
  },
  logLevel: {
    doc: "logger type",
    default: "debug",
    arg: "logLevel",
  },
  cookieAge: {
    doc: "age of cookie",
    default: 1000 * 60 * 60, // 1 hr
    arg: "cookieAge",
    env: "COOKIE_AGE",
  },
  cookieSecret: {
    doc: "secret signing key for cookie",
    default: "qwerty0106qwerty!*",
    arg: "cookieSecret",
    env: "COOKIE_SECRET",
  },
  hashKeySecret: {
    doc: "encryption decryption hash key",
    default: "#PB#",
    arg: "hashKey",
    env: "HASH_KEY",
  },
});
