import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { TaskModule } from './modules/task/task.module';
import * as typeOrmConfig from './database/config/typeorm.config';

@Module({
  imports: [
    AuthModule, 
    UserModule,
    TaskModule,
    TypeOrmModule.forRoot(typeOrmConfig)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
