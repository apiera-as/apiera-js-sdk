"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandResponse = void 0;
// dto/response/BrandResponse.ts
const base_1 = require("../base");
const enum_1 = require("../../enum");
/**
 * DTO for brand responses
 */
class BrandResponse extends base_1.AbstractResponse {
    /**
     * Create a new BrandResponse
     *
     * @param ldId Brand IRI
     * @param ldType Brand type
     * @param uuid Brand UUID
     * @param createdAt Creation timestamp
     * @param updatedAt Last update timestamp
     * @param name Brand name
     * @param description Brand description
     * @param store Store IRI
     * @param image Brand image URL
     */
    constructor(ldId, ldType, uuid, createdAt, updatedAt, name, description = null, store = null, image = null) {
        super(ldId, ldType, uuid, createdAt, updatedAt);
        this.name = name;
        this.description = description;
        this.store = store;
        this.image = image;
    }
    /**
     * Get the brand name
     */
    getName() {
        return this.name;
    }
    /**
     * Get the brand description
     */
    getDescription() {
        return this.description;
    }
    /**
     * Get the store IRI
     */
    getStore() {
        return this.store;
    }
    /**
     * Get the brand image URL
     */
    getImage() {
        return this.image;
    }
    /**
     * Convert to a plain object
     */
    toJSON() {
        return Object.assign(Object.assign({}, super.toJSON()), { name: this.name, description: this.description, store: this.store, image: this.image });
    }
    /**
     * Create from API JSON data
     */
    static fromJSON(data) {
        return new BrandResponse(data['@id'] || '', data['@type'] || enum_1.LdType.Brand, data.uuid || '', new Date(data.createdAt), new Date(data.updatedAt), data.name || '', data.description || null, data.store || null, data.image || null);
    }
}
exports.BrandResponse = BrandResponse;
