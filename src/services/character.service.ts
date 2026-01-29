import CharacterRepository from "../repositories/character.repository";
import {
  CharacterInterface,
  CharacterDocument,
  CharacterQueryOptions,
  PaginatedResponse,
  CharacterClass,
  CharacterRarity
} from "../interfaces/character.interface";

class CharacterService {
  private characterRepository: CharacterRepository;

  constructor() {
    this.characterRepository = new CharacterRepository();
  }

  async createCharacter(
    characterData: CharacterInterface
  ): Promise<CharacterDocument> {
    this.validateCharacterData(characterData);

    if (!characterData.stats) {
      characterData.stats = this.generateDefaultStats(characterData.class);
    }

    return await this.characterRepository.create(characterData);
  }

  async getCharacterById(id: string): Promise<CharacterDocument> {
    const character = await this.characterRepository.findById(id);
    if (!character) {
      throw new Error("Character nahi mila bhai!");
    }
    return character;
  }

  async getAllCharacters(
    options: CharacterQueryOptions
  ): Promise<PaginatedResponse<CharacterDocument>> {
    return await this.characterRepository.findAll(options);
  }

  async updateCharacter(
    id: string,
    updateData: Partial<CharacterInterface>
  ): Promise<CharacterDocument> {
    if (updateData.name !== undefined || updateData.class !== undefined) {
      this.validateCharacterData(updateData as CharacterInterface);
    }

    const character = await this.characterRepository.update(id, updateData);
    if (!character) {
      throw new Error("Character nahi mila update karne ke liye!");
    }
    return character;
  }

  async deleteCharacter(id: string): Promise<CharacterDocument> {
    const character = await this.characterRepository.delete(id);
    if (!character) {
      throw new Error("Character nahi mila delete karne ke liye!");
    }
    return character;
  }

  async bulkDeleteCharacters(ids: string[]): Promise<number> {
    if (!ids || ids.length === 0) {
      throw new Error("Kuch IDs toh do delete karne ke liye!");
    }
    return await this.characterRepository.deleteMany(ids);
  }

  async levelUpCharacter(id: string): Promise<CharacterDocument> {
    const character = await this.getCharacterById(id);

    if (character.level >= 100) {
      throw new Error("Bhai max level pe hai already!");
    }

    const statBoost = this.calculateStatBoost(character.class as CharacterClass);

    const updatedData: Partial<CharacterInterface> = {
      level: character.level + 1,
      experience: 0,
      stats: {
        health: character.healthStat + statBoost.health,
        attack: character.attackStat + statBoost.attack,
        defense: character.defenseStat + statBoost.defense,
        speed: character.speedStat + statBoost.speed,
        mana: character.manaStat + statBoost.mana
      }
    };

    return await this.characterRepository.update(id, updatedData);
  }

  async addExperience(id: string, exp: number): Promise<CharacterDocument> {
    if (exp <= 0) {
      throw new Error("XP toh positive hona chahiye!");
    }

    const character = await this.getCharacterById(id);
    const newExp = character.experience + exp;

    const expNeeded = this.getExpForNextLevel(character.level);
    if (newExp >= expNeeded) {
      return await this.levelUpCharacter(id);
    }

    return await this.characterRepository.update(id, { experience: newExp });
  }

  async battleCharacters(
    char1Id: string,
    char2Id: string
  ): Promise<{ winner: CharacterDocument; loser: CharacterDocument }> {
    const [char1, char2] = await Promise.all([
      this.getCharacterById(char1Id),
      this.getCharacterById(char2Id)
    ]);

    const char1Power =
      char1.attackStat + char1.speedStat + char1.level * 10;
    const char2Power =
      char2.attackStat + char2.speedStat + char2.level * 10;

    const winner = char1Power > char2Power ? char1 : char2;
    const loser = char1Power > char2Power ? char2 : char1;

    await this.addExperience(winner.id, 100);

    return { winner, loser };
  }

  private validateCharacterData(data: Partial<CharacterInterface>): void {
    if (data.name && (data.name.length < 2 || data.name.length > 50)) {
      throw new Error("Name 2-50 characters ka hona chahiye!");
    }

    if (data.level && (data.level < 1 || data.level > 100)) {
      throw new Error("Level 1-100 ke beech hona chahiye!");
    }
  }

  private generateDefaultStats(characterClass: CharacterClass) {
    const statsMap = {
      [CharacterClass.WARRIOR]: {
        health: 150,
        attack: 80,
        defense: 90,
        speed: 60,
        mana: 30
      },
      [CharacterClass.MAGE]: {
        health: 80,
        attack: 120,
        defense: 50,
        speed: 70,
        mana: 150
      },
      [CharacterClass.ARCHER]: {
        health: 100,
        attack: 100,
        defense: 60,
        speed: 110,
        mana: 50
      },
      [CharacterClass.ASSASSIN]: {
        health: 90,
        attack: 110,
        defense: 50,
        speed: 130,
        mana: 40
      },
      [CharacterClass.HEALER]: {
        health: 110,
        attack: 50,
        defense: 70,
        speed: 80,
        mana: 140
      }
    };

    return statsMap[characterClass];
  }

  private calculateStatBoost(characterClass: CharacterClass) {
    const boostMap = {
      [CharacterClass.WARRIOR]: {
        health: 15,
        attack: 8,
        defense: 9,
        speed: 6,
        mana: 3
      },
      [CharacterClass.MAGE]: {
        health: 8,
        attack: 12,
        defense: 5,
        speed: 7,
        mana: 15
      },
      [CharacterClass.ARCHER]: {
        health: 10,
        attack: 10,
        defense: 6,
        speed: 11,
        mana: 5
      },
      [CharacterClass.ASSASSIN]: {
        health: 9,
        attack: 11,
        defense: 5,
        speed: 13,
        mana: 4
      },
      [CharacterClass.HEALER]: {
        health: 11,
        attack: 5,
        defense: 7,
        speed: 8,
        mana: 14
      }
    };

    return boostMap[characterClass];
  }

  private getExpForNextLevel(currentLevel: number): number {
    return currentLevel * 100;
  }
}

export default CharacterService;
