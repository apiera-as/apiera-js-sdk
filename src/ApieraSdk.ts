// ApieraSdk.ts
import { ApiClient, TokenProvider, TokenStore } from './core';
import {
    StoreService,
    ProductService,
    AlternateIdentifierService,
    SkuService,
    FileService,
    IntegrationService
} from './services';

/**
 * Configuration options for the Apiera SDK
 */
export interface ApieraSdkConfig {
    /**
     * Base URL for the API
     */
    baseUrl: string;

    /**
     * Initial JWT token (optional)
     */
    token?: string;

    /**
     * Request timeout in milliseconds
     */
    timeout?: number;

    /**
     * Additional headers to include with every request
     */
    headers?: Record<string, string>;

    /**
     * Custom token provider (optional)
     */
    tokenProvider?: TokenProvider;
}

/**
 * Main SDK class for interacting with the Apiera API
 */
export class ApieraSdk {
    private apiClient: ApiClient;
    private tokenStore: TokenStore;

    /**
     * Services
     */
    readonly store: StoreService;
    readonly alternateIdentifier: AlternateIdentifierService;
    readonly sku: SkuService;
    readonly file: FileService;
    readonly integration: IntegrationService;

    /**
     * Create a new Apiera SDK instance
     *
     * @param config SDK configuration
     */
    constructor(config: ApieraSdkConfig) {
        // Initialize token store
        this.tokenStore = new TokenStore();

        // Set token or provider if provided
        if (config.token) {
            this.tokenStore.setToken(config.token);
        }

        if (config.tokenProvider) {
            this.tokenStore.setTokenProvider(config.tokenProvider);
        }

        // Initialize API client
        this.apiClient = new ApiClient(
            {
                baseUrl: config.baseUrl,
                timeout: config.timeout,
                headers: config.headers
            },
            this.tokenStore
        );

        // Initialize services
        this.store = new StoreService(this.apiClient);
        this.alternateIdentifier = new AlternateIdentifierService(this.apiClient);
        this.sku = new SkuService(this.apiClient);
        this.file = new FileService(this.apiClient);
        this.integration = new IntegrationService(this.apiClient);
    }

    /**
     * Get a product service for a specific store
     *
     * @param storeIri Store IRI (e.g., "/api/v1/stores/123" or "https://api.apiera.com/api/v1/stores/123")
     * @returns Product service for the specified store
     */
    getProductService(storeIri: string): ProductService {
        return new ProductService(this.apiClient, storeIri);
    }

    /**
     * Set an authentication token
     *
     * @param token JWT token
     */
    setToken(token: string): void {
        this.tokenStore.setToken(token);
    }

    /**
     * Clear the authentication token
     */
    clearToken(): void {
        this.tokenStore.clearToken();
    }

    /**
     * Set a custom token provider
     *
     * @param provider Token provider
     */
    setTokenProvider(provider: TokenProvider): void {
        this.tokenStore.setTokenProvider(provider);
    }

    /**
     * Get the current token, fetching from the provider if necessary
     *
     * @returns The current token, or null if no token is available
     */
    async getToken(): Promise<string | null> {
        return this.tokenStore.getToken();
    }
}