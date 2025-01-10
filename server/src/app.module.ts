import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { BookingsModule } from './bookings/bookings.module';
import { UsersModule } from './users/users.module';
import { VenuesModule } from './venues/venues.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [AuthModule, EventsModule, BookingsModule, UsersModule, VenuesModule, SearchModule],
})
export class AppModule { }
