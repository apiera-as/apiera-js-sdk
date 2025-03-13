"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlternateIdentifierRequestBuilder = exports.AlternateIdentifierRequest = void 0;
const base_1 = require("../base");
/**
 * DTO for alternate identifier creation and update requests
 */
class AlternateIdentifierRequest extends base_1.AbstractDTO {
    constructor(code = null, type = null) {
        super();
        this.code = code;
        this.type = type;
    }
    getCode() { return this.code; }
    ;
    getType() { return this.type; }
    ;
    toJSON() {
        const data = {};
        if (this.code !== null)
            data.code = this.code;
        if (this.type !== null)
            data.type = this.type;
        return data;
    }
    static builder() {
        return new AlternateIdentifierRequestBuilder();
    }
}
exports.AlternateIdentifierRequest = AlternateIdentifierRequest;
class AlternateIdentifierRequestBuilder {
    constructor() {
        this._code = null;
        this._type = null;
    }
    code(code) {
        this._code = code;
        return this;
    }
    type(type) {
        this._type = type;
        return this;
    }
    build() {
        return new AlternateIdentifierRequest(this._code, this._type);
    }
}
exports.AlternateIdentifierRequestBuilder = AlternateIdentifierRequestBuilder;
