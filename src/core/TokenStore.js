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
exports.TokenStore = void 0;
/**
 * Manages authentication tokens for the API client
 */
class TokenStore {
    constructor() {
        this.token = null;
        this.tokenProvider = null;
    }
    /**
     * Set a token directly
     */
    setToken(token) {
        this.token = token;
    }
    /**
     * Get the current token
     */
    getCurrentToken() {
        return this.token;
    }
    /**
     * Clear the current token
     */
    clearToken() {
        this.token = null;
    }
    /**
     * Set a token provider for automatic token retrieval
     */
    setTokenProvider(provider) {
        this.tokenProvider = provider;
    }
    /**
     * Get a token, either from the stored token or from the provider
     */
    getToken() {
        return __awaiter(this, void 0, void 0, function* () {
            // If we already have a token, return it
            if (this.token) {
                return this.token;
            }
            // If we have a provider, use it to get a token
            if (this.tokenProvider) {
                try {
                    this.token = yield this.tokenProvider.getToken();
                    return this.token;
                }
                catch (error) {
                    throw new Error(`Failed to get token from provider: ${error instanceof Error ? error.message : String(error)}`);
                }
            }
            return null;
        });
    }
}
exports.TokenStore = TokenStore;
