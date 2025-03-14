var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/core/ApiClient.ts
import axios from "axios";
var ApiError = class extends Error {
  constructor(message, status, data) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = "ApiError";
  }
};
var ApiClient = class {
  /**
   * Create a new API client
   */
  constructor(config, tokenStore) {
    this.config = __spreadValues({
      timeout: 3e4,
      headers: {}
    }, config);
    this.tokenStore = tokenStore;
    if (config.token) {
      this.tokenStore.setToken(config.token);
    }
    this.client = axios.create({
      baseURL: this.config.baseUrl,
      timeout: this.config.timeout,
      headers: __spreadValues({
        "Content-Type": "application/json",
        "Accept": "application/ld+json"
      }, this.config.headers)
    });
    this.client.interceptors.request.use((config2) => __async(this, null, function* () {
      const token = yield this.tokenStore.getToken();
      if (token) {
        config2.headers.Authorization = `Bearer ${token}`;
      }
      return config2;
    }));
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          const status = error.response.status;
          const data = error.response.data;
          let message = `API Error (${status})`;
          if (data && data.message) {
            message += `: ${data.message}`;
          } else if (data && typeof data === "object") {
            message += `: ${JSON.stringify(data)}`;
          }
          throw new ApiError(message, status, data);
        } else if (error.request) {
          throw new ApiError("No response received from the server");
        } else {
          throw new ApiError(`Request failed: ${error.message}`);
        }
      }
    );
  }
  /**
   * Make a GET request to the API
   */
  get(path, params) {
    return __async(this, null, function* () {
      const response = yield this.client.get(path, { params });
      return response.data;
    });
  }
  /**
   * Make a POST request to the API
   */
  post(path, data) {
    return __async(this, null, function* () {
      const response = yield this.client.post(path, data);
      return response.data;
    });
  }
  /**
   * Make a PUT request to the API
   */
  put(path, data) {
    return __async(this, null, function* () {
      const response = yield this.client.put(path, data);
      return response.data;
    });
  }
  /**
   * Make a PATCH request to the API
   */
  patch(path, data) {
    return __async(this, null, function* () {
      const response = yield this.client.patch(path, data);
      return response.data;
    });
  }
  /**
   * Make a DELETE request to the API
   */
  delete(path) {
    return __async(this, null, function* () {
      const response = yield this.client.delete(path);
      return response.data;
    });
  }
};

// src/core/TokenStore.ts
var TokenStore = class {
  constructor() {
    this.token = null;
    this.tokenProvider = null;
  }
  /**
   * Set a token directly
   */
  setToken(token) {
    this.token = token;
  }
  /**
   * Get the current token
   */
  getCurrentToken() {
    return this.token;
  }
  /**
   * Clear the current token
   */
  clearToken() {
    this.token = null;
  }
  /**
   * Set a token provider for automatic token retrieval
   */
  setTokenProvider(provider) {
    this.tokenProvider = provider;
  }
  /**
   * Get a token, either from the stored token or from the provider
   */
  getToken() {
    return __async(this, null, function* () {
      if (this.token) {
        return this.token;
      }
      if (this.tokenProvider) {
        try {
          this.token = yield this.tokenProvider.getToken();
          return this.token;
        } catch (error) {
          throw new Error(`Failed to get token from provider: ${error instanceof Error ? error.message : String(error)}`);
        }
      }
      return null;
    });
  }
};

// src/services/BaseService.ts
var BaseService = class {
  /**
   * Create a new service
   *
   * @param apiClient API client
   * @param basePath Base path for the service endpoints
   */
  constructor(apiClient, basePath) {
    this.apiClient = apiClient;
    this.basePath = basePath;
  }
  /**
   * Extract the ID from an IRI
   *
   * @param iri IRI to extract from (e.g., "https://api.apiera.com/v1/stores/123")
   * @returns Extracted ID (e.g., "123")
   */
  extractIdFromIri(iri) {
    const parts = iri.split("/");
    return parts[parts.length - 1];
  }
};

// src/dto/base/AbstractDTO.ts
var AbstractDTO = class {
};

// src/dto/base/AbstractResponse.ts
var AbstractResponse = class extends AbstractDTO {
  /**
   * Create a new AbstractResponse
   *
   * @param ldId IRI of the resource
   * @param ldType Type of the resource
   * @param uuid UUID of the resource
   * @param createdAt Creation timestamp
   * @param updatedAt Last update timestamp
   */
  constructor(ldId, ldType, uuid, createdAt, updatedAt) {
    super();
    this.ldId = ldId;
    this.ldType = ldType;
    this.uuid = uuid;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
  /**
   * Get the IRI of the resource
   */
  getLdId() {
    return this.ldId;
  }
  /**
   * Get the type of the resource
   */
  getLdType() {
    return this.ldType;
  }
  /**
   * Get the UUID of the resource
   */
  getUuid() {
    return this.uuid;
  }
  /**
   * Get the creation timestamp of the resource
   */
  getCreatedAt() {
    return this.createdAt;
  }
  /**
   * Get the last update timestamp of the resource
   */
  getUpdatedAt() {
    return this.updatedAt;
  }
  /**
   * Convert to a plain object
   */
  toJSON() {
    return {
      "@id": this.ldId,
      "@type": this.ldType,
      uuid: this.uuid,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString()
    };
  }
};

// src/dto/base/AbstractCollectionResponse.ts
var AbstractCollectionResponse = class extends AbstractDTO {
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
  constructor(ldContext, ldId, ldType, ldMembers = [], ldTotalItems = 0, ldView = null) {
    super();
    this.ldContext = ldContext;
    this.ldId = ldId;
    this.ldType = ldType;
    this.ldMembers = ldMembers;
    this.ldTotalItems = ldTotalItems;
    this.ldView = ldView;
  }
  /**
   * Get the JSON-LD context of the collection
   */
  getLdContext() {
    return this.ldContext;
  }
  /**
   * Get the IRI of the collection
   */
  getLdId() {
    return this.ldId;
  }
  /**
   * Get the type of the collection
   */
  getLdType() {
    return this.ldType;
  }
  /**
   * Get the items in the collection
   */
  getLdMembers() {
    return this.ldMembers;
  }
  /**
   * Get the total number of items across all pages
   */
  getLdTotalItems() {
    return this.ldTotalItems;
  }
  /**
   * Get the pagination information
   */
  getLdView() {
    return this.ldView;
  }
  /**
   * Convert to a plain object
   */
  toJSON() {
    return {
      "@context": this.ldContext,
      "@id": this.ldId,
      "@type": this.ldType,
      "member": this.ldMembers.map((member) => member.toJSON()),
      "totalItems": this.ldTotalItems,
      "view": this.ldView ? this.ldView.toJSON() : null
    };
  }
};

// src/dto/base/PartialCollectionView.ts
var PartialCollectionView = class _PartialCollectionView extends AbstractDTO {
  /**
   * Create a new PartialCollectionView instance
   *
   * @param ldId IRI of the current page
   * @param ldFirst IRI of the first page
   * @param ldLast IRI of the last page
   * @param ldNext IRI of the next page
   * @param ldPrevious IRI of the previous page
   */
  constructor(ldId, ldFirst = null, ldLast = null, ldNext = null, ldPrevious = null) {
    super();
    this.ldId = ldId;
    this.ldFirst = ldFirst;
    this.ldLast = ldLast;
    this.ldNext = ldNext;
    this.ldPrevious = ldPrevious;
  }
  /**
   * Get the IRI of the current page
   */
  getLdId() {
    return this.ldId;
  }
  /**
   * Get the IRI of the first page
   */
  getLdFirst() {
    return this.ldFirst;
  }
  /**
   * Get the IRI of the last page
   */
  getLdLast() {
    return this.ldLast;
  }
  /**
   * Get the IRI of the next page
   */
  getLdNext() {
    return this.ldNext;
  }
  /**
   * Get the IRI of the previous page
   */
  getLdPrevious() {
    return this.ldPrevious;
  }
  /**
   * Convert to a plain object
   */
  toJSON() {
    const result = {
      "@id": this.ldId
    };
    if (this.ldFirst !== null) {
      result.first = this.ldFirst;
    }
    if (this.ldLast !== null) {
      result.last = this.ldLast;
    }
    if (this.ldNext !== null) {
      result.next = this.ldNext;
    }
    if (this.ldPrevious !== null) {
      result.previous = this.ldPrevious;
    }
    return result;
  }
  /**
   * Create from API JSON data
   */
  static fromJSON(data) {
    return new _PartialCollectionView(
      data["@id"] || "",
      data.first || null,
      data.last || null,
      data.next || null,
      data.previous || null
    );
  }
};

// src/dto/base/QueryParameters.ts
var QueryParameters = class extends AbstractDTO {
  /**
   * Create a new QueryParameters instance
   *
   * @param params General parameters (sorting, ordering, etc.)
   * @param filters Filter parameters
   * @param page Page number
   */
  constructor(params = {}, filters = {}, page = null) {
    super();
    this.params = params;
    this.filters = filters;
    this.page = page;
  }
  /**
   * Get the general parameters
   */
  getParams() {
    return this.params;
  }
  /**
   * Get the filter parameters
   */
  getFilters() {
    return this.filters;
  }
  /**
   * Get the page number
   */
  getPage() {
    return this.page;
  }
  /**
   * Convert to a plain object for API requests
   */
  toJSON() {
    const result = {};
    if (Object.keys(this.params).length > 0) {
      result.params = this.params;
    }
    if (Object.keys(this.filters).length > 0) {
      result.filters = this.filters;
    }
    if (this.page !== null) {
      result.page = this.page;
    }
    return result;
  }
  /**
   * Create a builder for QueryParameters
   */
  static builder() {
    return new QueryParametersBuilder();
  }
};
var QueryParametersBuilder = class {
  constructor() {
    this._params = {};
    this._filters = {};
    this._page = null;
  }
  /**
   * Add a general parameter
   */
  param(key, value) {
    this._params[key] = value;
    return this;
  }
  /**
   * Add multiple general parameters
   */
  params(params) {
    this._params = __spreadValues(__spreadValues({}, this._params), params);
    return this;
  }
  /**
   * Add a filter parameter
   */
  filter(key, value) {
    this._filters[key] = value;
    return this;
  }
  /**
   * Add multiple filter parameters
   */
  filters(filters) {
    this._filters = __spreadValues(__spreadValues({}, this._filters), filters);
    return this;
  }
  /**
   * Set the page number
   */
  page(page) {
    this._page = page;
    return this;
  }
  /**
   * Build the QueryParameters instance
   */
  build() {
    return new QueryParameters(this._params, this._filters, this._page);
  }
};

// src/dto/request/StoreRequest.ts
var StoreRequest = class extends AbstractDTO {
  /**
   * Create a new StoreRequest
   *
   * @param name Store name
   * @param description Store description
   * @param image Store image URL
   * @param iri Store IRI (used for updates, not sent in requests)
   */
  constructor(name = null, description = null, image = null, iri = null) {
    super();
    this.name = name;
    this.description = description;
    this.image = image;
    this.iri = iri;
  }
  /**
   * Get the store name
   */
  getName() {
    return this.name;
  }
  /**
   * Get the store description
   */
  getDescription() {
    return this.description;
  }
  /**
   * Get the store image URL
   */
  getImage() {
    return this.image;
  }
  /**
   * Get the store IRI
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
  static builder() {
    return new StoreRequestBuilder();
  }
};
var StoreRequestBuilder = class {
  constructor() {
    this._name = null;
    this._description = null;
    this._image = null;
    this._iri = null;
  }
  /**
   * Set the store name
   */
  name(name) {
    this._name = name;
    return this;
  }
  /**
   * Set the store description
   */
  description(description) {
    this._description = description;
    return this;
  }
  /**
   * Set the store image URL
   */
  image(image) {
    this._image = image;
    return this;
  }
  /**
   * Set the store IRI
   */
  iri(iri) {
    this._iri = iri;
    return this;
  }
  /**
   * Build the StoreRequest
   */
  build() {
    return new StoreRequest(
      this._name,
      this._description,
      this._image,
      this._iri
    );
  }
};

// src/dto/request/ProductRequest.ts
var ProductRequest = class extends AbstractDTO {
  /**
   * Create a new ProductRequest
   */
  constructor(name = null, type = null, price = null, salePrice = null, description = null, shortDescription = null, weight = null, length = null, width = null, height = null, status = null, distributor = null, brand = null, sku = null, image = null, categories = null, tags = null, attributes = null, images = null, alternateIdentifiers = null, propertyTerms = null, iri = null) {
    super();
    this.name = name;
    this.type = type;
    this.price = price;
    this.salePrice = salePrice;
    this.description = description;
    this.shortDescription = shortDescription;
    this.weight = weight;
    this.length = length;
    this.width = width;
    this.height = height;
    this.status = status;
    this.distributor = distributor;
    this.brand = brand;
    this.sku = sku;
    this.image = image;
    this.categories = categories;
    this.tags = tags;
    this.attributes = attributes;
    this.images = images;
    this.alternateIdentifiers = alternateIdentifiers;
    this.propertyTerms = propertyTerms;
    this.iri = iri;
  }
  // Getters
  getName() {
    return this.name;
  }
  getType() {
    return this.type;
  }
  getPrice() {
    return this.price;
  }
  getSalePrice() {
    return this.salePrice;
  }
  getDescription() {
    return this.description;
  }
  getShortDescription() {
    return this.shortDescription;
  }
  getWeight() {
    return this.weight;
  }
  getLength() {
    return this.length;
  }
  getWidth() {
    return this.width;
  }
  getHeight() {
    return this.height;
  }
  getStatus() {
    return this.status;
  }
  getDistributor() {
    return this.distributor;
  }
  getBrand() {
    return this.brand;
  }
  getSku() {
    return this.sku;
  }
  getImage() {
    return this.image;
  }
  getCategories() {
    return this.categories;
  }
  getTags() {
    return this.tags;
  }
  getAttributes() {
    return this.attributes;
  }
  getImages() {
    return this.images;
  }
  getAlternateIdentifiers() {
    return this.alternateIdentifiers;
  }
  getPropertyTerms() {
    return this.propertyTerms;
  }
  getIri() {
    return this.iri;
  }
  /**
   * Convert to a plain object for API requests
   */
  toJSON() {
    const data = {};
    if (this.name !== null) data.name = this.name;
    if (this.type !== null) data.type = this.type;
    if (this.price !== null) data.price = this.price;
    if (this.salePrice !== null) data.salePrice = this.salePrice;
    if (this.description !== null) data.description = this.description;
    if (this.shortDescription !== null) data.shortDescription = this.shortDescription;
    if (this.weight !== null) data.weight = this.weight;
    if (this.length !== null) data.length = this.length;
    if (this.width !== null) data.width = this.width;
    if (this.height !== null) data.height = this.height;
    if (this.status !== null) data.status = this.status;
    if (this.distributor !== null) data.distributor = this.distributor;
    if (this.brand !== null) data.brand = this.brand;
    if (this.sku !== null) data.sku = this.sku;
    if (this.image !== null) data.image = this.image;
    if (this.categories !== null) data.categories = this.categories;
    if (this.tags !== null) data.tags = this.tags;
    if (this.attributes !== null) data.attributes = this.attributes;
    if (this.images !== null) data.images = this.images;
    if (this.alternateIdentifiers !== null) data.alternateIdentifiers = this.alternateIdentifiers;
    if (this.propertyTerms !== null) data.propertyTerms = this.propertyTerms;
    return data;
  }
  /**
   * Create a builder for ProductRequest
   */
  static builder() {
    return new ProductRequestBuilder();
  }
};
var ProductRequestBuilder = class {
  constructor() {
    this._name = null;
    this._type = null;
    this._price = null;
    this._salePrice = null;
    this._description = null;
    this._shortDescription = null;
    this._weight = null;
    this._length = null;
    this._width = null;
    this._height = null;
    this._status = null;
    this._distributor = null;
    this._brand = null;
    this._sku = null;
    this._image = null;
    this._categories = null;
    this._tags = null;
    this._attributes = null;
    this._images = null;
    this._alternateIdentifiers = null;
    this._propertyTerms = null;
    this._iri = null;
  }
  // Builder methods
  name(name) {
    this._name = name;
    return this;
  }
  type(type) {
    this._type = type;
    return this;
  }
  price(price) {
    this._price = price;
    return this;
  }
  salePrice(salePrice) {
    this._salePrice = salePrice;
    return this;
  }
  description(description) {
    this._description = description;
    return this;
  }
  shortDescription(shortDescription) {
    this._shortDescription = shortDescription;
    return this;
  }
  weight(weight) {
    this._weight = weight;
    return this;
  }
  length(length) {
    this._length = length;
    return this;
  }
  width(width) {
    this._width = width;
    return this;
  }
  height(height) {
    this._height = height;
    return this;
  }
  status(status) {
    this._status = status;
    return this;
  }
  distributor(distributor) {
    this._distributor = distributor;
    return this;
  }
  brand(brand) {
    this._brand = brand;
    return this;
  }
  sku(sku) {
    this._sku = sku;
    return this;
  }
  image(image) {
    this._image = image;
    return this;
  }
  categories(categories) {
    this._categories = categories;
    return this;
  }
  tags(tags) {
    this._tags = tags;
    return this;
  }
  attributes(attributes) {
    this._attributes = attributes;
    return this;
  }
  images(images) {
    this._images = images;
    return this;
  }
  alternateIdentifiers(alternateIdentifiers) {
    this._alternateIdentifiers = alternateIdentifiers;
    return this;
  }
  propertyTerms(propertyTerms) {
    this._propertyTerms = propertyTerms;
    return this;
  }
  iri(iri) {
    this._iri = iri;
    return this;
  }
  /**
   * Build the ProductRequest
   */
  build() {
    return new ProductRequest(
      this._name,
      this._type,
      this._price,
      this._salePrice,
      this._description,
      this._shortDescription,
      this._weight,
      this._length,
      this._width,
      this._height,
      this._status,
      this._distributor,
      this._brand,
      this._sku,
      this._image,
      this._categories,
      this._tags,
      this._attributes,
      this._images,
      this._alternateIdentifiers,
      this._propertyTerms,
      this._iri
    );
  }
};

// src/dto/request/AlternateIdentifierRequest.ts
var AlternateIdentifierRequest = class extends AbstractDTO {
  constructor(code = null, type = null) {
    super();
    this.code = code;
    this.type = type;
  }
  getCode() {
    return this.code;
  }
  getType() {
    return this.type;
  }
  toJSON() {
    const data = {};
    if (this.code !== null) data.code = this.code;
    if (this.type !== null) data.type = this.type;
    return data;
  }
  static builder() {
    return new AlternateIdentifierRequestBuilder();
  }
};
var AlternateIdentifierRequestBuilder = class {
  constructor() {
    this._code = null;
    this._type = null;
  }
  code(code) {
    this._code = code;
    return this;
  }
  type(type) {
    this._type = type;
    return this;
  }
  build() {
    return new AlternateIdentifierRequest(
      this._code,
      this._type
    );
  }
};

// src/dto/request/SkuRequest.ts
var SkuRequest = class extends AbstractDTO {
  constructor(code = null) {
    super();
    this.code = code;
  }
  getCode() {
    return this.code;
  }
  toJSON() {
    const data = {};
    if (this.code !== null) data.code = this.code;
    return data;
  }
  static builder() {
    return new SkuRequestBuilder();
  }
};
var SkuRequestBuilder = class {
  constructor() {
    this._code = null;
  }
  code(code) {
    this._code = code;
    return this;
  }
  build() {
    return new SkuRequest(
      this._code
    );
  }
};

// src/dto/request/FileRequest.ts
var FileRequest = class extends AbstractDTO {
  /**
   * Create a new FileRequest
   *
   * @param name File name
   * @param url File URL
   * @param iri File IRI (used for updates, not sent in requests)
   */
  constructor(name = null, url = null, iri = null) {
    super();
    this.name = name;
    this.url = url;
    this.iri = iri;
  }
  /**
   * Get the file name
   */
  getName() {
    return this.name;
  }
  /**
   * Get the file URL
   */
  getUrl() {
    return this.url;
  }
  /**
   * Get the file IRI
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
    if (this.url !== null) {
      data.url = this.url;
    }
    return data;
  }
  /**
   * Create a builder for FileRequest
   */
  static builder() {
    return new FileRequestBuilder();
  }
};
var FileRequestBuilder = class {
  constructor() {
    this._name = null;
    this._url = null;
    this._iri = null;
  }
  /**
   * Set the file name
   */
  name(name) {
    this._name = name;
    return this;
  }
  /**
   * Set the file URL
   */
  url(url) {
    this._url = url;
    return this;
  }
  /**
   * Set the file IRI
   */
  iri(iri) {
    this._iri = iri;
    return this;
  }
  /**
   * Build the FileRequest
   */
  build() {
    return new FileRequest(
      this._name,
      this._url,
      this._iri
    );
  }
};

// src/enum/LdType.ts
var LdType = /* @__PURE__ */ ((LdType2) => {
  LdType2["Store"] = "Store";
  LdType2["Product"] = "Product";
  LdType2["AlternateIdentifier"] = "AlternateIdentifier";
  LdType2["Sku"] = "Sku";
  LdType2["File"] = "File";
  LdType2["Collection"] = "Collection";
  return LdType2;
})(LdType || {});

// src/enum/AlternateIdentifierType.ts
var AlternateIdentifierType = /* @__PURE__ */ ((AlternateIdentifierType2) => {
  AlternateIdentifierType2["DISTRIBUTOR_SKU"] = "distributor_sku";
  AlternateIdentifierType2["EAN"] = "ean";
  AlternateIdentifierType2["EAN8"] = "ean8";
  AlternateIdentifierType2["UPC"] = "upc";
  AlternateIdentifierType2["UPC_E"] = "upc_e";
  AlternateIdentifierType2["ISBN"] = "isbn";
  AlternateIdentifierType2["ISBN13"] = "isbn13";
  AlternateIdentifierType2["MPN"] = "mpn";
  AlternateIdentifierType2["GTIN"] = "gtin";
  AlternateIdentifierType2["ASIN"] = "asin";
  AlternateIdentifierType2["LEGACY_CODE"] = "legacy_code";
  AlternateIdentifierType2["CUSTOM"] = "custom";
  return AlternateIdentifierType2;
})(AlternateIdentifierType || {});

// src/dto/response/StoreResponse.ts
var StoreResponse = class _StoreResponse extends AbstractResponse {
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
  constructor(ldId, ldType, uuid, createdAt, updatedAt, name, description = null, image = null) {
    super(ldId, ldType, uuid, createdAt, updatedAt);
    this.name = name;
    this.description = description;
    this.image = image;
  }
  /**
   * Get the store name
   */
  getName() {
    return this.name;
  }
  /**
   * Get the store description
   */
  getDescription() {
    return this.description;
  }
  /**
   * Get the store image URL
   */
  getImage() {
    return this.image;
  }
  /**
   * Convert to a plain object
   */
  toJSON() {
    return __spreadProps(__spreadValues({}, super.toJSON()), {
      name: this.name,
      description: this.description,
      image: this.image
    });
  }
  /**
   * Create from API JSON data
   */
  static fromJSON(data) {
    return new _StoreResponse(
      data["@id"] || "",
      data["@type"] || "Store" /* Store */,
      data.uuid || "",
      new Date(data.createdAt),
      new Date(data.updatedAt),
      data.name || "",
      data.description || null,
      data.image || null
    );
  }
};

// src/dto/response/StoreCollectionResponse.ts
var StoreCollectionResponse = class _StoreCollectionResponse extends AbstractCollectionResponse {
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
  constructor(ldContext, ldId, ldType, ldMembers = [], ldTotalItems = 0, ldView = null) {
    super(ldContext, ldId, ldType, ldMembers, ldTotalItems, ldView);
  }
  /**
   * Get the stores in the collection
   */
  getLdMembers() {
    return super.getLdMembers();
  }
  /**
   * Create from API JSON data
   */
  static fromJSON(data) {
    const members = (data.member || []).map((item) => StoreResponse.fromJSON(item));
    const view = data.view ? PartialCollectionView.fromJSON(data.view) : null;
    return new _StoreCollectionResponse(
      data["@context"] || "",
      data["@id"] || "",
      data["@type"] || "Collection" /* Collection */,
      members,
      data.totalItems || 0,
      view
    );
  }
};

// src/dto/response/ProductResponse.ts
var ProductResponse = class _ProductResponse extends AbstractResponse {
  /**
   * Create a new ProductResponse
   */
  constructor(ldId, ldType, uuid, createdAt, updatedAt, name, type, price = null, salePrice = null, description = null, shortDescription = null, weight = null, length = null, width = null, height = null, status = null, store = null, distributor = null, brand = null, sku = null, image = null, categories = [], tags = [], attributes = [], images = [], alternateIdentifiers = [], propertyTerms = []) {
    super(ldId, ldType, uuid, createdAt, updatedAt);
    this.name = name;
    this.type = type;
    this.price = price;
    this.salePrice = salePrice;
    this.description = description;
    this.shortDescription = shortDescription;
    this.weight = weight;
    this.length = length;
    this.width = width;
    this.height = height;
    this.status = status;
    this.store = store;
    this.distributor = distributor;
    this.brand = brand;
    this.sku = sku;
    this.image = image;
    this.categories = categories;
    this.tags = tags;
    this.attributes = attributes;
    this.images = images;
    this.alternateIdentifiers = alternateIdentifiers;
    this.propertyTerms = propertyTerms;
  }
  // Getters
  getName() {
    return this.name;
  }
  getType() {
    return this.type;
  }
  getPrice() {
    return this.price;
  }
  getSalePrice() {
    return this.salePrice;
  }
  getDescription() {
    return this.description;
  }
  getShortDescription() {
    return this.shortDescription;
  }
  getWeight() {
    return this.weight;
  }
  getLength() {
    return this.length;
  }
  getWidth() {
    return this.width;
  }
  getHeight() {
    return this.height;
  }
  getStatus() {
    return this.status;
  }
  getStore() {
    return this.store;
  }
  getDistributor() {
    return this.distributor;
  }
  getBrand() {
    return this.brand;
  }
  getSku() {
    return this.sku;
  }
  getImage() {
    return this.image;
  }
  getCategories() {
    return this.categories;
  }
  getTags() {
    return this.tags;
  }
  getAttributes() {
    return this.attributes;
  }
  getImages() {
    return this.images;
  }
  getAlternateIdentifiers() {
    return this.alternateIdentifiers;
  }
  getPropertyTerms() {
    return this.propertyTerms;
  }
  /**
   * Convert to a plain object
   */
  toJSON() {
    return __spreadProps(__spreadValues({}, super.toJSON()), {
      name: this.name,
      type: this.type,
      price: this.price,
      salePrice: this.salePrice,
      description: this.description,
      shortDescription: this.shortDescription,
      weight: this.weight,
      length: this.length,
      width: this.width,
      height: this.height,
      status: this.status,
      store: this.store,
      distributor: this.distributor,
      brand: this.brand,
      sku: this.sku,
      image: this.image,
      categories: this.categories,
      tags: this.tags,
      attributes: this.attributes,
      images: this.images,
      alternateIdentifiers: this.alternateIdentifiers,
      propertyTerms: this.propertyTerms
    });
  }
  /**
   * Create from API JSON data
   */
  static fromJSON(data) {
    return new _ProductResponse(
      data["@id"] || "",
      data["@type"] || "Product" /* Product */,
      data.uuid || "",
      new Date(data.createdAt),
      new Date(data.updatedAt),
      data.name || "",
      data.type || "simple",
      data.price || null,
      data.salePrice || null,
      data.description || null,
      data.shortDescription || null,
      data.weight || null,
      data.length || null,
      data.width || null,
      data.height || null,
      data.status || null,
      data.store || null,
      data.distributor || null,
      data.brand || null,
      data.sku || null,
      data.image || null,
      data.categories || [],
      data.tags || [],
      data.attributes || [],
      data.images || [],
      data.alternateIdentifiers || [],
      data.propertyTerms || []
    );
  }
};

// src/dto/response/ProductCollectionResponse.ts
var ProductCollectionResponse = class _ProductCollectionResponse extends AbstractCollectionResponse {
  /**
   * Create a new ProductCollectionResponse
   */
  constructor(ldContext, ldId, ldType, ldMembers = [], ldTotalItems = 0, ldView = null) {
    super(ldContext, ldId, ldType, ldMembers, ldTotalItems, ldView);
  }
  /**
   * Get the products in the collection
   */
  getLdMembers() {
    return super.getLdMembers();
  }
  /**
   * Create from API JSON data
   */
  static fromJSON(data) {
    const members = (data.member || []).map((item) => ProductResponse.fromJSON(item));
    const view = data.view ? PartialCollectionView.fromJSON(data.view) : null;
    return new _ProductCollectionResponse(
      data["@context"] || "",
      data["@id"] || "",
      data["@type"] || "Collection" /* Collection */,
      members,
      data.totalItems || 0,
      view
    );
  }
};

// src/dto/response/AlternateIdentifierResponse.ts
var AlternateIdentifierResponse = class _AlternateIdentifierResponse extends AbstractResponse {
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
  constructor(ldId, ldType, uuid, createdAt, updatedAt, code, type) {
    super(ldId, ldType, uuid, createdAt, updatedAt);
    this.code = code;
    this.type = type;
  }
  /**
   * Get the alternate identifier code
   */
  getCode() {
    return this.code;
  }
  /**
   * Get the alternate identifier type
   */
  getType() {
    return this.type;
  }
  /**
   * Convert to a plain object
   */
  toJSON() {
    return __spreadProps(__spreadValues({}, super.toJSON()), {
      code: this.code,
      type: this.type
    });
  }
  /**
   * Create from API JSON data
   */
  static fromJSON(data) {
    return new _AlternateIdentifierResponse(
      data["@id"] || "",
      data["@type"] || "AlternateIdentifier" /* AlternateIdentifier */,
      data.uuid || "",
      new Date(data.createdAt),
      new Date(data.updatedAt),
      data.code || "",
      data.type || "custom" /* CUSTOM */
    );
  }
};

// src/dto/response/AlternateIdentifierCollectionResponse.ts
var AlternateIdentifierCollectionResponse = class _AlternateIdentifierCollectionResponse extends AbstractCollectionResponse {
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
  constructor(ldContext, ldId, ldType, ldMembers = [], ldTotalItems = 0, ldView = null) {
    super(ldContext, ldId, ldType, ldMembers, ldTotalItems, ldView);
  }
  /**
   * Get the alternate identifiers in the collection
   */
  getLdMembers() {
    return super.getLdMembers();
  }
  /**
   * Create from API JSON data
   */
  static fromJSON(data) {
    const members = (data.member || []).map((item) => AlternateIdentifierResponse.fromJSON(item));
    const view = data.view ? PartialCollectionView.fromJSON(data.view) : null;
    return new _AlternateIdentifierCollectionResponse(
      data["@context"] || "",
      data["@id"] || "",
      data["@type"] || "Collection" /* Collection */,
      members,
      data.totalItems || 0,
      view
    );
  }
};

// src/dto/response/SkuResponse.ts
var SkuResponse = class _SkuResponse extends AbstractResponse {
  constructor(ldId, ldType, uuid, createdAt, updatedAt, code, products, variants, inventories) {
    super(ldId, ldType, uuid, createdAt, updatedAt);
    this.code = code;
    this.products = products;
    this.variants = variants;
    this.inventories = inventories;
  }
  getCode() {
    return this.code;
  }
  getProducts() {
    return this.products;
  }
  getVariants() {
    return this.variants;
  }
  getInventories() {
    return this.inventories;
  }
  toJSON() {
    return __spreadProps(__spreadValues({}, super.toJSON()), {
      code: this.code,
      products: this.products,
      variants: this.variants,
      inventories: this.inventories
    });
  }
  static fromJSON(data) {
    return new _SkuResponse(
      data["@id"] || "",
      data["@type"] || "Sku" /* Sku */,
      data.uuid || "",
      new Date(data.createdAt),
      new Date(data.updatedAt),
      data.code || "",
      data.products || [],
      data.variants || [],
      data.inventories || []
    );
  }
};

// src/dto/response/SkuCollectionResponse.ts
var SkuCollectionResponse = class _SkuCollectionResponse extends AbstractCollectionResponse {
  constructor(ldContext, ldId, ldType, ldMembers = [], ldTotalItems = 0, ldView = null) {
    super(ldContext, ldId, ldType, ldMembers, ldTotalItems, ldView);
  }
  getLdMembers() {
    return super.getLdMembers();
  }
  static fromJSON(data) {
    const members = (data.member || []).map((item) => SkuResponse.fromJSON(item));
    const view = data.view ? PartialCollectionView.fromJSON(data.view) : null;
    return new _SkuCollectionResponse(
      data["@context"] || "",
      data["@id"] || "",
      data["@type"] || "Collection" /* Collection */,
      members,
      data.totalItems || 0,
      view
    );
  }
};

// src/dto/response/FileResponse.ts
var FileResponse = class _FileResponse extends AbstractResponse {
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
  constructor(ldId, ldType, uuid, createdAt, updatedAt, name, extension = null, mimeType = null, url = null) {
    super(ldId, ldType, uuid, createdAt, updatedAt);
    this.name = name;
    this.extension = extension;
    this.mimeType = mimeType;
    this.url = url;
  }
  /**
   * Get the file name
   */
  getName() {
    return this.name;
  }
  /**
   * Get the file extension
   */
  getExtension() {
    return this.extension;
  }
  /**
   * Get the file MIME type
   */
  getMimeType() {
    return this.mimeType;
  }
  /**
   * Get the file URL
   */
  getUrl() {
    return this.url;
  }
  /**
   * Convert to a plain object
   */
  toJSON() {
    return __spreadProps(__spreadValues({}, super.toJSON()), {
      name: this.name,
      extension: this.extension,
      mimeType: this.mimeType,
      url: this.url
    });
  }
  /**
   * Create from API JSON data
   */
  static fromJSON(data) {
    return new _FileResponse(
      data["@id"] || "",
      data["@type"] || "File" /* File */,
      data.uuid || "",
      new Date(data.createdAt),
      new Date(data.updatedAt),
      data.name || "",
      data.extension || null,
      data.mimeType || null,
      data.url || null
    );
  }
};

// src/dto/response/FileCollectionResponse.ts
var FileCollectionResponse = class _FileCollectionResponse extends AbstractCollectionResponse {
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
  constructor(ldContext, ldId, ldType, ldMembers = [], ldTotalItems = 0, ldView = null) {
    super(ldContext, ldId, ldType, ldMembers, ldTotalItems, ldView);
  }
  /**
   * Get the files in the collection
   */
  getLdMembers() {
    return super.getLdMembers();
  }
  /**
   * Create from API JSON data
   */
  static fromJSON(data) {
    const members = (data.member || []).map((item) => FileResponse.fromJSON(item));
    const view = data.view ? PartialCollectionView.fromJSON(data.view) : null;
    return new _FileCollectionResponse(
      data["@context"] || "",
      data["@id"] || "",
      data["@type"] || "Collection" /* Collection */,
      members,
      data.totalItems || 0,
      view
    );
  }
};

// src/services/StoreService.ts
var StoreService = class extends BaseService {
  /**
   * Create a new store service
   *
   * @param apiClient API client
   */
  constructor(apiClient) {
    super(apiClient, "/api/v1/stores");
  }
  /**
   * Get all stores
   *
   * @param queryParams Optional query parameters for filtering, pagination, etc.
   * @returns Collection of stores
   */
  getAll(queryParams) {
    return __async(this, null, function* () {
      const params = (queryParams == null ? void 0 : queryParams.toJSON()) || {};
      const response = yield this.apiClient.get(this.basePath, params);
      return StoreCollectionResponse.fromJSON(response);
    });
  }
  /**
   * Get a store by ID
   *
   * @param id Store ID
   * @returns Store data
   */
  getById(id) {
    return __async(this, null, function* () {
      const response = yield this.apiClient.get(`${this.basePath}/${id}`);
      return StoreResponse.fromJSON(response);
    });
  }
  /**
   * Get a store by IRI
   *
   * @param iri Store IRI
   * @returns Store data
   */
  getByIri(iri) {
    return __async(this, null, function* () {
      const response = yield this.apiClient.get(iri);
      return StoreResponse.fromJSON(response);
    });
  }
  /**
   * Create a new store
   *
   * @param storeRequest Store data
   * @returns The created store
   */
  create(storeRequest) {
    return __async(this, null, function* () {
      const response = yield this.apiClient.post(this.basePath, storeRequest.toJSON());
      return StoreResponse.fromJSON(response);
    });
  }
  /**
   * Update an existing store
   *
   * @param id Store ID
   * @param storeRequest Updated store data
   * @returns The updated store
   */
  update(id, storeRequest) {
    return __async(this, null, function* () {
      const response = yield this.apiClient.put(`${this.basePath}/${id}`, storeRequest.toJSON());
      return StoreResponse.fromJSON(response);
    });
  }
  /**
   * Update a store by IRI
   *
   * @param iri Store IRI
   * @param storeRequest Updated store data
   * @returns The updated store
   */
  updateByIri(iri, storeRequest) {
    return __async(this, null, function* () {
      const response = yield this.apiClient.put(iri, storeRequest.toJSON());
      return StoreResponse.fromJSON(response);
    });
  }
  /**
   * Delete a store
   *
   * @param id Store ID
   */
  delete(id) {
    return __async(this, null, function* () {
      yield this.apiClient.delete(`${this.basePath}/${id}`);
    });
  }
  /**
   * Delete a store by IRI
   *
   * @param iri Store IRI
   */
  deleteByIri(iri) {
    return __async(this, null, function* () {
      yield this.apiClient.delete(iri);
    });
  }
};

// src/services/ProductService.ts
var ProductService = class extends BaseService {
  /**
   * Create a new product service
   *
   * @param apiClient API client
   * @param storeIri Store IRI for product association
   */
  constructor(apiClient, storeIri) {
    super(apiClient, "");
    this.storeIri = storeIri;
    const storeId = this.extractIdFromIri(storeIri);
    this.resourcePath = `/api/v1/stores/${storeId}/products`;
  }
  /**
   * Set the store IRI for product association
   *
   * @param storeIri The full IRI of the store
   */
  setStoreIri(storeIri) {
    this.storeIri = storeIri;
    const storeId = this.extractIdFromIri(storeIri);
    this.resourcePath = `/api/v1/stores/${storeId}/products`;
  }
  /**
   * Get all products for the store
   *
   * @param queryParams Optional query parameters for filtering, pagination, etc.
   * @returns Collection of products
   */
  getAll(queryParams) {
    return __async(this, null, function* () {
      const params = (queryParams == null ? void 0 : queryParams.toJSON()) || {};
      const response = yield this.apiClient.get(this.resourcePath, params);
      return ProductCollectionResponse.fromJSON(response);
    });
  }
  /**
   * Get a product by ID
   *
   * @param id Product ID
   * @returns Product data
   */
  getById(id) {
    return __async(this, null, function* () {
      const response = yield this.apiClient.get(`${this.resourcePath}/${id}`);
      return ProductResponse.fromJSON(response);
    });
  }
  /**
   * Get a product by IRI
   *
   * @param iri Product IRI
   * @returns Product data
   */
  getByIri(iri) {
    return __async(this, null, function* () {
      const response = yield this.apiClient.get(iri);
      return ProductResponse.fromJSON(response);
    });
  }
  /**
   * Create a new product
   *
   * @param productRequest Product data
   * @returns The created product
   */
  create(productRequest) {
    return __async(this, null, function* () {
      const response = yield this.apiClient.post(this.resourcePath, productRequest.toJSON());
      return ProductResponse.fromJSON(response);
    });
  }
  /**
   * Update an existing product
   *
   * @param id Product ID
   * @param productRequest Updated product data
   * @returns The updated product
   */
  update(id, productRequest) {
    return __async(this, null, function* () {
      const response = yield this.apiClient.put(`${this.resourcePath}/${id}`, productRequest.toJSON());
      return ProductResponse.fromJSON(response);
    });
  }
  /**
   * Update a product by IRI
   *
   * @param iri Product IRI
   * @param productRequest Updated product data
   * @returns The updated product
   */
  updateByIri(iri, productRequest) {
    return __async(this, null, function* () {
      const response = yield this.apiClient.put(iri, productRequest.toJSON());
      return ProductResponse.fromJSON(response);
    });
  }
  /**
   * Delete a product
   *
   * @param id Product ID
   */
  delete(id) {
    return __async(this, null, function* () {
      yield this.apiClient.delete(`${this.resourcePath}/${id}`);
    });
  }
  /**
   * Delete a product by IRI
   *
   * @param iri Product IRI
   */
  deleteByIri(iri) {
    return __async(this, null, function* () {
      yield this.apiClient.delete(iri);
    });
  }
};

// src/services/AlternateIdentifierService.ts
var AlternateIdentifierService = class extends BaseService {
  /**
   * Create a new alternate identifier service
   *
   * @param apiClient API client
   */
  constructor(apiClient) {
    super(apiClient, "/api/v1/alternate_identifiers");
  }
  /**
   * Get all alternate identifiers
   *
   * @param queryParams Optional query parameters for filtering, pagination, etc.
   * @returns Collection of alternate identifiers
   */
  getAll(queryParams) {
    return __async(this, null, function* () {
      const params = (queryParams == null ? void 0 : queryParams.toJSON()) || {};
      const response = yield this.apiClient.get(this.basePath, params);
      return AlternateIdentifierCollectionResponse.fromJSON(response);
    });
  }
  /**
   * Get an alternate identifier by ID
   *
   * @param id Alternate identifier ID
   * @returns Alternate identifier data
   */
  getById(id) {
    return __async(this, null, function* () {
      const response = yield this.apiClient.get(`${this.basePath}/${id}`);
      return AlternateIdentifierResponse.fromJSON(response);
    });
  }
  /**
   * Get an alternate identifier by IRI
   *
   * @param iri Alternate identifier IRI
   * @returns Alternate identifier data
   */
  getByIri(iri) {
    return __async(this, null, function* () {
      const response = yield this.apiClient.get(iri);
      return AlternateIdentifierResponse.fromJSON(response);
    });
  }
  /**
   * Create a new alternate identifier
   *
   * @param request Alternate identifier data
   * @returns The created alternate identifier
   */
  create(request) {
    return __async(this, null, function* () {
      const response = yield this.apiClient.post(this.basePath, request.toJSON());
      return AlternateIdentifierResponse.fromJSON(response);
    });
  }
  /**
   * Update an existing alternate identifier
   *
   * @param id Alternate identifier ID
   * @param request Updated alternate identifier data
   * @returns The updated alternate identifier
   */
  update(id, request) {
    return __async(this, null, function* () {
      const response = yield this.apiClient.put(`${this.basePath}/${id}`, request.toJSON());
      return AlternateIdentifierResponse.fromJSON(response);
    });
  }
  /**
   * Update an alternate identifier by IRI
   *
   * @param iri Alternate identifier IRI
   * @param request Updated alternate identifier data
   * @returns The updated alternate identifier
   */
  updateByIri(iri, request) {
    return __async(this, null, function* () {
      const response = yield this.apiClient.put(iri, request.toJSON());
      return AlternateIdentifierResponse.fromJSON(response);
    });
  }
  /**
   * Delete an alternate identifier
   *
   * @param id Alternate identifier ID
   */
  delete(id) {
    return __async(this, null, function* () {
      yield this.apiClient.delete(`${this.basePath}/${id}`);
    });
  }
  /**
   * Delete an alternate identifier by IRI
   *
   * @param iri Alternate identifier IRI
   */
  deleteByIri(iri) {
    return __async(this, null, function* () {
      yield this.apiClient.delete(iri);
    });
  }
};

// src/services/SkuService.ts
var SkuService = class extends BaseService {
  /**
   * Create a new sku service
   *
   * @param apiClient API client
   */
  constructor(apiClient) {
    super(apiClient, "/api/v1/skus");
  }
  /**
   * Get all skus
   *
   * @param queryParams Optional query parameters for filtering, pagination, etc.
   * @returns Collection of skus
   */
  getAll(queryParams) {
    return __async(this, null, function* () {
      const params = (queryParams == null ? void 0 : queryParams.toJSON()) || {};
      const response = yield this.apiClient.get(this.basePath, params);
      return SkuCollectionResponse.fromJSON(response);
    });
  }
  /**
   * Get a sku by ID
   *
   * @param id Sku ID
   * @returns Sku data
   */
  getById(id) {
    return __async(this, null, function* () {
      const response = yield this.apiClient.get(`${this.basePath}/${id}`);
      return SkuResponse.fromJSON(response);
    });
  }
  /**
   * Get a sku by IRI
   *
   * @param iri Sku IRI
   * @returns Sku data
   */
  getByIri(iri) {
    return __async(this, null, function* () {
      const response = yield this.apiClient.get(iri);
      return SkuResponse.fromJSON(response);
    });
  }
  /**
   * Create a new sku
   *
   * @param skuRequest Sku data
   * @returns The created sku
   */
  create(skuRequest) {
    return __async(this, null, function* () {
      const response = yield this.apiClient.post(this.basePath, skuRequest.toJSON());
      return SkuResponse.fromJSON(response);
    });
  }
  /**
   * Update an existing sku
   *
   * @param id Sku ID
   * @param skuRequest Updated sku data
   * @returns The updated sku
   */
  update(id, skuRequest) {
    return __async(this, null, function* () {
      const response = yield this.apiClient.put(`${this.basePath}/${id}`, skuRequest.toJSON());
      return SkuResponse.fromJSON(response);
    });
  }
  /**
   * Update a sku by IRI
   *
   * @param iri Sku IRI
   * @param skuRequest Updated sku data
   * @returns The updated sku
   */
  updateByIri(iri, skuRequest) {
    return __async(this, null, function* () {
      const response = yield this.apiClient.put(iri, skuRequest.toJSON());
      return SkuResponse.fromJSON(response);
    });
  }
  /**
   * Delete a sku
   *
   * @param id Sku ID
   */
  delete(id) {
    return __async(this, null, function* () {
      yield this.apiClient.delete(`${this.basePath}/${id}`);
    });
  }
  /**
   * Delete a sku by IRI
   *
   * @param iri Sku IRI
   */
  deleteByIri(iri) {
    return __async(this, null, function* () {
      yield this.apiClient.delete(iri);
    });
  }
};

// src/services/FileService.ts
var FileService = class extends BaseService {
  /**
   * Create a new file service
   *
   * @param apiClient API client
   */
  constructor(apiClient) {
    super(apiClient, "/api/v1/files");
  }
  /**
   * Get all files
   *
   * @param queryParams Optional query parameters for filtering, pagination, etc.
   * @returns Collection of files
   */
  getAll(queryParams) {
    return __async(this, null, function* () {
      const params = (queryParams == null ? void 0 : queryParams.toJSON()) || {};
      const response = yield this.apiClient.get(this.basePath, params);
      return FileCollectionResponse.fromJSON(response);
    });
  }
  /**
   * Get a file by ID
   *
   * @param id File ID
   * @returns File data
   */
  getById(id) {
    return __async(this, null, function* () {
      const response = yield this.apiClient.get(`${this.basePath}/${id}`);
      return FileResponse.fromJSON(response);
    });
  }
  /**
   * Get a file by IRI
   *
   * @param iri File IRI
   * @returns File data
   */
  getByIri(iri) {
    return __async(this, null, function* () {
      const response = yield this.apiClient.get(iri);
      return FileResponse.fromJSON(response);
    });
  }
  /**
   * Create a new file
   *
   * @param fileRequest File data
   * @returns The created file
   */
  create(fileRequest) {
    return __async(this, null, function* () {
      const response = yield this.apiClient.post(this.basePath, fileRequest.toJSON());
      return FileResponse.fromJSON(response);
    });
  }
  /**
   * Delete a file
   *
   * @param id File ID
   */
  delete(id) {
    return __async(this, null, function* () {
      yield this.apiClient.delete(`${this.basePath}/${id}`);
    });
  }
  /**
   * Delete a file by IRI
   *
   * @param iri File IRI
   */
  deleteByIri(iri) {
    return __async(this, null, function* () {
      yield this.apiClient.delete(iri);
    });
  }
};

// src/ApieraSdk.ts
var ApieraSdk = class {
  /**
   * Create a new Apiera SDK instance
   *
   * @param config SDK configuration
   */
  constructor(config) {
    this.tokenStore = new TokenStore();
    if (config.token) {
      this.tokenStore.setToken(config.token);
    }
    if (config.tokenProvider) {
      this.tokenStore.setTokenProvider(config.tokenProvider);
    }
    this.apiClient = new ApiClient(
      {
        baseUrl: config.baseUrl,
        timeout: config.timeout,
        headers: config.headers
      },
      this.tokenStore
    );
    this.store = new StoreService(this.apiClient);
    this.alternateIdentifier = new AlternateIdentifierService(this.apiClient);
    this.sku = new SkuService(this.apiClient);
    this.file = new FileService(this.apiClient);
  }
  /**
   * Get a product service for a specific store
   *
   * @param storeIri Store IRI (e.g., "/api/v1/stores/123" or "https://api.apiera.com/api/v1/stores/123")
   * @returns Product service for the specified store
   */
  getProductService(storeIri) {
    return new ProductService(this.apiClient, storeIri);
  }
  /**
   * Set an authentication token
   *
   * @param token JWT token
   */
  setToken(token) {
    this.tokenStore.setToken(token);
  }
  /**
   * Clear the authentication token
   */
  clearToken() {
    this.tokenStore.clearToken();
  }
  /**
   * Set a custom token provider
   *
   * @param provider Token provider
   */
  setTokenProvider(provider) {
    this.tokenStore.setTokenProvider(provider);
  }
  /**
   * Get the current token, fetching from the provider if necessary
   *
   * @returns The current token, or null if no token is available
   */
  getToken() {
    return __async(this, null, function* () {
      return this.tokenStore.getToken();
    });
  }
};
export {
  AbstractCollectionResponse,
  AbstractDTO,
  AbstractResponse,
  AlternateIdentifierCollectionResponse,
  AlternateIdentifierRequest,
  AlternateIdentifierRequestBuilder,
  AlternateIdentifierResponse,
  AlternateIdentifierService,
  AlternateIdentifierType,
  ApiClient,
  ApiError,
  ApieraSdk,
  BaseService,
  FileCollectionResponse,
  FileRequest,
  FileRequestBuilder,
  FileResponse,
  FileService,
  LdType,
  PartialCollectionView,
  ProductCollectionResponse,
  ProductRequest,
  ProductRequestBuilder,
  ProductResponse,
  ProductService,
  QueryParameters,
  QueryParametersBuilder,
  SkuCollectionResponse,
  SkuRequest,
  SkuRequestBuilder,
  SkuResponse,
  SkuService,
  StoreCollectionResponse,
  StoreRequest,
  StoreRequestBuilder,
  StoreResponse,
  StoreService,
  TokenStore
};
