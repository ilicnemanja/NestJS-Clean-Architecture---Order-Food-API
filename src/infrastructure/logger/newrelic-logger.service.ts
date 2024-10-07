// infrastructure/logger/newrelic-logger.service.ts
import { Injectable } from '@nestjs/common';
import * as newrelic from 'newrelic';
import { ILogger } from 'src/application/ports/logger.interface';

@Injectable()
export class NewRelicLoggerService implements ILogger {
    log(message: string): void {
        newrelic.recordCustomEvent('CustomLog', { message });
    }

    error(message: string, trace: string): void {
        newrelic.noticeError(new Error(`${message}: ${trace}`));
    }

    warn(message: string): void {
        newrelic.recordCustomEvent('CustomWarning', { message });
    }
}
