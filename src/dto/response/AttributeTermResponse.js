"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeTermResponse = void 0;
// AttributeTermResponse.ts
const base_1 = require("../base");
const enum_1 = require("../../enum");
class AttributeTermResponse extends base_1.AbstractResponse {
    constructor(ldId, ldType, uuid, createdAt, updatedAt, name, attribute, store) {
        super(ldId, ldType, uuid, createdAt, updatedAt);
        this.name = name;
        this.attribute = attribute;
        this.store = store;
    }
    getName() { return this.name; }
    getAttribute() { return this.attribute; }
    getStore() { return this.store; }
    toJSON() {
        return Object.assign(Object.assign({}, super.toJSON()), { name: this.name, attribute: this.attribute, store: this.store });
    }
    static fromJSON(data) {
        return new AttributeTermResponse(data['@id'] || '', data['@type'] || enum_1.LdType.AttributeTerm, data.uuid || '', new Date(data.createdAt), new Date(data.updatedAt), data.name || '', data.attribute || '', data.store || '');
    }
}
exports.AttributeTermResponse = AttributeTermResponse;
