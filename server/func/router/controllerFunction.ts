import { Request, Response, NextFunction } from "express";

export type ControllerFunction = (
  req: Request,
  res: Response,
  nextFunc: NextFunction
) => void;
