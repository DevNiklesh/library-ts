import { Application, Router } from "express";

import healthCheck from "./health.route";
import { config } from "../config/config";
import BooksRouter from "./books.route";

export const routes = (app: Application) => {
    const routerv1 = Router();
    routerv1.use([BooksRouter]);

    app.use(`/${config.api}/${config.version}`, routerv1);
    app.use(`/`, [healthCheck]);
};
