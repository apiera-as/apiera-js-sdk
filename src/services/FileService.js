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
exports.FileService = void 0;
const dto_1 = require("../dto");
const BaseService_1 = require("./BaseService");
/**
 * Service for interacting with file endpoints
 */
class FileService extends BaseService_1.BaseService {
    /**
     * Create a new file service
     *
     * @param apiClient API client
     */
    constructor(apiClient) {
        super(apiClient, '/api/v1/files');
    }
    /**
     * Get all files
     *
     * @param queryParams Optional query parameters for filtering, pagination, etc.
     * @returns Collection of files
     */
    getAll(queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = (queryParams === null || queryParams === void 0 ? void 0 : queryParams.toJSON()) || {};
            const response = yield this.apiClient.get(this.basePath, params);
            return dto_1.FileCollectionResponse.fromJSON(response);
        });
    }
    /**
     * Get a file by ID
     *
     * @param id File ID
     * @returns File data
     */
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.apiClient.get(`${this.basePath}/${id}`);
            return dto_1.FileResponse.fromJSON(response);
        });
    }
    /**
     * Get a file by IRI
     *
     * @param iri File IRI
     * @returns File data
     */
    getByIri(iri) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.apiClient.get(iri);
            return dto_1.FileResponse.fromJSON(response);
        });
    }
    /**
     * Create a new file
     *
     * @param fileRequest File data
     * @returns The created file
     */
    create(fileRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.apiClient.post(this.basePath, fileRequest.toJSON());
            return dto_1.FileResponse.fromJSON(response);
        });
    }
    /**
     * Delete a file
     *
     * @param id File ID
     */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.apiClient.delete(`${this.basePath}/${id}`);
        });
    }
    /**
     * Delete a file by IRI
     *
     * @param iri File IRI
     */
    deleteByIri(iri) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.apiClient.delete(iri);
        });
    }
}
exports.FileService = FileService;
