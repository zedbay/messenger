import { Neo4j } from "../neo4j";
import { v1 } from "neo4j-driver";

export class ServerHandler {

    public static deleteAll(req: any, res: any) {
        const request = 'MATCH (s:Serveur), (m:Message) DETACH DELETE m, s';
        Neo4j.execute(request)
            .then(() => {
                return res.status(200).json({});
            })
            .catch((error) => {
                return res.status(500).json({err: error});
            });
    }

    public static add(req: any, res: any) {
        const request = `CREATE (:Serveur { name: "${req.body.newName}" })`;
        Neo4j.execute(request)
            .then(() => {
                return res.status(201).json({});
            })
            .catch((error) => {
                return res.status(500).json({ err: error });
            });
    }

    public static getMessages(req: any, res: any) {
        const request = 
            `MATCH 
                (m:Message),
                (s:Serveur { name: "${req.params.name}" }),
                (u:User)
            WHERE
                (m)-[:IN]->(s) AND
                (u)-[:SEND]->(m)
            RETURN m, u ORDER BY m.date`
        Neo4j.execute(request)
            .then((data) => {
                return res.status(200).json({ 
                    messages: data.records.map(element => element.get(0)),
                    users: data.records.map(element => element.get(1))
                });
            })
            .catch((error) => {
                return res.status(500).json({ err: error });
            });
    }

    public static get(req: any, res: any) {
        const request = 'MATCH (s:Serveur) RETURN s';
        Neo4j.execute(request)
            .then((servers) => {
                return res.status(200).json({ data: servers.records.map(element => element.get(0)) });
            })
            .catch((error) => {
                return res.status(500).json({ err: error });
            });
    }

    public static delete(req: any, res: any) {
        const request =  
            `MATCH 
                (s:Serveur { name: "${req.params.entitled}" }), (m:Message)-[:IN]->(s) DETACH DELETE s, m`;
        console.log(request);
        Neo4j.execute(request)
            .then(() => {
                return res.status(200).json({});
            })
            .catch((error) => {
                return res.status(500).json({ err: error });
            });
    }
}