import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import helmet from 'helmet';
import * as compression from 'compression';
import * as chalk from 'chalk';
import { TimeoutInterceptor } from './interception/timeout.interception';
import * as morgan from 'morgan';

async function bootstrap() {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
    const logger = new Logger(bootstrap.name);

    // Middleware
    app.use(helmet());
    app.use(compression());

    // Swagger
    const config = new DocumentBuilder().setTitle('Saybers').setDescription('Saybers Ecommerce API').setVersion('0.1').build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('documentation', app, document);

    app.use(morgan('dev'));
    app.useGlobalInterceptors(new TimeoutInterceptor());

    // App
    await app.listen(3000);
    if (process.env.NODE_ENV === 'production')
      Logger.log(`🚀  Server ready at ${chalk.hex('#87e8de').bold(process.env.SERVER_PRODUCTION_URL)}`, 'Bootstrap');
    else logger.log(`🚀  Server is listening on ${chalk.hex('#87e8de').bold(process.env.SERVER_LOCAL_URL)}`);
  } catch (error) {
    Logger.error(`❌  Error starting server, ${error}`, '', 'Bootstrap', false);
    process.exit();
    throw new InternalServerErrorException(error);
  }
}

bootstrap().catch((e) => {
  throw e;
});
