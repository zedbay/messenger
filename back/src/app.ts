import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as config from '../config.json';
import { MainRouter } from './routes/main.routes';
import { MyServer } from './server';

class App {

	public express: express.Express = express();
	private router: MainRouter;
	public myserver: MyServer;

	constructor() {
		this.mountMiddleWare();
		this.router = new MainRouter(this.express);
		this.myserver = new MyServer(this.express);
	}

	private mountMiddleWare() {
		this.express.use(cors({ credentials: true, origin: 'http://localhost:4200' }));
		this.express.use(cors());
		this.express.use(bodyParser.json());
		this.express.use(bodyParser.urlencoded({ extended: false }));
	}

}

const app = new App().myserver.server;
app.listen(config['port'], () => {
	console.log(`Server running on port ${config['port']}`);
});