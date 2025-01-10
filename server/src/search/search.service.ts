import { Inject } from "@nestjs/common";
import { ElasticsearchService } from "../elasticsearch/elasticsearch.service";

const EVENTS_ES_INDEX = 'events'

export class SearchService {
    constructor(@Inject(ElasticsearchService) private readonly elasticsearchService: ElasticsearchService) { }

    async searchEvents({ name, fromDate, toDate }: { name?: string, fromDate?: string, toDate?: string }) {
        console.debug(name, toDate, fromDate)
        const query = {
            bool: {
                must: []
            }
        }

        if (name) {
            query.bool.must.push({
                match: {
                    name: {
                        query: name,
                        operator: 'and',
                        fuzziness: 'auto'
                    }
                }
            })
        }

        if (fromDate || toDate) {
            const rangeQuery: any = { range: { date: {} } };
            if (fromDate) {
                rangeQuery.range.date.gte = fromDate;
            }
            if (toDate) {
                rangeQuery.range.date.lte = toDate;
            }
            query.bool.must.push(rangeQuery);
        }

        return await this.elasticsearchService.search(EVENTS_ES_INDEX, query)
    }
}