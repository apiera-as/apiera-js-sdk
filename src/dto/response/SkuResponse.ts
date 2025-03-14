import { AbstractResponse } from '../base';
import { LdType } from '../../enum';

export class SkuResponse extends AbstractResponse {
    constructor(
        ldId: string,
        ldType: LdType,
        uuid: string,
        createdAt: Date,
        updatedAt: Date,
        private readonly code: string,
        private readonly products: string[],
        private readonly variants: string[],
        private readonly inventories: string[]
    ) {
        super(ldId, ldType, uuid, createdAt, updatedAt);
    }

    getCode(): string {
        return this.code;
    }

    getProducts(): string[] {
        return this.products;
    }

    getVariants(): string[] {
        return this.variants;
    }

    getInventories(): string[] {
        return this.inventories;
    }

    toJSON(): Record<string, any> {
        return {
            ...super.toJSON(),
            code: this.code,
            products: this.products,
            variants: this.variants,
            inventories: this.inventories
        };
    }

    static fromJSON(data: any): SkuResponse {
        return new SkuResponse(
            data['@id'] || '',
            data['@type'] as LdType || LdType.Sku,
            data.uuid || '',
            new Date(data.createdAt),
            new Date(data.updatedAt),
            data.code || '',
            data.products || [],
            data.variants || [],
            data.inventories || []
        );
    }
}