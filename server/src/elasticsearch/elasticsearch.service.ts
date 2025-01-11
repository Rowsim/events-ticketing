import { Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';

@Injectable()
export class ElasticsearchService {
    private readonly client = new Client({ node: process.env.ELASTICSEARCH_NODE ? `${process.env.ELASTICSEARCH_NODE}:${process.env.ELASTICSEARCH_NODE_PORT}` : 'http://localhost:9200' });

    async loadAll(index: string) {
        const response = await this.client.search({
            index,
            query: {
                match_all: {}
            }
        })

        return response.hits.hits
    }

    async get(index: string, id: string) {
        const response = await this.client.get({ index, id })

        return response
    }

    async search(index: string, query: Object) {
        const response = await this.client.search({
            index,
            body: {
                query
            }
        })

        return response.hits.hits.map(hit => hit._source)
    }

    async index(index: string, id: string, body: Object) {
        await this.client.index({
            index,
            id,
            body,
        });
    }

    async update(index: string, id: string, body: Object) {
        await this.client.update({
            index,
            id,
            body: { doc: body },
        });
    }

    async delete(index: string, id: string) {
        await this.client.delete({
            index,
            id,
        });
    }
}
