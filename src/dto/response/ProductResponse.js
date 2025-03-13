"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductResponse = void 0;
// dto/response/ProductResponse.ts
const base_1 = require("../base");
const enum_1 = require("../../enum");
/**
 * DTO for product responses
 */
class ProductResponse extends base_1.AbstractResponse {
    /**
     * Create a new ProductResponse
     */
    constructor(ldId, ldType, uuid, createdAt, updatedAt, name, type, price = null, salePrice = null, description = null, shortDescription = null, weight = null, length = null, width = null, height = null, status = null, store = null, distributor = null, brand = null, sku = null, image = null, categories = [], tags = [], attributes = [], images = [], alternateIdentifiers = [], propertyTerms = []) {
        super(ldId, ldType, uuid, createdAt, updatedAt);
        this.name = name;
        this.type = type;
        this.price = price;
        this.salePrice = salePrice;
        this.description = description;
        this.shortDescription = shortDescription;
        this.weight = weight;
        this.length = length;
        this.width = width;
        this.height = height;
        this.status = status;
        this.store = store;
        this.distributor = distributor;
        this.brand = brand;
        this.sku = sku;
        this.image = image;
        this.categories = categories;
        this.tags = tags;
        this.attributes = attributes;
        this.images = images;
        this.alternateIdentifiers = alternateIdentifiers;
        this.propertyTerms = propertyTerms;
    }
    // Getters
    getName() { return this.name; }
    getType() { return this.type; }
    getPrice() { return this.price; }
    getSalePrice() { return this.salePrice; }
    getDescription() { return this.description; }
    getShortDescription() { return this.shortDescription; }
    getWeight() { return this.weight; }
    getLength() { return this.length; }
    getWidth() { return this.width; }
    getHeight() { return this.height; }
    getStatus() { return this.status; }
    getStore() { return this.store; }
    getDistributor() { return this.distributor; }
    getBrand() { return this.brand; }
    getSku() { return this.sku; }
    getImage() { return this.image; }
    getCategories() { return this.categories; }
    getTags() { return this.tags; }
    getAttributes() { return this.attributes; }
    getImages() { return this.images; }
    getAlternateIdentifiers() { return this.alternateIdentifiers; }
    getPropertyTerms() { return this.propertyTerms; }
    /**
     * Convert to a plain object
     */
    toJSON() {
        return Object.assign(Object.assign({}, super.toJSON()), { name: this.name, type: this.type, price: this.price, salePrice: this.salePrice, description: this.description, shortDescription: this.shortDescription, weight: this.weight, length: this.length, width: this.width, height: this.height, status: this.status, store: this.store, distributor: this.distributor, brand: this.brand, sku: this.sku, image: this.image, categories: this.categories, tags: this.tags, attributes: this.attributes, images: this.images, alternateIdentifiers: this.alternateIdentifiers, propertyTerms: this.propertyTerms });
    }
    /**
     * Create from API JSON data
     */
    static fromJSON(data) {
        return new ProductResponse(data['@id'] || '', data['@type'] || enum_1.LdType.Product, data.uuid || '', new Date(data.createdAt), new Date(data.updatedAt), data.name || '', data.type || 'simple', data.price || null, data.salePrice || null, data.description || null, data.shortDescription || null, data.weight || null, data.length || null, data.width || null, data.height || null, data.status || null, data.store || null, data.distributor || null, data.brand || null, data.sku || null, data.image || null, data.categories || [], data.tags || [], data.attributes || [], data.images || [], data.alternateIdentifiers || [], data.propertyTerms || []);
    }
}
exports.ProductResponse = ProductResponse;
