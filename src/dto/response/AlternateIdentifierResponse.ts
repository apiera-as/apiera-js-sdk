import { AbstractResponse } from '../base';
import { LdType, AlternateIdentifierType } from '../../enum';

/**
 * DTO for alternate identifier responses
 */
export class AlternateIdentifierResponse extends AbstractResponse {
    /**
     * Create a new AlternateIdentifierResponse
     *
     * @param ldId Alternate identifier IRI
     * @param ldType Alternate identifier type
     * @param uuid Alternate identifier UUID
     * @param createdAt Creation timestamp
     * @param updatedAt Last update timestamp
     * @param code Alternate identifier code
     * @param type Alternate identifier type (e.g., EAN, UPC)
     */
    constructor(
        ldId: string,
        ldType: LdType,
        uuid: string,
        createdAt: Date,
        updatedAt: Date,
        private readonly code: string,
        private readonly type: AlternateIdentifierType
    ) {
        super(ldId, ldType, uuid, createdAt, updatedAt);
    }

    /**
     * Get the alternate identifier code
     */
    getCode(): string {
        return this.code;
    }

    /**
     * Get the alternate identifier type
     */
    getType(): AlternateIdentifierType {
        return this.type;
    }

    /**
     * Convert to a plain object
     */
    toJSON(): Record<string, any> {
        return {
            ...super.toJSON(),
            code: this.code,
            type: this.type
        };
    }

    /**
     * Create from API JSON data
     */
    static fromJSON(data: any): AlternateIdentifierResponse {
        return new AlternateIdentifierResponse(
            data['@id'] || '',
            data['@type'] as LdType || LdType.AlternateIdentifier,
            data.uuid || '',
            new Date(data.createdAt),
            new Date(data.updatedAt),
            data.code || '',
            data.type as AlternateIdentifierType || AlternateIdentifierType.CUSTOM
        );
    }
}