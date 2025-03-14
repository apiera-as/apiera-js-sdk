// AttributeTermResponse.ts
import { AbstractResponse } from '../base';
import { LdType } from '../../enum';

export class AttributeTermResponse extends AbstractResponse {
    constructor(
        ldId: string,
        ldType: LdType,
        uuid: string,
        createdAt: Date,
        updatedAt: Date,
        private readonly name: string,
        private readonly attribute: string,
        private readonly store: string
    ) {
        super(ldId, ldType, uuid, createdAt, updatedAt);
    }

    getName(): string { return this.name; }
    getAttribute(): string { return this.attribute; }
    getStore(): string { return this.store; }

    toJSON(): Record<string, any> {
        return {
            ...super.toJSON(),
            name: this.name,
            attribute: this.attribute,
            store: this.store
        };
    }

    static fromJSON(data: any): AttributeTermResponse {
        return new AttributeTermResponse(
            data['@id'] || '',
            data['@type'] as LdType || LdType.AttributeTerm,
            data.uuid || '',
            new Date(data.createdAt),
            new Date(data.updatedAt),
            data.name || '',
            data.attribute || '',
            data.store || ''
        );
    }
}