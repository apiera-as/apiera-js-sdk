"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
/**
 * Base class for all API services
 */
class BaseService {
    /**
     * Create a new service
     *
     * @param apiClient API client
     * @param basePath Base path for the service endpoints
     */
    constructor(apiClient, basePath) {
        this.apiClient = apiClient;
        this.basePath = basePath;
    }
    /**
     * Extract the ID from an IRI
     *
     * @param iri IRI to extract from (e.g., "https://api.apiera.com/v1/stores/123")
     * @returns Extracted ID (e.g., "123")
     */
    extractIdFromIri(iri) {
        const parts = iri.split('/');
        return parts[parts.length - 1];
    }
}
exports.BaseService = BaseService;
