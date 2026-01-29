import { Router } from "express";
import { Routes } from "../interfaces/route.interface";
import AuthController from "../controllers/auth.controller";

class AuthRoutes implements Routes {
  path = "/api/auth";
  router = Router();
  private authController: AuthController;

  constructor() {
    this.authController = new AuthController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(`${this.path}/register`, this.authController.register);
    this.router.post(`${this.path}/login`, this.authController.login);
  }
}

export default AuthRoutes;
