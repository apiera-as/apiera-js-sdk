// FileCollectionResponse.ts
import { AbstractCollectionResponse } from '../base';
import { LdType } from '../../enum';
import { PartialCollectionView } from '../base';
import { FileResponse } from './FileResponse';

/**
 * DTO for file collection responses
 */
export class FileCollectionResponse extends AbstractCollectionResponse {
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
    constructor(
        ldContext: string,
        ldId: string,
        ldType: LdType,
        ldMembers: FileResponse[] = [],
        ldTotalItems: number = 0,
        ldView: PartialCollectionView | null = null
    ) {
        super(ldContext, ldId, ldType, ldMembers, ldTotalItems, ldView);
    }

    /**
     * Get the files in the collection
     */
    getLdMembers(): FileResponse[] {
        return super.getLdMembers() as FileResponse[];
    }

    /**
     * Create from API JSON data
     */
    static fromJSON(data: any): FileCollectionResponse {
        const members = (data.member || []).map((item: any) => FileResponse.fromJSON(item));

        const view = data.view
            ? PartialCollectionView.fromJSON(data.view)
            : null;

        return new FileCollectionResponse(
            data['@context'] || '',
            data['@id'] || '',
            data['@type'] as LdType || LdType.Collection,
            members,
            data.totalItems || 0,
            view
        );
    }
}