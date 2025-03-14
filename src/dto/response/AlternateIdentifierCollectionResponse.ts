import { AbstractCollectionResponse } from '../base';
import { LdType } from '../../enum';
import { PartialCollectionView } from '../base';
import { AlternateIdentifierResponse } from './AlternateIdentifierResponse';

/**
 * DTO for alternate identifier collection responses
 */
export class AlternateIdentifierCollectionResponse extends AbstractCollectionResponse {
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
    constructor(
        ldContext: string,
        ldId: string,
        ldType: LdType,
        ldMembers: AlternateIdentifierResponse[] = [],
        ldTotalItems: number = 0,
        ldView: PartialCollectionView | null = null
    ) {
        super(ldContext, ldId, ldType, ldMembers, ldTotalItems, ldView);
    }

    /**
     * Get the alternate identifiers in the collection
     */
    getLdMembers(): AlternateIdentifierResponse[] {
        return super.getLdMembers() as AlternateIdentifierResponse[];
    }

    /**
     * Create from API JSON data
     */
    static fromJSON(data: any): AlternateIdentifierCollectionResponse {
        const members = (data.member || []).map((item: any) => AlternateIdentifierResponse.fromJSON(item));

        const view = data.view
            ? PartialCollectionView.fromJSON(data.view)
            : null;

        return new AlternateIdentifierCollectionResponse(
            data['@context'] || '',
            data['@id'] || '',
            data['@type'] as LdType || LdType.Collection,
            members,
            data.totalItems || 0,
            view
        );
    }
}