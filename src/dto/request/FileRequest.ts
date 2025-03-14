// FileRequest.ts
import { AbstractDTO } from '../base';
import { RequestDTO } from '../../types';

/**
 * DTO for file creation and update requests
 */
export class FileRequest extends AbstractDTO implements RequestDTO {
    /**
     * Create a new FileRequest
     *
     * @param name File name
     * @param url File URL
     * @param iri File IRI (used for updates, not sent in requests)
     */
    constructor(
        private readonly name: string | null = null,
        private readonly url: string | null = null,
        private readonly iri: string | null = null
    ) {
        super();
    }

    /**
     * Get the file name
     */
    getName(): string | null {
        return this.name;
    }

    /**
     * Get the file URL
     */
    getUrl(): string | null {
        return this.url;
    }

    /**
     * Get the file IRI
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

        if (this.url !== null) {
            data.url = this.url;
        }

        return data;
    }

    /**
     * Create a builder for FileRequest
     */
    static builder(): FileRequestBuilder {
        return new FileRequestBuilder();
    }
}

/**
 * Builder for FileRequest
 */
export class FileRequestBuilder {
    private _name: string | null = null;
    private _url: string | null = null;
    private _iri: string | null = null;

    /**
     * Set the file name
     */
    name(name: string): FileRequestBuilder {
        this._name = name;
        return this;
    }

    /**
     * Set the file URL
     */
    url(url: string): FileRequestBuilder {
        this._url = url;
        return this;
    }

    /**
     * Set the file IRI
     */
    iri(iri: string): FileRequestBuilder {
        this._iri = iri;
        return this;
    }

    /**
     * Build the FileRequest
     */
    build(): FileRequest {
        return new FileRequest(
            this._name,
            this._url,
            this._iri
        );
    }
}