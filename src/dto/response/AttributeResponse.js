"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeResponse = void 0;
// AttributeResponse.ts
const base_1 = require("../base");
const enum_1 = require("../../enum");
class AttributeResponse extends base_1.AbstractResponse {
    constructor(ldId, ldType, uuid, createdAt, updatedAt, name, store) {
        super(ldId, ldType, uuid, createdAt, updatedAt);
        this.name = name;
        this.store = store;
    }
    getName() { return this.name; }
    getStore() { return this.store; }
    toJSON() {
        return Object.assign(Object.assign({}, super.toJSON()), { name: this.name, store: this.store });
    }
    static fromJSON(data) {
        return new AttributeResponse(data['@id'] || '', data['@type'] || enum_1.LdType.Attribute, data.uuid || '', new Date(data.createdAt), new Date(data.updatedAt), data.name || '', data.store || '');
    }
}
exports.AttributeResponse = AttributeResponse;
