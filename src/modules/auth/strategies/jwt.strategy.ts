import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as config from 'config';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { AuthRepository } from '../repositories/auth.repository';
import { UserEntity } from 'src/modules/user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(@InjectRepository(AuthRepository) private authRepository: AuthRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY || config.get('jwt.secret')
    });
  }

  async validate(payload: JwtPayload): Promise<UserEntity> {
    const { username } = payload;
    const user = await this.authRepository.findOne({ username });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
