"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreCollectionResponse = void 0;
const base_1 = require("../base");
const enum_1 = require("../../enum");
const base_2 = require("../base");
const StoreResponse_1 = require("./StoreResponse");
/**
 * DTO for store collection responses
 */
class StoreCollectionResponse extends base_1.AbstractCollectionResponse {
    /**
     * Create a new StoreCollectionResponse
     *
     * @param ldContext JSON-LD context
     * @param ldId Collection IRI
     * @param ldType Collection type
     * @param ldMembers Stores in the collection
     * @param ldTotalItems Total number of stores
     * @param ldView Pagination information
     */
    constructor(ldContext, ldId, ldType, ldMembers = [], ldTotalItems = 0, ldView = null) {
        super(ldContext, ldId, ldType, ldMembers, ldTotalItems, ldView);
    }
    /**
     * Get the stores in the collection
     */
    getLdMembers() {
        return super.getLdMembers();
    }
    /**
     * Create from API JSON data
     */
    static fromJSON(data) {
        const members = (data.member || []).map((item) => StoreResponse_1.StoreResponse.fromJSON(item));
        const view = data.view
            ? base_2.PartialCollectionView.fromJSON(data.view)
            : null;
        return new StoreCollectionResponse(data['@context'] || '', data['@id'] || '', data['@type'] || enum_1.LdType.Collection, members, data.totalItems || 0, view);
    }
}
exports.StoreCollectionResponse = StoreCollectionResponse;
