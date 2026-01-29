import { Request, Response, NextFunction } from "express";
import AuthService from "../services/auth.service";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    username: string;
    email: string;
  };
}

class AuthMiddleware {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  authenticate = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({
          success: false,
          message: "Token toh daalo header mein!"
        });
        return;
      }

      const token = authHeader.split(" ")[1];
      const decoded = this.authService.verifyToken(token);

      req.user = decoded;
      next();
    } catch (error: any) {
      res.status(401).json({
        success: false,
        message: error.message || "Authentication fail ho gaya!"
      });
    }
  };
}

export default new AuthMiddleware();
