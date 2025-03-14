// dto/response/BrandCollectionResponse.ts
import { AbstractCollectionResponse } from '../base';
import { LdType } from '../../enum';
import { PartialCollectionView } from '../base';
import { BrandResponse } from './BrandResponse';

/**
 * DTO for brand collection responses
 */
export class BrandCollectionResponse extends AbstractCollectionResponse {
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
    constructor(
        ldContext: string,
        ldId: string,
        ldType: LdType,
        ldMembers: BrandResponse[] = [],
        ldTotalItems: number = 0,
        ldView: PartialCollectionView | null = null
    ) {
        super(ldContext, ldId, ldType, ldMembers, ldTotalItems, ldView);
    }

    /**
     * Get the brands in the collection
     */
    getLdMembers(): BrandResponse[] {
        return super.getLdMembers() as BrandResponse[];
    }

    /**
     * Create from API JSON data
     */
    static fromJSON(data: any): BrandCollectionResponse {
        const members = (data.member || []).map((item: any) => BrandResponse.fromJSON(item));

        const view = data.view
            ? PartialCollectionView.fromJSON(data.view)
            : null;

        return new BrandCollectionResponse(
            data['@context'] || '',
            data['@id'] || '',
            data['@type'] as LdType || LdType.Collection,
            members,
            data.totalItems || 0,
            view
        );
    }
}