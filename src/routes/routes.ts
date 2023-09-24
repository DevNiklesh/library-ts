
import { Application, Router } from "express";

import healthCheck from "./health.route";
import { config } from "../config/config";

export const routes = (app: Application) => {
  const router = Router();
  // router.use([]);

  app.use(`/${config.api}/${config.version}`, router);
  app.use(`/`, [healthCheck])
};