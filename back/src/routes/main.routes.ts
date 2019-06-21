import { Router, Express } from "express";
import { RoomRoutes } from "./room.routes";
import { UserRoutes } from "./user.routes";
import { MessageRoutes } from './message.routes';

export class MainRouter {

    constructor(express: Express) {
        const router: Router = Router();
        router.get('/isAlive', (req, res) => {
            return res.status(200).json({ isAlive: true });
        });
        express.use("/", router);
        RoomRoutes.init(express);
        MessageRoutes.init(express);
        UserRoutes.init(express);
    }

}