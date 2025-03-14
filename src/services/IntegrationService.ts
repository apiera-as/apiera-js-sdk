// IntegrationService.ts
import { ApiClient } from '../core';
import { QueryParameters } from '../dto';
import { IntegrationRequest } from '../dto';
import { IntegrationCollectionResponse, IntegrationResponse } from '../dto';
import { BaseService } from './BaseService';

/**
 * Service for interacting with integration endpoints
 */
export class IntegrationService extends BaseService {
    /**
     * Create a new integration service
     *
     * @param apiClient API client
     */
    constructor(apiClient: ApiClient) {
        super(apiClient, '/api/v1/integrations');
    }

    /**
     * Get all integrations
     *
     * @param queryParams Optional query parameters for filtering, pagination, etc.
     * @returns Collection of integrations
     */
    async getAll(queryParams?: QueryParameters): Promise<IntegrationCollectionResponse> {
        const params = queryParams?.toJSON() || {};
        const response = await this.apiClient.get<any>(this.basePath, params);
        return IntegrationCollectionResponse.fromJSON(response);
    }

    /**
     * Get an integration by ID
     *
     * @param id Integration ID
     * @returns Integration data
     */
    async getById(id: string): Promise<IntegrationResponse> {
        const response = await this.apiClient.get<any>(`${this.basePath}/${id}`);
        return IntegrationResponse.fromJSON(response);
    }

    /**
     * Get an integration by IRI
     *
     * @param iri Integration IRI
     * @returns Integration data
     */
    async getByIri(iri: string): Promise<IntegrationResponse> {
        const response = await this.apiClient.get<any>(iri);
        return IntegrationResponse.fromJSON(response);
    }

    /**
     * Create a new integration
     *
     * @param integrationRequest Integration data
     * @returns The created integration
     */
    async create(integrationRequest: IntegrationRequest): Promise<IntegrationResponse> {
        const response = await this.apiClient.post<any>(this.basePath, integrationRequest.toJSON());
        return IntegrationResponse.fromJSON(response);
    }

    /**
     * Update an existing integration
     *
     * @param id Integration ID
     * @param integrationRequest Updated integration data
     * @returns The updated integration
     */
    async update(id: string, integrationRequest: IntegrationRequest): Promise<IntegrationResponse> {
        const response = await this.apiClient.put<any>(`${this.basePath}/${id}`, integrationRequest.toJSON());
        return IntegrationResponse.fromJSON(response);
    }

    /**
     * Update an integration by IRI
     *
     * @param iri Integration IRI
     * @param integrationRequest Updated integration data
     * @returns The updated integration
     */
    async updateByIri(iri: string, integrationRequest: IntegrationRequest): Promise<IntegrationResponse> {
        const response = await this.apiClient.put<any>(iri, integrationRequest.toJSON());
        return IntegrationResponse.fromJSON(response);
    }

    /**
     * Delete an integration
     *
     * @param id Integration ID
     */
    async delete(id: string): Promise<void> {
        await this.apiClient.delete(`${this.basePath}/${id}`);
    }

    /**
     * Delete an integration by IRI
     *
     * @param iri Integration IRI
     */
    async deleteByIri(iri: string): Promise<void> {
        await this.apiClient.delete(iri);
    }
}