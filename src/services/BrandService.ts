// services/BrandService.ts
import { ApiClient } from '../core';
import { QueryParameters } from '../dto';
import { BrandRequest } from '../dto';
import { BrandCollectionResponse, BrandResponse } from '../dto';
import { BaseService } from './BaseService';

/**
 * Service for interacting with brand endpoints
 */
export class BrandService extends BaseService {
    private resourcePath: string;

    /**
     * Create a new brand service
     *
     * @param apiClient API client
     * @param storeIri Store IRI for brand association
     */
    constructor(apiClient: ApiClient, private storeIri: string) {
        super(apiClient, '');

        // Extract store ID from the IRI and construct the proper resource path
        const storeId = this.extractIdFromIri(storeIri);
        this.resourcePath = `/api/v1/stores/${storeId}/brands`;
    }

    /**
     * Set the store IRI for brand association
     *
     * @param storeIri The full IRI of the store
     */
    setStoreIri(storeIri: string): void {
        this.storeIri = storeIri;
        const storeId = this.extractIdFromIri(storeIri);
        this.resourcePath = `/api/v1/stores/${storeId}/brands`;
    }

    /**
     * Get all brands for the store
     *
     * @param queryParams Optional query parameters for filtering, pagination, etc.
     * @returns Collection of brands
     */
    async getAll(queryParams?: QueryParameters): Promise<BrandCollectionResponse> {
        const params = queryParams?.toJSON() || {};
        const response = await this.apiClient.get<any>(this.resourcePath, params);
        return BrandCollectionResponse.fromJSON(response);
    }

    /**
     * Get a brand by ID
     *
     * @param id Brand ID
     * @returns Brand data
     */
    async getById(id: string): Promise<BrandResponse> {
        const response = await this.apiClient.get<any>(`${this.resourcePath}/${id}`);
        return BrandResponse.fromJSON(response);
    }

    /**
     * Get a brand by IRI
     *
     * @param iri Brand IRI
     * @returns Brand data
     */
    async getByIri(iri: string): Promise<BrandResponse> {
        const response = await this.apiClient.get<any>(iri);
        return BrandResponse.fromJSON(response);
    }

    /**
     * Create a new brand
     *
     * @param brandRequest Brand data
     * @returns The created brand
     */
    async create(brandRequest: BrandRequest): Promise<BrandResponse> {
        const response = await this.apiClient.post<any>(this.resourcePath, brandRequest.toJSON());
        return BrandResponse.fromJSON(response);
    }

    /**
     * Update an existing brand
     *
     * @param id Brand ID
     * @param brandRequest Updated brand data
     * @returns The updated brand
     */
    async update(id: string, brandRequest: BrandRequest): Promise<BrandResponse> {
        const response = await this.apiClient.put<any>(`${this.resourcePath}/${id}`, brandRequest.toJSON());
        return BrandResponse.fromJSON(response);
    }

    /**
     * Update a brand by IRI
     *
     * @param iri Brand IRI
     * @param brandRequest Updated brand data
     * @returns The updated brand
     */
    async updateByIri(iri: string, brandRequest: BrandRequest): Promise<BrandResponse> {
        const response = await this.apiClient.put<any>(iri, brandRequest.toJSON());
        return BrandResponse.fromJSON(response);
    }

    /**
     * Delete a brand
     *
     * @param id Brand ID
     */
    async delete(id: string): Promise<void> {
        await this.apiClient.delete(`${this.resourcePath}/${id}`);
    }

    /**
     * Delete a brand by IRI
     *
     * @param iri Brand IRI
     */
    async deleteByIri(iri: string): Promise<void> {
        await this.apiClient.delete(iri);
    }
}