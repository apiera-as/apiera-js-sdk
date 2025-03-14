"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkuRequestBuilder = exports.SkuRequest = void 0;
const base_1 = require("../base");
class SkuRequest extends base_1.AbstractDTO {
    constructor(code = null, iri = null) {
        super();
        this.code = code;
        this.iri = iri;
    }
    getCode() { return this.code; }
    getIri() { return this.iri; }
    toJSON() {
        const data = {};
        if (this.code !== null)
            data.code = this.code;
        return data;
    }
    static builder() {
        return new SkuRequestBuilder();
    }
}
exports.SkuRequest = SkuRequest;
class SkuRequestBuilder {
    constructor() {
        this._code = null;
        this._iri = null;
    }
    code(code) {
        this._code = code;
        return this;
    }
    iri(iri) {
        this._iri = iri;
        return this;
    }
    build() {
        return new SkuRequest(this._code, this._iri);
    }
}
exports.SkuRequestBuilder = SkuRequestBuilder;
