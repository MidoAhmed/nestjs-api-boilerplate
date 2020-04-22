import { Injectable, Logger, InternalServerErrorException} from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as config from 'config';
import { IFile } from 'src/commun/interfaces';
import { KeyDto } from '../dto/key.dto';

@Injectable()
export class AwsS3Service {
    private logger = new Logger('AwsS3Service');
    private readonly _s3: AWS.S3;

    constructor() {
        const options: AWS.S3.Types.ClientConfiguration = {
            accessKeyId:  process.env.AWS_S3_ACCESS_KEY_ID || config.get('awsS3').awsS3AccessKeyId,
            secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY  || config.get('awsS3').awsS3SecretAccessKey,
            endpoint: process.env.AWS_S3_ENDPOINT  || config.get('awsS3').endPoint,
            s3ForcePathStyle: true, // needed with minio?
            signatureVersion: 'v4',
            params: {
                Bucket: process.env.S3_BUCKET_NAME  || config.get('awsS3').s3BucketName,
            },        
            apiVersion: '2020-04-19',
            region: 'eu-central-1',
        };
            
        this._s3 =  new AWS.S3(options);
    }

    async listBuckets(): Promise<any>{
       try {
        const result = await this._s3.listBuckets().promise();
        return result;
       } catch (error) {
        this.logger.error(error.message, error.stack);
        throw new InternalServerErrorException(error.message, error);
       }
    }


    async listObjects(bucket: string): Promise<any>{
        try {
            const result = await this._s3.listObjects({
                Bucket: bucket
            }).promise();
            return result;
        } catch (error) {
            this.logger.error(error.message, error.stack);
            throw new InternalServerErrorException(error.message, error);
        }
    }

    async uploadFile(bucket: string, file: IFile) : Promise<any>{
        try {
            const key = 'images/' + file.originalname;
            await this._s3.putObject({
                    Bucket: bucket, 
                    Body: file.buffer,
                    ACL: 'public-read',
                    Key: key,
                })
                .promise();
            
            return {
                key: key
            };
        } catch (error) {
            this.logger.error(error.message, error.stack);
            throw new InternalServerErrorException(error.message, error);
        }
    }

    async getFile(keyDto: KeyDto): Promise<any>{
        try {
            const {key} = keyDto;
            const signedUrl = await this._s3.getSignedUrlPromise('getObject', {
                    Bucket: process.env.S3_BUCKET_NAME  || config.get('awsS3').s3BucketName,
                    Key: key
                });
                return {
                    signedUrl: signedUrl
                };
        } catch (error) {
            this.logger.error(error.message, error.stack);
            throw new InternalServerErrorException(error.message, error);
        }
    }
}
