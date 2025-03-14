// FileResponse.ts
import { AbstractResponse } from '../base';
import { LdType } from '../../enum';

/**
 * DTO for file responses
 */
export class FileResponse extends AbstractResponse {
    /**
     * Create a new FileResponse
     *
     * @param ldId File IRI
     * @param ldType File type
     * @param uuid File UUID
     * @param createdAt Creation timestamp
     * @param updatedAt Last update timestamp
     * @param name File name
     * @param extension File extension
     * @param mimeType File MIME type
     * @param url File URL
     */
    constructor(
        ldId: string,
        ldType: LdType,
        uuid: string,
        createdAt: Date,
        updatedAt: Date,
        private readonly name: string,
        private readonly extension: string | null = null,
        private readonly mimeType: string | null = null,
        private readonly url: string | null = null
    ) {
        super(ldId, ldType, uuid, createdAt, updatedAt);
    }

    /**
     * Get the file name
     */
    getName(): string {
        return this.name;
    }

    /**
     * Get the file extension
     */
    getExtension(): string | null {
        return this.extension;
    }

    /**
     * Get the file MIME type
     */
    getMimeType(): string | null {
        return this.mimeType;
    }

    /**
     * Get the file URL
     */
    getUrl(): string | null {
        return this.url;
    }

    /**
     * Convert to a plain object
     */
    toJSON(): Record<string, any> {
        return {
            ...super.toJSON(),
            name: this.name,
            extension: this.extension,
            mimeType: this.mimeType,
            url: this.url
        };
    }

    /**
     * Create from API JSON data
     */
    static fromJSON(data: any): FileResponse {
        return new FileResponse(
            data['@id'] || '',
            data['@type'] as LdType || LdType.File,
            data.uuid || '',
            new Date(data.createdAt),
            new Date(data.updatedAt),
            data.name || '',
            data.extension || null,
            data.mimeType || null,
            data.url || null
        );
    }
}