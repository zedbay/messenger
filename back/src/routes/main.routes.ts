import { Router, Express } from "express";
import { ServerRoutes } from "./server.routes";
import { UserRoutes } from "./user.routes";

export class MainRouter {

    constructor(express: Express) {
        const router: Router = Router();
        router.get('/isAlive', (req, res) => {
            return res.status(200).json({ isAlive: true });
        });
        express.use("/", router);
        ServerRoutes.init(express);
        UserRoutes.init(express);
    }

}