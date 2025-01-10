import { EventSubscriber } from "typeorm/decorator/listeners/EventSubscriber"
import { EntitySubscriberInterface } from "typeorm/subscriber/EntitySubscriberInterface"
import { InsertEvent } from "typeorm/subscriber/event/InsertEvent"
import { Event } from "../entity/Event"
import { UpdateEvent } from "typeorm/subscriber/event/UpdateEvent"
import { RemoveEvent } from "typeorm/subscriber/event/RemoveEvent"
import { ElasticsearchService } from "../elasticsearch/elasticsearch.service"
import { DataSource, LoadEvent } from "typeorm"
import { Inject, Injectable } from "@nestjs/common"
import { PROVIDER_NAMES } from "../provider-constants"

const EVENTS_ES_INDEX = 'events'

@Injectable()
@EventSubscriber()
export class EventsSubscriber implements EntitySubscriberInterface<Event> {
    constructor(
        @Inject(PROVIDER_NAMES.DATA_SOURCE) private dataSource: DataSource,
        @Inject(ElasticsearchService) private readonly elasticsearchService: ElasticsearchService) {
        this.dataSource.subscribers.push(this);
    }

    listenTo() {
        return Event
    }

    async afterLoad(entity: Event, event?: LoadEvent<Event>): Promise<Promise<any> | void> {
        try {
            // Testing indexing old data
            // await this.elasticsearchService.index(
            //     EVENTS_ES_INDEX,
            //     entity.id.toString(),
            //     { name: entity.name, date: entity.date, imageUrl: entity.imageUrl }
            // )
        } catch (e) {
            console.error(e)
        }
    }

    async afterInsert(event: InsertEvent<Event>) {
        try {
            const { entity } = event
            await this.elasticsearchService.index(
                EVENTS_ES_INDEX,
                entity.id.toString(),
                { name: entity.name, date: entity.date, imageUrl: entity.imageUrl }
            )
        } catch (e) {
            console.error('Failed to index event in elasticsearch', e)
        }
    }

    async afterUpdate(event: UpdateEvent<Event>) {
        try {
            const { entity } = event
            await this.elasticsearchService.update(
                EVENTS_ES_INDEX,
                entity.id.toString(),
                { name: entity.name, date: entity.date, imageUrl: entity.imageUrl }
            )
        } catch (e) {
            console.error('Failed to index event in elasticsearch', e)
        }
    }

    async afterRemove(event: RemoveEvent<Event>) {
        const { entity } = event
        await this.elasticsearchService.delete(EVENTS_ES_INDEX, entity.id.toString())
    }
}