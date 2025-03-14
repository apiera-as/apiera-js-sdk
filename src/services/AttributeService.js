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
exports.AttributeService = void 0;
const dto_1 = require("../dto");
const BaseService_1 = require("./BaseService");
const AttributeTermService_1 = require("./AttributeTermService");
class AttributeService extends BaseService_1.BaseService {
    constructor(apiClient, storeIri) {
        super(apiClient, '');
        this.storeIri = storeIri;
        const storeId = this.extractIdFromIri(storeIri);
        this.resourcePath = `/api/v1/stores/${storeId}/attributes`;
    }
    setStoreIri(storeIri) {
        this.storeIri = storeIri;
        const storeId = this.extractIdFromIri(storeIri);
        this.resourcePath = `/api/v1/stores/${storeId}/attributes`;
    }
    getAll(queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = (queryParams === null || queryParams === void 0 ? void 0 : queryParams.toJSON()) || {};
            const response = yield this.apiClient.get(this.resourcePath, params);
            return dto_1.AttributeCollectionResponse.fromJSON(response);
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.apiClient.get(`${this.resourcePath}/${id}`);
            return dto_1.AttributeResponse.fromJSON(response);
        });
    }
    getByIri(iri) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.apiClient.get(iri);
            return dto_1.AttributeResponse.fromJSON(response);
        });
    }
    create(attributeRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.apiClient.post(this.resourcePath, attributeRequest.toJSON());
            return dto_1.AttributeResponse.fromJSON(response);
        });
    }
    update(id, attributeRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.apiClient.put(`${this.resourcePath}/${id}`, attributeRequest.toJSON());
            return dto_1.AttributeResponse.fromJSON(response);
        });
    }
    updateByIri(iri, attributeRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.apiClient.put(iri, attributeRequest.toJSON());
            return dto_1.AttributeResponse.fromJSON(response);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.apiClient.delete(`${this.resourcePath}/${id}`);
        });
    }
    deleteByIri(iri) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.apiClient.delete(iri);
        });
    }
    getAttributeTermService(attributeId) {
        return new AttributeTermService_1.AttributeTermService(this.apiClient, `${this.resourcePath}/${attributeId}`);
    }
    getAttributeTermServiceByIri(attributeIri) {
        return new AttributeTermService_1.AttributeTermService(this.apiClient, attributeIri);
    }
}
exports.AttributeService = AttributeService;
