import { ErrorType } from "./errorType";
import { statusCodes } from "./statusCodes";

export class CustomError extends Error {
  statusCode: number = 500;
  messages: Array<string> = [];
  constructor(errorType: ErrorType, messages = ["something went wrong !!"]) {
    super(messages[0]);
    if (statusCodes[errorType]) this.statusCode = statusCodes[errorType];
    this.messages = messages;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
