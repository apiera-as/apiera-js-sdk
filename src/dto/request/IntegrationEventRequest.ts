// IntegrationEventRequest.ts
import { AbstractDTO } from '../base';
import { RequestDTO } from '../../types';
import { IntegrationEventType } from '../../enum';

/**
 * DTO for integration event creation and update requests
 */
export class IntegrationEventRequest extends AbstractDTO implements RequestDTO {
    /**
     * Create a new IntegrationEventRequest
     *
     * @param eventType Event type
     * @param onCreate Fire on create
     * @param onUpdate Fire on update
     * @param onDelete Fire on delete
     * @param store Store IRI (optional)
     * @param iri Integration event IRI (used for updates, not sent in requests)
     */
    constructor(
        private readonly eventType: IntegrationEventType | null = null,
        private readonly onCreate: boolean | null = null,
        private readonly onUpdate: boolean | null = null,
        private readonly onDelete: boolean | null = null,
        private readonly store: string | null = null,
        private readonly iri: string | null = null
    ) {
        super();
    }

    /**
     * Get the event type
     */
    getEventType(): IntegrationEventType | null {
        return this.eventType;
    }

    /**
     * Get onCreate flag
     */
    getOnCreate(): boolean | null {
        return this.onCreate;
    }

    /**
     * Get onUpdate flag
     */
    getOnUpdate(): boolean | null {
        return this.onUpdate;
    }

    /**
     * Get onDelete flag
     */
    getOnDelete(): boolean | null {
        return this.onDelete;
    }

    /**
     * Get the store IRI
     */
    getStore(): string | null {
        return this.store;
    }

    /**
     * Get the event IRI
     */
    getIri(): string | null {
        return this.iri;
    }

    /**
     * Convert to a plain object for API requests
     */
    toJSON(): Record<string, any> {
        const data: Record<string, any> = {};

        if (this.eventType !== null) {
            data.eventType = this.eventType;
        }

        if (this.onCreate !== null) {
            data.onCreate = this.onCreate;
        }

        if (this.onUpdate !== null) {
            data.onUpdate = this.onUpdate;
        }

        if (this.onDelete !== null) {
            data.onDelete = this.onDelete;
        }

        if (this.store !== null) {
            data.store = this.store;
        }

        return data;
    }

    /**
     * Create a builder for IntegrationEventRequest
     */
    static builder(): IntegrationEventRequestBuilder {
        return new IntegrationEventRequestBuilder();
    }
}

/**
 * Builder for IntegrationEventRequest
 */
export class IntegrationEventRequestBuilder {
    private _eventType: IntegrationEventType | null = null;
    private _onCreate: boolean | null = null;
    private _onUpdate: boolean | null = null;
    private _onDelete: boolean | null = null;
    private _store: string | null = null;
    private _iri: string | null = null;

    /**
     * Set the event type
     */
    eventType(eventType: IntegrationEventType): IntegrationEventRequestBuilder {
        this._eventType = eventType;
        return this;
    }

    /**
     * Set the onCreate flag
     */
    onCreate(onCreate: boolean): IntegrationEventRequestBuilder {
        this._onCreate = onCreate;
        return this;
    }

    /**
     * Set the onUpdate flag
     */
    onUpdate(onUpdate: boolean): IntegrationEventRequestBuilder {
        this._onUpdate = onUpdate;
        return this;
    }

    /**
     * Set the onDelete flag
     */
    onDelete(onDelete: boolean): IntegrationEventRequestBuilder {
        this._onDelete = onDelete;
        return this;
    }

    /**
     * Set the store IRI
     */
    store(store: string): IntegrationEventRequestBuilder {
        this._store = store;
        return this;
    }

    /**
     * Set the event IRI
     */
    iri(iri: string): IntegrationEventRequestBuilder {
        this._iri = iri;
        return this;
    }

    /**
     * Build the IntegrationEventRequest
     */
    build(): IntegrationEventRequest {
        return new IntegrationEventRequest(
            this._eventType,
            this._onCreate,
            this._onUpdate,
            this._onDelete,
            this._store,
            this._iri
        );
    }
}