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
exports.ApieraSdk = void 0;
const core_1 = require("./core");
const services_1 = require("./services");
/**
 * Main SDK class for interacting with the Apiera API
 */
class ApieraSdk {
    /**
     * Create a new Apiera SDK instance
     *
     * @param config SDK configuration
     */
    constructor(config) {
        // Initialize token store
        this.tokenStore = new core_1.TokenStore();
        // Set token or provider if provided
        if (config.token) {
            this.tokenStore.setToken(config.token);
        }
        if (config.tokenProvider) {
            this.tokenStore.setTokenProvider(config.tokenProvider);
        }
        // Initialize API client
        this.apiClient = new core_1.ApiClient({
            baseUrl: config.baseUrl,
            timeout: config.timeout,
            headers: config.headers
        }, this.tokenStore);
        // Initialize services
        this.store = new services_1.StoreService(this.apiClient);
    }
    /**
     * Set an authentication token
     *
     * @param token JWT token
     */
    setToken(token) {
        this.tokenStore.setToken(token);
    }
    /**
     * Clear the authentication token
     */
    clearToken() {
        this.tokenStore.clearToken();
    }
    /**
     * Set a custom token provider
     *
     * @param provider Token provider
     */
    setTokenProvider(provider) {
        this.tokenStore.setTokenProvider(provider);
    }
    /**
     * Get the current token, fetching from the provider if necessary
     *
     * @returns The current token, or null if no token is available
     */
    getToken() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tokenStore.getToken();
        });
    }
}
exports.ApieraSdk = ApieraSdk;
