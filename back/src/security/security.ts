import * as jwt from 'jsonwebtoken';
import { User } from '../models/user.model';

export class Security {

	public static secretKey: string = "helloworld!";

	constructor() { }

	public static login(req, res) {
		User.getForLogin(req.body.email, req.body.password).then((response) => {
			if (!response.records[0])
				return res.status(401).json({ err: 'unknow user' });
			const token = jwt.sign(
				{
					email: req.body.email,
					type: response.records[0].get(0).labels[0],
					id: response.records[0].get(0).identity,
					role: response.records[0].get(0).properties.role,
					name: response.records[0].get(0).properties.name,
					firstName: response.records[0].get(0).properties.firstName
				},
				Security.secretKey,
				{ expiresIn: "1h" }
			);
			return res.status(200).json({ token: token });
		});
	}

	public static getIdentity(token: string): Map<string, any> {
		const tokenDecode = jwt.decode(token);
		let identity = new Map();
		identity.set('id', tokenDecode['id']['low']);
		identity.set('type', tokenDecode['type']);
		identity.set('role', tokenDecode['role']);
		identity.set('name', tokenDecode['name']);
		identity.set('firstName', tokenDecode['firstName']);
		return identity;
	}

	public static tokenIsOk(token: string): boolean {
		try {
			<any>jwt.verify(token, Security.secretKey);
		} catch (error) {
			return false;
		}
		return true;
	}

}