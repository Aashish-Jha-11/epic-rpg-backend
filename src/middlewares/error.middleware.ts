import { Request, Response, NextFunction } from "express";

class ErrorHandler {
  static handle(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Kuch toh gadbad ho gayi!";

    res.status(statusCode).json({
      success: false,
      message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack })
    });
  }

  static notFound(req: Request, res: Response, next: NextFunction): void {
    res.status(404).json({
      success: false,
      message: "Ye route toh exist hi nahi karta! 🤷‍♂️"
    });
  }
}

export default ErrorHandler;
