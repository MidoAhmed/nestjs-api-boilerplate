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
@Module({
  imports: [
    AuthModule, 
    UserModule,
    TaskModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
      ttl: 20
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
