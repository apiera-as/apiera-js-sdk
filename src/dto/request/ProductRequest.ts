// dto/request/ProductRequest.ts
import { AbstractDTO } from '../base';
import { RequestDTO } from '../../types';

/**
 * DTO for product creation and update requests
 */
export class ProductRequest extends AbstractDTO implements RequestDTO {
    /**
     * Create a new ProductRequest
     */
    constructor(
        private readonly name: string | null = null,
        private readonly type: 'simple' | string | null = null,
        private readonly price: string | null = null,
        private readonly salePrice: string | null = null,
        private readonly description: string | null = null,
        private readonly shortDescription: string | null = null,
        private readonly weight: string | null = null,
        private readonly length: string | null = null,
        private readonly width: string | null = null,
        private readonly height: string | null = null,
        private readonly status: 'active' | string | null = null,
        private readonly distributor: string | null = null,
        private readonly brand: string | null = null,
        private readonly sku: string | null = null,
        private readonly image: string | null = null,
        private readonly categories: string[] | null = null,
        private readonly tags: string[] | null = null,
        private readonly attributes: string[] | null = null,
        private readonly images: string[] | null = null,
        private readonly alternateIdentifiers: string[] | null = null,
        private readonly propertyTerms: string[] | null = null,
        private readonly iri: string | null = null
    ) {
        super();
    }

    // Getters
    getName(): string | null { return this.name; }
    getType(): string | null { return this.type; }
    getPrice(): string | null { return this.price; }
    getSalePrice(): string | null { return this.salePrice; }
    getDescription(): string | null { return this.description; }
    getShortDescription(): string | null { return this.shortDescription; }
    getWeight(): string | null { return this.weight; }
    getLength(): string | null { return this.length; }
    getWidth(): string | null { return this.width; }
    getHeight(): string | null { return this.height; }
    getStatus(): string | null { return this.status; }
    getDistributor(): string | null { return this.distributor; }
    getBrand(): string | null { return this.brand; }
    getSku(): string | null { return this.sku; }
    getImage(): string | null { return this.image; }
    getCategories(): string[] | null { return this.categories; }
    getTags(): string[] | null { return this.tags; }
    getAttributes(): string[] | null { return this.attributes; }
    getImages(): string[] | null { return this.images; }
    getAlternateIdentifiers(): string[] | null { return this.alternateIdentifiers; }
    getPropertyTerms(): string[] | null { return this.propertyTerms; }
    getIri(): string | null { return this.iri; }

    /**
     * Convert to a plain object for API requests
     */
    toJSON(): Record<string, any> {
        const data: Record<string, any> = {};

        if (this.name !== null) data.name = this.name;
        if (this.type !== null) data.type = this.type;
        if (this.price !== null) data.price = this.price;
        if (this.salePrice !== null) data.salePrice = this.salePrice;
        if (this.description !== null) data.description = this.description;
        if (this.shortDescription !== null) data.shortDescription = this.shortDescription;
        if (this.weight !== null) data.weight = this.weight;
        if (this.length !== null) data.length = this.length;
        if (this.width !== null) data.width = this.width;
        if (this.height !== null) data.height = this.height;
        if (this.status !== null) data.status = this.status;
        if (this.distributor !== null) data.distributor = this.distributor;
        if (this.brand !== null) data.brand = this.brand;
        if (this.sku !== null) data.sku = this.sku;
        if (this.image !== null) data.image = this.image;
        if (this.categories !== null) data.categories = this.categories;
        if (this.tags !== null) data.tags = this.tags;
        if (this.attributes !== null) data.attributes = this.attributes;
        if (this.images !== null) data.images = this.images;
        if (this.alternateIdentifiers !== null) data.alternateIdentifiers = this.alternateIdentifiers;
        if (this.propertyTerms !== null) data.propertyTerms = this.propertyTerms;

        return data;
    }

    /**
     * Create a builder for ProductRequest
     */
    static builder(): ProductRequestBuilder {
        return new ProductRequestBuilder();
    }
}

/**
 * Builder for ProductRequest
 */
export class ProductRequestBuilder {
    private _name: string | null = null;
    private _type: string | null = null;
    private _price: string | null = null;
    private _salePrice: string | null = null;
    private _description: string | null = null;
    private _shortDescription: string | null = null;
    private _weight: string | null = null;
    private _length: string | null = null;
    private _width: string | null = null;
    private _height: string | null = null;
    private _status: string | null = null;
    private _distributor: string | null = null;
    private _brand: string | null = null;
    private _sku: string | null = null;
    private _image: string | null = null;
    private _categories: string[] | null = null;
    private _tags: string[] | null = null;
    private _attributes: string[] | null = null;
    private _images: string[] | null = null;
    private _alternateIdentifiers: string[] | null = null;
    private _propertyTerms: string[] | null = null;
    private _iri: string | null = null;

    // Builder methods
    name(name: string): ProductRequestBuilder {
        this._name = name;
        return this;
    }

    type(type: string): ProductRequestBuilder {
        this._type = type;
        return this;
    }

    price(price: string): ProductRequestBuilder {
        this._price = price;
        return this;
    }

    salePrice(salePrice: string): ProductRequestBuilder {
        this._salePrice = salePrice;
        return this;
    }

    description(description: string): ProductRequestBuilder {
        this._description = description;
        return this;
    }

    shortDescription(shortDescription: string): ProductRequestBuilder {
        this._shortDescription = shortDescription;
        return this;
    }

    weight(weight: string): ProductRequestBuilder {
        this._weight = weight;
        return this;
    }

    length(length: string): ProductRequestBuilder {
        this._length = length;
        return this;
    }

    width(width: string): ProductRequestBuilder {
        this._width = width;
        return this;
    }

    height(height: string): ProductRequestBuilder {
        this._height = height;
        return this;
    }

    status(status: string): ProductRequestBuilder {
        this._status = status;
        return this;
    }

    distributor(distributor: string): ProductRequestBuilder {
        this._distributor = distributor;
        return this;
    }

    brand(brand: string): ProductRequestBuilder {
        this._brand = brand;
        return this;
    }

    sku(sku: string): ProductRequestBuilder {
        this._sku = sku;
        return this;
    }

    image(image: string): ProductRequestBuilder {
        this._image = image;
        return this;
    }

    categories(categories: string[]): ProductRequestBuilder {
        this._categories = categories;
        return this;
    }

    tags(tags: string[]): ProductRequestBuilder {
        this._tags = tags;
        return this;
    }

    attributes(attributes: string[]): ProductRequestBuilder {
        this._attributes = attributes;
        return this;
    }

    images(images: string[]): ProductRequestBuilder {
        this._images = images;
        return this;
    }

    alternateIdentifiers(alternateIdentifiers: string[]): ProductRequestBuilder {
        this._alternateIdentifiers = alternateIdentifiers;
        return this;
    }

    propertyTerms(propertyTerms: string[]): ProductRequestBuilder {
        this._propertyTerms = propertyTerms;
        return this;
    }

    iri(iri: string): ProductRequestBuilder {
        this._iri = iri;
        return this;
    }

    /**
     * Build the ProductRequest
     */
    build(): ProductRequest {
        return new ProductRequest(
            this._name,
            this._type,
            this._price,
            this._salePrice,
            this._description,
            this._shortDescription,
            this._weight,
            this._length,
            this._width,
            this._height,
            this._status,
            this._distributor,
            this._brand,
            this._sku,
            this._image,
            this._categories,
            this._tags,
            this._attributes,
            this._images,
            this._alternateIdentifiers,
            this._propertyTerms,
            this._iri
        );
    }
}