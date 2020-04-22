import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthRepository } from '../repositories/auth.repository';

const mockJwtConfig = {
  secret: 'mock-secret-key',
  expiresIn: 3600,
};

describe('AuthService', () => {
  let service: AuthService;

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
      providers: [AuthService, AuthRepository],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
