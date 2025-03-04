import { AbstractCollectionResponse } from '../base';
import { LdType } from '../../enum';
import { PartialCollectionView } from '../base';
import { StoreResponse } from './StoreResponse';

/**
 * DTO for store collection responses
 */
export class StoreCollectionResponse extends AbstractCollectionResponse {
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
    constructor(
        ldContext: string,
        ldId: string,
        ldType: LdType,
        ldMembers: StoreResponse[] = [],
        ldTotalItems: number = 0,
        ldView: PartialCollectionView | null = null
    ) {
        super(ldContext, ldId, ldType, ldMembers, ldTotalItems, ldView);
    }

    /**
     * Get the stores in the collection
     */
    getLdMembers(): StoreResponse[] {
        return super.getLdMembers() as StoreResponse[];
    }

    /**
     * Create from API JSON data
     */
    static fromJSON(data: any): StoreCollectionResponse {
        const members = (data.member || []).map((item: any) => StoreResponse.fromJSON(item));

        const view = data.view
            ? PartialCollectionView.fromJSON(data.view)
            : null;

        return new StoreCollectionResponse(
            data['@context'] || '',
            data['@id'] || '',
            data['@type'] as LdType || LdType.Collection,
            members,
            data.totalItems || 0,
            view
        );
    }
}