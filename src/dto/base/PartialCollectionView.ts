import { AbstractDTO } from './AbstractDTO';
import { PartialCollectionViewData } from '../../types';

/**
 * Represents pagination information for a collection
 */
export class PartialCollectionView extends AbstractDTO implements PartialCollectionViewData {
    /**
     * Create a new PartialCollectionView instance
     *
     * @param ldId IRI of the current page
     * @param ldFirst IRI of the first page
     * @param ldLast IRI of the last page
     * @param ldNext IRI of the next page
     * @param ldPrevious IRI of the previous page
     */
    constructor(
        private readonly ldId: string,
        private readonly ldFirst: string | null = null,
        private readonly ldLast: string | null = null,
        private readonly ldNext: string | null = null,
        private readonly ldPrevious: string | null = null
    ) {
        super();
    }

    /**
     * Get the IRI of the current page
     */
    getLdId(): string {
        return this.ldId;
    }

    /**
     * Get the IRI of the first page
     */
    getLdFirst(): string | null {
        return this.ldFirst;
    }

    /**
     * Get the IRI of the last page
     */
    getLdLast(): string | null {
        return this.ldLast;
    }

    /**
     * Get the IRI of the next page
     */
    getLdNext(): string | null {
        return this.ldNext;
    }

    /**
     * Get the IRI of the previous page
     */
    getLdPrevious(): string | null {
        return this.ldPrevious;
    }

    /**
     * Convert to a plain object
     */
    toJSON(): Record<string, any> {
        const result: Record<string, any> = {
            '@id': this.ldId
        };

        if (this.ldFirst !== null) {
            result.first = this.ldFirst;
        }

        if (this.ldLast !== null) {
            result.last = this.ldLast;
        }

        if (this.ldNext !== null) {
            result.next = this.ldNext;
        }

        if (this.ldPrevious !== null) {
            result.previous = this.ldPrevious;
        }

        return result;
    }

    /**
     * Create from API JSON data
     */
    static fromJSON(data: any): PartialCollectionView {
        return new PartialCollectionView(
            data['@id'] || '',
            data.first || null,
            data.last || null,
            data.next || null,
            data.previous || null
        );
    }
}