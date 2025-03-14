import { AbstractDTO } from '../base';
import { RequestDTO } from '../../types';
import {AlternateIdentifierType} from "../../enum";

/**
 * DTO for alternate identifier creation and update requests
 */
export class AlternateIdentifierRequest extends AbstractDTO implements RequestDTO {
    constructor(
        private readonly code: string | null = null,
        private readonly type: AlternateIdentifierType | null = null,
    ) {
        super();
    }

    getCode(): string | null { return this.code; };
    getType(): AlternateIdentifierType | null { return this.type; };

    toJSON(): Record<string, any> {
        const data: Record<string, any> = {};

        if (this.code !== null) data.code = this.code;
        if (this.type !== null) data.type = this.type;

        return data;
    }

    static builder(): AlternateIdentifierRequestBuilder {
        return new AlternateIdentifierRequestBuilder();
    }
}

export class AlternateIdentifierRequestBuilder {
    private _code: string | null = null;
    private _type: AlternateIdentifierType | null = null;

    code(code: string): AlternateIdentifierRequestBuilder {
        this._code = code;
        return this;
    }

    type(type: AlternateIdentifierType): AlternateIdentifierRequestBuilder {
        this._type = type;
        return this;
    }

    build(): AlternateIdentifierRequest {
        return new AlternateIdentifierRequest(
            this._code,
            this._type,
        );
    }
}