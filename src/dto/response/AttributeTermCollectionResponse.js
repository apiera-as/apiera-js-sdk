"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeTermCollectionResponse = void 0;
// AttributeTermCollectionResponse.ts
const base_1 = require("../base");
const enum_1 = require("../../enum");
const base_2 = require("../base");
const AttributeTermResponse_1 = require("./AttributeTermResponse");
class AttributeTermCollectionResponse extends base_1.AbstractCollectionResponse {
    constructor(ldContext, ldId, ldType, ldMembers = [], ldTotalItems = 0, ldView = null) {
        super(ldContext, ldId, ldType, ldMembers, ldTotalItems, ldView);
    }
    getLdMembers() {
        return super.getLdMembers();
    }
    static fromJSON(data) {
        const members = (data.member || []).map((item) => AttributeTermResponse_1.AttributeTermResponse.fromJSON(item));
        const view = data.view ? base_2.PartialCollectionView.fromJSON(data.view) : null;
        return new AttributeTermCollectionResponse(data['@context'] || '', data['@id'] || '', data['@type'] || enum_1.LdType.Collection, members, data.totalItems || 0, view);
    }
}
exports.AttributeTermCollectionResponse = AttributeTermCollectionResponse;
