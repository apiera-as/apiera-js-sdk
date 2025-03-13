"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCollectionResponse = void 0;
// dto/response/ProductCollectionResponse.ts
const base_1 = require("../base");
const enum_1 = require("../../enum");
const base_2 = require("../base");
const ProductResponse_1 = require("./ProductResponse");
/**
 * DTO for product collection responses
 */
class ProductCollectionResponse extends base_1.AbstractCollectionResponse {
    /**
     * Create a new ProductCollectionResponse
     */
    constructor(ldContext, ldId, ldType, ldMembers = [], ldTotalItems = 0, ldView = null) {
        super(ldContext, ldId, ldType, ldMembers, ldTotalItems, ldView);
    }
    /**
     * Get the products in the collection
     */
    getLdMembers() {
        return super.getLdMembers();
    }
    /**
     * Create from API JSON data
     */
    static fromJSON(data) {
        const members = (data.member || []).map((item) => ProductResponse_1.ProductResponse.fromJSON(item));
        const view = data.view
            ? base_2.PartialCollectionView.fromJSON(data.view)
            : null;
        return new ProductCollectionResponse(data['@context'] || '', data['@id'] || '', data['@type'] || enum_1.LdType.Collection, members, data.totalItems || 0, view);
    }
}
exports.ProductCollectionResponse = ProductCollectionResponse;
