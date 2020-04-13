import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: process.env.RDS_PORT || dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,
  entities: [__dirname + '/../../modules/**/*.entity.{js,ts}'],
  // seeds: ['src/seeds/**/*{.ts,.js}'],
  // factories: ['src/factories/**/*{.ts,.js}'],
  synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
};

module.exports = typeOrmConfig;
