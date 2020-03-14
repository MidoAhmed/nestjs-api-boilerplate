import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { setupSwagger } from './api-docs.swagger';

async function bootstrap() {
  const serverConfig = config.get('server');
  const app = await NestFactory.create(AppModule);

  // global prefix
  app.setGlobalPrefix('api/v1');

  // listen on port
  const port = process.env.PORT || serverConfig.port;

  /**
   * different deployment environments
   */
  if (process.env.NODE_ENV === 'development') {
    app.enableCors();

    // Api docs
    setupSwagger(app);
  } else {
    /**
     * TODO: implement
     */
  }

  
  await app.listen(port);
}
bootstrap();
