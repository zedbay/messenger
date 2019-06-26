import { Router, Express } from "express";
import { UserHandler } from '../handlers/user.handlers';
import { Security } from '../security/security';
import { checkJwt, checkAdmin } from '../security/checkJwt.middleware';

export class UserRoutes {

	public static init(express: Express) {
		const router: Router = Router();
		UserRoutes.mountPrivateRoutes(router);
		UserRoutes.mountPublicRoutes(router);
		UserRoutes.mountAdminRoutes(router);
		express.use('/', router);
	}

	private static mountPublicRoutes(router: Router) {
		router.post('/login', Security.login);
		router.get('/tokenIsOk', UserHandler.tokenIsOk);
	}

	private static mountPrivateRoutes(router: Router) {
		router.get('/whoami', checkJwt, UserHandler.whoami);
		router.get('/user/friends', checkJwt, UserHandler.getFriends);
	}

	private static mountAdminRoutes(router: Router) {
		router.post('/user/role', checkJwt, checkAdmin, UserHandler.modifyRole);
	}

}