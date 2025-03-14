// dto/request/BrandRequest.ts
import { AbstractDTO } from '../base';
import { RequestDTO } from '../../types';

/**
 * DTO for brand creation and update requests
 */
export class BrandRequest extends AbstractDTO implements RequestDTO {
    /**
     * Create a new BrandRequest
     *
     * @param name Brand name
     * @param description Brand description
     * @param image Brand image URL
     * @param iri Brand IRI (used for updates, not sent in requests)
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
     * Get the brand name
     */
    getName(): string | null {
        return this.name;
    }

    /**
     * Get the brand description
     */
    getDescription(): string | null {
        return this.description;
    }

    /**
     * Get the brand image URL
     */
    getImage(): string | null {
        return this.image;
    }

    /**
     * Get the brand IRI
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
     * Create a builder for BrandRequest
     */
    static builder(): BrandRequestBuilder {
        return new BrandRequestBuilder();
    }
}

/**
 * Builder for BrandRequest
 */
export class BrandRequestBuilder {
    private _name: string | null = null;
    private _description: string | null = null;
    private _image: string | null = null;
    private _iri: string | null = null;

    /**
     * Set the brand name
     */
    name(name: string): BrandRequestBuilder {
        this._name = name;
        return this;
    }

    /**
     * Set the brand description
     */
    description(description: string): BrandRequestBuilder {
        this._description = description;
        return this;
    }

    /**
     * Set the brand image URL
     */
    image(image: string): BrandRequestBuilder {
        this._image = image;
        return this;
    }

    /**
     * Set the brand IRI
     */
    iri(iri: string): BrandRequestBuilder {
        this._iri = iri;
        return this;
    }

    /**
     * Build the BrandRequest
     */
    build(): BrandRequest {
        return new BrandRequest(
            this._name,
            this._description,
            this._image,
            this._iri
        );
    }
}