import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


export function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('NestJS Api Boilerplate')
    .setDescription('The Boilerplate API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);
}
