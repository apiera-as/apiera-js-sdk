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
exports.AlternateIdentifierService = void 0;
const dto_1 = require("../dto");
const dto_2 = require("../dto");
const BaseService_1 = require("./BaseService");
/**
 * Service for interacting with alternate identifier endpoints
 */
class AlternateIdentifierService extends BaseService_1.BaseService {
    /**
     * Create a new alternate identifier service
     *
     * @param apiClient API client
     */
    constructor(apiClient) {
        super(apiClient, '/api/v1/alternate_identifiers');
    }
    /**
     * Get all alternate identifiers
     *
     * @param queryParams Optional query parameters for filtering, pagination, etc.
     * @returns Collection of alternate identifiers
     */
    getAll(queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = (queryParams === null || queryParams === void 0 ? void 0 : queryParams.toJSON()) || {};
            const response = yield this.apiClient.get(this.basePath, params);
            return dto_1.AlternateIdentifierCollectionResponse.fromJSON(response);
        });
    }
    /**
     * Get an alternate identifier by ID
     *
     * @param id Alternate identifier ID
     * @returns Alternate identifier data
     */
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.apiClient.get(`${this.basePath}/${id}`);
            return dto_2.AlternateIdentifierResponse.fromJSON(response);
        });
    }
    /**
     * Get an alternate identifier by IRI
     *
     * @param iri Alternate identifier IRI
     * @returns Alternate identifier data
     */
    getByIri(iri) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this.extractIdFromIri(iri);
            return this.getById(id);
        });
    }
    /**
     * Create a new alternate identifier
     *
     * @param request Alternate identifier data
     * @returns The created alternate identifier
     */
    create(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.apiClient.post(this.basePath, request.toJSON());
            return dto_2.AlternateIdentifierResponse.fromJSON(response);
        });
    }
    /**
     * Update an existing alternate identifier
     *
     * @param id Alternate identifier ID
     * @param request Updated alternate identifier data
     * @returns The updated alternate identifier
     */
    update(id, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.apiClient.put(`${this.basePath}/${id}`, request.toJSON());
            return dto_2.AlternateIdentifierResponse.fromJSON(response);
        });
    }
    /**
     * Update an alternate identifier by IRI
     *
     * @param iri Alternate identifier IRI
     * @param request Updated alternate identifier data
     * @returns The updated alternate identifier
     */
    updateByIri(iri, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this.extractIdFromIri(iri);
            return this.update(id, request);
        });
    }
    /**
     * Delete an alternate identifier
     *
     * @param id Alternate identifier ID
     */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.apiClient.delete(`${this.basePath}/${id}`);
        });
    }
    /**
     * Delete an alternate identifier by IRI
     *
     * @param iri Alternate identifier IRI
     */
    deleteByIri(iri) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this.extractIdFromIri(iri);
            yield this.delete(id);
        });
    }
}
exports.AlternateIdentifierService = AlternateIdentifierService;
