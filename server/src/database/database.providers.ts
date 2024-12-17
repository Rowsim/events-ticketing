import "reflect-metadata"
import { PROVIDER_NAMES } from 'src/provider-constants';
import { DataSource } from 'typeorm';
import { Event } from "../entity/Event";
import { Booking } from "../entity/Booking";
import { Ticket } from "../entity/Ticket";
import { User } from "../entity/User";
import { Venue } from "../entity/Venue";

export const databaseProviders = [
    {
        provide: PROVIDER_NAMES.DATA_SOURCE,
        useFactory: async () => {
            const dataSource = new DataSource({
                type: "postgres",
                host: process.env.DATABASE_HOST || "localhost",
                port: Number(process.env.DATABASE_PORT) || 5432,
                username: process.env.DATABASE_USER || "test",
                password: process.env.DATABASE_PASSWORD || "password",
                database: process.env.DATABASE_NAME || "ticketing",
                synchronize: true,
                logging: true,
                entities: [Event, Venue, Booking, Ticket, User],
                migrations: [],
                subscribers: [],
            });

            return dataSource.initialize().catch((e) => console.error('Failed to connect to data source', e));
        },
    },
    {
        provide: PROVIDER_NAMES.ENTITY_MANAGER,
        useFactory: (dataSource: DataSource) => dataSource.manager,
        inject: [PROVIDER_NAMES.DATA_SOURCE],
    },
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
    {
        provide: PROVIDER_NAMES.VENUE_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource?.getRepository(Venue),
        inject: [PROVIDER_NAMES.DATA_SOURCE],
    },
    {
        provide: PROVIDER_NAMES.BOOKING_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource?.getRepository(Booking),
        inject: [PROVIDER_NAMES.DATA_SOURCE],
    },
];