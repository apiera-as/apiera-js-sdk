"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationCollectionResponse = void 0;
// IntegrationCollectionResponse.ts
const base_1 = require("../base");
const enum_1 = require("../../enum");
const base_2 = require("../base");
const IntegrationResponse_1 = require("./IntegrationResponse");
/**
 * DTO for integration collection responses
 */
class IntegrationCollectionResponse extends base_1.AbstractCollectionResponse {
    /**
     * Create a new IntegrationCollectionResponse
     *
     * @param ldContext JSON-LD context
     * @param ldId Collection IRI
     * @param ldType Collection type
     * @param ldMembers Integrations in the collection
     * @param ldTotalItems Total number of integrations
     * @param ldView Pagination information
     */
    constructor(ldContext, ldId, ldType, ldMembers = [], ldTotalItems = 0, ldView = null) {
        super(ldContext, ldId, ldType, ldMembers, ldTotalItems, ldView);
    }
    /**
     * Get the integrations in the collection
     */
    getLdMembers() {
        return super.getLdMembers();
    }
    /**
     * Create from API JSON data
     */
    static fromJSON(data) {
        const members = (data.member || []).map((item) => IntegrationResponse_1.IntegrationResponse.fromJSON(item));
        const view = data.view
            ? base_2.PartialCollectionView.fromJSON(data.view)
            : null;
        return new IntegrationCollectionResponse(data['@context'] || '', data['@id'] || '', data['@type'] || enum_1.LdType.Collection, members, data.totalItems || 0, view);
    }
}
exports.IntegrationCollectionResponse = IntegrationCollectionResponse;
