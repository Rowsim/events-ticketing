import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PROVIDER_NAMES } from '../provider-constants';
import { User } from '../entity/User';
import { DataSource } from 'typeorm';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    UsersService,
    {
      provide: PROVIDER_NAMES.USER_REPOSITORY,
      useFactory: (dataSource: DataSource) => dataSource?.getRepository(User),
      inject: [PROVIDER_NAMES.DATA_SOURCE],
    }
  ],
  exports: [UsersService]
})
export class UsersModule { }
