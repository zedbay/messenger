import { Neo4j } from "../neo4j";
import { Security } from "../security/security";

export class UserHandler {

    public static tokenIsOk(req: any, res: any) {
        const token = <string>req.headers["authorization"];
        return res.status(200).json({ isOk: Security.tokenIsOk(token) }); 
    }
    
}