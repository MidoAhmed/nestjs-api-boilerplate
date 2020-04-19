import { Test, TestingModule } from '@nestjs/testing';
import { AwsS3Controller } from './aws-s3.controller';
import { AwsS3Service } from '../services/aws-s3.service';

describe('AwsS3 Controller', () => {
  let controller: AwsS3Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [AwsS3Controller],
      providers: [AwsS3Service],
    }).compile();

    controller = module.get<AwsS3Controller>(AwsS3Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
