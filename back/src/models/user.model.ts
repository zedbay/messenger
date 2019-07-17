import { v1 } from "neo4j-driver";
import { Neo4j } from "../neo4j";

export class User {

	public static async get(claims: Map<string, any>) {
		const request =
			`MATCH 
                (u:User)
            WHERE 
                ID(u) = ${v1.int(claims.get('id'))}
			RETURN 
				u`;
		const resultat = await Neo4j.execute(request);
		return resultat.records.map(element => element.get(0));
	}

	public static getForLogin(email: string, password: string) {
		const request: string =
			`MATCH 
				(u:User { email: "${email}", password: "${password}" }) 
			RETURN 
				u`;
		return Neo4j.execute(request);
	}

	public static async getFriends(id: number) {
		const request =
			`MATCH 
                (u:User), (u)-[:FRIEND]-(u1:User) 
            WHERE 
                ID(u) = ${v1.int(id)} 
            RETURN 
				u1`;
		const resultat = await Neo4j.execute(request);
		return resultat.records.map(element => element.get(0));
	}

	public static async modifyRole(id: number, role: string) {
		const request =
			`MATCH
                (u:User)
            WHERE 
                ID(u) = ${v1.int(id)}
			SET 
				u.role = "${role}"`;
		await Neo4j.execute(request);
	}
}