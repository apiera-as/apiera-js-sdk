"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkuCollectionResponse = void 0;
const base_1 = require("../base");
const enum_1 = require("../../enum");
const base_2 = require("../base");
const SkuResponse_1 = require("./SkuResponse");
class SkuCollectionResponse extends base_1.AbstractCollectionResponse {
    constructor(ldContext, ldId, ldType, ldMembers = [], ldTotalItems = 0, ldView = null) {
        super(ldContext, ldId, ldType, ldMembers, ldTotalItems, ldView);
    }
    getLdMembers() {
        return super.getLdMembers();
    }
    static fromJSON(data) {
        const members = (data.member || []).map((item) => SkuResponse_1.SkuResponse.fromJSON(item));
        const view = data.view
            ? base_2.PartialCollectionView.fromJSON(data.view)
            : null;
        return new SkuCollectionResponse(data['@context'] || '', data['@id'] || '', data['@type'] || enum_1.LdType.Collection, members, data.totalItems || 0, view);
    }
}
exports.SkuCollectionResponse = SkuCollectionResponse;
