"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartialCollectionView = void 0;
const AbstractDTO_1 = require("./AbstractDTO");
/**
 * Represents pagination information for a collection
 */
class PartialCollectionView extends AbstractDTO_1.AbstractDTO {
    /**
     * Create a new PartialCollectionView instance
     *
     * @param ldId IRI of the current page
     * @param ldFirst IRI of the first page
     * @param ldLast IRI of the last page
     * @param ldNext IRI of the next page
     * @param ldPrevious IRI of the previous page
     */
    constructor(ldId, ldFirst = null, ldLast = null, ldNext = null, ldPrevious = null) {
        super();
        this.ldId = ldId;
        this.ldFirst = ldFirst;
        this.ldLast = ldLast;
        this.ldNext = ldNext;
        this.ldPrevious = ldPrevious;
    }
    /**
     * Get the IRI of the current page
     */
    getLdId() {
        return this.ldId;
    }
    /**
     * Get the IRI of the first page
     */
    getLdFirst() {
        return this.ldFirst;
    }
    /**
     * Get the IRI of the last page
     */
    getLdLast() {
        return this.ldLast;
    }
    /**
     * Get the IRI of the next page
     */
    getLdNext() {
        return this.ldNext;
    }
    /**
     * Get the IRI of the previous page
     */
    getLdPrevious() {
        return this.ldPrevious;
    }
    /**
     * Convert to a plain object
     */
    toJSON() {
        const result = {
            '@id': this.ldId
        };
        if (this.ldFirst !== null) {
            result.first = this.ldFirst;
        }
        if (this.ldLast !== null) {
            result.last = this.ldLast;
        }
        if (this.ldNext !== null) {
            result.next = this.ldNext;
        }
        if (this.ldPrevious !== null) {
            result.previous = this.ldPrevious;
        }
        return result;
    }
    /**
     * Create from API JSON data
     */
    static fromJSON(data) {
        return new PartialCollectionView(data['@id'] || '', data.first || null, data.last || null, data.next || null, data.previous || null);
    }
}
exports.PartialCollectionView = PartialCollectionView;
