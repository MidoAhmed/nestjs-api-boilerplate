import { Controller, UseGuards, Logger, Get, Param, Post, UseInterceptors, UploadedFile, Query, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AwsS3Service } from '../services/aws-s3.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { IFile } from 'src/commun/interfaces';
import { KeyDto } from '../dto/key.dto';

@Controller('aws-s3')
@UseGuards(AuthGuard())
export class AwsS3Controller {

  private logger = new Logger('AwsS3Controller');

  constructor(private awsS3Service: AwsS3Service) {}

  @Get('buckets')
  getBuckets() : Promise<any>{
    return this.awsS3Service.listBuckets();
  }

  @Get('buckets/:bucketName')
  getObjectsByBucket(@Param('bucketName') bucketName: string) : Promise<any>{
    return this.awsS3Service.listObjects(bucketName);
  }
  
  @Post('buckets/:bucketName')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@Param('bucketName') bucketName: string,
             @UploadedFile() file: IFile): Promise<any>{
    return this.awsS3Service.uploadFile(bucketName, file);
  }

  @Get('objects')
  getFile(@Query(ValidationPipe) key: KeyDto) : Promise<any>{
    return this.awsS3Service.getFile(key);
  }


}
