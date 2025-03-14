// AttributeTermService.ts
import { ApiClient } from '../core';
import { QueryParameters } from '../dto';
import { AttributeTermRequest } from '../dto';
import { AttributeTermCollectionResponse, AttributeTermResponse } from '../dto';
import { BaseService } from './BaseService';

export class AttributeTermService extends BaseService {
    private resourcePath: string;

    constructor(apiClient: ApiClient, attributeIri: string) {
        super(apiClient, '');

        // Handle both full IRIs and resource paths
        if (attributeIri.startsWith('http') || attributeIri.startsWith('/api')) {
            this.resourcePath = `${attributeIri}/terms`;
        } else {
            this.resourcePath = `${attributeIri}/terms`;
        }
    }

    async getAll(queryParams?: QueryParameters): Promise<AttributeTermCollectionResponse> {
        const params = queryParams?.toJSON() || {};
        const response = await this.apiClient.get<any>(this.resourcePath, params);
        return AttributeTermCollectionResponse.fromJSON(response);
    }

    async getById(id: string): Promise<AttributeTermResponse> {
        const response = await this.apiClient.get<any>(`${this.resourcePath}/${id}`);
        return AttributeTermResponse.fromJSON(response);
    }

    async getByIri(iri: string): Promise<AttributeTermResponse> {
        const response = await this.apiClient.get<any>(iri);
        return AttributeTermResponse.fromJSON(response);
    }

    async create(termRequest: AttributeTermRequest): Promise<AttributeTermResponse> {
        const response = await this.apiClient.post<any>(this.resourcePath, termRequest.toJSON());
        return AttributeTermResponse.fromJSON(response);
    }

    async update(id: string, termRequest: AttributeTermRequest): Promise<AttributeTermResponse> {
        const response = await this.apiClient.put<any>(`${this.resourcePath}/${id}`, termRequest.toJSON());
        return AttributeTermResponse.fromJSON(response);
    }

    async updateByIri(iri: string, termRequest: AttributeTermRequest): Promise<AttributeTermResponse> {
        const response = await this.apiClient.put<any>(iri, termRequest.toJSON());
        return AttributeTermResponse.fromJSON(response);
    }

    async delete(id: string): Promise<void> {
        await this.apiClient.delete(`${this.resourcePath}/${id}`);
    }

    async deleteByIri(iri: string): Promise<void> {
        await this.apiClient.delete(iri);
    }
}