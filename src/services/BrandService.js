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
exports.BrandService = void 0;
const dto_1 = require("../dto");
const BaseService_1 = require("./BaseService");
/**
 * Service for interacting with brand endpoints
 */
class BrandService extends BaseService_1.BaseService {
    /**
     * Create a new brand service
     *
     * @param apiClient API client
     * @param storeIri Store IRI for brand association
     */
    constructor(apiClient, storeIri) {
        super(apiClient, '');
        this.storeIri = storeIri;
        // Extract store ID from the IRI and construct the proper resource path
        const storeId = this.extractIdFromIri(storeIri);
        this.resourcePath = `/api/v1/stores/${storeId}/brands`;
    }
    /**
     * Set the store IRI for brand association
     *
     * @param storeIri The full IRI of the store
     */
    setStoreIri(storeIri) {
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
    getAll(queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = (queryParams === null || queryParams === void 0 ? void 0 : queryParams.toJSON()) || {};
            const response = yield this.apiClient.get(this.resourcePath, params);
            return dto_1.BrandCollectionResponse.fromJSON(response);
        });
    }
    /**
     * Get a brand by ID
     *
     * @param id Brand ID
     * @returns Brand data
     */
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.apiClient.get(`${this.resourcePath}/${id}`);
            return dto_1.BrandResponse.fromJSON(response);
        });
    }
    /**
     * Get a brand by IRI
     *
     * @param iri Brand IRI
     * @returns Brand data
     */
    getByIri(iri) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.apiClient.get(iri);
            return dto_1.BrandResponse.fromJSON(response);
        });
    }
    /**
     * Create a new brand
     *
     * @param brandRequest Brand data
     * @returns The created brand
     */
    create(brandRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.apiClient.post(this.resourcePath, brandRequest.toJSON());
            return dto_1.BrandResponse.fromJSON(response);
        });
    }
    /**
     * Update an existing brand
     *
     * @param id Brand ID
     * @param brandRequest Updated brand data
     * @returns The updated brand
     */
    update(id, brandRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.apiClient.put(`${this.resourcePath}/${id}`, brandRequest.toJSON());
            return dto_1.BrandResponse.fromJSON(response);
        });
    }
    /**
     * Update a brand by IRI
     *
     * @param iri Brand IRI
     * @param brandRequest Updated brand data
     * @returns The updated brand
     */
    updateByIri(iri, brandRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.apiClient.put(iri, brandRequest.toJSON());
            return dto_1.BrandResponse.fromJSON(response);
        });
    }
    /**
     * Delete a brand
     *
     * @param id Brand ID
     */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.apiClient.delete(`${this.resourcePath}/${id}`);
        });
    }
    /**
     * Delete a brand by IRI
     *
     * @param iri Brand IRI
     */
    deleteByIri(iri) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.apiClient.delete(iri);
        });
    }
}
exports.BrandService = BrandService;
