
import { PROVIDER_NAMES } from 'src/provider-constants';
import { DataSource } from 'typeorm';
import { Event } from '../entity/Event';
import { Venue } from '../entity/Venue';
import { Ticket } from '../entity/Ticket';

export const eventsProviders = [
    {
        provide: PROVIDER_NAMES.EVENTS_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource?.getRepository(Event),
        inject: [PROVIDER_NAMES.DATA_SOURCE],
    },
    {
        provide: PROVIDER_NAMES.VENUE_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource?.getRepository(Venue),
        inject: [PROVIDER_NAMES.DATA_SOURCE],
    },
    {
        provide: PROVIDER_NAMES.TICKET_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource?.getRepository(Ticket),
        inject: [PROVIDER_NAMES.DATA_SOURCE],
    },
];