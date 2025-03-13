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
exports.ProductService = void 0;
const dto_1 = require("../dto");
const BaseService_1 = require("./BaseService");
/**
 * Service for interacting with product endpoints
 */
class ProductService extends BaseService_1.BaseService {
    /**
     * Create a new product service
     *
     * @param apiClient API client
     * @param storeIri Store IRI for product association
     */
    constructor(apiClient, storeIri) {
        super(apiClient, '');
        this.storeIri = storeIri;
        // Extract store ID from the IRI and construct the proper resource path
        const storeId = this.extractIdFromIri(storeIri);
        this.resourcePath = `/api/v1/stores/${storeId}/products`;
    }
    /**
     * Set the store IRI for product association
     *
     * @param storeIri The full IRI of the store
     */
    setStoreIri(storeIri) {
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
    getAll(queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = (queryParams === null || queryParams === void 0 ? void 0 : queryParams.toJSON()) || {};
            const response = yield this.apiClient.get(this.resourcePath, params);
            return dto_1.ProductCollectionResponse.fromJSON(response);
        });
    }
    /**
     * Get a product by ID
     *
     * @param id Product ID
     * @returns Product data
     */
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.apiClient.get(`${this.resourcePath}/${id}`);
            return dto_1.ProductResponse.fromJSON(response);
        });
    }
    /**
     * Get a product by IRI
     *
     * @param iri Product IRI
     * @returns Product data
     */
    getByIri(iri) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this.extractIdFromIri(iri);
            return this.getById(id);
        });
    }
    /**
     * Create a new product
     *
     * @param productRequest Product data
     * @returns The created product
     */
    create(productRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.apiClient.post(this.resourcePath, productRequest.toJSON());
            return dto_1.ProductResponse.fromJSON(response);
        });
    }
    /**
     * Update an existing product
     *
     * @param id Product ID
     * @param productRequest Updated product data
     * @returns The updated product
     */
    update(id, productRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.apiClient.put(`${this.resourcePath}/${id}`, productRequest.toJSON());
            return dto_1.ProductResponse.fromJSON(response);
        });
    }
    /**
     * Update a product by IRI
     *
     * @param iri Product IRI
     * @param productRequest Updated product data
     * @returns The updated product
     */
    updateByIri(iri, productRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this.extractIdFromIri(iri);
            return this.update(id, productRequest);
        });
    }
    /**
     * Delete a product
     *
     * @param id Product ID
     */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.apiClient.delete(`${this.resourcePath}/${id}`);
        });
    }
    /**
     * Delete a product by IRI
     *
     * @param iri Product IRI
     */
    deleteByIri(iri) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this.extractIdFromIri(iri);
            yield this.delete(id);
        });
    }
}
exports.ProductService = ProductService;
