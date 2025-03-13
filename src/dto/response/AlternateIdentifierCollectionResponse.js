"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlternateIdentifierCollectionResponse = void 0;
const base_1 = require("../base");
const enum_1 = require("../../enum");
const base_2 = require("../base");
const AlternateIdentifierResponse_1 = require("./AlternateIdentifierResponse");
/**
 * DTO for alternate identifier collection responses
 */
class AlternateIdentifierCollectionResponse extends base_1.AbstractCollectionResponse {
    /**
     * Create a new AlternateIdentifierCollectionResponse
     *
     * @param ldContext JSON-LD context
     * @param ldId Collection IRI
     * @param ldType Collection type
     * @param ldMembers Alternate identifiers in the collection
     * @param ldTotalItems Total number of alternate identifiers
     * @param ldView Pagination information
     */
    constructor(ldContext, ldId, ldType, ldMembers = [], ldTotalItems = 0, ldView = null) {
        super(ldContext, ldId, ldType, ldMembers, ldTotalItems, ldView);
    }
    /**
     * Get the alternate identifiers in the collection
     */
    getLdMembers() {
        return super.getLdMembers();
    }
    /**
     * Create from API JSON data
     */
    static fromJSON(data) {
        const members = (data.member || []).map((item) => AlternateIdentifierResponse_1.AlternateIdentifierResponse.fromJSON(item));
        const view = data.view
            ? base_2.PartialCollectionView.fromJSON(data.view)
            : null;
        return new AlternateIdentifierCollectionResponse(data['@context'] || '', data['@id'] || '', data['@type'] || enum_1.LdType.Collection, members, data.totalItems || 0, view);
    }
}
exports.AlternateIdentifierCollectionResponse = AlternateIdentifierCollectionResponse;
