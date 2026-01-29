import { PrismaClient } from "@prisma/client";

class Database {
  private static instance: PrismaClient;

  static getInstance(): PrismaClient {
    if (!Database.instance) {
      Database.instance = new PrismaClient({
        log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"]
      });
    }
    return Database.instance;
  }

  static async connect(): Promise<void> {
    try {
      const prisma = Database.getInstance();
      await prisma.$connect();
      console.log("✅ Neon Database connected successfully!");
    } catch (error) {
      console.error("❌ Database connection fail:", error);
      process.exit(1);
    }
  }

  static async disconnect(): Promise<void> {
    const prisma = Database.getInstance();
    await prisma.$disconnect();
  }
}

export default Database;
