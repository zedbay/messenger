import { Security } from "../security/security";
import { User } from '../models/user.model';

export class UserHandler {

	public static tokenIsOk(req: any, res: any) {
		const token = <string>req.headers["authorization"];
		return res.status(200).json({ isOk: Security.tokenIsOk(token) });
	}

	public static async getFriends(req: any, res: any) {
		const claims: Map<string, any> = Security.getIdentity(req.headers["authorization"]);
		const resultat = await User.getFriends(claims);
		return res.status(200).json({ data: resultat });
	}

	public static async modifyRole(req: any, res: any) {
		await User.modifyRole(req.body.id, req.body.role);
		return res.status(200).json({});
	}

	public static whoami(req: any, res: any) {
		const claims: Map<string, any> = Security.getIdentity(req.headers["authorization"]);
		const resultat = User.get(claims);
		return res.status(200).json({ data: resultat });
	}

}