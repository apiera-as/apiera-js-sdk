"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileRequestBuilder = exports.FileRequest = void 0;
// FileRequest.ts
const base_1 = require("../base");
/**
 * DTO for file creation and update requests
 */
class FileRequest extends base_1.AbstractDTO {
    /**
     * Create a new FileRequest
     *
     * @param name File name
     * @param url File URL
     * @param iri File IRI (used for updates, not sent in requests)
     */
    constructor(name = null, url = null, iri = null) {
        super();
        this.name = name;
        this.url = url;
        this.iri = iri;
    }
    /**
     * Get the file name
     */
    getName() {
        return this.name;
    }
    /**
     * Get the file URL
     */
    getUrl() {
        return this.url;
    }
    /**
     * Get the file IRI
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
        if (this.url !== null) {
            data.url = this.url;
        }
        return data;
    }
    /**
     * Create a builder for FileRequest
     */
    static builder() {
        return new FileRequestBuilder();
    }
}
exports.FileRequest = FileRequest;
/**
 * Builder for FileRequest
 */
class FileRequestBuilder {
    constructor() {
        this._name = null;
        this._url = null;
        this._iri = null;
    }
    /**
     * Set the file name
     */
    name(name) {
        this._name = name;
        return this;
    }
    /**
     * Set the file URL
     */
    url(url) {
        this._url = url;
        return this;
    }
    /**
     * Set the file IRI
     */
    iri(iri) {
        this._iri = iri;
        return this;
    }
    /**
     * Build the FileRequest
     */
    build() {
        return new FileRequest(this._name, this._url, this._iri);
    }
}
exports.FileRequestBuilder = FileRequestBuilder;
