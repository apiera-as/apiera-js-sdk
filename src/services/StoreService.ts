import { ApiClient } from '../core';
import { QueryParameters } from '../dto';
import { StoreRequest } from '../dto';
import { StoreCollectionResponse } from '../dto';
import { StoreResponse } from '../dto';
import { BaseService } from './BaseService';

/**
 * Service for interacting with store endpoints
 */
export class StoreService extends BaseService {
    /**
     * Create a new store service
     *
     * @param apiClient API client
     */
    constructor(apiClient: ApiClient) {
        super(apiClient, '/api/v1/stores');
    }

    /**
     * Get all stores
     *
     * @param queryParams Optional query parameters for filtering, pagination, etc.
     * @returns Collection of stores
     */
    async getAll(queryParams?: QueryParameters): Promise<StoreCollectionResponse> {
        const params = queryParams?.toJSON() || {};
        const response = await this.apiClient.get<any>(this.basePath, params);
        return StoreCollectionResponse.fromJSON(response);
    }

    /**
     * Get a store by ID
     *
     * @param id Store ID
     * @returns Store data
     */
    async getById(id: string): Promise<StoreResponse> {
        const response = await this.apiClient.get<any>(`${this.basePath}/${id}`);
        return StoreResponse.fromJSON(response);
    }

    /**
     * Get a store by IRI
     *
     * @param iri Store IRI
     * @returns Store data
     */
    async getByIri(iri: string): Promise<StoreResponse> {
        const id = this.extractIdFromIri(iri);
        return this.getById(id);
    }

    /**
     * Create a new store
     *
     * @param storeRequest Store data
     * @returns The created store
     */
    async create(storeRequest: StoreRequest): Promise<StoreResponse> {
        const response = await this.apiClient.post<any>(this.basePath, storeRequest.toJSON());
        return StoreResponse.fromJSON(response);
    }

    /**
     * Update an existing store
     *
     * @param id Store ID
     * @param storeRequest Updated store data
     * @returns The updated store
     */
    async update(id: string, storeRequest: StoreRequest): Promise<StoreResponse> {
        const response = await this.apiClient.put<any>(`${this.basePath}/${id}`, storeRequest.toJSON());
        return StoreResponse.fromJSON(response);
    }

    /**
     * Update a store by IRI
     *
     * @param iri Store IRI
     * @param storeRequest Updated store data
     * @returns The updated store
     */
    async updateByIri(iri: string, storeRequest: StoreRequest): Promise<StoreResponse> {
        const id = this.extractIdFromIri(iri);
        return this.update(id, storeRequest);
    }

    /**
     * Delete a store
     *
     * @param id Store ID
     */
    async delete(id: string): Promise<void> {
        await this.apiClient.delete(`${this.basePath}/${id}`);
    }

    /**
     * Delete a store by IRI
     *
     * @param iri Store IRI
     */
    async deleteByIri(iri: string): Promise<void> {
        const id = this.extractIdFromIri(iri);
        await this.delete(id);
    }
}