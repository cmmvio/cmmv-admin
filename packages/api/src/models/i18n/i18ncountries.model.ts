/**
    **********************************************
    This script was generated automatically by CMMV.
    It is recommended not to modify this file manually,
    as it may be overwritten by the application.
    **********************************************
**/

import { fastJson, AbstractModel } from "@cmmv/core";

import {
    ObjectType, Field, ID, Int, Float
} from "@cmmv/graphql";

import {
    Expose,
    instanceToPlain,
    plainToInstance,
    Type
} from "@cmmv/core";

import {
    IsOptional,
    IsNotEmpty
} from "@cmmv/core"; 

export interface II18NCountries {
    id?: any;
    name?: string;
    iso?: string;
    alpha3: string;
    numeric: number;
    ddi: string;
    phoneMask: string;
}

//Model
@ObjectType()
export class I18NCountries extends AbstractModel implements II18NCountries {

        @Field(type => ID) //GraphQL
    @Expose({ toClassOnly: true })
    @IsOptional()
    readonly id!: string;

    @Expose()
    name?: string;

    @Expose()
    iso?: string;

    @Expose()
    @IsNotEmpty()
    alpha3: string;

    @Expose()
    numeric: number;

    @Expose()
    ddi: string;

    @Expose()
    phoneMask: string;

    constructor(partial: Partial<I18NCountries>) {
        super();
        Object.assign(this, partial);
    }

    public static fromPartial(partial: Partial<I18NCountries>): I18NCountries{
        return plainToInstance(I18NCountries, partial, {
            exposeUnsetFields: false,
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        })
    }

    public static fromEntity(entity: any) : any {
        return this.sanitizeEntity(I18NCountries, entity);
    }

    public toString(){
        return I18NCountriesFastSchema(this);
    }
}

// Schema
export const I18NCountriesFastSchemaStructure = {
    title: "I18NCountries Schema",
    type: "object",
    properties: {
        id: {
            type: "string",
            nullable: false
        },
        name: {
            type: "string",
            nullable: true
        },
        iso: {
            type: "string",
            nullable: true
        },
        alpha3: {
            type: "string",
            nullable: false
        },
        numeric: {
            type: "integer",
            nullable: false
        },
        ddi: {
            type: "string",
            nullable: false
        },
        phoneMask: {
            type: "string",
            nullable: false
        }
    },
    required: ["id", "alpha3", "numeric", "ddi", "phoneMask"]
};

export const I18NCountriesFastSchema = fastJson(I18NCountriesFastSchemaStructure);

