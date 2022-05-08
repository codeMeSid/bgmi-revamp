import { ErrorType } from "./errorType";

export const statusCodes: Record<ErrorType, number> = {
  BadRequestError: 400,
  UnAuthorisedError: 401,
  NotFoundError: 404,
};
