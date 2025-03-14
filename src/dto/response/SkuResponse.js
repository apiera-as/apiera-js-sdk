"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkuResponse = void 0;
const base_1 = require("../base");
const enum_1 = require("../../enum");
class SkuResponse extends base_1.AbstractResponse {
    constructor(ldId, ldType, uuid, createdAt, updatedAt, code, products, variants, inventories) {
        super(ldId, ldType, uuid, createdAt, updatedAt);
        this.code = code;
        this.products = products;
        this.variants = variants;
        this.inventories = inventories;
    }
    getCode() {
        return this.code;
    }
    getProducts() {
        return this.products;
    }
    getVariants() {
        return this.variants;
    }
    getInventories() {
        return this.inventories;
    }
    toJSON() {
        return Object.assign(Object.assign({}, super.toJSON()), { code: this.code, products: this.products, variants: this.variants, inventories: this.inventories });
    }
    static fromJSON(data) {
        return new SkuResponse(data['@id'] || '', data['@type'] || enum_1.LdType.Sku, data.uuid || '', new Date(data.createdAt), new Date(data.updatedAt), data.code || '', data.products || [], data.variants || [], data.inventories || []);
    }
}
exports.SkuResponse = SkuResponse;
