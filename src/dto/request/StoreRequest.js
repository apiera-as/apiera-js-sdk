"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreRequestBuilder = exports.StoreRequest = void 0;
const base_1 = require("../base");
/**
 * DTO for store creation and update requests
 */
class StoreRequest extends base_1.AbstractDTO {
    /**
     * Create a new StoreRequest
     *
     * @param name Store name
     * @param description Store description
     * @param image Store image URL
     * @param iri Store IRI (used for updates, not sent in requests)
     */
    constructor(name = null, description = null, image = null, iri = null) {
        super();
        this.name = name;
        this.description = description;
        this.image = image;
        this.iri = iri;
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
     * Get the store IRI
     */
    getIri() {
        return this.iri;
    }
    /**
     * Convert to a plain object for API requests
     */
    toJSON() {
        const data = {};
        if (this.name !== null) {
            data.name = this.name;
        }
        if (this.description !== null) {
            data.description = this.description;
        }
        if (this.image !== null) {
            data.image = this.image;
        }
        return data;
    }
    /**
     * Create a builder for StoreRequest
     */
    static builder() {
        return new StoreRequestBuilder();
    }
}
exports.StoreRequest = StoreRequest;
/**
 * Builder for StoreRequest
 */
class StoreRequestBuilder {
    constructor() {
        this._name = null;
        this._description = null;
        this._image = null;
        this._iri = null;
    }
    /**
     * Set the store name
     */
    name(name) {
        this._name = name;
        return this;
    }
    /**
     * Set the store description
     */
    description(description) {
        this._description = description;
        return this;
    }
    /**
     * Set the store image URL
     */
    image(image) {
        this._image = image;
        return this;
    }
    /**
     * Set the store IRI
     */
    iri(iri) {
        this._iri = iri;
        return this;
    }
    /**
     * Build the StoreRequest
     */
    build() {
        return new StoreRequest(this._name, this._description, this._image, this._iri);
    }
}
exports.StoreRequestBuilder = StoreRequestBuilder;
