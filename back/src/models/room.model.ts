import { Neo4j } from '../neo4j';
import { v1 } from "neo4j-driver";

export class Room {

	public static async addMessageInRoom(u1: number, u2: number, content: string) {
		let resultat = await Room.search(u1, u2);
		if (!resultat) {
			return false;
		}
		const request =
			`MATCH 
				(r:Room),
				(u1:User),
				(u2:User)
			WHERE 
				ID(u1) = ${v1.int(u1)} AND
				ID(u2) = ${v1.int(u2)} AND 
				ID(r) = ${resultat.identity.low}
			CREATE 
				(m:Message { content: "${content}", date: "${new Date().toString()}),
				(m)-[:IN]->(r),
				(u1)-[:SEND]->(m)
			RETURN
				m, u1`;
		resultat = await Neo4j.execute(request);
		return {
			message: resultat.records[0].get(0),
			user: resultat.records[0].get(1)
		}
	}

	public static async getMessagesOfRoom(u1: number, u2: number) {
		let request =
			`MATCH 
				(u1:User),
				(u2:User),
				(r:Room),
				(m:Message)
			WHERE 
				ID(u1) = ${v1.int(u1)} AND
				ID(u2) = ${v1.int(u2)} AND 
				(u1)-[:CHAT]->(r)<-[:CHAT]-(u2) AND
				(m)-[:IN]->(r) AND
				(u1)-[:SEND]->(m)
			RETURN 
				m`;
		let resultat = await Neo4j.execute(request);
		let messageProprietaire = resultat.records.map(element => element.get(0));
		request =
			`MATCH 
				(u1:User),
				(u2:User),
				(r:Room),
				(m:Message)
			WHERE 
				ID(u1) = ${v1.int(u1)} AND
				ID(u2) = ${v1.int(u2)} AND 
				(u1)-[:CHAT]->(r)<-[:CHAT]-(u2) AND
				(m)-[:IN]->(r) AND
				(u2)-[:SEND]->(m)
			RETURN 
				m`;
		resultat = await Neo4j.execute(request);
		let messageDestinataire = resultat.records.map(element => element.get(0));
		let messages = [...messageDestinataire, ...messageProprietaire];
		return messages.sort(Room.sortByDate);
	}

	public static async search(u1: number, u2: number) {
		const request =
			`MATCH 
				(u1:User),
				(u2:User),
				(r:Room)
			WHERE 
				ID(u1) = ${v1.int(u1)} AND
				ID(u2) = ${v1.int(u2)} AND
				(u1)-[:CHAT]->(r)<-[:CHAT]-(u2)
			RETURN 
				r`;
		const resultat = await Neo4j.execute(request);
		if (resultat.records.length > 0) {
			return resultat.records[0].get(0);
		}
		return false;
	}

	public static async create(u1: number, u2: number) {
		const name = Room.getName(u1, u2);
		const request =
			`MATCH 
				(u:User), (u1:User)
			WHERE 
				ID(u) = ${v1.int(u1)} AND
				ID(u1) = ${v1.int(u2)}
			CREATE 
				(r:Room { name: "${name}" }),
				(u1)-[:CHAT]->(r),
				(u)-[:CHAT]->(r)
			RETURN 
				r`;
		const resultat = await Neo4j.execute(request);
		if (resultat) return resultat.records[0].get(0);
		return false;
	}

	private static getName(u1: number, u2: number) {
		if (u1 > u2) {
			return u1 + "&&&" + u2;
		}
		return u2 + "&&&" + u1;
	}

	private static sortByDate(date1: any, date2: any) {
		const d1 = new Date(date1.properties.date);
		const d2 = new Date(date2.properties.date);
		if (d1 > d2) {
			return 1;
		}
		if (d2 > d1) {
			return -1;
		}
		return 0;
	}

}