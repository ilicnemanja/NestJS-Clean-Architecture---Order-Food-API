import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class MyLogger implements LoggerService {
  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]) {
    console.log('[LOG]: ', message, optionalParams);
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {
    console.log('[ERROR]: ', message, optionalParams);
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {
    console.log('[WARN]: ', message, optionalParams);
  }
}