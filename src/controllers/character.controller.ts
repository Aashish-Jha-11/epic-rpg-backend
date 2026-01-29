import { Request, Response } from "express";
import CharacterService from "../services/character.service";
import { CharacterQueryOptions } from "../interfaces/character.interface";

class CharacterController {
  private characterService: CharacterService;

  constructor() {
    this.characterService = new CharacterService();
  }

  createCharacter = async (req: Request, res: Response): Promise<Response> => {
    try {
      const character = await this.characterService.createCharacter(req.body);
      return res.status(201).json({
        success: true,
        message: "Character ban gaya boss! 🎮",
        data: character
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message || "Character nahi ban paya!"
      });
    }
  };

  getCharacterById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const character = await this.characterService.getCharacterById(
        req.params.id
      );
      return res.status(200).json({
        success: true,
        data: character
      });
    } catch (error: any) {
      return res.status(404).json({
        success: false,
        message: error.message || "Character nahi mila!"
      });
    }
  };

  getAllCharacters = async (req: Request, res: Response): Promise<Response> => {
    try {
      const options: CharacterQueryOptions = {
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 10,
        sortBy: (req.query.sortBy as string) || "createdAt",
        sortOrder: (req.query.sortOrder as "asc" | "desc") || "desc",
        class: req.query.class as any,
        rarity: req.query.rarity as any,
        minLevel: req.query.minLevel
          ? parseInt(req.query.minLevel as string)
          : undefined,
        maxLevel: req.query.maxLevel
          ? parseInt(req.query.maxLevel as string)
          : undefined,
        search: req.query.search as string
      };

      const result = await this.characterService.getAllCharacters(options);
      return res.status(200).json({
        success: true,
        ...result
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || "Characters nahi mil paye!"
      });
    }
  };

  updateCharacter = async (req: Request, res: Response): Promise<Response> => {
    try {
      const character = await this.characterService.updateCharacter(
        req.params.id,
        req.body
      );
      return res.status(200).json({
        success: true,
        message: "Character update ho gaya! ✨",
        data: character
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message || "Character update nahi hua!"
      });
    }
  };

  deleteCharacter = async (req: Request, res: Response): Promise<Response> => {
    try {
      const character = await this.characterService.deleteCharacter(
        req.params.id
      );
      return res.status(200).json({
        success: true,
        message: "Character delete ho gaya! 👋",
        data: character
      });
    } catch (error: any) {
      return res.status(404).json({
        success: false,
        message: error.message || "Character delete nahi hua!"
      });
    }
  };

  bulkDeleteCharacters = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { ids } = req.body;
      const deletedCount = await this.characterService.bulkDeleteCharacters(
        ids
      );
      return res.status(200).json({
        success: true,
        message: `${deletedCount} characters delete ho gaye! 🗑️`,
        deletedCount
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message || "Bulk delete nahi hua!"
      });
    }
  };

  levelUpCharacter = async (req: Request, res: Response): Promise<Response> => {
    try {
      const character = await this.characterService.levelUpCharacter(
        req.params.id
      );
      return res.status(200).json({
        success: true,
        message: "Level up ho gaya! 🎉",
        data: character
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message || "Level up nahi hua!"
      });
    }
  };

  addExperience = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { experience } = req.body;
      const character = await this.characterService.addExperience(
        req.params.id,
        experience
      );
      return res.status(200).json({
        success: true,
        message: "XP mil gaya! 💫",
        data: character
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message || "XP nahi mila!"
      });
    }
  };

  battleCharacters = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { char1Id, char2Id } = req.body;
      const result = await this.characterService.battleCharacters(
        char1Id,
        char2Id
      );
      return res.status(200).json({
        success: true,
        message: "Battle ho gaya! ⚔️",
        data: result
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message || "Battle nahi hua!"
      });
    }
  };
}

export default CharacterController;
