import { v1 as neo4j } from 'neo4j-driver';
import { Driver, Session } from 'neo4j-driver/types/v1';
import * as config from '../config.json';
export class Neo4j {

    private static driver: Driver = neo4j.driver(
		config['neo4j']['URL'], 
		neo4j.auth.basic(
			config['neo4j']['credential']['identifiant'], 
			config['neo4j']['credential']['password']
		)
	);
    private static session: Session = Neo4j.driver.session();

    public static execute(request: string) {
        return Neo4j.session.run(request);
    }

}