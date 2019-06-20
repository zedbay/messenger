import { Router, Express } from "express";
import { MessageHandler } from '../handlers/message.handlers';
import { checkJwt, checkAdmin } from '../security/checkJwt.middleware';

export class MessageRoutes {
    
    public static init(express: Express) {
		const router: Router = Router();
		MessageRoutes.mountPrivateRoutes(router);
        MessageRoutes.mountPublicRoutes(router);
        MessageRoutes.mountAdminRoutes(router);
		express.use('/', router);
	}

	private static mountPublicRoutes(router: Router) {

	}

	private static mountPrivateRoutes(router: Router) {

    }

    private static mountAdminRoutes(router: Router) {
        router.delete('/admin/message', checkJwt, checkAdmin, (req, res) => {
            MessageHandler.deleteAll(req, res);
        });
    }
    
}