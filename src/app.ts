import express from "express";
import dotenv from "dotenv";
import Database from "./config/database";
import { Routes } from "./interfaces/route.interface";
import ErrorHandler from "./middlewares/error.middleware";

dotenv.config();

class App {
  public app: express.Application;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
    this.connectDatabase();
  }

  public startServer(): void {
    this.app.listen(this.port, () => {
      console.log(`
╔═══════════════════════════════════════════╗
║   🎮 Epic RPG Backend Server Running!    ║
║   📡 Port: ${this.port}                         ║
║   🚀 http://localhost:${this.port}              ║
║   💾 Database: Neon PostgreSQL           ║
╚═══════════════════════════════════════════╝
      `);
    });
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static("public"));

    this.app.use((req, res, next) => {
      console.log(`${req.method} ${req.path}`);
      next();
    });
  }

  private initializeRoutes(routes: Routes[]): void {
    this.app.get("/", (req, res) => {
      res.json({
        message: "🎮 Epic RPG Backend API",
        version: "1.0.0",
        database: "Neon PostgreSQL",
        endpoints: {
          auth: "/api/auth",
          characters: "/api/characters"
        }
      });
    });

    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  private initializeErrorHandling(): void {
    this.app.use(ErrorHandler.notFound);
    this.app.use(ErrorHandler.handle);
  }

  private async connectDatabase(): Promise<void> {
    const uri = process.env.DATABASE_URL;
    if (!uri) {
      throw new Error("DATABASE_URL environment variable missing hai!");
    }

    await Database.connect();
  }
}

export default App;
