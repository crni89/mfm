import Ajv from "ajv";
import addFormats from "ajv-formats";
import IServiceData from "../../../common/IServiceData.interface";

const ajv = new Ajv();
addFormats(ajv);

export interface IAddRoditeljDto {
    imePrezime: string;
    jmbg: string;
    brLicne: string;
    mobilni: string;
    email: string;
    adresa: string;
    opstina: string;
    tekuciRacun: string;
    brojResenja: string;
    nosilacUgovora: boolean;
    deteId: number[];
}

export interface IAddRoditelj extends IServiceData {
    ime_prezime: string;
    jmbg: string;
    br_licne: string;
    mobilni: string;
    email: string;
    adresa: string;
    opstina: string;
    tekuci_racun: string;
    broj_resenja: string;
    nosilac_ugovora: number;
}

export interface IRoditeljDete extends IServiceData {
    roditelj_id: number;
    dete_id: number[];
}

const AddRoditeljValidator = ajv.compile({
    type: "object",
    properties: {
        imePrezime: {
            type: "string",
            minLength: 2,
            maxLength: 128,
        },
        jmbg: {
            type: "string",
            minLength: 13,
            maxLength: 13,
        },
        brLicne: {
            type: "string",
            minLength: 13,
            maxLength: 13,
        },
        mobilni: {
            type: "string",
            minLength: 2,
            maxLength: 13,
        },
        email: {
            type: "string",
            format: "email",
        },
        adresa:{
            type: "string",
            minLength: 2,
            maxLength: 64,
        },
        opstina:{
            type: "string",
            minLength: 2,
            maxLength: 64,
        },
        tekuciRacun:{
            type: "string",
            minLength: 2,
            maxLength: 128,
        },
        brojResenja: {
            type: "string",
            minLength: 2,
            maxLength: 64,
        },
        nosilacUgovora: {
            type: "boolean",
        },
        deteId: {
            type: "array",
            items: {
                type: 'integer',
            },
        },
    },
    required: [
        "imePrezime",
        "jmbg",
        "brLicne",
        "mobilni",
        "email",
        "adresa",
        "opstina",
        "tekuciRacun",
        "brojResenja",
        "nosilacUgovora",
        "deteId"
    ],
    additionalProperties: false,
});

export { AddRoditeljValidator };
