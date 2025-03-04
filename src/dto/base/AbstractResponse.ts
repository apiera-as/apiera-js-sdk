import { AbstractDTO } from './AbstractDTO';
import { JsonLDResource, ResponseDTO } from '../../types';
import { LdType } from '../../enum';

/**
 * Abstract base class for single resource responses
 */
export abstract class AbstractResponse extends AbstractDTO implements ResponseDTO, JsonLDResource {
    /**
     * Create a new AbstractResponse
     *
     * @param ldId IRI of the resource
     * @param ldType Type of the resource
     * @param uuid UUID of the resource
     * @param createdAt Creation timestamp
     * @param updatedAt Last update timestamp
     */
    constructor(
        private readonly ldId: string,
        private readonly ldType: LdType,
        private readonly uuid: string,
        private readonly createdAt: Date,
        private readonly updatedAt: Date
    ) {
        super();
    }

    /**
     * Get the IRI of the resource
     */
    getLdId(): string {
        return this.ldId;
    }

    /**
     * Get the type of the resource
     */
    getLdType(): LdType {
        return this.ldType;
    }

    /**
     * Get the UUID of the resource
     */
    getUuid(): string {
        return this.uuid;
    }

    /**
     * Get the creation timestamp of the resource
     */
    getCreatedAt(): Date {
        return this.createdAt;
    }

    /**
     * Get the last update timestamp of the resource
     */
    getUpdatedAt(): Date {
        return this.updatedAt;
    }

    /**
     * Convert to a plain object
     */
    toJSON(): Record<string, any> {
        return {
            '@id': this.ldId,
            '@type': this.ldType,
            uuid: this.uuid,
            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString()
        };
    }
}