"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlternateIdentifierResponse = void 0;
const base_1 = require("../base");
const enum_1 = require("../../enum");
/**
 * DTO for alternate identifier responses
 */
class AlternateIdentifierResponse extends base_1.AbstractResponse {
    /**
     * Create a new AlternateIdentifierResponse
     *
     * @param ldId Alternate identifier IRI
     * @param ldType Alternate identifier type
     * @param uuid Alternate identifier UUID
     * @param createdAt Creation timestamp
     * @param updatedAt Last update timestamp
     * @param code Alternate identifier code
     * @param type Alternate identifier type (e.g., EAN, UPC)
     */
    constructor(ldId, ldType, uuid, createdAt, updatedAt, code, type) {
        super(ldId, ldType, uuid, createdAt, updatedAt);
        this.code = code;
        this.type = type;
    }
    /**
     * Get the alternate identifier code
     */
    getCode() {
        return this.code;
    }
    /**
     * Get the alternate identifier type
     */
    getType() {
        return this.type;
    }
    /**
     * Convert to a plain object
     */
    toJSON() {
        return Object.assign(Object.assign({}, super.toJSON()), { code: this.code, type: this.type });
    }
    /**
     * Create from API JSON data
     */
    static fromJSON(data) {
        return new AlternateIdentifierResponse(data['@id'] || '', data['@type'] || enum_1.LdType.AlternateIdentifier, data.uuid || '', new Date(data.createdAt), new Date(data.updatedAt), data.code || '', data.type || enum_1.AlternateIdentifierType.CUSTOM);
    }
}
exports.AlternateIdentifierResponse = AlternateIdentifierResponse;
