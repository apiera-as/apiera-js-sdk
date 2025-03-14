// dto/response/ProductResponse.ts
import { AbstractResponse } from '../base';
import { LdType } from '../../enum';

/**
 * DTO for product responses
 */
export class ProductResponse extends AbstractResponse {
    /**
     * Create a new ProductResponse
     */
    constructor(
        ldId: string,
        ldType: LdType,
        uuid: string,
        createdAt: Date,
        updatedAt: Date,
        private readonly name: string,
        private readonly type: string,
        private readonly price: string | null = null,
        private readonly salePrice: string | null = null,
        private readonly description: string | null = null,
        private readonly shortDescription: string | null = null,
        private readonly weight: string | null = null,
        private readonly length: string | null = null,
        private readonly width: string | null = null,
        private readonly height: string | null = null,
        private readonly status: string | null = null,
        private readonly store: string | null = null,
        private readonly distributor: string | null = null,
        private readonly brand: string | null = null,
        private readonly sku: string | null = null,
        private readonly image: string | null = null,
        private readonly categories: string[] = [],
        private readonly tags: string[] = [],
        private readonly attributes: string[] = [],
        private readonly images: string[] = [],
        private readonly alternateIdentifiers: string[] = [],
        private readonly propertyTerms: string[] = []
    ) {
        super(ldId, ldType, uuid, createdAt, updatedAt);
    }

    // Getters
    getName(): string { return this.name; }
    getType(): string { return this.type; }
    getPrice(): string | null { return this.price; }
    getSalePrice(): string | null { return this.salePrice; }
    getDescription(): string | null { return this.description; }
    getShortDescription(): string | null { return this.shortDescription; }
    getWeight(): string | null { return this.weight; }
    getLength(): string | null { return this.length; }
    getWidth(): string | null { return this.width; }
    getHeight(): string | null { return this.height; }
    getStatus(): string | null { return this.status; }
    getStore(): string | null { return this.store; }
    getDistributor(): string | null { return this.distributor; }
    getBrand(): string | null { return this.brand; }
    getSku(): string | null { return this.sku; }
    getImage(): string | null { return this.image; }
    getCategories(): string[] { return this.categories; }
    getTags(): string[] { return this.tags; }
    getAttributes(): string[] { return this.attributes; }
    getImages(): string[] { return this.images; }
    getAlternateIdentifiers(): string[] { return this.alternateIdentifiers; }
    getPropertyTerms(): string[] { return this.propertyTerms; }

    /**
     * Convert to a plain object
     */
    toJSON(): Record<string, any> {
        return {
            ...super.toJSON(),
            name: this.name,
            type: this.type,
            price: this.price,
            salePrice: this.salePrice,
            description: this.description,
            shortDescription: this.shortDescription,
            weight: this.weight,
            length: this.length,
            width: this.width,
            height: this.height,
            status: this.status,
            store: this.store,
            distributor: this.distributor,
            brand: this.brand,
            sku: this.sku,
            image: this.image,
            categories: this.categories,
            tags: this.tags,
            attributes: this.attributes,
            images: this.images,
            alternateIdentifiers: this.alternateIdentifiers,
            propertyTerms: this.propertyTerms
        };
    }

    /**
     * Create from API JSON data
     */
    static fromJSON(data: any): ProductResponse {
        return new ProductResponse(
            data['@id'] || '',
            data['@type'] as LdType || LdType.Product,
            data.uuid || '',
            new Date(data.createdAt),
            new Date(data.updatedAt),
            data.name || '',
            data.type || 'simple',
            data.price || null,
            data.salePrice || null,
            data.description || null,
            data.shortDescription || null,
            data.weight || null,
            data.length || null,
            data.width || null,
            data.height || null,
            data.status || null,
            data.store || null,
            data.distributor || null,
            data.brand || null,
            data.sku || null,
            data.image || null,
            data.categories || [],
            data.tags || [],
            data.attributes || [],
            data.images || [],
            data.alternateIdentifiers || [],
            data.propertyTerms || []
        );
    }
}