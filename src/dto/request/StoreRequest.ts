import { AbstractDTO } from '../base';
import { RequestDTO } from '../../types';

/**
 * DTO for store creation and update requests
 */
export class StoreRequest extends AbstractDTO implements RequestDTO {
    /**
     * Create a new StoreRequest
     *
     * @param name Store name
     * @param description Store description
     * @param image Store image URL
     * @param iri Store IRI (used for updates, not sent in requests)
     */
    constructor(
        private readonly name: string | null = null,
        private readonly description: string | null = null,
        private readonly image: string | null = null,
        private readonly iri: string | null = null
    ) {
        super();
    }

    /**
     * Get the store name
     */
    getName(): string | null {
        return this.name;
    }

    /**
     * Get the store description
     */
    getDescription(): string | null {
        return this.description;
    }

    /**
     * Get the store image URL
     */
    getImage(): string | null {
        return this.image;
    }

    /**
     * Get the store IRI
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

        if (this.description !== null) {
            data.description = this.description;
        }

        if (this.image !== null) {
            data.image = this.image;
        }

        return data;
    }

    /**
     * Create a builder for StoreRequest
     */
    static builder(): StoreRequestBuilder {
        return new StoreRequestBuilder();
    }
}

/**
 * Builder for StoreRequest
 */
export class StoreRequestBuilder {
    private _name: string | null = null;
    private _description: string | null = null;
    private _image: string | null = null;
    private _iri: string | null = null;

    /**
     * Set the store name
     */
    name(name: string): StoreRequestBuilder {
        this._name = name;
        return this;
    }

    /**
     * Set the store description
     */
    description(description: string): StoreRequestBuilder {
        this._description = description;
        return this;
    }

    /**
     * Set the store image URL
     */
    image(image: string): StoreRequestBuilder {
        this._image = image;
        return this;
    }

    /**
     * Set the store IRI
     */
    iri(iri: string): StoreRequestBuilder {
        this._iri = iri;
        return this;
    }

    /**
     * Build the StoreRequest
     */
    build(): StoreRequest {
        return new StoreRequest(
            this._name,
            this._description,
            this._image,
            this._iri
        );
    }
}