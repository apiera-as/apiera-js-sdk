// AttributeCollectionResponse.ts
import { AbstractCollectionResponse } from '../base';
import { LdType } from '../../enum';
import { PartialCollectionView } from '../base';
import { AttributeResponse } from './AttributeResponse';

export class AttributeCollectionResponse extends AbstractCollectionResponse {
    constructor(
        ldContext: string,
        ldId: string,
        ldType: LdType,
        ldMembers: AttributeResponse[] = [],
        ldTotalItems: number = 0,
        ldView: PartialCollectionView | null = null
    ) {
        super(ldContext, ldId, ldType, ldMembers, ldTotalItems, ldView);
    }

    getLdMembers(): AttributeResponse[] {
        return super.getLdMembers() as AttributeResponse[];
    }

    static fromJSON(data: any): AttributeCollectionResponse {
        const members = (data.member || []).map((item: any) => AttributeResponse.fromJSON(item));
        const view = data.view ? PartialCollectionView.fromJSON(data.view) : null;

        return new AttributeCollectionResponse(
            data['@context'] || '',
            data['@id'] || '',
            data['@type'] as LdType || LdType.Collection,
            members,
            data.totalItems || 0,
            view
        );
    }
}