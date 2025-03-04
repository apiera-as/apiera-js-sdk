/**
 * Interface for custom token providers
 */
export interface TokenProvider {
    /**
     * Get an authentication token
     */
    getToken(): Promise<string>;
}

/**
 * Manages authentication tokens for the API client
 */
export class TokenStore {
    private token: string | null = null;
    private tokenProvider: TokenProvider | null = null;

    /**
     * Set a token directly
     */
    setToken(token: string): void {
        this.token = token;
    }

    /**
     * Get the current token
     */
    getCurrentToken(): string | null {
        return this.token;
    }

    /**
     * Clear the current token
     */
    clearToken(): void {
        this.token = null;
    }

    /**
     * Set a token provider for automatic token retrieval
     */
    setTokenProvider(provider: TokenProvider): void {
        this.tokenProvider = provider;
    }

    /**
     * Get a token, either from the stored token or from the provider
     */
    async getToken(): Promise<string | null> {
        // If we already have a token, return it
        if (this.token) {
            return this.token;
        }

        // If we have a provider, use it to get a token
        if (this.tokenProvider) {
            try {
                this.token = await this.tokenProvider.getToken();
                return this.token;
            } catch (error) {
                throw new Error(`Failed to get token from provider: ${error instanceof Error ? error.message : String(error)}`);
            }
        }

        return null;
    }
}