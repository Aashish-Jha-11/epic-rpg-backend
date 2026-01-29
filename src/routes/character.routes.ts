import { Router } from "express";
import { Routes } from "../interfaces/route.interface";
import CharacterController from "../controllers/character.controller";
import authMiddleware from "../middlewares/auth.middleware";

class CharacterRoutes implements Routes {
  path = "/api/characters";
  router = Router();
  private characterController: CharacterController;

  constructor() {
    this.characterController = new CharacterController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      `${this.path}`,
      authMiddleware.authenticate,
      this.characterController.createCharacter
    );

    this.router.get(`${this.path}`, this.characterController.getAllCharacters);

    this.router.get(
      `${this.path}/:id`,
      this.characterController.getCharacterById
    );

    this.router.put(
      `${this.path}/:id`,
      authMiddleware.authenticate,
      this.characterController.updateCharacter
    );

    this.router.delete(
      `${this.path}/:id`,
      authMiddleware.authenticate,
      this.characterController.deleteCharacter
    );

    this.router.post(
      `${this.path}/bulk-delete`,
      authMiddleware.authenticate,
      this.characterController.bulkDeleteCharacters
    );

    this.router.post(
      `${this.path}/:id/level-up`,
      authMiddleware.authenticate,
      this.characterController.levelUpCharacter
    );

    this.router.post(
      `${this.path}/:id/add-experience`,
      authMiddleware.authenticate,
      this.characterController.addExperience
    );

    this.router.post(
      `${this.path}/battle`,
      authMiddleware.authenticate,
      this.characterController.battleCharacters
    );
  }
}

export default CharacterRoutes;
