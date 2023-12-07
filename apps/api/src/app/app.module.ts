import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { validate } from 'config/env.validation';
import configuration from 'config/configuration';
import { TypeOrmConfigService } from 'config/typeorm-config.service';
import { UsersModule } from 'resources/users/users.module';
import { WorkspacesModule } from 'resources/workspaces/workspaces.module';
import { ProductsModule } from 'resources/products/products.module';
import { AuthorizationGuard } from 'resources/authentication/guards/authorization.guard';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportsModule } from 'resources/reports/reports.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    UsersModule,
    WorkspacesModule,
    ProductsModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthorizationGuard,
    },
    AppService,
  ],
})
export class AppModule {}
