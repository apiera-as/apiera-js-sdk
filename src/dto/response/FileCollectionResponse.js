"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileCollectionResponse = void 0;
// FileCollectionResponse.ts
const base_1 = require("../base");
const enum_1 = require("../../enum");
const base_2 = require("../base");
const FileResponse_1 = require("./FileResponse");
/**
 * DTO for file collection responses
 */
class FileCollectionResponse extends base_1.AbstractCollectionResponse {
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
        const members = (data.member || []).map((item) => FileResponse_1.FileResponse.fromJSON(item));
        const view = data.view
            ? base_2.PartialCollectionView.fromJSON(data.view)
            : null;
        return new FileCollectionResponse(data['@context'] || '', data['@id'] || '', data['@type'] || enum_1.LdType.Collection, members, data.totalItems || 0, view);
    }
}
exports.FileCollectionResponse = FileCollectionResponse;
