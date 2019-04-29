import { ServiceConstructor, ServiceLoader } from 'ligature';
import 'reflect-metadata';
import ClientRoute from './routes/clients';

import Express from './services/express';
import Logger from './services/logger';
import MongoDB from './services/mongodb';



let services: ServiceConstructor[] = [
  Logger,
  // Express,
 
   MongoDB
  // Session,
  // ServiceBus,
  // SocketIO,
  // Bridge
];

const routes = [ClientRoute];//, TransfereeRoute, ClientRuleRoute, PDFRoute, SessionsRoute];

services = [...services, ...routes];

ServiceLoader.getInstance()
  .init(services)
  .then(
    () => {
      console.log('started!');
      // const bridge = ServiceLoader.getInstance().get(Bridge);
      // let count = 0;
      // setInterval(() => {
      //   bridge.broadcast({
      //     data: {
      //       type: 'dropped benefit',
      //       data: {
      //         Attribute: '',
      //         Category: 'Transition Assist',
      //         IsRecommended: false,
      //         LockDate: null,
      //         Points: 1,
      //         SelectedDate: null,
      //         OrBenefits: [],
      //         UpdatedBy: '',
      //         HasQuantity: false,
      //         CashOutValue: 0,
      //         BenefitID: '7373110A',
      //         ClientBenefitDesc: '1 day of Settling in Services at your Host Country.',
      //         ClientBenefitTitle: 'Settling In',
      //         ClientNo: '7373',
      //         ImageURL: '22.png',
      //         ProductNo: 370,
      //         SubProductNo: 31139,
      //         ServiceType: 'Flex'
      //       }
      //     },
      //     topic: 'change',
      //     sender: 'andyivorytestqa'
      //   });
      //   count++;
      // }, 5000);

      // const { APP_INSIGHTS_INSTRUMENTATION_KEY = '' } = process.env;
      // if (APP_INSIGHTS_INSTRUMENTATION_KEY !== '') {
      //   const appInsights = require('applicationinsights');
      //   appInsights.setup(APP_INSIGHTS_INSTRUMENTATION_KEY).start();
      // }
    },
    err => {
      console.log('Could not start server', err);
      process.exit(1);
    }
  );

process.on('SIGTERM', () => {
  shutdown();
});

process.on('SIGINT', () => {
  shutdown();
});

//attempt to do a graceful shutdown
async function shutdown() {
  // const sockets = ServiceLoader.getInstance().get(SocketIO);
  // if (sockets) {
  //   try {
  //     await sockets.cleanup();
  //     process.exit();
  //   } catch (err) {
  //     process.exit(1);
  //   }
  // } else {
    
    process.exit();
  //}
}
