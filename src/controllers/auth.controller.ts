import { Request, Response } from "express";
import AuthService from "../services/auth.service";

class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  register = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({
          success: false,
          message: "Saari details toh daalo yaar!"
        });
      }

      const result = await this.authService.register(req.body);
      return res.status(201).json({
        success: true,
        message: "Account ban gaya! Welcome! 🎊",
        ...result
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message || "Registration nahi ho paayi!"
      });
    }
  };

  login = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email aur password toh chahiye!"
        });
      }

      const result = await this.authService.login(email, password);
      return res.status(200).json({
        success: true,
        message: "Login ho gaya! 🚀",
        ...result
      });
    } catch (error: any) {
      return res.status(401).json({
        success: false,
        message: error.message || "Login nahi ho paya!"
      });
    }
  };
}

export default AuthController;
