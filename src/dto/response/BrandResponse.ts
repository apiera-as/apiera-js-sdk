// dto/response/BrandResponse.ts
import { AbstractResponse } from '../base';
import { LdType } from '../../enum';

/**
 * DTO for brand responses
 */
export class BrandResponse extends AbstractResponse {
    /**
     * Create a new BrandResponse
     *
     * @param ldId Brand IRI
     * @param ldType Brand type
     * @param uuid Brand UUID
     * @param createdAt Creation timestamp
     * @param updatedAt Last update timestamp
     * @param name Brand name
     * @param description Brand description
     * @param store Store IRI
     * @param image Brand image URL
     */
    constructor(
        ldId: string,
        ldType: LdType,
        uuid: string,
        createdAt: Date,
        updatedAt: Date,
        private readonly name: string,
        private readonly description: string | null = null,
        private readonly store: string | null = null,
        private readonly image: string | null = null
    ) {
        super(ldId, ldType, uuid, createdAt, updatedAt);
    }

    /**
     * Get the brand name
     */
    getName(): string {
        return this.name;
    }

    /**
     * Get the brand description
     */
    getDescription(): string | null {
        return this.description;
    }

    /**
     * Get the store IRI
     */
    getStore(): string | null {
        return this.store;
    }

    /**
     * Get the brand image URL
     */
    getImage(): string | null {
        return this.image;
    }

    /**
     * Convert to a plain object
     */
    toJSON(): Record<string, any> {
        return {
            ...super.toJSON(),
            name: this.name,
            description: this.description,
            store: this.store,
            image: this.image
        };
    }

    /**
     * Create from API JSON data
     */
    static fromJSON(data: any): BrandResponse {
        return new BrandResponse(
            data['@id'] || '',
            data['@type'] as LdType || LdType.Brand,
            data.uuid || '',
            new Date(data.createdAt),
            new Date(data.updatedAt),
            data.name || '',
            data.description || null,
            data.store || null,
            data.image || null
        );
    }
}