import { Router, Express } from "express";
import { ServerHandler } from "../handlers/server.handlers";
import { checkJwt } from "../security/checkJwt.middleware";

export class ServerRoutes {

	public static init(express: Express) {
		const router: Router = Router();
		ServerRoutes.mountPrivateRoutes(router);
		ServerRoutes.mountPublicRoutes(router);
		express.use('/', router);
	}

	private static mountPublicRoutes(router: Router) {
		router.get('/server', (req, res) => {
			ServerHandler.get(req, res);
		});
	}

	private static mountPrivateRoutes(router: Router) {
		router.post('/server', (req, res) => {
			ServerHandler.add(req, res);
		});
		router.delete('/server/:entitled', (req, res) => {
			ServerHandler.delete(req, res);
        });
        router.get('/server/:name', (req, res) => {
            ServerHandler.getMessages(req, res);
        });
	}

}