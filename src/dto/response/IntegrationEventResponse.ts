// IntegrationEventResponse.ts
import { AbstractResponse } from '../base';
import { LdType } from '../../enum';
import { IntegrationEventType } from '../../enum';

/**
 * DTO for integration event responses
 */
export class IntegrationEventResponse extends AbstractResponse {
    /**
     * Create a new IntegrationEventResponse
     *
     * @param ldId Event IRI
     * @param ldType Event type
     * @param uuid Event UUID
     * @param createdAt Creation timestamp
     * @param updatedAt Last update timestamp
     * @param eventType Event type
     * @param onCreate Fire on create
     * @param onUpdate Fire on update
     * @param onDelete Fire on delete
     * @param store Store IRI
     */
    constructor(
        ldId: string,
        ldType: LdType,
        uuid: string,
        createdAt: Date,
        updatedAt: Date,
        private readonly eventType: IntegrationEventType,
        private readonly onCreate: boolean,
        private readonly onUpdate: boolean,
        private readonly onDelete: boolean,
        private readonly store: string | null = null
    ) {
        super(ldId, ldType, uuid, createdAt, updatedAt);
    }

    /**
     * Get the event type
     */
    getEventType(): IntegrationEventType {
        return this.eventType;
    }

    /**
     * Get onCreate flag
     */
    getOnCreate(): boolean {
        return this.onCreate;
    }

    /**
     * Get onUpdate flag
     */
    getOnUpdate(): boolean {
        return this.onUpdate;
    }

    /**
     * Get onDelete flag
     */
    getOnDelete(): boolean {
        return this.onDelete;
    }

    /**
     * Get the store IRI
     */
    getStore(): string | null {
        return this.store;
    }

    /**
     * Convert to a plain object
     */
    toJSON(): Record<string, any> {
        return {
            ...super.toJSON(),
            eventType: this.eventType,
            onCreate: this.onCreate,
            onUpdate: this.onUpdate,
            onDelete: this.onDelete,
            store: this.store
        };
    }

    /**
     * Create from API JSON data
     */
    static fromJSON(data: any): IntegrationEventResponse {
        return new IntegrationEventResponse(
            data['@id'] || '',
            data['@type'] as LdType || LdType.IntegrationEvent,
            data.uuid || '',
            new Date(data.createdAt),
            new Date(data.updatedAt),
            data.eventType as IntegrationEventType,
            data.onCreate || false,
            data.onUpdate || false,
            data.onDelete || false,
            data.store || null
        );
    }
}