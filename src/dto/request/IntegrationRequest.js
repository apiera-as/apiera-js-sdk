"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationRequestBuilder = exports.IntegrationRequest = void 0;
// IntegrationRequest.ts
const base_1 = require("../base");
/**
 * DTO for integration creation and update requests
 */
class IntegrationRequest extends base_1.AbstractDTO {
    /**
     * Create a new IntegrationRequest
     *
     * @param name Integration name
     * @param protocol Integration protocol
     * @param status Integration status
     * @param events Integration events
     * @param iri Integration IRI (used for updates, not sent in requests)
     */
    constructor(name = null, protocol = null, status = null, events = null, iri = null) {
        super();
        this.name = name;
        this.protocol = protocol;
        this.status = status;
        this.events = events;
        this.iri = iri;
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
     * Get the integration IRI
     */
    getIri() {
        return this.iri;
    }
    /**
     * Convert to a plain object for API requests
     */
    toJSON() {
        const data = {};
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
    static builder() {
        return new IntegrationRequestBuilder();
    }
}
exports.IntegrationRequest = IntegrationRequest;
/**
 * Builder for IntegrationRequest
 */
class IntegrationRequestBuilder {
    constructor() {
        this._name = null;
        this._protocol = null;
        this._status = null;
        this._events = null;
        this._iri = null;
    }
    /**
     * Set the integration name
     */
    name(name) {
        this._name = name;
        return this;
    }
    /**
     * Set the integration protocol
     */
    protocol(protocol) {
        this._protocol = protocol;
        return this;
    }
    /**
     * Set the integration status
     */
    status(status) {
        this._status = status;
        return this;
    }
    /**
     * Set the integration events
     */
    events(events) {
        this._events = events;
        return this;
    }
    /**
     * Set the integration IRI
     */
    iri(iri) {
        this._iri = iri;
        return this;
    }
    /**
     * Build the IntegrationRequest
     */
    build() {
        return new IntegrationRequest(this._name, this._protocol, this._status, this._events, this._iri);
    }
}
exports.IntegrationRequestBuilder = IntegrationRequestBuilder;
