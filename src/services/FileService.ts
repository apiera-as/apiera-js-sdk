// FileService.ts
import { ApiClient } from '../core';
import { QueryParameters } from '../dto';
import { FileRequest } from '../dto';
import { FileCollectionResponse, FileResponse } from '../dto';
import { BaseService } from './BaseService';

/**
 * Service for interacting with file endpoints
 */
export class FileService extends BaseService {
    /**
     * Create a new file service
     *
     * @param apiClient API client
     */
    constructor(apiClient: ApiClient) {
        super(apiClient, '/api/v1/files');
    }

    /**
     * Get all files
     *
     * @param queryParams Optional query parameters for filtering, pagination, etc.
     * @returns Collection of files
     */
    async getAll(queryParams?: QueryParameters): Promise<FileCollectionResponse> {
        const params = queryParams?.toJSON() || {};
        const response = await this.apiClient.get<any>(this.basePath, params);
        return FileCollectionResponse.fromJSON(response);
    }

    /**
     * Get a file by ID
     *
     * @param id File ID
     * @returns File data
     */
    async getById(id: string): Promise<FileResponse> {
        const response = await this.apiClient.get<any>(`${this.basePath}/${id}`);
        return FileResponse.fromJSON(response);
    }

    /**
     * Get a file by IRI
     *
     * @param iri File IRI
     * @returns File data
     */
    async getByIri(iri: string): Promise<FileResponse> {
        const response = await this.apiClient.get<any>(iri);
        return FileResponse.fromJSON(response);
    }

    /**
     * Create a new file
     *
     * @param fileRequest File data
     * @returns The created file
     */
    async create(fileRequest: FileRequest): Promise<FileResponse> {
        const response = await this.apiClient.post<any>(this.basePath, fileRequest.toJSON());
        return FileResponse.fromJSON(response);
    }

    /**
     * Delete a file
     *
     * @param id File ID
     */
    async delete(id: string): Promise<void> {
        await this.apiClient.delete(`${this.basePath}/${id}`);
    }

    /**
     * Delete a file by IRI
     *
     * @param iri File IRI
     */
    async deleteByIri(iri: string): Promise<void> {
        await this.apiClient.delete(iri);
    }
}