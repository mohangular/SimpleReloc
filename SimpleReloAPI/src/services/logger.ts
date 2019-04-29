import { Service } from 'ligature';
import * as winston from 'winston';

export default class Logger extends Service {
  logger: winston.LoggerInstance;

  init() {
    this.logger = new winston.Logger({
      transports: [
        new winston.transports.Console({
          level: 'debug',
          json: false,
          colorize: true
        })
      ],
      exitOnError: false
    });
  }

  silly(msg: string, ...meta: any[]) {
    this.logger.silly(msg, meta);
  }

  debug(msg: string, ...meta: any[]) {
    this.logger.debug(msg, meta);
  }

  verbose(msg: string, ...meta: any[]) {
    this.logger.verbose(msg, meta);
  }

  info(msg: string, ...meta: any[]) {
    this.logger.info(msg, meta);
  }

  warn(msg: string, ...meta: any[]) {
    this.logger.warn(msg, meta);
  }

  error(msg: string, ...meta: any[]) {
    this.logger.error(msg, meta);
  }
}
