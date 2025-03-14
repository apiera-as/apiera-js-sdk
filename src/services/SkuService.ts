import { ApiClient } from '../core';
import { QueryParameters, SkuCollectionResponse, SkuRequest, SkuResponse } from '../dto';
import { BaseService } from './BaseService';

/**
 * Service for interacting with sku endpoints
 */
export class SkuService extends BaseService {
    /**
     * Create a new sku service
     *
     * @param apiClient API client
     */
    constructor(apiClient: ApiClient) {
        super(apiClient, '/api/v1/skus');
    }

    /**
     * Get all skus
     *
     * @param queryParams Optional query parameters for filtering, pagination, etc.
     * @returns Collection of skus
     */
    async getAll(queryParams?: QueryParameters): Promise<SkuCollectionResponse> {
        const params = queryParams?.toJSON() || {};
        const response = await this.apiClient.get<any>(this.basePath, params);
        return SkuCollectionResponse.fromJSON(response);
    }

    /**
     * Get a sku by ID
     *
     * @param id Sku ID
     * @returns Sku data
     */
    async getById(id: string): Promise<SkuResponse> {
        const response = await this.apiClient.get<any>(`${this.basePath}/${id}`);
        return SkuResponse.fromJSON(response);
    }

    /**
     * Get a sku by IRI
     *
     * @param iri Sku IRI
     * @returns Sku data
     */
    async getByIri(iri: string): Promise<SkuResponse> {
        const response = await this.apiClient.get<any>(iri);
        return SkuResponse.fromJSON(response);
    }

    /**
     * Create a new sku
     *
     * @param skuRequest Sku data
     * @returns The created sku
     */
    async create(skuRequest: SkuRequest): Promise<SkuResponse> {
        const response = await this.apiClient.post<any>(this.basePath, skuRequest.toJSON());
        return SkuResponse.fromJSON(response);
    }

    /**
     * Update an existing sku
     *
     * @param id Sku ID
     * @param skuRequest Updated sku data
     * @returns The updated sku
     */
    async update(id: string, skuRequest: SkuRequest): Promise<SkuResponse> {
        const response = await this.apiClient.put<any>(`${this.basePath}/${id}`, skuRequest.toJSON());
        return SkuResponse.fromJSON(response);
    }

    /**
     * Update a sku by IRI
     *
     * @param iri Sku IRI
     * @param skuRequest Updated sku data
     * @returns The updated sku
     */
    async updateByIri(iri: string, skuRequest: SkuRequest): Promise<SkuResponse> {
        const response = await this.apiClient.put<any>(iri, skuRequest.toJSON());
        return SkuResponse.fromJSON(response);
    }

    /**
     * Delete a sku
     *
     * @param id Sku ID
     */
    async delete(id: string): Promise<void> {
        await this.apiClient.delete(`${this.basePath}/${id}`);
    }

    /**
     * Delete a sku by IRI
     *
     * @param iri Sku IRI
     */
    async deleteByIri(iri: string): Promise<void> {
        await this.apiClient.delete(iri);
    }
}