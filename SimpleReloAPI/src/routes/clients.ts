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

export default class ClientRoute extends Consumer {
  @inject private express: Express;

  @inject private logger: Logger;

  async init() {
    let signInOptions={
      // issuer:"",
      // subject:"",
      // audience:"",
      expiresIn:"120s",
      algorithm:"RS256"
    };
    let _privatekey = fs.readFileSync('./authfiles/private.pem','utf8');
    
    this.express.app.get('/api/authLogin', async (req, res, next) => {
    const user ={id:13, username:'simplerelo', roles:'admin'};
    const token = jwt.sign(user, _privatekey,signInOptions);
      res.json({
        token: token
      });
    });

    
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
          //  console.log("Data", JSON.stringify(clients));
            res.json({clients, authData});
          });
     

      
    });


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
                res.json({client, authData});
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
