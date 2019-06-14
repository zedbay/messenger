import { Router, Express } from "express";
import { UserHandler } from '../handlers/user.handlers';
import { Security } from '../security/security';
import { checkJwt } from '../security/checkJwt.middleware';

export class UserRoutes {

    public static init(express: Express) {
		const router: Router = Router();
		UserRoutes.mountPrivateRoutes(router);
		UserRoutes.mountPublicRoutes(router);
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

    }
    
}