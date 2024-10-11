// Nest imports
import { ConsoleLogger, Injectable, LoggerService } from '@nestjs/common';

// Winston Logger
import * as winston from 'winston';


@Injectable()
export class NewRelicLoggerService implements LoggerService {

    private consoleLogger: ConsoleLogger = new ConsoleLogger();

    private attributes: Record<string, any> = {};

    private readonly logger = winston.createLogger({
        level: 'info',
        format: winston.format.combine(
            winston.format.label({ label: 'development' }),
            winston.format.timestamp(),
            winston.format.printf(({ level, message, timestamp }) => {
                const logEntry = {
                    level,
                    message,
                    timestamp,
                    attributes: this.attributes,
                };
                return JSON.stringify(logEntry);
            })
        ),
        defaultMeta: { service: 'nestjs-clean-architecture' },
        transports: [
            new winston.transports.Http({
                level: 'info',
                host: 'log-api.newrelic.com',
                path: '/log/v1',
                port: 443,
                ssl: true,
                headers: {
                    'Content-Type': 'application/json',
                    'X-License-Key': '',
                },
            }),
        ],
    });

    private logMessage(level: string, message: string, trace?: string) {
        const errorInfo = `${message} ${trace ? `- ${trace}` : ''}`
        this.logger[level](errorInfo);
        this.consoleLogger[level === 'info' ? 'log' : level](`[${level.toUpperCase()}] ${errorInfo}`);
    }

    log(message: string) {
        this.logMessage('info', message);
    }

    error(message: string, trace: string) {
        this.logMessage('error', `${message}`, trace);
    }

    warn(message: string) {
        this.logMessage('warn', message);
    }

    debug(message: string) {
        this.logMessage('debug', message);
    }

    verbose(message: string) {
        this.logMessage('verbose', message);
    }
}
