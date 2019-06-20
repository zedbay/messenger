import { Router, Express } from "express";
import { ServerHandler } from "../handlers/server.handlers";
import { checkJwt, checkAdmin } from "../security/checkJwt.middleware";

export class ServerRoutes {

	public static init(express: Express) {
		const router: Router = Router();
		ServerRoutes.mountPrivateRoutes(router);
		ServerRoutes.mountPublicRoutes(router);
		ServerRoutes.mountAdminRoutes(router);
		express.use('/', router);
	}

	private static mountPublicRoutes(router: Router) {
		router.get('/server', (req, res) => {
			ServerHandler.get(req, res);
		});
	}

	private static mountPrivateRoutes(router: Router) {
		router.post('/server', checkJwt, (req, res) => {
			ServerHandler.add(req, res);
		});
		router.delete('/server/:entitled', checkJwt, (req, res) => {
			ServerHandler.delete(req, res);
        });
        router.get('/server/:name', checkJwt, (req, res) => {
            ServerHandler.getMessages(req, res);
        });
	}

	private static mountAdminRoutes(router: Router) {
		router.delete('/admin/server', checkJwt, checkAdmin, (req, res) => {
			ServerHandler.deleteAll(req, res);
		})
    }

}