import Express from "express";
import Env from "dotenv";
import AppSettings from "./app/settings.js";
import Routes from "./app/routes.js";

// Startup
Env.config();
const app = Express();

// Settings
AppSettings(app);

// Routes
Routes(app);
