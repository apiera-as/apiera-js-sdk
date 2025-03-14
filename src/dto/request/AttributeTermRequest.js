"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeTermRequestBuilder = exports.AttributeTermRequest = void 0;
// AttributeTermRequest.ts
const base_1 = require("../base");
class AttributeTermRequest extends base_1.AbstractDTO {
    constructor(name = null, iri = null) {
        super();
        this.name = name;
        this.iri = iri;
    }
    getName() { return this.name; }
    getIri() { return this.iri; }
    toJSON() {
        const data = {};
        if (this.name !== null)
            data.name = this.name;
        return data;
    }
    static builder() {
        return new AttributeTermRequestBuilder();
    }
}
exports.AttributeTermRequest = AttributeTermRequest;
class AttributeTermRequestBuilder {
    constructor() {
        this._name = null;
        this._iri = null;
    }
    name(name) {
        this._name = name;
        return this;
    }
    iri(iri) {
        this._iri = iri;
        return this;
    }
    build() {
        return new AttributeTermRequest(this._name, this._iri);
    }
}
exports.AttributeTermRequestBuilder = AttributeTermRequestBuilder;
