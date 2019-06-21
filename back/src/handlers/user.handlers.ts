import { Neo4j } from "../neo4j";
import { Security } from "../security/security";
import { v1 } from "neo4j-driver";

export class UserHandler {

    public static tokenIsOk(req: any, res: any) {
        const token = <string>req.headers["authorization"];
        return res.status(200).json({ isOk: Security.tokenIsOk(token) }); 
    }

    public static getFriends(req: any, res: any) {
        const claims: Map<string, any>  = Security.getIdentity(req.headers["authorization"]);
        const request = 
            `MATCH 
                (u:User), (u)-[:FRIEND]-(u1:User) 
            WHERE 
                ID(u) = ${v1.int(claims.get('id'))} 
            RETURN 
                u1`;
        Neo4j.execute(request)
            .then(friends => {
                return res.status(200).json({ data: friends.records.map(element => element.get(0)) });
            })
            .catch((error) => {
                return res.status(500).json({ err: error });
            });
    }

    public static modifyRole(req: any, res: any) {
        const request = 
            `MATCH
                (u:User)
            WHERE 
                ID(u) = ${v1.int(req.body.id)}
            SET u.role = "${req.body.role}"`
        Neo4j.execute(request)
            .then(() => {
                return res.status(200).json({});
            })
            .catch((error) => {
                return res.status(500).json({ err: error });
            });
    }

    public static whoami(req: any, res: any) {
        const claims: Map<string, any>  = Security.getIdentity(req.headers["authorization"]);
        const request = 
            `MATCH 
                (u:User)
            WHERE 
                ID(u) = ${v1.int(claims.get('id'))}
            RETURN u`;
        Neo4j.execute(request)
            .then((user) => {
                return res.status(200).json({ data: user.records.map(element => element.get(0))  })
            })
            .catch((error) => {
                return res.status(500).json({err: error});
            });
    }
    
}