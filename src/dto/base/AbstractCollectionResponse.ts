import { AbstractDTO } from './AbstractDTO';
import { JsonLDCollectionResource, ResponseDTO } from '../../types';
import { LdType } from '../../enum';
import { PartialCollectionView } from './PartialCollectionView';

/**
 * Abstract base class for collection responses
 */
export abstract class AbstractCollectionResponse extends AbstractDTO implements JsonLDCollectionResource {
    /**
     * Create a new AbstractCollectionResponse
     *
     * @param ldContext JSON-LD context of the collection
     * @param ldId IRI of the collection
     * @param ldType Type of the collection
     * @param ldMembers Items in the collection
     * @param ldTotalItems Total number of items across all pages
     * @param ldView Pagination information
     */
    constructor(
        private readonly ldContext: string,
        private readonly ldId: string,
        private readonly ldType: LdType,
        private readonly ldMembers: ResponseDTO[] = [],
        private readonly ldTotalItems: number = 0,
        private readonly ldView: PartialCollectionView | null = null
    ) {
        super();
    }

    /**
     * Get the JSON-LD context of the collection
     */
    getLdContext(): string {
        return this.ldContext;
    }

    /**
     * Get the IRI of the collection
     */
    getLdId(): string {
        return this.ldId;
    }

    /**
     * Get the type of the collection
     */
    getLdType(): LdType {
        return this.ldType;
    }

    /**
     * Get the items in the collection
     */
    getLdMembers(): ResponseDTO[] {
        return this.ldMembers;
    }

    /**
     * Get the total number of items across all pages
     */
    getLdTotalItems(): number {
        return this.ldTotalItems;
    }

    /**
     * Get the pagination information
     */
    getLdView(): PartialCollectionView | null {
        return this.ldView;
    }

    /**
     * Convert to a plain object
     */
    toJSON(): Record<string, any> {
        return {
            '@context': this.ldContext,
            '@id': this.ldId,
            '@type': this.ldType,
            'member': this.ldMembers.map(member => member.toJSON()),
            'totalItems': this.ldTotalItems,
            'view': this.ldView ? this.ldView.toJSON() : null
        };
    }
}