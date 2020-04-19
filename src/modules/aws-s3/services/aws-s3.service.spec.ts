import { Test, TestingModule } from '@nestjs/testing';
import { AwsS3Service } from './aws-s3.service';
import { join } from 'path';

// process.env.NODE_CONFIG_DIR = join(process.cwd(), '/config');

describe('AwsS3Service', () => {
  let service: AwsS3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AwsS3Service],
    }).compile();
    
    service = module.get<AwsS3Service>(AwsS3Service);

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
