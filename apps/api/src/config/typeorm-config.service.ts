import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private config: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.config.get<string>('DATABASE.HOST'),
      port: this.config.get<number>('DATABASE.PORT'),
      username: this.config.get<string>('DATABASE.USER'),
      password: this.config.get<string>('DATABASE.PASSWORD'),
      database: this.config.get<string>('DATABASE.NAME'),
      entities: [`${__dirname}/../**/*.entity.{js,ts}`],
      migrations: [`${__dirname}/../migrations/*.js`],
      synchronize: false,
    };
  }
}
