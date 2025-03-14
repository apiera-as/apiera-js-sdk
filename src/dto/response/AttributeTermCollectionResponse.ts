// AttributeTermCollectionResponse.ts
import { AbstractCollectionResponse } from '../base';
import { LdType } from '../../enum';
import { PartialCollectionView } from '../base';
import { AttributeTermResponse } from './AttributeTermResponse';

export class AttributeTermCollectionResponse extends AbstractCollectionResponse {
    constructor(
        ldContext: string,
        ldId: string,
        ldType: LdType,
        ldMembers: AttributeTermResponse[] = [],
        ldTotalItems: number = 0,
        ldView: PartialCollectionView | null = null
    ) {
        super(ldContext, ldId, ldType, ldMembers, ldTotalItems, ldView);
    }

    getLdMembers(): AttributeTermResponse[] {
        return super.getLdMembers() as AttributeTermResponse[];
    }

    static fromJSON(data: any): AttributeTermCollectionResponse {
        const members = (data.member || []).map((item: any) => AttributeTermResponse.fromJSON(item));
        const view = data.view ? PartialCollectionView.fromJSON(data.view) : null;

        return new AttributeTermCollectionResponse(
            data['@context'] || '',
            data['@id'] || '',
            data['@type'] as LdType || LdType.Collection,
            members,
            data.totalItems || 0,
            view
        );
    }
}