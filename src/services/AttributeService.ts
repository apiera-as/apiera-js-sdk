// AttributeService.ts
import { ApiClient } from '../core';
import { QueryParameters } from '../dto';
import { AttributeRequest } from '../dto';
import { AttributeCollectionResponse, AttributeResponse } from '../dto';
import { BaseService } from './BaseService';
import { AttributeTermService } from './AttributeTermService';

export class AttributeService extends BaseService {
    private resourcePath: string;

    constructor(apiClient: ApiClient, private storeIri: string) {
        super(apiClient, '');

        const storeId = this.extractIdFromIri(storeIri);
        this.resourcePath = `/api/v1/stores/${storeId}/attributes`;
    }

    setStoreIri(storeIri: string): void {
        this.storeIri = storeIri;
        const storeId = this.extractIdFromIri(storeIri);
        this.resourcePath = `/api/v1/stores/${storeId}/attributes`;
    }

    async getAll(queryParams?: QueryParameters): Promise<AttributeCollectionResponse> {
        const params = queryParams?.toJSON() || {};
        const response = await this.apiClient.get<any>(this.resourcePath, params);
        return AttributeCollectionResponse.fromJSON(response);
    }

    async getById(id: string): Promise<AttributeResponse> {
        const response = await this.apiClient.get<any>(`${this.resourcePath}/${id}`);
        return AttributeResponse.fromJSON(response);
    }

    async getByIri(iri: string): Promise<AttributeResponse> {
        const response = await this.apiClient.get<any>(iri);
        return AttributeResponse.fromJSON(response);
    }

    async create(attributeRequest: AttributeRequest): Promise<AttributeResponse> {
        const response = await this.apiClient.post<any>(this.resourcePath, attributeRequest.toJSON());
        return AttributeResponse.fromJSON(response);
    }

    async update(id: string, attributeRequest: AttributeRequest): Promise<AttributeResponse> {
        const response = await this.apiClient.put<any>(`${this.resourcePath}/${id}`, attributeRequest.toJSON());
        return AttributeResponse.fromJSON(response);
    }

    async updateByIri(iri: string, attributeRequest: AttributeRequest): Promise<AttributeResponse> {
        const response = await this.apiClient.put<any>(iri, attributeRequest.toJSON());
        return AttributeResponse.fromJSON(response);
    }

    async delete(id: string): Promise<void> {
        await this.apiClient.delete(`${this.resourcePath}/${id}`);
    }

    async deleteByIri(iri: string): Promise<void> {
        await this.apiClient.delete(iri);
    }

    getAttributeTermService(attributeId: string): AttributeTermService {
        return new AttributeTermService(this.apiClient, `${this.resourcePath}/${attributeId}`);
    }

    getAttributeTermServiceByIri(attributeIri: string): AttributeTermService {
        return new AttributeTermService(this.apiClient, attributeIri);
    }
}