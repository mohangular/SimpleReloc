import { Service, inject } from 'ligature';
import * as mongoose from 'mongoose';
import Logger from './logger';
import * as dotenv from 'dotenv';
//import docs from '../docdb_persist/DocumentClientFactory';
//const msRestAzure = require('ms-rest-azure');
//const KeyVault = require('azure-keyvault');
import * as msRestAzure from 'ms-rest-azure';
import * as keyVault from 'azure-keyvault';
import * as request from 'request';

//import * as request from 'request';


export default class MongoDB extends Service {
  @inject private logger: Logger;

  private finished: boolean=false;


   
  

async init() {
  dotenv.config();

  const { NODE_ENV = 'production', MONGODB_RS_NAME = '' } = process.env;
  
    
    
    try {
      if (NODE_ENV === 'local') {
        const { MONGODB_LOCAL_URI = '' } = process.env;

       // await mongoose.connect(MONGODB_LOCAL_URI);
      } else {
        const { MONGODB_URI = '', MONGODB_USER = '', MONGODB_PASS = '' } = process.env;

        const uri = MONGODB_URI;
        const options = {
         // replset: { rs_name: MONGODB_RS_NAME },
          user: MONGODB_USER,
          pass: MONGODB_PASS,
          ssl: true,
          authSource:"admin"
          
        };
       console.log(uri);
         mongoose.connect(uri);
      }
      this.logger.info('Connected to mongodb');
    } catch (err) {
      this.logger.error('Could not connect to mongodb');
      throw err;
    }
  }
}