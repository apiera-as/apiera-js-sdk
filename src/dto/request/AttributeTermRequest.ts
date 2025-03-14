// AttributeTermRequest.ts
import { AbstractDTO } from '../base';
import { RequestDTO } from '../../types';

export class AttributeTermRequest extends AbstractDTO implements RequestDTO {
    constructor(
        private readonly name: string | null = null,
        private readonly iri: string | null = null
    ) {
        super();
    }

    getName(): string | null { return this.name; }
    getIri(): string | null { return this.iri; }

    toJSON(): Record<string, any> {
        const data: Record<string, any> = {};
        if (this.name !== null) data.name = this.name;
        return data;
    }

    static builder(): AttributeTermRequestBuilder {
        return new AttributeTermRequestBuilder();
    }
}

export class AttributeTermRequestBuilder {
    private _name: string | null = null;
    private _iri: string | null = null;

    name(name: string): AttributeTermRequestBuilder {
        this._name = name;
        return this;
    }

    iri(iri: string): AttributeTermRequestBuilder {
        this._iri = iri;
        return this;
    }

    build(): AttributeTermRequest {
        return new AttributeTermRequest(this._name, this._iri);
    }
}