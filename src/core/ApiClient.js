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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiClient = exports.ApiError = void 0;
const axios_1 = __importDefault(require("axios"));
/**
 * API error response
 */
class ApiError extends Error {
    constructor(message, status, data) {
        super(message);
        this.status = status;
        this.data = data;
        this.name = 'ApiError';
    }
}
exports.ApiError = ApiError;
/**
 * Client for making API requests
 */
class ApiClient {
    /**
     * Create a new API client
     */
    constructor(config, tokenStore) {
        this.config = Object.assign({ timeout: 30000, headers: {} }, config);
        this.tokenStore = tokenStore;
        // Initialize token if provided
        if (config.token) {
            this.tokenStore.setToken(config.token);
        }
        // Initialize Axios client
        this.client = axios_1.default.create({
            baseURL: this.config.baseUrl,
            timeout: this.config.timeout,
            headers: Object.assign({ 'Content-Type': 'application/json', 'Accept': 'application/ld+json' }, this.config.headers)
        });
        // Add request interceptor to inject the auth token
        this.client.interceptors.request.use((config) => __awaiter(this, void 0, void 0, function* () {
            const token = yield this.tokenStore.getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        }));
        // Add response interceptor for error handling
        this.client.interceptors.response.use((response) => response, (error) => {
            if (error.response) {
                const status = error.response.status;
                const data = error.response.data;
                let message = `API Error (${status})`;
                if (data && data.message) {
                    message += `: ${data.message}`;
                }
                else if (data && typeof data === 'object') {
                    message += `: ${JSON.stringify(data)}`;
                }
                throw new ApiError(message, status, data);
            }
            else if (error.request) {
                throw new ApiError('No response received from the server');
            }
            else {
                throw new ApiError(`Request failed: ${error.message}`);
            }
        });
    }
    /**
     * Make a GET request to the API
     */
    get(path, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.client.get(path, { params });
            return response.data;
        });
    }
    /**
     * Make a POST request to the API
     */
    post(path, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.client.post(path, data);
            return response.data;
        });
    }
    /**
     * Make a PUT request to the API
     */
    put(path, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.client.put(path, data);
            return response.data;
        });
    }
    /**
     * Make a PATCH request to the API
     */
    patch(path, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.client.patch(path, data);
            return response.data;
        });
    }
    /**
     * Make a DELETE request to the API
     */
    delete(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.client.delete(path);
            return response.data;
        });
    }
}
exports.ApiClient = ApiClient;
