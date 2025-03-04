import { AbstractDTO } from './AbstractDTO';

/**
 * Query parameters for API requests
 */
export class QueryParameters extends AbstractDTO {
    /**
     * Create a new QueryParameters instance
     *
     * @param params General parameters (sorting, ordering, etc.)
     * @param filters Filter parameters
     * @param page Page number
     */
    constructor(
        private readonly params: Record<string, any> = {},
        private readonly filters: Record<string, string> = {},
        private readonly page: number | null = null
    ) {
        super();
    }

    /**
     * Get the general parameters
     */
    getParams(): Record<string, any> {
        return this.params;
    }

    /**
     * Get the filter parameters
     */
    getFilters(): Record<string, string> {
        return this.filters;
    }

    /**
     * Get the page number
     */
    getPage(): number | null {
        return this.page;
    }

    /**
     * Convert to a plain object for API requests
     */
    toJSON(): Record<string, any> {
        const result: Record<string, any> = {};

        if (Object.keys(this.params).length > 0) {
            result.params = this.params;
        }

        if (Object.keys(this.filters).length > 0) {
            result.filters = this.filters;
        }

        if (this.page !== null) {
            result.page = this.page;
        }

        return result;
    }

    /**
     * Create a builder for QueryParameters
     */
    static builder(): QueryParametersBuilder {
        return new QueryParametersBuilder();
    }
}

/**
 * Builder for QueryParameters
 */
export class QueryParametersBuilder {
    private _params: Record<string, any> = {};
    private _filters: Record<string, string> = {};
    private _page: number | null = null;

    /**
     * Add a general parameter
     */
    param(key: string, value: any): QueryParametersBuilder {
        this._params[key] = value;
        return this;
    }

    /**
     * Add multiple general parameters
     */
    params(params: Record<string, any>): QueryParametersBuilder {
        this._params = { ...this._params, ...params };
        return this;
    }

    /**
     * Add a filter parameter
     */
    filter(key: string, value: string): QueryParametersBuilder {
        this._filters[key] = value;
        return this;
    }

    /**
     * Add multiple filter parameters
     */
    filters(filters: Record<string, string>): QueryParametersBuilder {
        this._filters = { ...this._filters, ...filters };
        return this;
    }

    /**
     * Set the page number
     */
    page(page: number): QueryParametersBuilder {
        this._page = page;
        return this;
    }

    /**
     * Build the QueryParameters instance
     */
    build(): QueryParameters {
        return new QueryParameters(this._params, this._filters, this._page);
    }
}