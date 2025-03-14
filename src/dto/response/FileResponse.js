"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileResponse = void 0;
// FileResponse.ts
const base_1 = require("../base");
const enum_1 = require("../../enum");
/**
 * DTO for file responses
 */
class FileResponse extends base_1.AbstractResponse {
    /**
     * Create a new FileResponse
     *
     * @param ldId File IRI
     * @param ldType File type
     * @param uuid File UUID
     * @param createdAt Creation timestamp
     * @param updatedAt Last update timestamp
     * @param name File name
     * @param extension File extension
     * @param mimeType File MIME type
     * @param url File URL
     */
    constructor(ldId, ldType, uuid, createdAt, updatedAt, name, extension = null, mimeType = null, url = null) {
        super(ldId, ldType, uuid, createdAt, updatedAt);
        this.name = name;
        this.extension = extension;
        this.mimeType = mimeType;
        this.url = url;
    }
    /**
     * Get the file name
     */
    getName() {
        return this.name;
    }
    /**
     * Get the file extension
     */
    getExtension() {
        return this.extension;
    }
    /**
     * Get the file MIME type
     */
    getMimeType() {
        return this.mimeType;
    }
    /**
     * Get the file URL
     */
    getUrl() {
        return this.url;
    }
    /**
     * Convert to a plain object
     */
    toJSON() {
        return Object.assign(Object.assign({}, super.toJSON()), { name: this.name, extension: this.extension, mimeType: this.mimeType, url: this.url });
    }
    /**
     * Create from API JSON data
     */
    static fromJSON(data) {
        return new FileResponse(data['@id'] || '', data['@type'] || enum_1.LdType.File, data.uuid || '', new Date(data.createdAt), new Date(data.updatedAt), data.name || '', data.extension || null, data.mimeType || null, data.url || null);
    }
}
exports.FileResponse = FileResponse;
