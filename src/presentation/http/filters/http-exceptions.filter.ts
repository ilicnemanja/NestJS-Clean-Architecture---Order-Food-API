import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { NewRelicLoggerService } from 'src/infrastructure/logger/newrelic-logger.service';

@Injectable()
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(
        private readonly newRelicLogger: NewRelicLoggerService,
    ) {}

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        if (status >= 500) {
            this.newRelicLogger.error(exception.message, exception.stack);
        } else if (status >= 400) {
            this.newRelicLogger.warn(exception.message);
        }

        response
            .status(status)
            .json({
                statusCode: status,
                message: exception.message,
                timestamp: new Date().toISOString(),
                path: request.url,
            });
    }
}
