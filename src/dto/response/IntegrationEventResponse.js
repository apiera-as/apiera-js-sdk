"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationEventResponse = void 0;
// IntegrationEventResponse.ts
const base_1 = require("../base");
const enum_1 = require("../../enum");
/**
 * DTO for integration event responses
 */
class IntegrationEventResponse extends base_1.AbstractResponse {
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
    constructor(ldId, ldType, uuid, createdAt, updatedAt, eventType, onCreate, onUpdate, onDelete, store = null) {
        super(ldId, ldType, uuid, createdAt, updatedAt);
        this.eventType = eventType;
        this.onCreate = onCreate;
        this.onUpdate = onUpdate;
        this.onDelete = onDelete;
        this.store = store;
    }
    /**
     * Get the event type
     */
    getEventType() {
        return this.eventType;
    }
    /**
     * Get onCreate flag
     */
    getOnCreate() {
        return this.onCreate;
    }
    /**
     * Get onUpdate flag
     */
    getOnUpdate() {
        return this.onUpdate;
    }
    /**
     * Get onDelete flag
     */
    getOnDelete() {
        return this.onDelete;
    }
    /**
     * Get the store IRI
     */
    getStore() {
        return this.store;
    }
    /**
     * Convert to a plain object
     */
    toJSON() {
        return Object.assign(Object.assign({}, super.toJSON()), { eventType: this.eventType, onCreate: this.onCreate, onUpdate: this.onUpdate, onDelete: this.onDelete, store: this.store });
    }
    /**
     * Create from API JSON data
     */
    static fromJSON(data) {
        return new IntegrationEventResponse(data['@id'] || '', data['@type'] || enum_1.LdType.IntegrationEvent, data.uuid || '', new Date(data.createdAt), new Date(data.updatedAt), data.eventType, data.onCreate || false, data.onUpdate || false, data.onDelete || false, data.store || null);
    }
}
exports.IntegrationEventResponse = IntegrationEventResponse;
