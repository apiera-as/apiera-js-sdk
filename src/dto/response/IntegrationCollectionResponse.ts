// IntegrationCollectionResponse.ts
import { AbstractCollectionResponse } from '../base';
import { LdType } from '../../enum';
import { PartialCollectionView } from '../base';
import { IntegrationResponse } from './IntegrationResponse';

/**
 * DTO for integration collection responses
 */
export class IntegrationCollectionResponse extends AbstractCollectionResponse {
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
    constructor(
        ldContext: string,
        ldId: string,
        ldType: LdType,
        ldMembers: IntegrationResponse[] = [],
        ldTotalItems: number = 0,
        ldView: PartialCollectionView | null = null
    ) {
        super(ldContext, ldId, ldType, ldMembers, ldTotalItems, ldView);
    }

    /**
     * Get the integrations in the collection
     */
    getLdMembers(): IntegrationResponse[] {
        return super.getLdMembers() as IntegrationResponse[];
    }

    /**
     * Create from API JSON data
     */
    static fromJSON(data: any): IntegrationCollectionResponse {
        const members = (data.member || []).map((item: any) => IntegrationResponse.fromJSON(item));

        const view = data.view
            ? PartialCollectionView.fromJSON(data.view)
            : null;

        return new IntegrationCollectionResponse(
            data['@context'] || '',
            data['@id'] || '',
            data['@type'] as LdType || LdType.Collection,
            members,
            data.totalItems || 0,
            view
        );
    }
}