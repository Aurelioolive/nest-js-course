import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const serverConfig = config.get('server');
  const logger = new Logger('Launcher');
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'development') {
    logger.log(`CORS are enabled`);
    app.enableCors();
  }

  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);

  logger.log(
    `Application listening on port ${port} and ${process.env.NODE_ENV} enviroment`,
  );
}

bootstrap();
