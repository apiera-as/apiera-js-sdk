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
exports.AttributeTermService = void 0;
const dto_1 = require("../dto");
const BaseService_1 = require("./BaseService");
class AttributeTermService extends BaseService_1.BaseService {
    constructor(apiClient, attributeIri) {
        super(apiClient, '');
        // Handle both full IRIs and resource paths
        if (attributeIri.startsWith('http') || attributeIri.startsWith('/api')) {
            this.resourcePath = `${attributeIri}/terms`;
        }
        else {
            this.resourcePath = `${attributeIri}/terms`;
        }
    }
    getAll(queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = (queryParams === null || queryParams === void 0 ? void 0 : queryParams.toJSON()) || {};
            const response = yield this.apiClient.get(this.resourcePath, params);
            return dto_1.AttributeTermCollectionResponse.fromJSON(response);
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.apiClient.get(`${this.resourcePath}/${id}`);
            return dto_1.AttributeTermResponse.fromJSON(response);
        });
    }
    getByIri(iri) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.apiClient.get(iri);
            return dto_1.AttributeTermResponse.fromJSON(response);
        });
    }
    create(termRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.apiClient.post(this.resourcePath, termRequest.toJSON());
            return dto_1.AttributeTermResponse.fromJSON(response);
        });
    }
    update(id, termRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.apiClient.put(`${this.resourcePath}/${id}`, termRequest.toJSON());
            return dto_1.AttributeTermResponse.fromJSON(response);
        });
    }
    updateByIri(iri, termRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.apiClient.put(iri, termRequest.toJSON());
            return dto_1.AttributeTermResponse.fromJSON(response);
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
}
exports.AttributeTermService = AttributeTermService;
