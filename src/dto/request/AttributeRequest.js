"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeRequestBuilder = exports.AttributeRequest = void 0;
// AttributeRequest.ts
const base_1 = require("../base");
class AttributeRequest extends base_1.AbstractDTO {
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
        return new AttributeRequestBuilder();
    }
}
exports.AttributeRequest = AttributeRequest;
class AttributeRequestBuilder {
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
        return new AttributeRequest(this._name, this._iri);
    }
}
exports.AttributeRequestBuilder = AttributeRequestBuilder;
