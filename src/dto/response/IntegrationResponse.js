"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationResponse = void 0;
// IntegrationResponse.ts
const base_1 = require("../base");
const enum_1 = require("../../enum");
const IntegrationEventResponse_1 = require("./IntegrationEventResponse");
/**
 * DTO for integration responses
 */
class IntegrationResponse extends base_1.AbstractResponse {
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
    constructor(ldId, ldType, uuid, createdAt, updatedAt, name, protocol, status, events = []) {
        super(ldId, ldType, uuid, createdAt, updatedAt);
        this.name = name;
        this.protocol = protocol;
        this.status = status;
        this.events = events;
    }
    /**
     * Get the integration name
     */
    getName() {
        return this.name;
    }
    /**
     * Get the integration protocol
     */
    getProtocol() {
        return this.protocol;
    }
    /**
     * Get the integration status
     */
    getStatus() {
        return this.status;
    }
    /**
     * Get the integration events
     */
    getEvents() {
        return this.events;
    }
    /**
     * Convert to a plain object
     */
    toJSON() {
        return Object.assign(Object.assign({}, super.toJSON()), { name: this.name, protocol: this.protocol, status: this.status, events: this.events.map(event => event.toJSON()) });
    }
    /**
     * Create from API JSON data
     */
    static fromJSON(data) {
        const events = (data.events || []).map((eventData) => IntegrationEventResponse_1.IntegrationEventResponse.fromJSON(eventData));
        return new IntegrationResponse(data['@id'] || '', data['@type'] || enum_1.LdType.Integration, data.uuid || '', new Date(data.createdAt), new Date(data.updatedAt), data.name || '', data.protocol || enum_1.IntegrationProtocol.NONE, data.status || enum_1.IntegrationStatus.INACTIVE, events);
    }
}
exports.IntegrationResponse = IntegrationResponse;
