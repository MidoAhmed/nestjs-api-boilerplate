import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { setupSwagger } from './api-docs.swagger';
import { Logger } from '@nestjs/common';
import { TransformInterceptor } from './commun/interceptors/transform.interceptor';
import { WrapInterceptor } from './commun/interceptors/wrap.interceptor';

async function bootstrap() {
  const serverConfig = config.get('server');
  const logger = new Logger('Bootstrap Logger');
  const app = await NestFactory.create(AppModule);

  // global prefix
  app.setGlobalPrefix('api/v1');
  
  // app.useGlobalInterceptors(new TransformInterceptor(), new WrapInterceptor())


  // listen on port
  const port = process.env.PORT || serverConfig.port;

  /**
   * different deployment environments
   */
  if (process.env.NODE_ENV === 'development') {
    logger.log(`Application is running in "${process.env.NODE_ENV}" mode`);
    app.enableCors();

    // Api docs
    setupSwagger(app);
  } else {
    /**
     * TODO: implement
     */
    logger.log(`Application is running in "${process.env.NODE_ENV}" mode`);
  }

  
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
