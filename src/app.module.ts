import { Module, CacheModule, CacheInterceptor } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { TaskModule } from './modules/task/task.module';
import * as typeOrmConfig from './database/config/typeorm.config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import * as redisStore from 'cache-manager-redis-store';
import { WinstonModule } from 'nest-winston';
import { winstonOptions } from './app-logging';
import * as config from 'config';
import { AwsS3Module } from './modules/aws-s3/aws-s3.module';

@Module({
  imports: [
    AuthModule, 
    UserModule,
    TaskModule,
    AwsS3Module,
    TypeOrmModule.forRoot(typeOrmConfig),
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST || config.get('redis').host,
      port: process.env.REDIS_PORT || config.get('redis').port,
      ttl: process.env.REDIS_TTL || config.get('redis').ttl,
      max: process.env.REDIS_MAX || config.get('redis').max
    }),
    WinstonModule.forRoot(winstonOptions) 
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    }
  ],
})
export class AppModule {}
