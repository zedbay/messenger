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
        router.post('/login', (req, res) => {
			Security.login(req, res);
        });
        router.get('/tokenIsOk',  (req, res) => {
            UserHandler.tokenIsOk(req, res);
        }); 
	}

	private static mountPrivateRoutes(router: Router) {
		router.get('/whoami', checkJwt, (req, res) => {
			UserHandler.whoami(req, res);
		});
		router.get('/user/friends', checkJwt, (req, res) => {
			UserHandler.getFriends(req, res);
		});
	}
	
	private static mountAdminRoutes(router: Router) {
		router.post('/user/role', checkJwt, checkAdmin, (req, res) => {
			UserHandler.modifyRole(req, res);
		});
    }
    
}