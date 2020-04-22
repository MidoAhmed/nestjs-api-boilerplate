import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthRepository } from '../repositories/auth.repository';

const mockJwtConfig = {
  secret: 'mock-secret-key',
  expiresIn: 3600,
};

describe('Auth Controller', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: mockJwtConfig.secret,
          signOptions: {
            expiresIn: process.env.JWT_EXPIRATION_TIME || mockJwtConfig.expiresIn,
          },
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService, AuthRepository],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
