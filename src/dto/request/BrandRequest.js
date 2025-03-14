"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandRequestBuilder = exports.BrandRequest = void 0;
// dto/request/BrandRequest.ts
const base_1 = require("../base");
/**
 * DTO for brand creation and update requests
 */
class BrandRequest extends base_1.AbstractDTO {
    /**
     * Create a new BrandRequest
     *
     * @param name Brand name
     * @param description Brand description
     * @param image Brand image URL
     * @param iri Brand IRI (used for updates, not sent in requests)
     */
    constructor(name = null, description = null, image = null, iri = null) {
        super();
        this.name = name;
        this.description = description;
        this.image = image;
        this.iri = iri;
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
     * Get the brand image URL
     */
    getImage() {
        return this.image;
    }
    /**
     * Get the brand IRI
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
     * Create a builder for BrandRequest
     */
    static builder() {
        return new BrandRequestBuilder();
    }
}
exports.BrandRequest = BrandRequest;
/**
 * Builder for BrandRequest
 */
class BrandRequestBuilder {
    constructor() {
        this._name = null;
        this._description = null;
        this._image = null;
        this._iri = null;
    }
    /**
     * Set the brand name
     */
    name(name) {
        this._name = name;
        return this;
    }
    /**
     * Set the brand description
     */
    description(description) {
        this._description = description;
        return this;
    }
    /**
     * Set the brand image URL
     */
    image(image) {
        this._image = image;
        return this;
    }
    /**
     * Set the brand IRI
     */
    iri(iri) {
        this._iri = iri;
        return this;
    }
    /**
     * Build the BrandRequest
     */
    build() {
        return new BrandRequest(this._name, this._description, this._image, this._iri);
    }
}
exports.BrandRequestBuilder = BrandRequestBuilder;
