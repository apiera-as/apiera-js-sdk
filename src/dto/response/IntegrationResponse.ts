// IntegrationResponse.ts
import { AbstractResponse } from '../base';
import { LdType, IntegrationProtocol, IntegrationStatus } from '../../enum';
import { IntegrationEventResponse } from './IntegrationEventResponse';

/**
 * DTO for integration responses
 */
export class IntegrationResponse extends AbstractResponse {
    /**
     * Create a new IntegrationResponse
     *
     * @param ldId Integration IRI
     * @param ldType Integration type
     * @param uuid Integration UUID
     * @param createdAt Creation timestamp
     * @param updatedAt Last update timestamp
     * @param name Integration name
     * @param protocol Integration protocol
     * @param status Integration status
     * @param events Integration events
     */
    constructor(
        ldId: string,
        ldType: LdType,
        uuid: string,
        createdAt: Date,
        updatedAt: Date,
        private readonly name: string,
        private readonly protocol: IntegrationProtocol,
        private readonly status: IntegrationStatus,
        private readonly events: IntegrationEventResponse[] = []
    ) {
        super(ldId, ldType, uuid, createdAt, updatedAt);
    }

    /**
     * Get the integration name
     */
    getName(): string {
        return this.name;
    }

    /**
     * Get the integration protocol
     */
    getProtocol(): IntegrationProtocol {
        return this.protocol;
    }

    /**
     * Get the integration status
     */
    getStatus(): IntegrationStatus {
        return this.status;
    }

    /**
     * Get the integration events
     */
    getEvents(): IntegrationEventResponse[] {
        return this.events;
    }

    /**
     * Convert to a plain object
     */
    toJSON(): Record<string, any> {
        return {
            ...super.toJSON(),
            name: this.name,
            protocol: this.protocol,
            status: this.status,
            events: this.events.map(event => event.toJSON())
        };
    }

    /**
     * Create from API JSON data
     */
    static fromJSON(data: any): IntegrationResponse {
        const events = (data.events || []).map((eventData: any) =>
            IntegrationEventResponse.fromJSON(eventData)
        );

        return new IntegrationResponse(
            data['@id'] || '',
            data['@type'] as LdType || LdType.Integration,
            data.uuid || '',
            new Date(data.createdAt),
            new Date(data.updatedAt),
            data.name || '',
            data.protocol as IntegrationProtocol || IntegrationProtocol.NONE,
            data.status as IntegrationStatus || IntegrationStatus.INACTIVE,
            events
        );
    }
}