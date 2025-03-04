import { LdType } from '../enum';

/**
 * Base interface for all DTOs
 */
export interface DTO {
    /**
     * Convert to a plain object
     */
    toJSON(): Record<string, any>;
}

/**
 * Interface for request DTOs
 */
export interface RequestDTO extends DTO {
    /**
     * Convert to a plain object for API requests
     */
    toJSON(): Record<string, any>;
}

/**
 * Interface for response DTOs
 */
export interface ResponseDTO extends DTO {
    /**
     * Get the UUID of the resource
     */
    getUuid(): string;

    /**
     * Get the creation timestamp of the resource
     */
    getCreatedAt(): Date;

    /**
     * Get the last update timestamp of the resource
     */
    getUpdatedAt(): Date;
}

/**
 * Interface for JSON-LD resources
 */
export interface JsonLDResource {
    /**
     * Get the IRI (Internationalized Resource Identifier) of the resource
     */
    getLdId(): string;

    /**
     * Get the type of the resource
     */
    getLdType(): LdType;
}

/**
 * Interface for partial collection views (pagination info)
 */
export interface PartialCollectionViewData {
    /**
     * Get the IRI of the current page
     */
    getLdId(): string;

    /**
     * Get the IRI of the first page
     */
    getLdFirst(): string | null;

    /**
     * Get the IRI of the last page
     */
    getLdLast(): string | null;

    /**
     * Get the IRI of the next page
     */
    getLdNext(): string | null;

    /**
     * Get the IRI of the previous page
     */
    getLdPrevious(): string | null;
}

/**
 * Interface for collection resources
 */
export interface JsonLDCollectionResource {
    /**
     * Get the JSON-LD context of the collection
     */
    getLdContext(): string;

    /**
     * Get the IRI of the collection
     */
    getLdId(): string;

    /**
     * Get the type of the collection
     */
    getLdType(): LdType;

    /**
     * Get the items in the collection
     */
    getLdMembers(): ResponseDTO[];

    /**
     * Get the total number of items in the collection (across all pages)
     */
    getLdTotalItems(): number;

    /**
     * Get the pagination information for the collection
     */
    getLdView(): PartialCollectionViewData | null;
}