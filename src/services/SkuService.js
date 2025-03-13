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
exports.SkuService = void 0;
const dto_1 = require("../dto");
const BaseService_1 = require("./BaseService");
/**
 * Service for interacting with sku endpoints
 */
class SkuService extends BaseService_1.BaseService {
    /**
     * Create a new sku service
     *
     * @param apiClient API client
     */
    constructor(apiClient) {
        super(apiClient, '/api/v1/skus');
    }
    /**
     * Get all skus
     *
     * @param queryParams Optional query parameters for filtering, pagination, etc.
     * @returns Collection of skus
     */
    getAll(queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = (queryParams === null || queryParams === void 0 ? void 0 : queryParams.toJSON()) || {};
            const response = yield this.apiClient.get(this.basePath, params);
            return dto_1.SkuCollectionResponse.fromJSON(response);
        });
    }
    /**
     * Get a sku by ID
     *
     * @param id Sku ID
     * @returns Sku data
     */
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.apiClient.get(`${this.basePath}/${id}`);
            return dto_1.SkuResponse.fromJSON(response);
        });
    }
    /**
     * Get a sku by IRI
     *
     * @param iri Sku IRI
     * @returns Sku data
     */
    getByIri(iri) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this.extractIdFromIri(iri);
            return this.getById(id);
        });
    }
    /**
     * Create a new sku
     *
     * @param skuRequest Sku data
     * @returns The created sku
     */
    create(skuRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.apiClient.post(this.basePath, skuRequest.toJSON());
            return dto_1.SkuResponse.fromJSON(response);
        });
    }
    /**
     * Update an existing sku
     *
     * @param id Sku ID
     * @param skuRequest Updated sku data
     * @returns The updated sku
     */
    update(id, skuRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.apiClient.put(`${this.basePath}/${id}`, skuRequest.toJSON());
            return dto_1.SkuResponse.fromJSON(response);
        });
    }
    /**
     * Update a sku by IRI
     *
     * @param iri Sku IRI
     * @param skuRequest Updated sku data
     * @returns The updated sku
     */
    updateByIri(iri, skuRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this.extractIdFromIri(iri);
            return this.update(id, skuRequest);
        });
    }
    /**
     * Delete a sku
     *
     * @param id Sku ID
     */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.apiClient.delete(`${this.basePath}/${id}`);
        });
    }
    /**
     * Delete a sku by IRI
     *
     * @param iri Sku IRI
     */
    deleteByIri(iri) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this.extractIdFromIri(iri);
            yield this.delete(id);
        });
    }
}
exports.SkuService = SkuService;
