import { Module } from '@nestjs/common';
import { EventsController } from './controllers/events.controller';
import { EventsService } from './services/events.service';
import { eventsProviders } from './events.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [EventsController],
    providers: [...eventsProviders, EventsService],
})
export class EventsModule { }