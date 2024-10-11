import 'newrelic';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NewRelicLoggerService } from './infrastructure/logger/newrelic-logger.service';

async function bootstrap() {

  const newRelicLogger = new NewRelicLoggerService();

  const app = await NestFactory.create(AppModule, { logger: ['log', 'warn', 'error'] });
  await app.listen(3000);

  newRelicLogger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
