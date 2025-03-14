// services/ProductService.ts
import { ApiClient } from '../core';
import { QueryParameters } from '../dto';
import { ProductRequest } from '../dto';
import { ProductCollectionResponse, ProductResponse } from '../dto';
import { BaseService } from './BaseService';

/**
 * Service for interacting with product endpoints
 */
export class ProductService extends BaseService {
    private resourcePath: string;

    /**
     * Create a new product service
     *
     * @param apiClient API client
     * @param storeIri Store IRI for product association
     */
    constructor(apiClient: ApiClient, private storeIri: string) {
        super(apiClient, '');

        // Extract store ID from the IRI and construct the proper resource path
        const storeId = this.extractIdFromIri(storeIri);
        this.resourcePath = `/api/v1/stores/${storeId}/products`;
    }

    /**
     * Set the store IRI for product association
     *
     * @param storeIri The full IRI of the store
     */
    setStoreIri(storeIri: string): void {
        this.storeIri = storeIri;
        const storeId = this.extractIdFromIri(storeIri);
        this.resourcePath = `/api/v1/stores/${storeId}/products`;
    }

    /**
     * Get all products for the store
     *
     * @param queryParams Optional query parameters for filtering, pagination, etc.
     * @returns Collection of products
     */
    async getAll(queryParams?: QueryParameters): Promise<ProductCollectionResponse> {
        const params = queryParams?.toJSON() || {};
        const response = await this.apiClient.get<any>(this.resourcePath, params);
        return ProductCollectionResponse.fromJSON(response);
    }

    /**
     * Get a product by ID
     *
     * @param id Product ID
     * @returns Product data
     */
    async getById(id: string): Promise<ProductResponse> {
        const response = await this.apiClient.get<any>(`${this.resourcePath}/${id}`);
        return ProductResponse.fromJSON(response);
    }

    /**
     * Get a product by IRI
     *
     * @param iri Product IRI
     * @returns Product data
     */
    async getByIri(iri: string): Promise<ProductResponse> {
        const response = await this.apiClient.get<any>(iri);
        return ProductResponse.fromJSON(response);
    }

    /**
     * Create a new product
     *
     * @param productRequest Product data
     * @returns The created product
     */
    async create(productRequest: ProductRequest): Promise<ProductResponse> {
        const response = await this.apiClient.post<any>(this.resourcePath, productRequest.toJSON());
        return ProductResponse.fromJSON(response);
    }

    /**
     * Update an existing product
     *
     * @param id Product ID
     * @param productRequest Updated product data
     * @returns The updated product
     */
    async update(id: string, productRequest: ProductRequest): Promise<ProductResponse> {
        const response = await this.apiClient.put<any>(`${this.resourcePath}/${id}`, productRequest.toJSON());
        return ProductResponse.fromJSON(response);
    }

    /**
     * Update a product by IRI
     *
     * @param iri Product IRI
     * @param productRequest Updated product data
     * @returns The updated product
     */
    async updateByIri(iri: string, productRequest: ProductRequest): Promise<ProductResponse> {
        const response = await this.apiClient.put<any>(iri, productRequest.toJSON());
        return ProductResponse.fromJSON(response);
    }

    /**
     * Delete a product
     *
     * @param id Product ID
     */
    async delete(id: string): Promise<void> {
        await this.apiClient.delete(`${this.resourcePath}/${id}`);
    }

    /**
     * Delete a product by IRI
     *
     * @param iri Product IRI
     */
    async deleteByIri(iri: string): Promise<void> {
        await this.apiClient.delete(iri);
    }
}