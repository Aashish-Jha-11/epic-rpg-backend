import { Character } from "@prisma/client";

export enum CharacterClass {
  WARRIOR = "warrior",
  MAGE = "mage",
  ARCHER = "archer",
  ASSASSIN = "assassin",
  HEALER = "healer"
}

export enum CharacterRarity {
  COMMON = "common",
  RARE = "rare",
  EPIC = "epic",
  LEGENDARY = "legendary"
}

export interface CharacterStats {
  health: number;
  attack: number;
  defense: number;
  speed: number;
  mana: number;
}

export interface CharacterInterface {
  name: string;
  class: CharacterClass;
  level: number;
  experience: number;
  rarity: CharacterRarity;
  stats: CharacterStats;
  skills: string[];
  isActive: boolean;
  userId?: string;
}

export type CharacterDocument = Character;

export interface CharacterQueryOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  class?: CharacterClass;
  rarity?: CharacterRarity;
  minLevel?: number;
  maxLevel?: number;
  search?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}
