import { ApiClient } from '../core';

/**
 * Base class for all API services
 */
export abstract class BaseService {
    /**
     * Create a new service
     *
     * @param apiClient API client
     * @param basePath Base path for the service endpoints
     */
    constructor(
        protected readonly apiClient: ApiClient,
        protected readonly basePath: string
    ) {}

    /**
     * Extract the ID from an IRI
     *
     * @param iri IRI to extract from (e.g., "https://api.apiera.com/v1/stores/123")
     * @returns Extracted ID (e.g., "123")
     */
    protected extractIdFromIri(iri: string): string {
        const parts = iri.split('/');
        return parts[parts.length - 1];
    }
}