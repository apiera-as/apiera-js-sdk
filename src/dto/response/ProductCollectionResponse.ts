// dto/response/ProductCollectionResponse.ts
import { AbstractCollectionResponse } from '../base';
import { LdType } from '../../enum';
import { PartialCollectionView } from '../base';
import { ProductResponse } from './ProductResponse';

/**
 * DTO for product collection responses
 */
export class ProductCollectionResponse extends AbstractCollectionResponse {
    /**
     * Create a new ProductCollectionResponse
     */
    constructor(
        ldContext: string,
        ldId: string,
        ldType: LdType,
        ldMembers: ProductResponse[] = [],
        ldTotalItems: number = 0,
        ldView: PartialCollectionView | null = null
    ) {
        super(ldContext, ldId, ldType, ldMembers, ldTotalItems, ldView);
    }

    /**
     * Get the products in the collection
     */
    getLdMembers(): ProductResponse[] {
        return super.getLdMembers() as ProductResponse[];
    }

    /**
     * Create from API JSON data
     */
    static fromJSON(data: any): ProductCollectionResponse {
        const members = (data.member || []).map((item: any) => ProductResponse.fromJSON(item));

        const view = data.view
            ? PartialCollectionView.fromJSON(data.view)
            : null;

        return new ProductCollectionResponse(
            data['@context'] || '',
            data['@id'] || '',
            data['@type'] as LdType || LdType.Collection,
            members,
            data.totalItems || 0,
            view
        );
    }
}