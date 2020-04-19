import { Module } from '@nestjs/common';
import { AwsS3Controller } from './controllers/aws-s3.controller';
import { AwsS3Service } from './services/aws-s3.service';
import { AuthModule } from '../auth/auth.module';


@Module({
  imports: [
    AuthModule
],
  controllers: [AwsS3Controller],
  providers: [AwsS3Service],
  exports: [AwsS3Service]
})
export class AwsS3Module {}
