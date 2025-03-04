import { AbstractResponse } from '../base';
import { LdType } from '../../enum';

/**
 * DTO for store responses
 */
export class StoreResponse extends AbstractResponse {
    /**
     * Create a new StoreResponse
     *
     * @param ldId Store IRI
     * @param ldType Store type
     * @param uuid Store UUID
     * @param createdAt Creation timestamp
     * @param updatedAt Last update timestamp
     * @param name Store name
     * @param description Store description
     * @param image Store image URL
     */
    constructor(
        ldId: string,
        ldType: LdType,
        uuid: string,
        createdAt: Date,
        updatedAt: Date,
        private readonly name: string,
        private readonly description: string | null = null,
        private readonly image: string | null = null
    ) {
        super(ldId, ldType, uuid, createdAt, updatedAt);
    }

    /**
     * Get the store name
     */
    getName(): string {
        return this.name;
    }

    /**
     * Get the store description
     */
    getDescription(): string | null {
        return this.description;
    }

    /**
     * Get the store image URL
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
            image: this.image
        };
    }

    /**
     * Create from API JSON data
     */
    static fromJSON(data: any): StoreResponse {
        return new StoreResponse(
            data['@id'] || '',
            data['@type'] as LdType || LdType.Store,
            data.uuid || '',
            new Date(data.createdAt),
            new Date(data.updatedAt),
            data.name || '',
            data.description || null,
            data.image || null
        );
    }
}