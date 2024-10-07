import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { MyLogger } from 'src/infrastructure/logger/console-logger.service';
import { NewRelicLoggerService } from 'src/infrastructure/logger/newrelic-logger.service';

@Injectable()
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(
        private readonly newRelicLoggerService: NewRelicLoggerService,
        private readonly logger: MyLogger,
    ) {}

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        if (status >= 500) {
            this.logger.error(exception.message, exception.stack);
            this.newRelicLoggerService.error(exception.message, exception.stack);
        } else if (status >= 400) {
            this.logger.warn(exception.message, exception.stack);
            this.newRelicLoggerService.warn(exception.message);
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
