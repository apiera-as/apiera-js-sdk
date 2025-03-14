"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeCollectionResponse = void 0;
// AttributeCollectionResponse.ts
const base_1 = require("../base");
const enum_1 = require("../../enum");
const base_2 = require("../base");
const AttributeResponse_1 = require("./AttributeResponse");
class AttributeCollectionResponse extends base_1.AbstractCollectionResponse {
    constructor(ldContext, ldId, ldType, ldMembers = [], ldTotalItems = 0, ldView = null) {
        super(ldContext, ldId, ldType, ldMembers, ldTotalItems, ldView);
    }
    getLdMembers() {
        return super.getLdMembers();
    }
    static fromJSON(data) {
        const members = (data.member || []).map((item) => AttributeResponse_1.AttributeResponse.fromJSON(item));
        const view = data.view ? base_2.PartialCollectionView.fromJSON(data.view) : null;
        return new AttributeCollectionResponse(data['@context'] || '', data['@id'] || '', data['@type'] || enum_1.LdType.Collection, members, data.totalItems || 0, view);
    }
}
exports.AttributeCollectionResponse = AttributeCollectionResponse;
