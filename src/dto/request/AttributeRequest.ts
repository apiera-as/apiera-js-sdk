// AttributeRequest.ts
import { AbstractDTO } from '../base';
import { RequestDTO } from '../../types';

export class AttributeRequest extends AbstractDTO implements RequestDTO {
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

    static builder(): AttributeRequestBuilder {
        return new AttributeRequestBuilder();
    }
}

export class AttributeRequestBuilder {
    private _name: string | null = null;
    private _iri: string | null = null;

    name(name: string): AttributeRequestBuilder {
        this._name = name;
        return this;
    }

    iri(iri: string): AttributeRequestBuilder {
        this._iri = iri;
        return this;
    }

    build(): AttributeRequest {
        return new AttributeRequest(this._name, this._iri);
    }
}