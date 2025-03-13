"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRequestBuilder = exports.ProductRequest = void 0;
// dto/request/ProductRequest.ts
const base_1 = require("../base");
/**
 * DTO for product creation and update requests
 */
class ProductRequest extends base_1.AbstractDTO {
    /**
     * Create a new ProductRequest
     */
    constructor(name = null, type = null, price = null, salePrice = null, description = null, shortDescription = null, weight = null, length = null, width = null, height = null, status = null, distributor = null, brand = null, sku = null, image = null, categories = null, tags = null, attributes = null, images = null, alternateIdentifiers = null, propertyTerms = null, iri = null) {
        super();
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
        this.iri = iri;
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
    getIri() { return this.iri; }
    /**
     * Convert to a plain object for API requests
     */
    toJSON() {
        const data = {};
        if (this.name !== null)
            data.name = this.name;
        if (this.type !== null)
            data.type = this.type;
        if (this.price !== null)
            data.price = this.price;
        if (this.salePrice !== null)
            data.salePrice = this.salePrice;
        if (this.description !== null)
            data.description = this.description;
        if (this.shortDescription !== null)
            data.shortDescription = this.shortDescription;
        if (this.weight !== null)
            data.weight = this.weight;
        if (this.length !== null)
            data.length = this.length;
        if (this.width !== null)
            data.width = this.width;
        if (this.height !== null)
            data.height = this.height;
        if (this.status !== null)
            data.status = this.status;
        if (this.distributor !== null)
            data.distributor = this.distributor;
        if (this.brand !== null)
            data.brand = this.brand;
        if (this.sku !== null)
            data.sku = this.sku;
        if (this.image !== null)
            data.image = this.image;
        if (this.categories !== null)
            data.categories = this.categories;
        if (this.tags !== null)
            data.tags = this.tags;
        if (this.attributes !== null)
            data.attributes = this.attributes;
        if (this.images !== null)
            data.images = this.images;
        if (this.alternateIdentifiers !== null)
            data.alternateIdentifiers = this.alternateIdentifiers;
        if (this.propertyTerms !== null)
            data.propertyTerms = this.propertyTerms;
        return data;
    }
    /**
     * Create a builder for ProductRequest
     */
    static builder() {
        return new ProductRequestBuilder();
    }
}
exports.ProductRequest = ProductRequest;
/**
 * Builder for ProductRequest
 */
class ProductRequestBuilder {
    constructor() {
        this._name = null;
        this._type = null;
        this._price = null;
        this._salePrice = null;
        this._description = null;
        this._shortDescription = null;
        this._weight = null;
        this._length = null;
        this._width = null;
        this._height = null;
        this._status = null;
        this._distributor = null;
        this._brand = null;
        this._sku = null;
        this._image = null;
        this._categories = null;
        this._tags = null;
        this._attributes = null;
        this._images = null;
        this._alternateIdentifiers = null;
        this._propertyTerms = null;
        this._iri = null;
    }
    // Builder methods
    name(name) {
        this._name = name;
        return this;
    }
    type(type) {
        this._type = type;
        return this;
    }
    price(price) {
        this._price = price;
        return this;
    }
    salePrice(salePrice) {
        this._salePrice = salePrice;
        return this;
    }
    description(description) {
        this._description = description;
        return this;
    }
    shortDescription(shortDescription) {
        this._shortDescription = shortDescription;
        return this;
    }
    weight(weight) {
        this._weight = weight;
        return this;
    }
    length(length) {
        this._length = length;
        return this;
    }
    width(width) {
        this._width = width;
        return this;
    }
    height(height) {
        this._height = height;
        return this;
    }
    status(status) {
        this._status = status;
        return this;
    }
    distributor(distributor) {
        this._distributor = distributor;
        return this;
    }
    brand(brand) {
        this._brand = brand;
        return this;
    }
    sku(sku) {
        this._sku = sku;
        return this;
    }
    image(image) {
        this._image = image;
        return this;
    }
    categories(categories) {
        this._categories = categories;
        return this;
    }
    tags(tags) {
        this._tags = tags;
        return this;
    }
    attributes(attributes) {
        this._attributes = attributes;
        return this;
    }
    images(images) {
        this._images = images;
        return this;
    }
    alternateIdentifiers(alternateIdentifiers) {
        this._alternateIdentifiers = alternateIdentifiers;
        return this;
    }
    propertyTerms(propertyTerms) {
        this._propertyTerms = propertyTerms;
        return this;
    }
    iri(iri) {
        this._iri = iri;
        return this;
    }
    /**
     * Build the ProductRequest
     */
    build() {
        return new ProductRequest(this._name, this._type, this._price, this._salePrice, this._description, this._shortDescription, this._weight, this._length, this._width, this._height, this._status, this._distributor, this._brand, this._sku, this._image, this._categories, this._tags, this._attributes, this._images, this._alternateIdentifiers, this._propertyTerms, this._iri);
    }
}
exports.ProductRequestBuilder = ProductRequestBuilder;
