import { ApiClient } from '../core';
import { QueryParameters } from '../dto';
import { AlternateIdentifierRequest } from '../dto';
import { AlternateIdentifierCollectionResponse } from '../dto';
import { AlternateIdentifierResponse } from '../dto';
import { BaseService } from './BaseService';

/**
 * Service for interacting with alternate identifier endpoints
 */
export class AlternateIdentifierService extends BaseService {
    /**
     * Create a new alternate identifier service
     *
     * @param apiClient API client
     */
    constructor(apiClient: ApiClient) {
        super(apiClient, '/api/v1/alternate_identifiers');
    }

    /**
     * Get all alternate identifiers
     *
     * @param queryParams Optional query parameters for filtering, pagination, etc.
     * @returns Collection of alternate identifiers
     */
    async getAll(queryParams?: QueryParameters): Promise<AlternateIdentifierCollectionResponse> {
        const params = queryParams?.toJSON() || {};
        const response = await this.apiClient.get<any>(this.basePath, params);
        return AlternateIdentifierCollectionResponse.fromJSON(response);
    }

    /**
     * Get an alternate identifier by ID
     *
     * @param id Alternate identifier ID
     * @returns Alternate identifier data
     */
    async getById(id: string): Promise<AlternateIdentifierResponse> {
        const response = await this.apiClient.get<any>(`${this.basePath}/${id}`);
        return AlternateIdentifierResponse.fromJSON(response);
    }

    /**
     * Get an alternate identifier by IRI
     *
     * @param iri Alternate identifier IRI
     * @returns Alternate identifier data
     */
    async getByIri(iri: string): Promise<AlternateIdentifierResponse> {
        const id = this.extractIdFromIri(iri);
        return this.getById(id);
    }

    /**
     * Create a new alternate identifier
     *
     * @param request Alternate identifier data
     * @returns The created alternate identifier
     */
    async create(request: AlternateIdentifierRequest): Promise<AlternateIdentifierResponse> {
        const response = await this.apiClient.post<any>(this.basePath, request.toJSON());
        return AlternateIdentifierResponse.fromJSON(response);
    }

    /**
     * Update an existing alternate identifier
     *
     * @param id Alternate identifier ID
     * @param request Updated alternate identifier data
     * @returns The updated alternate identifier
     */
    async update(id: string, request: AlternateIdentifierRequest): Promise<AlternateIdentifierResponse> {
        const response = await this.apiClient.put<any>(`${this.basePath}/${id}`, request.toJSON());
        return AlternateIdentifierResponse.fromJSON(response);
    }

    /**
     * Update an alternate identifier by IRI
     *
     * @param iri Alternate identifier IRI
     * @param request Updated alternate identifier data
     * @returns The updated alternate identifier
     */
    async updateByIri(iri: string, request: AlternateIdentifierRequest): Promise<AlternateIdentifierResponse> {
        const id = this.extractIdFromIri(iri);
        return this.update(id, request);
    }

    /**
     * Delete an alternate identifier
     *
     * @param id Alternate identifier ID
     */
    async delete(id: string): Promise<void> {
        await this.apiClient.delete(`${this.basePath}/${id}`);
    }

    /**
     * Delete an alternate identifier by IRI
     *
     * @param iri Alternate identifier IRI
     */
    async deleteByIri(iri: string): Promise<void> {
        const id = this.extractIdFromIri(iri);
        await this.delete(id);
    }
}