
import { PROVIDER_NAMES } from 'src/provider-constants';
import { DataSource } from 'typeorm';
import { Booking } from '../entity/Booking';

export const bookingsProvider = [
    {
        provide: PROVIDER_NAMES.BOOKING_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource?.getRepository(Booking),
        inject: [PROVIDER_NAMES.DATA_SOURCE],
    }
];