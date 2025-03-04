import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { TokenStore } from './TokenStore';

/**
 * Configuration options for the API client
 */
export interface ApiClientConfig {
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
}

/**
 * API error response
 */
export class ApiError extends Error {
    constructor(
        message: string,
        public readonly status?: number,
        public readonly data?: any
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

/**
 * Client for making API requests
 */
export class ApiClient {
    private client: AxiosInstance;
    private config: ApiClientConfig;
    private tokenStore: TokenStore;

    /**
     * Create a new API client
     */
    constructor(config: ApiClientConfig, tokenStore: TokenStore) {
        this.config = {
            timeout: 30000,
            headers: {},
            ...config
        };

        this.tokenStore = tokenStore;

        // Initialize token if provided
        if (config.token) {
            this.tokenStore.setToken(config.token);
        }

        // Initialize Axios client
        this.client = axios.create({
            baseURL: this.config.baseUrl,
            timeout: this.config.timeout,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/ld+json',
                ...this.config.headers
            }
        });

        // Add request interceptor to inject the auth token
        this.client.interceptors.request.use(async (config) => {
            const token = await this.tokenStore.getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        // Add response interceptor for error handling
        this.client.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response) {
                    const status = error.response.status;
                    const data = error.response.data;
                    let message = `API Error (${status})`;

                    if (data && data.message) {
                        message += `: ${data.message}`;
                    } else if (data && typeof data === 'object') {
                        message += `: ${JSON.stringify(data)}`;
                    }

                    throw new ApiError(message, status, data);
                } else if (error.request) {
                    throw new ApiError('No response received from the server');
                } else {
                    throw new ApiError(`Request failed: ${error.message}`);
                }
            }
        );
    }

    /**
     * Make a GET request to the API
     */
    async get<T = any>(path: string, params?: Record<string, any>): Promise<T> {
        const response = await this.client.get<T>(path, { params });
        return response.data;
    }

    /**
     * Make a POST request to the API
     */
    async post<T = any>(path: string, data?: any): Promise<T> {
        const response = await this.client.post<T>(path, data);
        return response.data;
    }

    /**
     * Make a PUT request to the API
     */
    async put<T = any>(path: string, data?: any): Promise<T> {
        const response = await this.client.put<T>(path, data);
        return response.data;
    }

    /**
     * Make a PATCH request to the API
     */
    async patch<T = any>(path: string, data?: any): Promise<T> {
        const response = await this.client.patch<T>(path, data);
        return response.data;
    }

    /**
     * Make a DELETE request to the API
     */
    async delete<T = any>(path: string): Promise<T> {
        const response = await this.client.delete<T>(path);
        return response.data;
    }
}