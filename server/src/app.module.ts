import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { BookingsModule } from './bookings/bookings.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, EventsModule, BookingsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
