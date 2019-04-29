import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as helmet from 'helmet';
import * as http from 'http';
import { Server } from 'http';
import { inject, Service } from 'ligature';
import * as morgan from 'morgan';
import { setUser } from '../middleware/auth';
import errors from '../middleware/errors';
import Logger from './logger';
import cookieSession = require('cookie-session');


export default class Express extends Service {
  @inject
  private logger: Logger;

  private _app: express.Express;
  private _server: Server;

  get app(): express.Express {
    return this._app;
  }

  get server(): Server {
    return this._server;
  }

  init() {
    //let retries:number = 0;
    this.initLevelOne();
    //this.delay(5000);
    // let interval = setInterval(() => {

    //   retries++;
    //   if (docs.getConfig_SESSION_KEY() !== undefined) {

    //     this.initLevelOne();
    //     clearInterval(interval);
    //   }
    //   if(retries > docs.get_RETRY_KEY_VAULT_ACCESS())
    //   {
    //     clearInterval(interval);
    //     console.log("Service BUS services failed to load...Keyvault un-reachable...Please contact Adminstator!!!!");
    //   }
    //   console.log("service bus delayed", retries, "retries ", docs.get_RETRY_KEY_VAULT_ACCESS());

    // }, 5000);

  }

  initLevelOne(){
    dotenv.load();

    this._app = express();
    this._app.use(helmet());
    this._app.use(compression());
    this._app.use(morgan('short'));
    this._app.set('json spaces', 2);
    if (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'dev') {
      this._app.use(cors());
    } else {
      this._app.use(
        cors({
          origin: "docs.getConfig_CORS_ORIGIN()",
          credentials: true
        })
      );
    }
    this._app.use(bodyParser.json({ limit: '50mb' }));
    this._app.use(bodyParser.urlencoded({ extended: false }));
    //console.log("expressing ", docs.getConfig_SESSION_KEY());
    this._app.use(
      cookieSession({
        name: 'cw',
        keys: ['h26D2X7Pz5Ib0oaZIj6jlMPJxa3T6a7MUvF9mkiq']
      })
    );
    this._app.use(cookieParser());
    this._app.use(setUser);
    this._app.use(express.static('./publicweb'));
    this._app.options('*', cors());

    const port = process.env.PORT ? process.env.PORT : 3000;
    const server = http.createServer(this._app);
    this._server = server;

    server.listen(port);

    return new Promise((resolve, reject) => {
      server.on('error', err => {
        reject(err);
      });

      server.on('listening', () => {
        const addr = server.address();
        this.logger.info(`Listening on ${addr.port}`);
        resolve();
      });
    });
  }

  done() {
    this._app.get('*', (req, res) => {
      res.sendFile('index.html', { root: './publicweb' });
    });

    //Error handle should always come last
    this._app.use(errors);
  }
}
