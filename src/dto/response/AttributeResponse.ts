// AttributeResponse.ts
import { AbstractResponse } from '../base';
import { LdType } from '../../enum';

export class AttributeResponse extends AbstractResponse {
    constructor(
        ldId: string,
        ldType: LdType,
        uuid: string,
        createdAt: Date,
        updatedAt: Date,
        private readonly name: string,
        private readonly store: string
    ) {
        super(ldId, ldType, uuid, createdAt, updatedAt);
    }

    getName(): string { return this.name; }
    getStore(): string { return this.store; }

    toJSON(): Record<string, any> {
        return {
            ...super.toJSON(),
            name: this.name,
            store: this.store
        };
    }

    static fromJSON(data: any): AttributeResponse {
        return new AttributeResponse(
            data['@id'] || '',
            data['@type'] as LdType || LdType.Attribute,
            data.uuid || '',
            new Date(data.createdAt),
            new Date(data.updatedAt),
            data.name || '',
            data.store || ''
        );
    }
}