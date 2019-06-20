import { Neo4j } from "../neo4j";
import { Message } from "../models/message.model";
import { Security } from "../security/security";
import { v1 } from "neo4j-driver";

export class MessageHandler {

    public static add(message: Message) {
        const claims = Security.getIdentity(message.from.token);
        const date = new Date().toString();
        const request = 
            `MATCH 
                (s:Serveur { name: "${message.room}" }),
                (u:User)
            WHERE 
                ID(u) = ${v1.int(claims.get('id'))}
            CREATE 
                (m:Message { content: "${message.content}", date: "${date}"}),
                (m)-[:IN]->(s),
                (u)-[:SEND]->(m)`;
        return Neo4j.execute(request);
    }

    public static deleteAll(req, res) {
        const request = 'MATCH (m:Message) DETACH DELETE m';
        Neo4j.execute(request)
            .then(() => {
                return res.status(200).json({});
            })
            .catch((error) => {
                return res.status(500).json({err: error});
            });
    }
}