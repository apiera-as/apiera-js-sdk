import { AbstractDTO } from '../base';
import { RequestDTO } from '../../types';

export class SkuRequest extends AbstractDTO implements RequestDTO {
    constructor(
        private readonly code: string | null = null,
        private readonly iri: string | null = null
    ) {
        super();
    }

    getCode(): string | null { return this.code; }
    getIri(): string | null { return this.iri; }

    toJSON(): Record<string, any> {
        const data: Record<string, any> = {};

        if (this.code !== null) data.code = this.code;

        return data;
    }

    static builder(): SkuRequestBuilder {
        return new SkuRequestBuilder();
    }
}

export class SkuRequestBuilder {
    private _code: string | null = null;
    private _iri: string | null = null;

    code(code: string): SkuRequestBuilder {
        this._code = code;
        return this;
    }

    iri(iri: string): SkuRequestBuilder {
        this._iri = iri;
        return this;
    }

    build(): SkuRequest {
        return new SkuRequest(
            this._code,
            this._iri
        );
    }
}