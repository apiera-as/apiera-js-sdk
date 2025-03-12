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
exports.StoreService = void 0;
const dto_1 = require("../dto");
const dto_2 = require("../dto");
const BaseService_1 = require("./BaseService");
/**
 * Service for interacting with store endpoints
 */
class StoreService extends BaseService_1.BaseService {
    /**
     * Create a new store service
     *
     * @param apiClient API client
     */
    constructor(apiClient) {
        super(apiClient, '/api/v1/stores');
    }
    /**
     * Get all stores
     *
     * @param queryParams Optional query parameters for filtering, pagination, etc.
     * @returns Collection of stores
     */
    getAll(queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = (queryParams === null || queryParams === void 0 ? void 0 : queryParams.toJSON()) || {};
            const response = yield this.apiClient.get(this.basePath, params);
            return dto_1.StoreCollectionResponse.fromJSON(response);
        });
    }
    /**
     * Get a store by ID
     *
     * @param id Store ID
     * @returns Store data
     */
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.apiClient.get(`${this.basePath}/${id}`);
            return dto_2.StoreResponse.fromJSON(response);
        });
    }
    /**
     * Get a store by IRI
     *
     * @param iri Store IRI
     * @returns Store data
     */
    getByIri(iri) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this.extractIdFromIri(iri);
            return this.getById(id);
        });
    }
    /**
     * Create a new store
     *
     * @param storeRequest Store data
     * @returns The created store
     */
    create(storeRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.apiClient.post(this.basePath, storeRequest.toJSON());
            return dto_2.StoreResponse.fromJSON(response);
        });
    }
    /**
     * Update an existing store
     *
     * @param id Store ID
     * @param storeRequest Updated store data
     * @returns The updated store
     */
    update(id, storeRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.apiClient.put(`${this.basePath}/${id}`, storeRequest.toJSON());
            return dto_2.StoreResponse.fromJSON(response);
        });
    }
    /**
     * Update a store by IRI
     *
     * @param iri Store IRI
     * @param storeRequest Updated store data
     * @returns The updated store
     */
    updateByIri(iri, storeRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this.extractIdFromIri(iri);
            return this.update(id, storeRequest);
        });
    }
    /**
     * Delete a store
     *
     * @param id Store ID
     */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.apiClient.delete(`${this.basePath}/${id}`);
        });
    }
    /**
     * Delete a store by IRI
     *
     * @param iri Store IRI
     */
    deleteByIri(iri) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this.extractIdFromIri(iri);
            yield this.delete(id);
        });
    }
}
exports.StoreService = StoreService;
