import Database from "../config/database";
import {
  CharacterInterface,
  CharacterDocument,
  CharacterQueryOptions,
  PaginatedResponse
} from "../interfaces/character.interface";

class CharacterRepository {
  private prisma = Database.getInstance();

  async create(characterData: CharacterInterface): Promise<CharacterDocument> {
    return await this.prisma.character.create({
      data: {
        name: characterData.name,
        class: characterData.class,
        level: characterData.level,
        experience: characterData.experience,
        rarity: characterData.rarity,
        healthStat: characterData.stats.health,
        attackStat: characterData.stats.attack,
        defenseStat: characterData.stats.defense,
        speedStat: characterData.stats.speed,
        manaStat: characterData.stats.mana,
        skills: characterData.skills,
        isActive: characterData.isActive,
        userId: characterData.userId
      }
    });
  }

  async findById(id: string): Promise<CharacterDocument | null> {
    return await this.prisma.character.findUnique({
      where: { id }
    });
  }

  async findAll(
    options: CharacterQueryOptions
  ): Promise<PaginatedResponse<CharacterDocument>> {
    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
      class: characterClass,
      rarity,
      minLevel,
      maxLevel,
      search
    } = options;

    const where: any = {};

    if (characterClass) where.class = characterClass;
    if (rarity) where.rarity = rarity;
    if (minLevel || maxLevel) {
      where.level = {};
      if (minLevel) where.level.gte = minLevel;
      if (maxLevel) where.level.lte = maxLevel;
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { skills: { has: search } }
      ];
    }

    const skip = (page - 1) * limit;

    const [data, totalItems] = await Promise.all([
      this.prisma.character.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder }
      }),
      this.prisma.character.count({ where })
    ]);

    return {
      data,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
        totalItems,
        itemsPerPage: limit
      }
    };
  }

  async update(
    id: string,
    updateData: Partial<CharacterInterface>
  ): Promise<CharacterDocument | null> {
    const data: any = {};

    if (updateData.name !== undefined) data.name = updateData.name;
    if (updateData.class !== undefined) data.class = updateData.class;
    if (updateData.level !== undefined) data.level = updateData.level;
    if (updateData.experience !== undefined)
      data.experience = updateData.experience;
    if (updateData.rarity !== undefined) data.rarity = updateData.rarity;
    if (updateData.skills !== undefined) data.skills = updateData.skills;
    if (updateData.isActive !== undefined) data.isActive = updateData.isActive;
    if (updateData.userId !== undefined) data.userId = updateData.userId;

    if (updateData.stats) {
      if (updateData.stats.health !== undefined)
        data.healthStat = updateData.stats.health;
      if (updateData.stats.attack !== undefined)
        data.attackStat = updateData.stats.attack;
      if (updateData.stats.defense !== undefined)
        data.defenseStat = updateData.stats.defense;
      if (updateData.stats.speed !== undefined)
        data.speedStat = updateData.stats.speed;
      if (updateData.stats.mana !== undefined)
        data.manaStat = updateData.stats.mana;
    }

    return await this.prisma.character.update({
      where: { id },
      data
    });
  }

  async delete(id: string): Promise<CharacterDocument | null> {
    return await this.prisma.character.delete({
      where: { id }
    });
  }

  async deleteMany(ids: string[]): Promise<number> {
    const result = await this.prisma.character.deleteMany({
      where: { id: { in: ids } }
    });
    return result.count;
  }

  async findByUserId(userId: string): Promise<CharacterDocument[]> {
    return await this.prisma.character.findMany({
      where: { userId, isActive: true }
    });
  }
}

export default CharacterRepository;
