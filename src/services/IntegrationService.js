"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationService = void 0;
const dto_1 = require("../dto");
const BaseService_1 = require("./BaseService");
/**
 * Service for interacting with integration endpoints
 */
class IntegrationService extends BaseService_1.BaseService {
    /**
     * Create a new integration service
     *
     * @param apiClient API client
     */
    constructor(apiClient) {
        super(apiClient, '/api/v1/integrations');
    }
    /**
     * Get all integrations
     *
     * @param queryParams Optional query parameters for filtering, pagination, etc.
     * @returns Collection of integrations
     */
    getAll(queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = (queryParams === null || queryParams === void 0 ? void 0 : queryParams.toJSON()) || {};
            const response = yield this.apiClient.get(this.basePath, params);
            return dto_1.IntegrationCollectionResponse.fromJSON(response);
        });
    }
    /**
     * Get an integration by ID
     *
     * @param id Integration ID
     * @returns Integration data
     */
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.apiClient.get(`${this.basePath}/${id}`);
            return dto_1.IntegrationResponse.fromJSON(response);
        });
    }
    /**
     * Get an integration by IRI
     *
     * @param iri Integration IRI
     * @returns Integration data
     */
    getByIri(iri) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.apiClient.get(iri);
            return dto_1.IntegrationResponse.fromJSON(response);
        });
    }
    /**
     * Create a new integration
     *
     * @param integrationRequest Integration data
     * @returns The created integration
     */
    create(integrationRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.apiClient.post(this.basePath, integrationRequest.toJSON());
            return dto_1.IntegrationResponse.fromJSON(response);
        });
    }
    /**
     * Update an existing integration
     *
     * @param id Integration ID
     * @param integrationRequest Updated integration data
     * @returns The updated integration
     */
    update(id, integrationRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.apiClient.put(`${this.basePath}/${id}`, integrationRequest.toJSON());
            return dto_1.IntegrationResponse.fromJSON(response);
        });
    }
    /**
     * Update an integration by IRI
     *
     * @param iri Integration IRI
     * @param integrationRequest Updated integration data
     * @returns The updated integration
     */
    updateByIri(iri, integrationRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.apiClient.put(iri, integrationRequest.toJSON());
            return dto_1.IntegrationResponse.fromJSON(response);
        });
    }
    /**
     * Delete an integration
     *
     * @param id Integration ID
     */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.apiClient.delete(`${this.basePath}/${id}`);
        });
    }
    /**
     * Delete an integration by IRI
     *
     * @param iri Integration IRI
     */
    deleteByIri(iri) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.apiClient.delete(iri);
        });
    }
}
exports.IntegrationService = IntegrationService;
