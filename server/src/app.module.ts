import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { BookingsModule } from './bookings/bookings.module';
import { UsersModule } from './users/users.module';
import { VenuesModule } from './venues/venues.module';

@Module({
  imports: [AuthModule, EventsModule, BookingsModule, UsersModule, VenuesModule],
})
export class AppModule { }
