"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreResponse = void 0;
const base_1 = require("../base");
const enum_1 = require("../../enum");
/**
 * DTO for store responses
 */
class StoreResponse extends base_1.AbstractResponse {
    /**
     * Create a new StoreResponse
     *
     * @param ldId Store IRI
     * @param ldType Store type
     * @param uuid Store UUID
     * @param createdAt Creation timestamp
     * @param updatedAt Last update timestamp
     * @param name Store name
     * @param description Store description
     * @param image Store image URL
     */
    constructor(ldId, ldType, uuid, createdAt, updatedAt, name, description = null, image = null) {
        super(ldId, ldType, uuid, createdAt, updatedAt);
        this.name = name;
        this.description = description;
        this.image = image;
    }
    /**
     * Get the store name
     */
    getName() {
        return this.name;
    }
    /**
     * Get the store description
     */
    getDescription() {
        return this.description;
    }
    /**
     * Get the store image URL
     */
    getImage() {
        return this.image;
    }
    /**
     * Convert to a plain object
     */
    toJSON() {
        return Object.assign(Object.assign({}, super.toJSON()), { name: this.name, description: this.description, image: this.image });
    }
    /**
     * Create from API JSON data
     */
    static fromJSON(data) {
        return new StoreResponse(data['@id'] || '', data['@type'] || enum_1.LdType.Store, data.uuid || '', new Date(data.createdAt), new Date(data.updatedAt), data.name || '', data.description || null, data.image || null);
    }
}
exports.StoreResponse = StoreResponse;
