import { NextFunction, Request, Response } from "express";
import { CustomError } from "../error";
import { log } from "../pinoLog";

export function requestErrorHandler(
  error: Error | CustomError | any,
  req: Request,
  res: Response,
  nextFunc: NextFunction
) {
  log.error(error.message, "SREVER RESPONSE");
  if (error instanceof CustomError)
    res.json({
      success: false,
      payload: {
        errors: error.messages.map((message) => ({ type: "error", message })),
      },
    });
  else
    res.json({
      success: false,
      payload: [{ type: "error", message: error.message }],
    });
}
