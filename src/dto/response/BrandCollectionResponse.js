"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandCollectionResponse = void 0;
// dto/response/BrandCollectionResponse.ts
const base_1 = require("../base");
const enum_1 = require("../../enum");
const base_2 = require("../base");
const BrandResponse_1 = require("./BrandResponse");
/**
 * DTO for brand collection responses
 */
class BrandCollectionResponse extends base_1.AbstractCollectionResponse {
    /**
     * Create a new BrandCollectionResponse
     *
     * @param ldContext JSON-LD context
     * @param ldId Collection IRI
     * @param ldType Collection type
     * @param ldMembers Brands in the collection
     * @param ldTotalItems Total number of brands
     * @param ldView Pagination information
     */
    constructor(ldContext, ldId, ldType, ldMembers = [], ldTotalItems = 0, ldView = null) {
        super(ldContext, ldId, ldType, ldMembers, ldTotalItems, ldView);
    }
    /**
     * Get the brands in the collection
     */
    getLdMembers() {
        return super.getLdMembers();
    }
    /**
     * Create from API JSON data
     */
    static fromJSON(data) {
        const members = (data.member || []).map((item) => BrandResponse_1.BrandResponse.fromJSON(item));
        const view = data.view
            ? base_2.PartialCollectionView.fromJSON(data.view)
            : null;
        return new BrandCollectionResponse(data['@context'] || '', data['@id'] || '', data['@type'] || enum_1.LdType.Collection, members, data.totalItems || 0, view);
    }
}
exports.BrandCollectionResponse = BrandCollectionResponse;
