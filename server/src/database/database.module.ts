import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { ElasticSearchModule } from '../elasticsearch/elasticsearch.module';
import { EventsSubscriber } from '../events/events.subscriber';

@Module({
    imports: [ElasticSearchModule],
    providers: [...databaseProviders, EventsSubscriber],
    exports: [...databaseProviders],
})
export class DatabaseModule { }