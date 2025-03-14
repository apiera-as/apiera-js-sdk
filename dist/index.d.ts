/**
 * Interface for custom token providers
 */
interface TokenProvider {
    /**
     * Get an authentication token
     */
    getToken(): Promise<string>;
}
/**
 * Manages authentication tokens for the API client
 */
declare class TokenStore {
    private token;
    private tokenProvider;
    /**
     * Set a token directly
     */
    setToken(token: string): void;
    /**
     * Get the current token
     */
    getCurrentToken(): string | null;
    /**
     * Clear the current token
     */
    clearToken(): void;
    /**
     * Set a token provider for automatic token retrieval
     */
    setTokenProvider(provider: TokenProvider): void;
    /**
     * Get a token, either from the stored token or from the provider
     */
    getToken(): Promise<string | null>;
}

/**
 * Configuration options for the API client
 */
interface ApiClientConfig {
    /**
     * Base URL for the API
     */
    baseUrl: string;
    /**
     * Initial JWT token (optional)
     */
    token?: string;
    /**
     * Request timeout in milliseconds
     */
    timeout?: number;
    /**
     * Additional headers to include with every request
     */
    headers?: Record<string, string>;
}
/**
 * API error response
 */
declare class ApiError extends Error {
    readonly status?: number | undefined;
    readonly data?: any | undefined;
    constructor(message: string, status?: number | undefined, data?: any | undefined);
}
/**
 * Client for making API requests
 */
declare class ApiClient {
    private client;
    private config;
    private tokenStore;
    /**
     * Create a new API client
     */
    constructor(config: ApiClientConfig, tokenStore: TokenStore);
    /**
     * Make a GET request to the API
     */
    get<T = any>(path: string, params?: Record<string, any>): Promise<T>;
    /**
     * Make a POST request to the API
     */
    post<T = any>(path: string, data?: any): Promise<T>;
    /**
     * Make a PUT request to the API
     */
    put<T = any>(path: string, data?: any): Promise<T>;
    /**
     * Make a PATCH request to the API
     */
    patch<T = any>(path: string, data?: any): Promise<T>;
    /**
     * Make a DELETE request to the API
     */
    delete<T = any>(path: string): Promise<T>;
}

/**
 * Base class for all API services
 */
declare abstract class BaseService {
    protected readonly apiClient: ApiClient;
    protected readonly basePath: string;
    /**
     * Create a new service
     *
     * @param apiClient API client
     * @param basePath Base path for the service endpoints
     */
    constructor(apiClient: ApiClient, basePath: string);
    /**
     * Extract the ID from an IRI
     *
     * @param iri IRI to extract from (e.g., "https://api.apiera.com/v1/stores/123")
     * @returns Extracted ID (e.g., "123")
     */
    protected extractIdFromIri(iri: string): string;
}

/**
 * JSON-LD resource types
 */
declare enum LdType {
    Store = "Store",
    Product = "Product",
    AlternateIdentifier = "AlternateIdentifier",
    Sku = "Sku",
    File = "File",
    Integration = "Integration",
    IntegrationEvent = "IntegrationEvent",
    Attribute = "Attribute",
    AttributeTerm = "AttributeTerm",
    Brand = "Brand",
    Collection = "Collection"
}

declare enum AlternateIdentifierType {
    DISTRIBUTOR_SKU = "distributor_sku",
    EAN = "ean",
    EAN8 = "ean8",
    UPC = "upc",
    UPC_E = "upc_e",
    ISBN = "isbn",
    ISBN13 = "isbn13",
    MPN = "mpn",
    GTIN = "gtin",
    ASIN = "asin",
    LEGACY_CODE = "legacy_code",
    CUSTOM = "custom"
}

declare enum IntegrationEventType {
    ATTRIBUTE = "attribute",
    ATTRIBUTE_TERM = "attribute_term",
    BRAND = "brand",
    CATEGORY = "category",
    DISTRIBUTOR = "distributor",
    FILE = "file",
    INTEGRATION_RESOURCE_MAP = "integration_resource_map",
    INVENTORY = "inventory",
    INVENTORY_LOCATION = "inventory_location",
    PRODUCT = "product",
    SKU = "sku",
    STORE = "store",
    TAG = "tag",
    VARIANT = "variant",
    ALTERNATE_IDENTIFIER = "alternate_identifier",
    PROPERTY = "property",
    PROPERTY_TERM = "property_term"
}

declare enum IntegrationProtocol {
    RABBITMQ = "rabbitmq",
    WEBHOOK = "webhook",
    NONE = "none"
}

declare enum IntegrationStatus {
    ACTIVE = "active",
    INACTIVE = "inactive"
}

/**
 * Base interface for all DTOs
 */
interface DTO {
    /**
     * Convert to a plain object
     */
    toJSON(): Record<string, any>;
}
/**
 * Interface for request DTOs
 */
interface RequestDTO extends DTO {
    /**
     * Convert to a plain object for API requests
     */
    toJSON(): Record<string, any>;
}
/**
 * Interface for response DTOs
 */
interface ResponseDTO extends DTO {
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
interface JsonLDResource {
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
interface PartialCollectionViewData {
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
interface JsonLDCollectionResource {
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

/**
 * Abstract base class for all DTOs
 */
declare abstract class AbstractDTO implements DTO {
    /**
     * Convert the DTO to a plain object
     */
    abstract toJSON(): Record<string, any>;
}

/**
 * Abstract base class for single resource responses
 */
declare abstract class AbstractResponse extends AbstractDTO implements ResponseDTO, JsonLDResource {
    private readonly ldId;
    private readonly ldType;
    private readonly uuid;
    private readonly createdAt;
    private readonly updatedAt;
    /**
     * Create a new AbstractResponse
     *
     * @param ldId IRI of the resource
     * @param ldType Type of the resource
     * @param uuid UUID of the resource
     * @param createdAt Creation timestamp
     * @param updatedAt Last update timestamp
     */
    constructor(ldId: string, ldType: LdType, uuid: string, createdAt: Date, updatedAt: Date);
    /**
     * Get the IRI of the resource
     */
    getLdId(): string;
    /**
     * Get the type of the resource
     */
    getLdType(): LdType;
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
    /**
     * Convert to a plain object
     */
    toJSON(): Record<string, any>;
}

/**
 * Represents pagination information for a collection
 */
declare class PartialCollectionView extends AbstractDTO implements PartialCollectionViewData {
    private readonly ldId;
    private readonly ldFirst;
    private readonly ldLast;
    private readonly ldNext;
    private readonly ldPrevious;
    /**
     * Create a new PartialCollectionView instance
     *
     * @param ldId IRI of the current page
     * @param ldFirst IRI of the first page
     * @param ldLast IRI of the last page
     * @param ldNext IRI of the next page
     * @param ldPrevious IRI of the previous page
     */
    constructor(ldId: string, ldFirst?: string | null, ldLast?: string | null, ldNext?: string | null, ldPrevious?: string | null);
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
    /**
     * Convert to a plain object
     */
    toJSON(): Record<string, any>;
    /**
     * Create from API JSON data
     */
    static fromJSON(data: any): PartialCollectionView;
}

/**
 * Abstract base class for collection responses
 */
declare abstract class AbstractCollectionResponse extends AbstractDTO implements JsonLDCollectionResource {
    private readonly ldContext;
    private readonly ldId;
    private readonly ldType;
    private readonly ldMembers;
    private readonly ldTotalItems;
    private readonly ldView;
    /**
     * Create a new AbstractCollectionResponse
     *
     * @param ldContext JSON-LD context of the collection
     * @param ldId IRI of the collection
     * @param ldType Type of the collection
     * @param ldMembers Items in the collection
     * @param ldTotalItems Total number of items across all pages
     * @param ldView Pagination information
     */
    constructor(ldContext: string, ldId: string, ldType: LdType, ldMembers?: ResponseDTO[], ldTotalItems?: number, ldView?: PartialCollectionView | null);
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
     * Get the total number of items across all pages
     */
    getLdTotalItems(): number;
    /**
     * Get the pagination information
     */
    getLdView(): PartialCollectionView | null;
    /**
     * Convert to a plain object
     */
    toJSON(): Record<string, any>;
}

/**
 * Query parameters for API requests
 */
declare class QueryParameters extends AbstractDTO {
    private readonly params;
    private readonly filters;
    private readonly page;
    /**
     * Create a new QueryParameters instance
     *
     * @param params General parameters (sorting, ordering, etc.)
     * @param filters Filter parameters
     * @param page Page number
     */
    constructor(params?: Record<string, any>, filters?: Record<string, string>, page?: number | null);
    /**
     * Get the general parameters
     */
    getParams(): Record<string, any>;
    /**
     * Get the filter parameters
     */
    getFilters(): Record<string, string>;
    /**
     * Get the page number
     */
    getPage(): number | null;
    /**
     * Convert to a plain object for API requests
     */
    toJSON(): Record<string, any>;
    /**
     * Create a builder for QueryParameters
     */
    static builder(): QueryParametersBuilder;
}
/**
 * Builder for QueryParameters
 */
declare class QueryParametersBuilder {
    private _params;
    private _filters;
    private _page;
    /**
     * Add a general parameter
     */
    param(key: string, value: any): QueryParametersBuilder;
    /**
     * Add multiple general parameters
     */
    params(params: Record<string, any>): QueryParametersBuilder;
    /**
     * Add a filter parameter
     */
    filter(key: string, value: string): QueryParametersBuilder;
    /**
     * Add multiple filter parameters
     */
    filters(filters: Record<string, string>): QueryParametersBuilder;
    /**
     * Set the page number
     */
    page(page: number): QueryParametersBuilder;
    /**
     * Build the QueryParameters instance
     */
    build(): QueryParameters;
}

/**
 * DTO for store creation and update requests
 */
declare class StoreRequest extends AbstractDTO implements RequestDTO {
    private readonly name;
    private readonly description;
    private readonly image;
    private readonly iri;
    /**
     * Create a new StoreRequest
     *
     * @param name Store name
     * @param description Store description
     * @param image Store image URL
     * @param iri Store IRI (used for updates, not sent in requests)
     */
    constructor(name?: string | null, description?: string | null, image?: string | null, iri?: string | null);
    /**
     * Get the store name
     */
    getName(): string | null;
    /**
     * Get the store description
     */
    getDescription(): string | null;
    /**
     * Get the store image URL
     */
    getImage(): string | null;
    /**
     * Get the store IRI
     */
    getIri(): string | null;
    /**
     * Convert to a plain object for API requests
     */
    toJSON(): Record<string, any>;
    /**
     * Create a builder for StoreRequest
     */
    static builder(): StoreRequestBuilder;
}
/**
 * Builder for StoreRequest
 */
declare class StoreRequestBuilder {
    private _name;
    private _description;
    private _image;
    private _iri;
    /**
     * Set the store name
     */
    name(name: string): StoreRequestBuilder;
    /**
     * Set the store description
     */
    description(description: string): StoreRequestBuilder;
    /**
     * Set the store image URL
     */
    image(image: string): StoreRequestBuilder;
    /**
     * Set the store IRI
     */
    iri(iri: string): StoreRequestBuilder;
    /**
     * Build the StoreRequest
     */
    build(): StoreRequest;
}

/**
 * DTO for product creation and update requests
 */
declare class ProductRequest extends AbstractDTO implements RequestDTO {
    private readonly name;
    private readonly type;
    private readonly price;
    private readonly salePrice;
    private readonly description;
    private readonly shortDescription;
    private readonly weight;
    private readonly length;
    private readonly width;
    private readonly height;
    private readonly status;
    private readonly distributor;
    private readonly brand;
    private readonly sku;
    private readonly image;
    private readonly categories;
    private readonly tags;
    private readonly attributes;
    private readonly images;
    private readonly alternateIdentifiers;
    private readonly propertyTerms;
    private readonly iri;
    /**
     * Create a new ProductRequest
     */
    constructor(name?: string | null, type?: 'simple' | string | null, price?: string | null, salePrice?: string | null, description?: string | null, shortDescription?: string | null, weight?: string | null, length?: string | null, width?: string | null, height?: string | null, status?: 'active' | string | null, distributor?: string | null, brand?: string | null, sku?: string | null, image?: string | null, categories?: string[] | null, tags?: string[] | null, attributes?: string[] | null, images?: string[] | null, alternateIdentifiers?: string[] | null, propertyTerms?: string[] | null, iri?: string | null);
    getName(): string | null;
    getType(): string | null;
    getPrice(): string | null;
    getSalePrice(): string | null;
    getDescription(): string | null;
    getShortDescription(): string | null;
    getWeight(): string | null;
    getLength(): string | null;
    getWidth(): string | null;
    getHeight(): string | null;
    getStatus(): string | null;
    getDistributor(): string | null;
    getBrand(): string | null;
    getSku(): string | null;
    getImage(): string | null;
    getCategories(): string[] | null;
    getTags(): string[] | null;
    getAttributes(): string[] | null;
    getImages(): string[] | null;
    getAlternateIdentifiers(): string[] | null;
    getPropertyTerms(): string[] | null;
    getIri(): string | null;
    /**
     * Convert to a plain object for API requests
     */
    toJSON(): Record<string, any>;
    /**
     * Create a builder for ProductRequest
     */
    static builder(): ProductRequestBuilder;
}
/**
 * Builder for ProductRequest
 */
declare class ProductRequestBuilder {
    private _name;
    private _type;
    private _price;
    private _salePrice;
    private _description;
    private _shortDescription;
    private _weight;
    private _length;
    private _width;
    private _height;
    private _status;
    private _distributor;
    private _brand;
    private _sku;
    private _image;
    private _categories;
    private _tags;
    private _attributes;
    private _images;
    private _alternateIdentifiers;
    private _propertyTerms;
    private _iri;
    name(name: string): ProductRequestBuilder;
    type(type: string): ProductRequestBuilder;
    price(price: string): ProductRequestBuilder;
    salePrice(salePrice: string): ProductRequestBuilder;
    description(description: string): ProductRequestBuilder;
    shortDescription(shortDescription: string): ProductRequestBuilder;
    weight(weight: string): ProductRequestBuilder;
    length(length: string): ProductRequestBuilder;
    width(width: string): ProductRequestBuilder;
    height(height: string): ProductRequestBuilder;
    status(status: string): ProductRequestBuilder;
    distributor(distributor: string): ProductRequestBuilder;
    brand(brand: string): ProductRequestBuilder;
    sku(sku: string): ProductRequestBuilder;
    image(image: string): ProductRequestBuilder;
    categories(categories: string[]): ProductRequestBuilder;
    tags(tags: string[]): ProductRequestBuilder;
    attributes(attributes: string[]): ProductRequestBuilder;
    images(images: string[]): ProductRequestBuilder;
    alternateIdentifiers(alternateIdentifiers: string[]): ProductRequestBuilder;
    propertyTerms(propertyTerms: string[]): ProductRequestBuilder;
    iri(iri: string): ProductRequestBuilder;
    /**
     * Build the ProductRequest
     */
    build(): ProductRequest;
}

/**
 * DTO for alternate identifier creation and update requests
 */
declare class AlternateIdentifierRequest extends AbstractDTO implements RequestDTO {
    private readonly code;
    private readonly type;
    constructor(code?: string | null, type?: AlternateIdentifierType | null);
    getCode(): string | null;
    getType(): AlternateIdentifierType | null;
    toJSON(): Record<string, any>;
    static builder(): AlternateIdentifierRequestBuilder;
}
declare class AlternateIdentifierRequestBuilder {
    private _code;
    private _type;
    code(code: string): AlternateIdentifierRequestBuilder;
    type(type: AlternateIdentifierType): AlternateIdentifierRequestBuilder;
    build(): AlternateIdentifierRequest;
}

declare class SkuRequest extends AbstractDTO implements RequestDTO {
    private readonly code;
    private readonly iri;
    constructor(code?: string | null, iri?: string | null);
    getCode(): string | null;
    getIri(): string | null;
    toJSON(): Record<string, any>;
    static builder(): SkuRequestBuilder;
}
declare class SkuRequestBuilder {
    private _code;
    private _iri;
    code(code: string): SkuRequestBuilder;
    iri(iri: string): SkuRequestBuilder;
    build(): SkuRequest;
}

/**
 * DTO for file creation and update requests
 */
declare class FileRequest extends AbstractDTO implements RequestDTO {
    private readonly name;
    private readonly url;
    private readonly iri;
    /**
     * Create a new FileRequest
     *
     * @param name File name
     * @param url File URL
     * @param iri File IRI (used for updates, not sent in requests)
     */
    constructor(name?: string | null, url?: string | null, iri?: string | null);
    /**
     * Get the file name
     */
    getName(): string | null;
    /**
     * Get the file URL
     */
    getUrl(): string | null;
    /**
     * Get the file IRI
     */
    getIri(): string | null;
    /**
     * Convert to a plain object for API requests
     */
    toJSON(): Record<string, any>;
    /**
     * Create a builder for FileRequest
     */
    static builder(): FileRequestBuilder;
}
/**
 * Builder for FileRequest
 */
declare class FileRequestBuilder {
    private _name;
    private _url;
    private _iri;
    /**
     * Set the file name
     */
    name(name: string): FileRequestBuilder;
    /**
     * Set the file URL
     */
    url(url: string): FileRequestBuilder;
    /**
     * Set the file IRI
     */
    iri(iri: string): FileRequestBuilder;
    /**
     * Build the FileRequest
     */
    build(): FileRequest;
}

/**
 * DTO for integration event creation and update requests
 */
declare class IntegrationEventRequest extends AbstractDTO implements RequestDTO {
    private readonly eventType;
    private readonly onCreate;
    private readonly onUpdate;
    private readonly onDelete;
    private readonly store;
    private readonly iri;
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
    constructor(eventType?: IntegrationEventType | null, onCreate?: boolean | null, onUpdate?: boolean | null, onDelete?: boolean | null, store?: string | null, iri?: string | null);
    /**
     * Get the event type
     */
    getEventType(): IntegrationEventType | null;
    /**
     * Get onCreate flag
     */
    getOnCreate(): boolean | null;
    /**
     * Get onUpdate flag
     */
    getOnUpdate(): boolean | null;
    /**
     * Get onDelete flag
     */
    getOnDelete(): boolean | null;
    /**
     * Get the store IRI
     */
    getStore(): string | null;
    /**
     * Get the event IRI
     */
    getIri(): string | null;
    /**
     * Convert to a plain object for API requests
     */
    toJSON(): Record<string, any>;
    /**
     * Create a builder for IntegrationEventRequest
     */
    static builder(): IntegrationEventRequestBuilder;
}
/**
 * Builder for IntegrationEventRequest
 */
declare class IntegrationEventRequestBuilder {
    private _eventType;
    private _onCreate;
    private _onUpdate;
    private _onDelete;
    private _store;
    private _iri;
    /**
     * Set the event type
     */
    eventType(eventType: IntegrationEventType): IntegrationEventRequestBuilder;
    /**
     * Set the onCreate flag
     */
    onCreate(onCreate: boolean): IntegrationEventRequestBuilder;
    /**
     * Set the onUpdate flag
     */
    onUpdate(onUpdate: boolean): IntegrationEventRequestBuilder;
    /**
     * Set the onDelete flag
     */
    onDelete(onDelete: boolean): IntegrationEventRequestBuilder;
    /**
     * Set the store IRI
     */
    store(store: string): IntegrationEventRequestBuilder;
    /**
     * Set the event IRI
     */
    iri(iri: string): IntegrationEventRequestBuilder;
    /**
     * Build the IntegrationEventRequest
     */
    build(): IntegrationEventRequest;
}

/**
 * DTO for integration creation and update requests
 */
declare class IntegrationRequest extends AbstractDTO implements RequestDTO {
    private readonly name;
    private readonly protocol;
    private readonly status;
    private readonly events;
    private readonly iri;
    /**
     * Create a new IntegrationRequest
     *
     * @param name Integration name
     * @param protocol Integration protocol
     * @param status Integration status
     * @param events Integration events
     * @param iri Integration IRI (used for updates, not sent in requests)
     */
    constructor(name?: string | null, protocol?: IntegrationProtocol | null, status?: IntegrationStatus | null, events?: IntegrationEventRequest[] | null, iri?: string | null);
    /**
     * Get the integration name
     */
    getName(): string | null;
    /**
     * Get the integration protocol
     */
    getProtocol(): IntegrationProtocol | null;
    /**
     * Get the integration status
     */
    getStatus(): IntegrationStatus | null;
    /**
     * Get the integration events
     */
    getEvents(): IntegrationEventRequest[] | null;
    /**
     * Get the integration IRI
     */
    getIri(): string | null;
    /**
     * Convert to a plain object for API requests
     */
    toJSON(): Record<string, any>;
    /**
     * Create a builder for IntegrationRequest
     */
    static builder(): IntegrationRequestBuilder;
}
/**
 * Builder for IntegrationRequest
 */
declare class IntegrationRequestBuilder {
    private _name;
    private _protocol;
    private _status;
    private _events;
    private _iri;
    /**
     * Set the integration name
     */
    name(name: string): IntegrationRequestBuilder;
    /**
     * Set the integration protocol
     */
    protocol(protocol: IntegrationProtocol): IntegrationRequestBuilder;
    /**
     * Set the integration status
     */
    status(status: IntegrationStatus): IntegrationRequestBuilder;
    /**
     * Set the integration events
     */
    events(events: IntegrationEventRequest[]): IntegrationRequestBuilder;
    /**
     * Set the integration IRI
     */
    iri(iri: string): IntegrationRequestBuilder;
    /**
     * Build the IntegrationRequest
     */
    build(): IntegrationRequest;
}

declare class AttributeRequest extends AbstractDTO implements RequestDTO {
    private readonly name;
    private readonly iri;
    constructor(name?: string | null, iri?: string | null);
    getName(): string | null;
    getIri(): string | null;
    toJSON(): Record<string, any>;
    static builder(): AttributeRequestBuilder;
}
declare class AttributeRequestBuilder {
    private _name;
    private _iri;
    name(name: string): AttributeRequestBuilder;
    iri(iri: string): AttributeRequestBuilder;
    build(): AttributeRequest;
}

declare class AttributeTermRequest extends AbstractDTO implements RequestDTO {
    private readonly name;
    private readonly iri;
    constructor(name?: string | null, iri?: string | null);
    getName(): string | null;
    getIri(): string | null;
    toJSON(): Record<string, any>;
    static builder(): AttributeTermRequestBuilder;
}
declare class AttributeTermRequestBuilder {
    private _name;
    private _iri;
    name(name: string): AttributeTermRequestBuilder;
    iri(iri: string): AttributeTermRequestBuilder;
    build(): AttributeTermRequest;
}

/**
 * DTO for brand creation and update requests
 */
declare class BrandRequest extends AbstractDTO implements RequestDTO {
    private readonly name;
    private readonly description;
    private readonly image;
    private readonly iri;
    /**
     * Create a new BrandRequest
     *
     * @param name Brand name
     * @param description Brand description
     * @param image Brand image URL
     * @param iri Brand IRI (used for updates, not sent in requests)
     */
    constructor(name?: string | null, description?: string | null, image?: string | null, iri?: string | null);
    /**
     * Get the brand name
     */
    getName(): string | null;
    /**
     * Get the brand description
     */
    getDescription(): string | null;
    /**
     * Get the brand image URL
     */
    getImage(): string | null;
    /**
     * Get the brand IRI
     */
    getIri(): string | null;
    /**
     * Convert to a plain object for API requests
     */
    toJSON(): Record<string, any>;
    /**
     * Create a builder for BrandRequest
     */
    static builder(): BrandRequestBuilder;
}
/**
 * Builder for BrandRequest
 */
declare class BrandRequestBuilder {
    private _name;
    private _description;
    private _image;
    private _iri;
    /**
     * Set the brand name
     */
    name(name: string): BrandRequestBuilder;
    /**
     * Set the brand description
     */
    description(description: string): BrandRequestBuilder;
    /**
     * Set the brand image URL
     */
    image(image: string): BrandRequestBuilder;
    /**
     * Set the brand IRI
     */
    iri(iri: string): BrandRequestBuilder;
    /**
     * Build the BrandRequest
     */
    build(): BrandRequest;
}

/**
 * DTO for store responses
 */
declare class StoreResponse extends AbstractResponse {
    private readonly name;
    private readonly description;
    private readonly image;
    /**
     * Create a new StoreResponse
     *
     * @param ldId Store IRI
     * @param ldType Store type
     * @param uuid Store UUID
     * @param createdAt Creation timestamp
     * @param updatedAt Last update timestamp
     * @param name Store name
     * @param description Store description
     * @param image Store image URL
     */
    constructor(ldId: string, ldType: LdType, uuid: string, createdAt: Date, updatedAt: Date, name: string, description?: string | null, image?: string | null);
    /**
     * Get the store name
     */
    getName(): string;
    /**
     * Get the store description
     */
    getDescription(): string | null;
    /**
     * Get the store image URL
     */
    getImage(): string | null;
    /**
     * Convert to a plain object
     */
    toJSON(): Record<string, any>;
    /**
     * Create from API JSON data
     */
    static fromJSON(data: any): StoreResponse;
}

/**
 * DTO for store collection responses
 */
declare class StoreCollectionResponse extends AbstractCollectionResponse {
    /**
     * Create a new StoreCollectionResponse
     *
     * @param ldContext JSON-LD context
     * @param ldId Collection IRI
     * @param ldType Collection type
     * @param ldMembers Stores in the collection
     * @param ldTotalItems Total number of stores
     * @param ldView Pagination information
     */
    constructor(ldContext: string, ldId: string, ldType: LdType, ldMembers?: StoreResponse[], ldTotalItems?: number, ldView?: PartialCollectionView | null);
    /**
     * Get the stores in the collection
     */
    getLdMembers(): StoreResponse[];
    /**
     * Create from API JSON data
     */
    static fromJSON(data: any): StoreCollectionResponse;
}

/**
 * DTO for product responses
 */
declare class ProductResponse extends AbstractResponse {
    private readonly name;
    private readonly type;
    private readonly price;
    private readonly salePrice;
    private readonly description;
    private readonly shortDescription;
    private readonly weight;
    private readonly length;
    private readonly width;
    private readonly height;
    private readonly status;
    private readonly store;
    private readonly distributor;
    private readonly brand;
    private readonly sku;
    private readonly image;
    private readonly categories;
    private readonly tags;
    private readonly attributes;
    private readonly images;
    private readonly alternateIdentifiers;
    private readonly propertyTerms;
    /**
     * Create a new ProductResponse
     */
    constructor(ldId: string, ldType: LdType, uuid: string, createdAt: Date, updatedAt: Date, name: string, type: string, price?: string | null, salePrice?: string | null, description?: string | null, shortDescription?: string | null, weight?: string | null, length?: string | null, width?: string | null, height?: string | null, status?: string | null, store?: string | null, distributor?: string | null, brand?: string | null, sku?: string | null, image?: string | null, categories?: string[], tags?: string[], attributes?: string[], images?: string[], alternateIdentifiers?: string[], propertyTerms?: string[]);
    getName(): string;
    getType(): string;
    getPrice(): string | null;
    getSalePrice(): string | null;
    getDescription(): string | null;
    getShortDescription(): string | null;
    getWeight(): string | null;
    getLength(): string | null;
    getWidth(): string | null;
    getHeight(): string | null;
    getStatus(): string | null;
    getStore(): string | null;
    getDistributor(): string | null;
    getBrand(): string | null;
    getSku(): string | null;
    getImage(): string | null;
    getCategories(): string[];
    getTags(): string[];
    getAttributes(): string[];
    getImages(): string[];
    getAlternateIdentifiers(): string[];
    getPropertyTerms(): string[];
    /**
     * Convert to a plain object
     */
    toJSON(): Record<string, any>;
    /**
     * Create from API JSON data
     */
    static fromJSON(data: any): ProductResponse;
}

/**
 * DTO for product collection responses
 */
declare class ProductCollectionResponse extends AbstractCollectionResponse {
    /**
     * Create a new ProductCollectionResponse
     */
    constructor(ldContext: string, ldId: string, ldType: LdType, ldMembers?: ProductResponse[], ldTotalItems?: number, ldView?: PartialCollectionView | null);
    /**
     * Get the products in the collection
     */
    getLdMembers(): ProductResponse[];
    /**
     * Create from API JSON data
     */
    static fromJSON(data: any): ProductCollectionResponse;
}

/**
 * DTO for alternate identifier responses
 */
declare class AlternateIdentifierResponse extends AbstractResponse {
    private readonly code;
    private readonly type;
    /**
     * Create a new AlternateIdentifierResponse
     *
     * @param ldId Alternate identifier IRI
     * @param ldType Alternate identifier type
     * @param uuid Alternate identifier UUID
     * @param createdAt Creation timestamp
     * @param updatedAt Last update timestamp
     * @param code Alternate identifier code
     * @param type Alternate identifier type (e.g., EAN, UPC)
     */
    constructor(ldId: string, ldType: LdType, uuid: string, createdAt: Date, updatedAt: Date, code: string, type: AlternateIdentifierType);
    /**
     * Get the alternate identifier code
     */
    getCode(): string;
    /**
     * Get the alternate identifier type
     */
    getType(): AlternateIdentifierType;
    /**
     * Convert to a plain object
     */
    toJSON(): Record<string, any>;
    /**
     * Create from API JSON data
     */
    static fromJSON(data: any): AlternateIdentifierResponse;
}

/**
 * DTO for alternate identifier collection responses
 */
declare class AlternateIdentifierCollectionResponse extends AbstractCollectionResponse {
    /**
     * Create a new AlternateIdentifierCollectionResponse
     *
     * @param ldContext JSON-LD context
     * @param ldId Collection IRI
     * @param ldType Collection type
     * @param ldMembers Alternate identifiers in the collection
     * @param ldTotalItems Total number of alternate identifiers
     * @param ldView Pagination information
     */
    constructor(ldContext: string, ldId: string, ldType: LdType, ldMembers?: AlternateIdentifierResponse[], ldTotalItems?: number, ldView?: PartialCollectionView | null);
    /**
     * Get the alternate identifiers in the collection
     */
    getLdMembers(): AlternateIdentifierResponse[];
    /**
     * Create from API JSON data
     */
    static fromJSON(data: any): AlternateIdentifierCollectionResponse;
}

declare class SkuResponse extends AbstractResponse {
    private readonly code;
    private readonly products;
    private readonly variants;
    private readonly inventories;
    constructor(ldId: string, ldType: LdType, uuid: string, createdAt: Date, updatedAt: Date, code: string, products: string[], variants: string[], inventories: string[]);
    getCode(): string;
    getProducts(): string[];
    getVariants(): string[];
    getInventories(): string[];
    toJSON(): Record<string, any>;
    static fromJSON(data: any): SkuResponse;
}

declare class SkuCollectionResponse extends AbstractCollectionResponse {
    constructor(ldContext: string, ldId: string, ldType: LdType, ldMembers?: SkuResponse[], ldTotalItems?: number, ldView?: PartialCollectionView | null);
    getLdMembers(): SkuResponse[];
    static fromJSON(data: any): SkuCollectionResponse;
}

/**
 * DTO for file responses
 */
declare class FileResponse extends AbstractResponse {
    private readonly name;
    private readonly extension;
    private readonly mimeType;
    private readonly url;
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
    constructor(ldId: string, ldType: LdType, uuid: string, createdAt: Date, updatedAt: Date, name: string, extension?: string | null, mimeType?: string | null, url?: string | null);
    /**
     * Get the file name
     */
    getName(): string;
    /**
     * Get the file extension
     */
    getExtension(): string | null;
    /**
     * Get the file MIME type
     */
    getMimeType(): string | null;
    /**
     * Get the file URL
     */
    getUrl(): string | null;
    /**
     * Convert to a plain object
     */
    toJSON(): Record<string, any>;
    /**
     * Create from API JSON data
     */
    static fromJSON(data: any): FileResponse;
}

/**
 * DTO for file collection responses
 */
declare class FileCollectionResponse extends AbstractCollectionResponse {
    /**
     * Create a new FileCollectionResponse
     *
     * @param ldContext JSON-LD context
     * @param ldId Collection IRI
     * @param ldType Collection type
     * @param ldMembers Files in the collection
     * @param ldTotalItems Total number of files
     * @param ldView Pagination information
     */
    constructor(ldContext: string, ldId: string, ldType: LdType, ldMembers?: FileResponse[], ldTotalItems?: number, ldView?: PartialCollectionView | null);
    /**
     * Get the files in the collection
     */
    getLdMembers(): FileResponse[];
    /**
     * Create from API JSON data
     */
    static fromJSON(data: any): FileCollectionResponse;
}

/**
 * DTO for integration event responses
 */
declare class IntegrationEventResponse extends AbstractResponse {
    private readonly eventType;
    private readonly onCreate;
    private readonly onUpdate;
    private readonly onDelete;
    private readonly store;
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
    constructor(ldId: string, ldType: LdType, uuid: string, createdAt: Date, updatedAt: Date, eventType: IntegrationEventType, onCreate: boolean, onUpdate: boolean, onDelete: boolean, store?: string | null);
    /**
     * Get the event type
     */
    getEventType(): IntegrationEventType;
    /**
     * Get onCreate flag
     */
    getOnCreate(): boolean;
    /**
     * Get onUpdate flag
     */
    getOnUpdate(): boolean;
    /**
     * Get onDelete flag
     */
    getOnDelete(): boolean;
    /**
     * Get the store IRI
     */
    getStore(): string | null;
    /**
     * Convert to a plain object
     */
    toJSON(): Record<string, any>;
    /**
     * Create from API JSON data
     */
    static fromJSON(data: any): IntegrationEventResponse;
}

/**
 * DTO for integration responses
 */
declare class IntegrationResponse extends AbstractResponse {
    private readonly name;
    private readonly protocol;
    private readonly status;
    private readonly events;
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
    constructor(ldId: string, ldType: LdType, uuid: string, createdAt: Date, updatedAt: Date, name: string, protocol: IntegrationProtocol, status: IntegrationStatus, events?: IntegrationEventResponse[]);
    /**
     * Get the integration name
     */
    getName(): string;
    /**
     * Get the integration protocol
     */
    getProtocol(): IntegrationProtocol;
    /**
     * Get the integration status
     */
    getStatus(): IntegrationStatus;
    /**
     * Get the integration events
     */
    getEvents(): IntegrationEventResponse[];
    /**
     * Convert to a plain object
     */
    toJSON(): Record<string, any>;
    /**
     * Create from API JSON data
     */
    static fromJSON(data: any): IntegrationResponse;
}

/**
 * DTO for integration collection responses
 */
declare class IntegrationCollectionResponse extends AbstractCollectionResponse {
    /**
     * Create a new IntegrationCollectionResponse
     *
     * @param ldContext JSON-LD context
     * @param ldId Collection IRI
     * @param ldType Collection type
     * @param ldMembers Integrations in the collection
     * @param ldTotalItems Total number of integrations
     * @param ldView Pagination information
     */
    constructor(ldContext: string, ldId: string, ldType: LdType, ldMembers?: IntegrationResponse[], ldTotalItems?: number, ldView?: PartialCollectionView | null);
    /**
     * Get the integrations in the collection
     */
    getLdMembers(): IntegrationResponse[];
    /**
     * Create from API JSON data
     */
    static fromJSON(data: any): IntegrationCollectionResponse;
}

declare class AttributeResponse extends AbstractResponse {
    private readonly name;
    private readonly store;
    constructor(ldId: string, ldType: LdType, uuid: string, createdAt: Date, updatedAt: Date, name: string, store: string);
    getName(): string;
    getStore(): string;
    toJSON(): Record<string, any>;
    static fromJSON(data: any): AttributeResponse;
}

declare class AttributeCollectionResponse extends AbstractCollectionResponse {
    constructor(ldContext: string, ldId: string, ldType: LdType, ldMembers?: AttributeResponse[], ldTotalItems?: number, ldView?: PartialCollectionView | null);
    getLdMembers(): AttributeResponse[];
    static fromJSON(data: any): AttributeCollectionResponse;
}

declare class AttributeTermResponse extends AbstractResponse {
    private readonly name;
    private readonly attribute;
    private readonly store;
    constructor(ldId: string, ldType: LdType, uuid: string, createdAt: Date, updatedAt: Date, name: string, attribute: string, store: string);
    getName(): string;
    getAttribute(): string;
    getStore(): string;
    toJSON(): Record<string, any>;
    static fromJSON(data: any): AttributeTermResponse;
}

declare class AttributeTermCollectionResponse extends AbstractCollectionResponse {
    constructor(ldContext: string, ldId: string, ldType: LdType, ldMembers?: AttributeTermResponse[], ldTotalItems?: number, ldView?: PartialCollectionView | null);
    getLdMembers(): AttributeTermResponse[];
    static fromJSON(data: any): AttributeTermCollectionResponse;
}

/**
 * DTO for brand responses
 */
declare class BrandResponse extends AbstractResponse {
    private readonly name;
    private readonly description;
    private readonly store;
    private readonly image;
    /**
     * Create a new BrandResponse
     *
     * @param ldId Brand IRI
     * @param ldType Brand type
     * @param uuid Brand UUID
     * @param createdAt Creation timestamp
     * @param updatedAt Last update timestamp
     * @param name Brand name
     * @param description Brand description
     * @param store Store IRI
     * @param image Brand image URL
     */
    constructor(ldId: string, ldType: LdType, uuid: string, createdAt: Date, updatedAt: Date, name: string, description?: string | null, store?: string | null, image?: string | null);
    /**
     * Get the brand name
     */
    getName(): string;
    /**
     * Get the brand description
     */
    getDescription(): string | null;
    /**
     * Get the store IRI
     */
    getStore(): string | null;
    /**
     * Get the brand image URL
     */
    getImage(): string | null;
    /**
     * Convert to a plain object
     */
    toJSON(): Record<string, any>;
    /**
     * Create from API JSON data
     */
    static fromJSON(data: any): BrandResponse;
}

/**
 * DTO for brand collection responses
 */
declare class BrandCollectionResponse extends AbstractCollectionResponse {
    /**
     * Create a new BrandCollectionResponse
     *
     * @param ldContext JSON-LD context
     * @param ldId Collection IRI
     * @param ldType Collection type
     * @param ldMembers Brands in the collection
     * @param ldTotalItems Total number of brands
     * @param ldView Pagination information
     */
    constructor(ldContext: string, ldId: string, ldType: LdType, ldMembers?: BrandResponse[], ldTotalItems?: number, ldView?: PartialCollectionView | null);
    /**
     * Get the brands in the collection
     */
    getLdMembers(): BrandResponse[];
    /**
     * Create from API JSON data
     */
    static fromJSON(data: any): BrandCollectionResponse;
}

/**
 * Service for interacting with store endpoints
 */
declare class StoreService extends BaseService {
    /**
     * Create a new store service
     *
     * @param apiClient API client
     */
    constructor(apiClient: ApiClient);
    /**
     * Get all stores
     *
     * @param queryParams Optional query parameters for filtering, pagination, etc.
     * @returns Collection of stores
     */
    getAll(queryParams?: QueryParameters): Promise<StoreCollectionResponse>;
    /**
     * Get a store by ID
     *
     * @param id Store ID
     * @returns Store data
     */
    getById(id: string): Promise<StoreResponse>;
    /**
     * Get a store by IRI
     *
     * @param iri Store IRI
     * @returns Store data
     */
    getByIri(iri: string): Promise<StoreResponse>;
    /**
     * Create a new store
     *
     * @param storeRequest Store data
     * @returns The created store
     */
    create(storeRequest: StoreRequest): Promise<StoreResponse>;
    /**
     * Update an existing store
     *
     * @param id Store ID
     * @param storeRequest Updated store data
     * @returns The updated store
     */
    update(id: string, storeRequest: StoreRequest): Promise<StoreResponse>;
    /**
     * Update a store by IRI
     *
     * @param iri Store IRI
     * @param storeRequest Updated store data
     * @returns The updated store
     */
    updateByIri(iri: string, storeRequest: StoreRequest): Promise<StoreResponse>;
    /**
     * Delete a store
     *
     * @param id Store ID
     */
    delete(id: string): Promise<void>;
    /**
     * Delete a store by IRI
     *
     * @param iri Store IRI
     */
    deleteByIri(iri: string): Promise<void>;
}

/**
 * Service for interacting with product endpoints
 */
declare class ProductService extends BaseService {
    private storeIri;
    private resourcePath;
    /**
     * Create a new product service
     *
     * @param apiClient API client
     * @param storeIri Store IRI for product association
     */
    constructor(apiClient: ApiClient, storeIri: string);
    /**
     * Set the store IRI for product association
     *
     * @param storeIri The full IRI of the store
     */
    setStoreIri(storeIri: string): void;
    /**
     * Get all products for the store
     *
     * @param queryParams Optional query parameters for filtering, pagination, etc.
     * @returns Collection of products
     */
    getAll(queryParams?: QueryParameters): Promise<ProductCollectionResponse>;
    /**
     * Get a product by ID
     *
     * @param id Product ID
     * @returns Product data
     */
    getById(id: string): Promise<ProductResponse>;
    /**
     * Get a product by IRI
     *
     * @param iri Product IRI
     * @returns Product data
     */
    getByIri(iri: string): Promise<ProductResponse>;
    /**
     * Create a new product
     *
     * @param productRequest Product data
     * @returns The created product
     */
    create(productRequest: ProductRequest): Promise<ProductResponse>;
    /**
     * Update an existing product
     *
     * @param id Product ID
     * @param productRequest Updated product data
     * @returns The updated product
     */
    update(id: string, productRequest: ProductRequest): Promise<ProductResponse>;
    /**
     * Update a product by IRI
     *
     * @param iri Product IRI
     * @param productRequest Updated product data
     * @returns The updated product
     */
    updateByIri(iri: string, productRequest: ProductRequest): Promise<ProductResponse>;
    /**
     * Delete a product
     *
     * @param id Product ID
     */
    delete(id: string): Promise<void>;
    /**
     * Delete a product by IRI
     *
     * @param iri Product IRI
     */
    deleteByIri(iri: string): Promise<void>;
}

/**
 * Service for interacting with alternate identifier endpoints
 */
declare class AlternateIdentifierService extends BaseService {
    /**
     * Create a new alternate identifier service
     *
     * @param apiClient API client
     */
    constructor(apiClient: ApiClient);
    /**
     * Get all alternate identifiers
     *
     * @param queryParams Optional query parameters for filtering, pagination, etc.
     * @returns Collection of alternate identifiers
     */
    getAll(queryParams?: QueryParameters): Promise<AlternateIdentifierCollectionResponse>;
    /**
     * Get an alternate identifier by ID
     *
     * @param id Alternate identifier ID
     * @returns Alternate identifier data
     */
    getById(id: string): Promise<AlternateIdentifierResponse>;
    /**
     * Get an alternate identifier by IRI
     *
     * @param iri Alternate identifier IRI
     * @returns Alternate identifier data
     */
    getByIri(iri: string): Promise<AlternateIdentifierResponse>;
    /**
     * Create a new alternate identifier
     *
     * @param request Alternate identifier data
     * @returns The created alternate identifier
     */
    create(request: AlternateIdentifierRequest): Promise<AlternateIdentifierResponse>;
    /**
     * Update an existing alternate identifier
     *
     * @param id Alternate identifier ID
     * @param request Updated alternate identifier data
     * @returns The updated alternate identifier
     */
    update(id: string, request: AlternateIdentifierRequest): Promise<AlternateIdentifierResponse>;
    /**
     * Update an alternate identifier by IRI
     *
     * @param iri Alternate identifier IRI
     * @param request Updated alternate identifier data
     * @returns The updated alternate identifier
     */
    updateByIri(iri: string, request: AlternateIdentifierRequest): Promise<AlternateIdentifierResponse>;
    /**
     * Delete an alternate identifier
     *
     * @param id Alternate identifier ID
     */
    delete(id: string): Promise<void>;
    /**
     * Delete an alternate identifier by IRI
     *
     * @param iri Alternate identifier IRI
     */
    deleteByIri(iri: string): Promise<void>;
}

/**
 * Service for interacting with sku endpoints
 */
declare class SkuService extends BaseService {
    /**
     * Create a new sku service
     *
     * @param apiClient API client
     */
    constructor(apiClient: ApiClient);
    /**
     * Get all skus
     *
     * @param queryParams Optional query parameters for filtering, pagination, etc.
     * @returns Collection of skus
     */
    getAll(queryParams?: QueryParameters): Promise<SkuCollectionResponse>;
    /**
     * Get a sku by ID
     *
     * @param id Sku ID
     * @returns Sku data
     */
    getById(id: string): Promise<SkuResponse>;
    /**
     * Get a sku by IRI
     *
     * @param iri Sku IRI
     * @returns Sku data
     */
    getByIri(iri: string): Promise<SkuResponse>;
    /**
     * Create a new sku
     *
     * @param skuRequest Sku data
     * @returns The created sku
     */
    create(skuRequest: SkuRequest): Promise<SkuResponse>;
    /**
     * Update an existing sku
     *
     * @param id Sku ID
     * @param skuRequest Updated sku data
     * @returns The updated sku
     */
    update(id: string, skuRequest: SkuRequest): Promise<SkuResponse>;
    /**
     * Update a sku by IRI
     *
     * @param iri Sku IRI
     * @param skuRequest Updated sku data
     * @returns The updated sku
     */
    updateByIri(iri: string, skuRequest: SkuRequest): Promise<SkuResponse>;
    /**
     * Delete a sku
     *
     * @param id Sku ID
     */
    delete(id: string): Promise<void>;
    /**
     * Delete a sku by IRI
     *
     * @param iri Sku IRI
     */
    deleteByIri(iri: string): Promise<void>;
}

/**
 * Service for interacting with file endpoints
 */
declare class FileService extends BaseService {
    /**
     * Create a new file service
     *
     * @param apiClient API client
     */
    constructor(apiClient: ApiClient);
    /**
     * Get all files
     *
     * @param queryParams Optional query parameters for filtering, pagination, etc.
     * @returns Collection of files
     */
    getAll(queryParams?: QueryParameters): Promise<FileCollectionResponse>;
    /**
     * Get a file by ID
     *
     * @param id File ID
     * @returns File data
     */
    getById(id: string): Promise<FileResponse>;
    /**
     * Get a file by IRI
     *
     * @param iri File IRI
     * @returns File data
     */
    getByIri(iri: string): Promise<FileResponse>;
    /**
     * Create a new file
     *
     * @param fileRequest File data
     * @returns The created file
     */
    create(fileRequest: FileRequest): Promise<FileResponse>;
    /**
     * Delete a file
     *
     * @param id File ID
     */
    delete(id: string): Promise<void>;
    /**
     * Delete a file by IRI
     *
     * @param iri File IRI
     */
    deleteByIri(iri: string): Promise<void>;
}

/**
 * Service for interacting with integration endpoints
 */
declare class IntegrationService extends BaseService {
    /**
     * Create a new integration service
     *
     * @param apiClient API client
     */
    constructor(apiClient: ApiClient);
    /**
     * Get all integrations
     *
     * @param queryParams Optional query parameters for filtering, pagination, etc.
     * @returns Collection of integrations
     */
    getAll(queryParams?: QueryParameters): Promise<IntegrationCollectionResponse>;
    /**
     * Get an integration by ID
     *
     * @param id Integration ID
     * @returns Integration data
     */
    getById(id: string): Promise<IntegrationResponse>;
    /**
     * Get an integration by IRI
     *
     * @param iri Integration IRI
     * @returns Integration data
     */
    getByIri(iri: string): Promise<IntegrationResponse>;
    /**
     * Create a new integration
     *
     * @param integrationRequest Integration data
     * @returns The created integration
     */
    create(integrationRequest: IntegrationRequest): Promise<IntegrationResponse>;
    /**
     * Update an existing integration
     *
     * @param id Integration ID
     * @param integrationRequest Updated integration data
     * @returns The updated integration
     */
    update(id: string, integrationRequest: IntegrationRequest): Promise<IntegrationResponse>;
    /**
     * Update an integration by IRI
     *
     * @param iri Integration IRI
     * @param integrationRequest Updated integration data
     * @returns The updated integration
     */
    updateByIri(iri: string, integrationRequest: IntegrationRequest): Promise<IntegrationResponse>;
    /**
     * Delete an integration
     *
     * @param id Integration ID
     */
    delete(id: string): Promise<void>;
    /**
     * Delete an integration by IRI
     *
     * @param iri Integration IRI
     */
    deleteByIri(iri: string): Promise<void>;
}

declare class AttributeTermService extends BaseService {
    private resourcePath;
    constructor(apiClient: ApiClient, attributeIri: string);
    getAll(queryParams?: QueryParameters): Promise<AttributeTermCollectionResponse>;
    getById(id: string): Promise<AttributeTermResponse>;
    getByIri(iri: string): Promise<AttributeTermResponse>;
    create(termRequest: AttributeTermRequest): Promise<AttributeTermResponse>;
    update(id: string, termRequest: AttributeTermRequest): Promise<AttributeTermResponse>;
    updateByIri(iri: string, termRequest: AttributeTermRequest): Promise<AttributeTermResponse>;
    delete(id: string): Promise<void>;
    deleteByIri(iri: string): Promise<void>;
}

declare class AttributeService extends BaseService {
    private storeIri;
    private resourcePath;
    constructor(apiClient: ApiClient, storeIri: string);
    setStoreIri(storeIri: string): void;
    getAll(queryParams?: QueryParameters): Promise<AttributeCollectionResponse>;
    getById(id: string): Promise<AttributeResponse>;
    getByIri(iri: string): Promise<AttributeResponse>;
    create(attributeRequest: AttributeRequest): Promise<AttributeResponse>;
    update(id: string, attributeRequest: AttributeRequest): Promise<AttributeResponse>;
    updateByIri(iri: string, attributeRequest: AttributeRequest): Promise<AttributeResponse>;
    delete(id: string): Promise<void>;
    deleteByIri(iri: string): Promise<void>;
    getAttributeTermService(attributeId: string): AttributeTermService;
    getAttributeTermServiceByIri(attributeIri: string): AttributeTermService;
}

/**
 * Service for interacting with brand endpoints
 */
declare class BrandService extends BaseService {
    private storeIri;
    private resourcePath;
    /**
     * Create a new brand service
     *
     * @param apiClient API client
     * @param storeIri Store IRI for brand association
     */
    constructor(apiClient: ApiClient, storeIri: string);
    /**
     * Set the store IRI for brand association
     *
     * @param storeIri The full IRI of the store
     */
    setStoreIri(storeIri: string): void;
    /**
     * Get all brands for the store
     *
     * @param queryParams Optional query parameters for filtering, pagination, etc.
     * @returns Collection of brands
     */
    getAll(queryParams?: QueryParameters): Promise<BrandCollectionResponse>;
    /**
     * Get a brand by ID
     *
     * @param id Brand ID
     * @returns Brand data
     */
    getById(id: string): Promise<BrandResponse>;
    /**
     * Get a brand by IRI
     *
     * @param iri Brand IRI
     * @returns Brand data
     */
    getByIri(iri: string): Promise<BrandResponse>;
    /**
     * Create a new brand
     *
     * @param brandRequest Brand data
     * @returns The created brand
     */
    create(brandRequest: BrandRequest): Promise<BrandResponse>;
    /**
     * Update an existing brand
     *
     * @param id Brand ID
     * @param brandRequest Updated brand data
     * @returns The updated brand
     */
    update(id: string, brandRequest: BrandRequest): Promise<BrandResponse>;
    /**
     * Update a brand by IRI
     *
     * @param iri Brand IRI
     * @param brandRequest Updated brand data
     * @returns The updated brand
     */
    updateByIri(iri: string, brandRequest: BrandRequest): Promise<BrandResponse>;
    /**
     * Delete a brand
     *
     * @param id Brand ID
     */
    delete(id: string): Promise<void>;
    /**
     * Delete a brand by IRI
     *
     * @param iri Brand IRI
     */
    deleteByIri(iri: string): Promise<void>;
}

/**
 * Configuration options for the Apiera SDK
 */
interface ApieraSdkConfig {
    /**
     * Base URL for the API
     */
    baseUrl: string;
    /**
     * Initial JWT token (optional)
     */
    token?: string;
    /**
     * Request timeout in milliseconds
     */
    timeout?: number;
    /**
     * Additional headers to include with every request
     */
    headers?: Record<string, string>;
    /**
     * Custom token provider (optional)
     */
    tokenProvider?: TokenProvider;
}
/**
 * Main SDK class for interacting with the Apiera API
 */
declare class ApieraSdk {
    private apiClient;
    private tokenStore;
    /**
     * Services
     */
    readonly store: StoreService;
    readonly alternateIdentifier: AlternateIdentifierService;
    readonly sku: SkuService;
    readonly file: FileService;
    readonly integration: IntegrationService;
    /**
     * Create a new Apiera SDK instance
     *
     * @param config SDK configuration
     */
    constructor(config: ApieraSdkConfig);
    /**
     * Get a product service for a specific store
     *
     * @param storeIri Store IRI (e.g., "/api/v1/stores/123" or "https://api.apiera.com/api/v1/stores/123")
     * @returns Product service for the specified store
     */
    getProductService(storeIri: string): ProductService;
    /**
     * Get an attribute service for a specific store
     *
     * @param storeIri Store IRI (e.g., "/api/v1/stores/123" or "https://api.apiera.com/api/v1/stores/123")
     * @returns Attribute service for the specified store
     */
    getAttributeService(storeIri: string): AttributeService;
    /**
     * Get an attribute term service for a specific attribute
     *
     * @param attributeIri Attribute IRI (e.g., "/api/v1/stores/123/attributes/456" or "https://api.apiera.com/api/v1/stores/123/attributes/456")
     * @returns Attribute term service for the specified attribute
     */
    getAttributeTermService(attributeIri: string): AttributeTermService;
    /**
     * Get a brand service for a specific store
     *
     * @param storeIri Store IRI (e.g., "/api/v1/stores/123" or "https://api.apiera.com/api/v1/stores/123")
     * @returns Brand service for the specified store
     */
    getBrandService(storeIri: string): BrandService;
    /**
     * Set an authentication token
     *
     * @param token JWT token
     */
    setToken(token: string): void;
    /**
     * Clear the authentication token
     */
    clearToken(): void;
    /**
     * Set a custom token provider
     *
     * @param provider Token provider
     */
    setTokenProvider(provider: TokenProvider): void;
    /**
     * Get the current token, fetching from the provider if necessary
     *
     * @returns The current token, or null if no token is available
     */
    getToken(): Promise<string | null>;
}

export { AbstractCollectionResponse, AbstractDTO, AbstractResponse, AlternateIdentifierCollectionResponse, AlternateIdentifierRequest, AlternateIdentifierRequestBuilder, AlternateIdentifierResponse, AlternateIdentifierService, AlternateIdentifierType, ApiClient, type ApiClientConfig, ApiError, ApieraSdk, type ApieraSdkConfig, AttributeCollectionResponse, AttributeRequest, AttributeRequestBuilder, AttributeResponse, AttributeService, AttributeTermCollectionResponse, AttributeTermRequest, AttributeTermRequestBuilder, AttributeTermResponse, AttributeTermService, BaseService, BrandCollectionResponse, BrandRequest, BrandRequestBuilder, BrandResponse, BrandService, type DTO, FileCollectionResponse, FileRequest, FileRequestBuilder, FileResponse, FileService, IntegrationCollectionResponse, IntegrationEventRequest, IntegrationEventRequestBuilder, IntegrationEventResponse, IntegrationEventType, IntegrationProtocol, IntegrationRequest, IntegrationRequestBuilder, IntegrationResponse, IntegrationService, IntegrationStatus, type JsonLDCollectionResource, type JsonLDResource, LdType, PartialCollectionView, type PartialCollectionViewData, ProductCollectionResponse, ProductRequest, ProductRequestBuilder, ProductResponse, ProductService, QueryParameters, QueryParametersBuilder, type RequestDTO, type ResponseDTO, SkuCollectionResponse, SkuRequest, SkuRequestBuilder, SkuResponse, SkuService, StoreCollectionResponse, StoreRequest, StoreRequestBuilder, StoreResponse, StoreService, type TokenProvider, TokenStore };
