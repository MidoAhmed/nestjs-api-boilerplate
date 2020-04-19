import { Test, TestingModule } from '@nestjs/testing';
import { AwsS3Controller } from './aws-s3.controller';

describe('AwsS3 Controller', () => {
  let controller: AwsS3Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AwsS3Controller],
    }).compile();

    controller = module.get<AwsS3Controller>(AwsS3Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
