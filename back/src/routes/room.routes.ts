import { Router, Express } from "express";
import { RoomHandler } from "../handlers/room.handlers";
import { checkJwt, checkAdmin } from "../security/checkJwt.middleware";

export class RoomRoutes {

	public static init(express: Express) {
		const router: Router = Router();
		RoomRoutes.mountPrivateRoutes(router);
		RoomRoutes.mountPublicRoutes(router);
		RoomRoutes.mountAdminRoutes(router);
		express.use('/', router);
	}

	private static mountPublicRoutes(router: Router) {

	}

	private static mountPrivateRoutes(router: Router) {
		router.post('/room', checkJwt, RoomHandler.add);
        router.get('/room/:idUser', checkJwt, RoomHandler.getMessages);
	}

	private static mountAdminRoutes(router: Router) {

    }

}