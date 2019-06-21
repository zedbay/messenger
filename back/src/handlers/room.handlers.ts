import { Security } from "../security/security";
import { Room } from "../models/room.model";

export class RoomHandler {

    public static async add(req: any, res: any) {
		const resultat = await Room.create(req.body.user, req.body.user1);	
		return res.status(resultat ? 201 : 500).json({});
    }

    public static async getMessages(req: any, res: any) {
		const claims = Security.getIdentity(req.headers["authorization"]);
		const resultat = await Room.getMessagesOfRoom(claims.get('id'), req.params.idUser);
		if (!resultat) {
			return res.status(500).json({});
		}
		return res.status(200).json(resultat);
    }

}