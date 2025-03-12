"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryParametersBuilder = exports.QueryParameters = void 0;
const AbstractDTO_1 = require("./AbstractDTO");
/**
 * Query parameters for API requests
 */
class QueryParameters extends AbstractDTO_1.AbstractDTO {
    /**
     * Create a new QueryParameters instance
     *
     * @param params General parameters (sorting, ordering, etc.)
     * @param filters Filter parameters
     * @param page Page number
     */
    constructor(params = {}, filters = {}, page = null) {
        super();
        this.params = params;
        this.filters = filters;
        this.page = page;
    }
    /**
     * Get the general parameters
     */
    getParams() {
        return this.params;
    }
    /**
     * Get the filter parameters
     */
    getFilters() {
        return this.filters;
    }
    /**
     * Get the page number
     */
    getPage() {
        return this.page;
    }
    /**
     * Convert to a plain object for API requests
     */
    toJSON() {
        const result = {};
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
    static builder() {
        return new QueryParametersBuilder();
    }
}
exports.QueryParameters = QueryParameters;
/**
 * Builder for QueryParameters
 */
class QueryParametersBuilder {
    constructor() {
        this._params = {};
        this._filters = {};
        this._page = null;
    }
    /**
     * Add a general parameter
     */
    param(key, value) {
        this._params[key] = value;
        return this;
    }
    /**
     * Add multiple general parameters
     */
    params(params) {
        this._params = Object.assign(Object.assign({}, this._params), params);
        return this;
    }
    /**
     * Add a filter parameter
     */
    filter(key, value) {
        this._filters[key] = value;
        return this;
    }
    /**
     * Add multiple filter parameters
     */
    filters(filters) {
        this._filters = Object.assign(Object.assign({}, this._filters), filters);
        return this;
    }
    /**
     * Set the page number
     */
    page(page) {
        this._page = page;
        return this;
    }
    /**
     * Build the QueryParameters instance
     */
    build() {
        return new QueryParameters(this._params, this._filters, this._page);
    }
}
exports.QueryParametersBuilder = QueryParametersBuilder;
