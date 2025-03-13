import { AbstractCollectionResponse } from '../base';
import { LdType } from '../../enum';
import { PartialCollectionView } from '../base';
import { SkuResponse } from './SkuResponse';

export class SkuCollectionResponse extends AbstractCollectionResponse {
    constructor(
        ldContext: string,
        ldId: string,
        ldType: LdType,
        ldMembers: SkuResponse[] = [],
        ldTotalItems: number = 0,
        ldView: PartialCollectionView | null = null
    ) {
        super(ldContext, ldId, ldType, ldMembers, ldTotalItems, ldView);
    }

    getLdMembers(): SkuResponse[] {
        return super.getLdMembers() as SkuResponse[];
    }

    static fromJSON(data: any): SkuCollectionResponse {
        const members = (data.member || []).map((item: any) => SkuResponse.fromJSON(item));

        const view = data.view
            ? PartialCollectionView.fromJSON(data.view)
            : null;

        return new SkuCollectionResponse(
            data['@context'] || '',
            data['@id'] || '',
            data['@type'] as LdType || LdType.Collection,
            members,
            data.totalItems || 0,
            view
        );
    }
}