import App from "./app";
import CharacterRoutes from "./routes/character.routes";
import AuthRoutes from "./routes/auth.routes";

const app = new App([new CharacterRoutes(), new AuthRoutes()]);

app.startServer();
