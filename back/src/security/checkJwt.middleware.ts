import * as jwt from 'jsonwebtoken';
import { NextFunction } from 'connect';
import { Security } from './security';
import * as config from '../config.json';

export const checkJwt = (req, res, next: NextFunction) => {
	if (config['unsecure']) {
		next();
	}
	const token = <string>req.headers["authorization"];
	try {
		<any>jwt.verify(token, Security.secretKey);
	} catch (error) {
		res.status(401).send();
		return;
	}
	next();
}

export const checkAdmin = (req, res, next: NextFunction) => {
	if (config['unsecure']) {
		next();
	}
	const token = <string>req.headers["authorization"];
	const claims: Map<string, any> = Security.getIdentity(token);
	if (claims.get('role') !== 'admin') {
		res.status(401).send();
		return;
	}
	next();
}