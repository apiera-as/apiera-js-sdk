"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationEventRequestBuilder = exports.IntegrationEventRequest = void 0;
// IntegrationEventRequest.ts
const base_1 = require("../base");
/**
 * DTO for integration event creation and update requests
 */
class IntegrationEventRequest extends base_1.AbstractDTO {
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
    constructor(eventType = null, onCreate = null, onUpdate = null, onDelete = null, store = null, iri = null) {
        super();
        this.eventType = eventType;
        this.onCreate = onCreate;
        this.onUpdate = onUpdate;
        this.onDelete = onDelete;
        this.store = store;
        this.iri = iri;
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
     * Get the event IRI
     */
    getIri() {
        return this.iri;
    }
    /**
     * Convert to a plain object for API requests
     */
    toJSON() {
        const data = {};
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
    static builder() {
        return new IntegrationEventRequestBuilder();
    }
}
exports.IntegrationEventRequest = IntegrationEventRequest;
/**
 * Builder for IntegrationEventRequest
 */
class IntegrationEventRequestBuilder {
    constructor() {
        this._eventType = null;
        this._onCreate = null;
        this._onUpdate = null;
        this._onDelete = null;
        this._store = null;
        this._iri = null;
    }
    /**
     * Set the event type
     */
    eventType(eventType) {
        this._eventType = eventType;
        return this;
    }
    /**
     * Set the onCreate flag
     */
    onCreate(onCreate) {
        this._onCreate = onCreate;
        return this;
    }
    /**
     * Set the onUpdate flag
     */
    onUpdate(onUpdate) {
        this._onUpdate = onUpdate;
        return this;
    }
    /**
     * Set the onDelete flag
     */
    onDelete(onDelete) {
        this._onDelete = onDelete;
        return this;
    }
    /**
     * Set the store IRI
     */
    store(store) {
        this._store = store;
        return this;
    }
    /**
     * Set the event IRI
     */
    iri(iri) {
        this._iri = iri;
        return this;
    }
    /**
     * Build the IntegrationEventRequest
     */
    build() {
        return new IntegrationEventRequest(this._eventType, this._onCreate, this._onUpdate, this._onDelete, this._store, this._iri);
    }
}
exports.IntegrationEventRequestBuilder = IntegrationEventRequestBuilder;
