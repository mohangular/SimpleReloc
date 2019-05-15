import { TimeTrackerModel } from './../models/client';
import { inject, Consumer } from 'ligature';
import { model, Schema, Types } from 'mongoose';

import Express from '../services/express';
import * as config from 'config';
import Logger from '../services/logger';
import { checkAuth } from '../middleware/auth';

import clientSchema from '../schemas/client';

import Err from '../interfaces/err';
import TimeTracker from '../models/client';
import TimeTrackerSchema from '../schemas/client';
var   jwt= require('jsonwebtoken');
var fs = require('fs');
const crypto = require('crypto');
const jsonpack = require('jsonpack');
const json_hpack = require('json-hpack');
const zlib = require('zlib');
const util = require('util');

export default class ClientRoute extends Consumer {
  @inject private express: Express;

  @inject private logger: Logger;

  async init() {
    let signInOptions={
      // issuer:"",
      // subject:"",
      // audience:"",
      expiresIn:"1200s",
      algorithm:"RS256"
    };
    let _privatekey = fs.readFileSync('./authfiles/private.pem','utf8');
    
    this.express.app.get('/api/authLogin', async (req, res, next) => {
    const user ={id:13, username:'simplerelo', roles:'admin', key:'mysecretkey'};
    const token = jwt.sign(user, _privatekey,signInOptions);
      res.json({
        token: token
      });
    });

    function myZip(input: string){
      zlib.deflate(JSON.stringify(input), (err, buffer) => {
        if (!err) {
          let d = buffer.toString('hex');
          //console.log(d);
          const algorithm = "aes256"
              const cipher = crypto.createCipher(algorithm, "authData.key");
              let crypted = cipher.update(d, 'hex', 'base64');
              crypted += cipher.final('base64');
            //  console.log(crypted);

              const decipher = crypto.createDecipher(algorithm, "authData.key");
              let decrypted = decipher.update(crypted, 'base64', 'hex');
              decrypted += decipher.final('hex');

              console.log("decry", decrypted);
              zlib.unzip(Buffer.from(decrypted, 'hex'), (err, buffer) => {
                if (!err) {
                  console.log("unfolded",JSON.parse(buffer.toString()));
                } else {
                  console.log("err");
                }
              });
                 return decrypted;
        } else {
          // handle error
        }

      });
      return "ra";
    }
    // Get all clients
    this.express.app.get('/api/allResource', async (req, res, next) => {
     // console.log(req.body.token);
     const authData = jwt.decode(req.body.token,{complete:false});
          const client = model('tracker', TimeTrackerSchema);


          client.find((err, clients) => {
            if (err) {
             console.log("er", err);
              next(this.handleError(err));
            }
           // console.log("Data", jsonpack.pack( clients));
            const algorithm = "aes256"
              // const cipher = crypto.createCipher(algorithm, authData.key);
              // let crypted = cipher.update(jsonpack.pack( clients), 'utf-8', 'base64');
              // crypted += cipher.final('base64');
          
              
           
            
          //   const myInitZip = util.promisify(myZip);

          //   let initializePromise = async ()=>{
          //     //   myInitZip(JSON.stringify(clients))
          //     //   .then(datas =>{
          //     //     data = datas;
          //     //     console.log("myzip",datas);
          //     //   });

          //     //   const datas = await myInitZip(JSON.stringify(clients));
          //     //  data = datas;
          //  const date=  await Promise.all([myInitZip(JSON.stringify(clients))]);
          //     // .then(data =>{
          //        console.log("data", date);
          //     // });
          //   };

          //  initializePromise();
            
            ZipMyData(JSON.stringify(clients), authData.key, res);
            
            

            //res.json({input, authData});
          });
     

      
    });
    function UnZipMyData(indata: string, key: string) {
      const algorithm = "aes256"
      const decipher = crypto.createDecipher(algorithm, key);
      let decrypted = decipher.update(indata, 'base64', 'hex');
      decrypted += decipher.final('hex');

      console.log("decry", decrypted);
      zlib.unzip(Buffer.from(decrypted, 'hex'), (err, buffer) => {
        if (!err) {
          console.log("unfolded", JSON.parse(buffer.toString()));
        } else {
          console.log("err");
        }
      });
    }

    function ZipMyData(indata: string, key:string, res:any){
      zlib.deflate(indata, (err, buffer) => {
        if (!err) {
          let d = buffer.toString('hex');
          //console.log(d);
          const algorithm = "aes256"
              const cipher = crypto.createCipher(algorithm, key);
              let crypted = cipher.update(d, 'hex', 'base64');
              crypted += cipher.final('base64');
            //  console.log(crypted);
            res.json({crypted});

        } else {
          // handle error
          res.json({err:"invalid data"});
        }

      });
    }

    // Get a specific client
    this.express.app.get('/api/ByRscName', checkAuth, async (req, res, next) => {
      const client = model('trackers', clientSchema);

      client.findOne({ ClientNo: req.query.ClientNo }, (err, client) => {
        if (err) next(this.handleError(err));

        res.json(client);
      });
    });

    this.express.app.delete('/api/MID',  async (req, res, next) => {
      const client = model('trackers', TimeTrackerSchema);
         client.deleteOne({
          MID: req.query.mid
         },
          (err) => {

          });
          if (!client) {
            return next(this.handleItemNotFound('Reousrce Name Not Found', res));
          }
          else{
            res.json(client);
          }
    });
          // Get a specific client policy
    this.express.app.get('/api/MID', checkAuth, async (req, res, next) => {
      
        const authData = jwt.decode(req.body.token,{complete:false});
        const client = model('trackers', TimeTrackerSchema);


          client.findOne(
            {
              MID: req.query.mid
            },
            (err, client: TimeTrackerModel) => {
              if (err) next(this.handleError(err));

              if (!client) {
                return next(this.handleItemNotFound('Reousrce Name Not Found', res));
              }
              else {
                const authData = jwt.decode(req.body.token,{complete:false});
                ZipMyData(JSON.stringify(client), authData.key, res);
              
             //UnZipMyData("2lzN/agmLql5P9ffhQC61qopE3lBATKq/p0uLLJ366V4WDM6dOpyFqFtCiR+Vvtal5X9G00UaHtfgu+eAbJfdq98KzLfwWShCIUac2EJ+MUiyVGbkklirUtFIUXgn6sPjvnSJflO9TsEE+njesTJUUHWdXOYKUsHwEYvDtbLiJeiaNNuXUuE4EjoR6KRHTSwUerceXdeXYXUUTJjg7PfbxJSzANoPU3AKPD76AsDeDa9t1NxIiYVNGqJt7E9OjUGRBMsuE8EF09fBPE+n5g6GB8zc2sbREWWNsDmCahWSv8=", authData.key);
              }

              
              // client.Policies.map((policy, index) => {
              //   if (policy.PolicyName === req.query.PolicyName) {
              //     policyFound = true;

              //     const response = {
              //       Policy: policy,
              //       Config: client.Config
              //     };

              //     res.json(response);
              //   }
              // });

              // if (!policyFound) {
              //   return next(this.handleItemNotFound('Client Policy Not Found', res));
              // }
            }
          );
        
      });
    

    // Create new clients
    this.express.app.post('/api/addResource', checkAuth, async (req, res, next) => {
     
     //console.log("test" + JSON.stringify(req.body));
       const client = new TimeTracker({ ...req.body });

       client.save((err, client) => {
        if (err) next(this.handleError(err));

        res.json({ client });
      });
    });
   

    // Add a new policy to a client
    this.express.app.put('/api/clients/addPolicy', checkAuth, async (req, res, next) => {
      const client = model('trackers', TimeTrackerSchema);

      /* tslint:disable */
      client
        .findOneAndUpdate(
          {
            MID: req.query.mid,
            'Policies.PolicyName': {
              $ne: req.body.PolicyName
            },
            'Policies.PolicyID': {
              $ne: req.body.PolicyID
            }
          },
          { $push: { Policies: req.body } },
          (err, client) => {
            if (err) next(this.handleError(err));

            res.json(client);
          }
        )
        .then(raw => {
          if ((raw as any).nModified === 0) {
            this.logger.error('Error: No Duplicate Policy Names');
          }
        })
        .catch(next);
      /* tslint:enable */
    });
  }

  handleError(err: Err) {
    this.logger.error(`Error Code: ${err.code} Error Message: ${err.errmsg}`);
  }

  handleItemNotFound(message: string, response: any) {
    return response.status(400).send(message);
  }
}
