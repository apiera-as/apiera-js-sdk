"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractResponse = void 0;
const AbstractDTO_1 = require("./AbstractDTO");
/**
 * Abstract base class for single resource responses
 */
class AbstractResponse extends AbstractDTO_1.AbstractDTO {
    /**
     * Create a new AbstractResponse
     *
     * @param ldId IRI of the resource
     * @param ldType Type of the resource
     * @param uuid UUID of the resource
     * @param createdAt Creation timestamp
     * @param updatedAt Last update timestamp
     */
    constructor(ldId, ldType, uuid, createdAt, updatedAt) {
        super();
        this.ldId = ldId;
        this.ldType = ldType;
        this.uuid = uuid;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    /**
     * Get the IRI of the resource
     */
    getLdId() {
        return this.ldId;
    }
    /**
     * Get the type of the resource
     */
    getLdType() {
        return this.ldType;
    }
    /**
     * Get the UUID of the resource
     */
    getUuid() {
        return this.uuid;
    }
    /**
     * Get the creation timestamp of the resource
     */
    getCreatedAt() {
        return this.createdAt;
    }
    /**
     * Get the last update timestamp of the resource
     */
    getUpdatedAt() {
        return this.updatedAt;
    }
    /**
     * Convert to a plain object
     */
    toJSON() {
        return {
            '@id': this.ldId,
            '@type': this.ldType,
            uuid: this.uuid,
            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString()
        };
    }
}
exports.AbstractResponse = AbstractResponse;
