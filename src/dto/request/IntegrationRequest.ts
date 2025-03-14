// IntegrationRequest.ts
import { AbstractDTO } from '../base';
import { RequestDTO } from '../../types';
import { IntegrationProtocol, IntegrationStatus } from '../../enum';
import { IntegrationEventRequest } from './IntegrationEventRequest';

/**
 * DTO for integration creation and update requests
 */
export class IntegrationRequest extends AbstractDTO implements RequestDTO {
    /**
     * Create a new IntegrationRequest
     *
     * @param name Integration name
     * @param protocol Integration protocol
     * @param status Integration status
     * @param events Integration events
     * @param iri Integration IRI (used for updates, not sent in requests)
     */
    constructor(
        private readonly name: string | null = null,
        private readonly protocol: IntegrationProtocol | null = null,
        private readonly status: IntegrationStatus | null = null,
        private readonly events: IntegrationEventRequest[] | null = null,
        private readonly iri: string | null = null
    ) {
        super();
    }

    /**
     * Get the integration name
     */
    getName(): string | null {
        return this.name;
    }

    /**
     * Get the integration protocol
     */
    getProtocol(): IntegrationProtocol | null {
        return this.protocol;
    }

    /**
     * Get the integration status
     */
    getStatus(): IntegrationStatus | null {
        return this.status;
    }

    /**
     * Get the integration events
     */
    getEvents(): IntegrationEventRequest[] | null {
        return this.events;
    }

    /**
     * Get the integration IRI
     */
    getIri(): string | null {
        return this.iri;
    }

    /**
     * Convert to a plain object for API requests
     */
    toJSON(): Record<string, any> {
        const data: Record<string, any> = {};

        if (this.name !== null) {
            data.name = this.name;
        }

        if (this.protocol !== null) {
            data.protocol = this.protocol;
        }

        if (this.status !== null) {
            data.status = this.status;
        }

        if (this.events !== null && this.events.length > 0) {
            data.events = this.events.map(event => event.toJSON());
        }

        return data;
    }

    /**
     * Create a builder for IntegrationRequest
     */
    static builder(): IntegrationRequestBuilder {
        return new IntegrationRequestBuilder();
    }
}

/**
 * Builder for IntegrationRequest
 */
export class IntegrationRequestBuilder {
    private _name: string | null = null;
    private _protocol: IntegrationProtocol | null = null;
    private _status: IntegrationStatus | null = null;
    private _events: IntegrationEventRequest[] | null = null;
    private _iri: string | null = null;

    /**
     * Set the integration name
     */
    name(name: string): IntegrationRequestBuilder {
        this._name = name;
        return this;
    }

    /**
     * Set the integration protocol
     */
    protocol(protocol: IntegrationProtocol): IntegrationRequestBuilder {
        this._protocol = protocol;
        return this;
    }

    /**
     * Set the integration status
     */
    status(status: IntegrationStatus): IntegrationRequestBuilder {
        this._status = status;
        return this;
    }

    /**
     * Set the integration events
     */
    events(events: IntegrationEventRequest[]): IntegrationRequestBuilder {
        this._events = events;
        return this;
    }

    /**
     * Set the integration IRI
     */
    iri(iri: string): IntegrationRequestBuilder {
        this._iri = iri;
        return this;
    }

    /**
     * Build the IntegrationRequest
     */
    build(): IntegrationRequest {
        return new IntegrationRequest(
            this._name,
            this._protocol,
            this._status,
            this._events,
            this._iri
        );
    }
}