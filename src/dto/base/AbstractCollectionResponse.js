"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractCollectionResponse = void 0;
const AbstractDTO_1 = require("./AbstractDTO");
/**
 * Abstract base class for collection responses
 */
class AbstractCollectionResponse extends AbstractDTO_1.AbstractDTO {
    /**
     * Create a new AbstractCollectionResponse
     *
     * @param ldContext JSON-LD context of the collection
     * @param ldId IRI of the collection
     * @param ldType Type of the collection
     * @param ldMembers Items in the collection
     * @param ldTotalItems Total number of items across all pages
     * @param ldView Pagination information
     */
    constructor(ldContext, ldId, ldType, ldMembers = [], ldTotalItems = 0, ldView = null) {
        super();
        this.ldContext = ldContext;
        this.ldId = ldId;
        this.ldType = ldType;
        this.ldMembers = ldMembers;
        this.ldTotalItems = ldTotalItems;
        this.ldView = ldView;
    }
    /**
     * Get the JSON-LD context of the collection
     */
    getLdContext() {
        return this.ldContext;
    }
    /**
     * Get the IRI of the collection
     */
    getLdId() {
        return this.ldId;
    }
    /**
     * Get the type of the collection
     */
    getLdType() {
        return this.ldType;
    }
    /**
     * Get the items in the collection
     */
    getLdMembers() {
        return this.ldMembers;
    }
    /**
     * Get the total number of items across all pages
     */
    getLdTotalItems() {
        return this.ldTotalItems;
    }
    /**
     * Get the pagination information
     */
    getLdView() {
        return this.ldView;
    }
    /**
     * Convert to a plain object
     */
    toJSON() {
        return {
            '@context': this.ldContext,
            '@id': this.ldId,
            '@type': this.ldType,
            'member': this.ldMembers.map(member => member.toJSON()),
            'totalItems': this.ldTotalItems,
            'view': this.ldView ? this.ldView.toJSON() : null
        };
    }
}
exports.AbstractCollectionResponse = AbstractCollectionResponse;
