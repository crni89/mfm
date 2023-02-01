/* eslint-disable @typescript-eslint/no-unused-vars */
import { motion } from "framer-motion";
import { useEffect, useReducer, useState } from "react";
import { Card, Col, Form,ListGroup, ListGroupItem, Modal, Row, Table } from "react-bootstrap";
import { api } from "../../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import IUgovor from "../../../models/IUgovor.model";
import IDete from '../../../models/IDete.model';
import IPredracun from '../../../models/IPredracun.model';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faPrint, faTrash } from "@fortawesome/free-solid-svg-icons";
import ConfirmAction from "../../../helpers/ConfirmAction";
import IRacun from '../../../models/IRacun.model';
import IUplata from '../../../models/IUplata.model';
import logo from '../../../template/Logo.png';
import { Document, pdf, Page, Text, StyleSheet, Font, Image, View, } from '@react-pdf/renderer';
import LoraBold from './pdfFonts/Lora-Bold.ttf';
import Lora from './pdfFonts/Lora-Regular.ttf';
import { saveAs } from 'file-saver';

export interface IAdminFinansijeFinansijeUrlParams extends Record<string, string | undefined>{
    id: string
}

export interface IAdminFinansijeProperties {
    deteId?: number;
}

interface IAddFinansijeFormState {
    datum: string;
    status: string;
    datumOd: string;
    datumDo: string;
    tip: string;
    brojFakture: number;
    godina: string;
    pozivNaBroj: string;
    iznos: string;
    paket: string;
    valuta: string;
    popust: string;
};
interface IEditFinansijeFormState {
    datum: string;
    status: string;
    datumOd: string;
    datumDo: string;
    tip: string;
    brojFakture: number;
    godina: string;
    pozivNaBroj: string;
    iznos: string;
    paket: string;
    valuta: string;
    popust: string;
};

interface IAddUplataFormState {
    datum: string;
    status: string;
    pozivNaBroj: string;
    iznos: string;
};

interface IEditUplataFormState {
    datum: string;
    status: string;
    pozivNaBroj: string;
    iznos: string;
};

type TSetDatum          = { type: "addFinansijeForm/setDatum",          value: string };
type TSetStatus         = { type: "addFinansijeForm/setStatus",   value: string };
type TSetDatumOd        = { type: "addFinansijeForm/setDatumOd",   value: string };
type TSetDatumDo        = { type: "addFinansijeForm/setDatumDo",   value: string };
type TSetTip            = { type: "addFinansijeForm/setTip",   value: string };
type TSetBrojfakture    = { type: "addFinansijeForm/setBrojfakture",   value: number };
type TSetGodina         = { type: "addFinansijeForm/setGodina",   value: string };
type TSetPozivNaBroj    = { type: "addFinansijeForm/setPozivNaBroj",   value: string };
type TSetIznos          = { type: "addFinansijeForm/setIznos",   value: string };
type TSetPaket          = { type: "addFinansijeForm/setPaket",   value: string };
type TSetValuta         = { type: "addFinansijeForm/setValuta",    value: string };
type TSetPopust         = { type: "addFinansijeForm/setPopust",    value: string };

type AddFinansijeFormAction = TSetDatum
                            | TSetStatus
                            | TSetDatumOd
                            | TSetDatumDo
                            | TSetTip
                            | TSetBrojfakture
                            | TSetGodina
                            | TSetPozivNaBroj
                            | TSetIznos
                            | TSetValuta
                            | TSetPaket
                            | TSetPopust;

type TSetDat           = { type: "editFinansijeForm/setDat",          value: string };
type TSetStat          = { type: "editFinansijeForm/setStat",   value: string };
type TSetDatOd         = { type: "editFinansijeForm/setDatOd",   value: string };
type TSetDatDo         = { type: "editFinansijeForm/setDatDo",   value: string };
type TSetTi            = { type: "editFinansijeForm/setTi",   value: string };
type TSetBrojfakt      = { type: "editFinansijeForm/setBrojfakt",   value: number };
type TSetGod           = { type: "editFinansijeForm/setGod",   value: string };
type TSetPozivNaBr     = { type: "editFinansijeForm/setPozivNaBr",   value: string };
type TSetIzn           = { type: "editFinansijeForm/setIzn",   value: string };
type TSetPak           = { type: "editFinansijeForm/setPak",   value: string };
type TSetVal           = { type: "editFinansijeForm/setVal",    value: string };
type TSetPop           = { type: "editFinansijeForm/setPop",    value: string };

type EditFinansijeFormAction = TSetDat
                            | TSetStat
                            | TSetDatOd
                            | TSetDatDo
                            | TSetTi
                            | TSetBrojfakt
                            | TSetGod
                            | TSetPozivNaBr
                            | TSetIzn
                            | TSetVal
                            | TSetPak
                            | TSetPop;

type TSetDatu           = { type: "addUplataForm/setDatu",      value: string};
type TSetStatu          = { type: "addUplataForm/setStatu",      value: string};
type TSetPozivNaBro     = { type: "addUplataForm/setPozivNaBro",      value: string};
type TSetIzno           = { type: "addUplataForm/setIzno",      value: string};

type AddUplataFormAction = TSetDatu
                        | TSetStatu
                        | TSetPozivNaBro
                        | TSetIzno;

function AddFinansijeFormReducer(oldState: IAddFinansijeFormState, action: AddFinansijeFormAction): IAddFinansijeFormState {
    switch (action.type) {
        case "addFinansijeForm/setDatum": {
            return {
                ...oldState,
                status: oldState.status,
                datumOd: oldState.datumOd,
                datumDo: oldState.datumDo,
                tip: oldState.tip,
                brojFakture: oldState.brojFakture,
                godina: oldState.godina,
                pozivNaBroj: oldState.pozivNaBroj,
                iznos: oldState.iznos,
                valuta: oldState.valuta,
                paket: oldState.paket,
                popust: oldState.popust,
                // This changes:
                datum: action.value,
            }
        }

        case "addFinansijeForm/setStatus": {
            return {
                ...oldState,
                datum: oldState.datum,
                datumOd: oldState.datumOd,
                datumDo: oldState.datumDo,
                tip: oldState.tip,
                brojFakture: oldState.brojFakture,
                godina: oldState.godina,
                pozivNaBroj: oldState.pozivNaBroj,
                iznos: oldState.iznos,
                valuta: oldState.valuta,
                paket: oldState.paket,
                popust: oldState.popust,
                
                // This changes:
                status: action.value,
            }
        }

        case "addFinansijeForm/setDatumOd": {
            return {
                ...oldState,
                datum: oldState.datum,
                status: oldState.status,
                datumDo: oldState.datumDo,
                tip: oldState.tip,
                brojFakture: oldState.brojFakture,
                godina: oldState.godina,
                pozivNaBroj: oldState.pozivNaBroj,
                iznos: oldState.iznos,
                valuta: oldState.valuta,
                paket: oldState.paket,
                popust: oldState.popust,
                
                // This changes:
                datumOd: action.value,
            }
        }

        case "addFinansijeForm/setDatumDo": {
            return {
                ...oldState,
                datum: oldState.datum,
                status: oldState.status,
                datumOd: oldState.datumOd,
                tip: oldState.tip,
                brojFakture: oldState.brojFakture,
                godina: oldState.godina,
                pozivNaBroj: oldState.pozivNaBroj,
                iznos: oldState.iznos,
                valuta: oldState.valuta,
                paket: oldState.paket,
                popust: oldState.popust,
                
                // This changes:
                datumDo: action.value,
            }
        }

        case "addFinansijeForm/setTip": {
            return {
                ...oldState,
                datum: oldState.datum,
                status: oldState.status,
                datumOd: oldState.datumOd,
                datumDo: oldState.datumDo,
                brojFakture: oldState.brojFakture,
                godina: oldState.godina,
                pozivNaBroj: oldState.pozivNaBroj,
                iznos: oldState.iznos,
                valuta: oldState.valuta,
                paket: oldState.paket,
                popust: oldState.popust,
                
                // This changes:
                tip: action.value,
            }
        }

        case "addFinansijeForm/setBrojfakture": {
            return {
                ...oldState,
                datum: oldState.datum,
                status: oldState.status,
                datumOd: oldState.datumOd,
                datumDo: oldState.datumDo,
                tip: oldState.tip,
                godina: oldState.godina,
                pozivNaBroj: oldState.pozivNaBroj,
                iznos: oldState.iznos,
                valuta: oldState.valuta,
                paket: oldState.paket,
                popust: oldState.popust,
                
                // This changes:
                brojFakture: action.value,
            }
        }

        case "addFinansijeForm/setGodina": {
            return {
                ...oldState,
                datum: oldState.datum,
                status: oldState.status,
                datumOd: oldState.datumOd,
                datumDo: oldState.datumDo,
                tip: oldState.tip,
                brojFakture: oldState.brojFakture,
                pozivNaBroj: oldState.pozivNaBroj,
                iznos: oldState.iznos,
                valuta: oldState.valuta,
                paket: oldState.paket,
                popust: oldState.popust,
                
                // This changes:
                godina: action.value,
            }
        }

        case "addFinansijeForm/setPozivNaBroj": {
            return {
                ...oldState,
                datum: oldState.datum,
                status: oldState.status,
                datumOd: oldState.datumOd,
                datumDo: oldState.datumDo,
                tip: oldState.tip,
                brojFakture: oldState.brojFakture,
                godina: oldState.godina,
                iznos: oldState.iznos,
                valuta: oldState.valuta,
                paket: oldState.paket,
                popust: oldState.popust,
                
                // This changes:
                pozivNaBroj: action.value,
            }
        }
        
        case "addFinansijeForm/setIznos": {
            return {
                ...oldState,
                datum: oldState.datum,
                status: oldState.status,
                datumOd: oldState.datumOd,
                datumDo: oldState.datumDo,
                tip: oldState.tip,
                brojFakture: oldState.brojFakture,
                godina: oldState.godina,
                pozivNaBroj: oldState.pozivNaBroj,
                valuta: oldState.valuta,
                paket: oldState.paket,
                popust: oldState.popust,
                
                // This changes:
                iznos: action.value,
            }
        }
        
        case "addFinansijeForm/setValuta": {
            return {
                ...oldState,
                datum: oldState.datum,
                status: oldState.status,
                datumOd: oldState.datumOd,
                datumDo: oldState.datumDo,
                tip: oldState.tip,
                brojFakture: oldState.brojFakture,
                godina: oldState.godina,
                pozivNaBroj: oldState.pozivNaBroj,
                iznos: oldState.iznos,
                paket: oldState.paket,
                popust: oldState.popust,
                
                // This changes:
                valuta: action.value,
            }
        }
        
        case "addFinansijeForm/setPaket": {
            return {
                ...oldState,
                datum: oldState.datum,
                status: oldState.status,
                datumOd: oldState.datumOd,
                datumDo: oldState.datumDo,
                tip: oldState.tip,
                brojFakture: oldState.brojFakture,
                godina: oldState.godina,
                pozivNaBroj: oldState.pozivNaBroj,
                iznos: oldState.iznos,
                valuta: oldState.valuta,
                popust: oldState.popust,
                
                // This changes:
                paket: action.value,
            }
        }
        
        case "addFinansijeForm/setPopust": {
            return {
                ...oldState,
                datum: oldState.datum,
                status: oldState.status,
                datumOd: oldState.datumOd,
                datumDo: oldState.datumDo,
                tip: oldState.tip,
                brojFakture: oldState.brojFakture,
                godina: oldState.godina,
                pozivNaBroj: oldState.pozivNaBroj,
                iznos: oldState.iznos,
                valuta: oldState.valuta,
                paket: oldState.paket,
                
                // This changes:
                popust: action.value,
            }
        }
        
        
        default: return oldState;
    }
}
function EditFinansijeFormReducer(oldState: IEditFinansijeFormState, action: EditFinansijeFormAction): IEditFinansijeFormState {
    switch (action.type) {
        case "editFinansijeForm/setDat": {
            return {
                ...oldState,
                status: oldState.status,
                datumOd: oldState.datumOd,
                datumDo: oldState.datumDo,
                tip: oldState.tip,
                brojFakture: oldState.brojFakture,
                godina: oldState.godina,
                pozivNaBroj: oldState.pozivNaBroj,
                iznos: oldState.iznos,
                valuta: oldState.valuta,
                paket: oldState.paket,
                popust: oldState.popust,
                // This changes:
                datum: action.value,
            }
        }

        case "editFinansijeForm/setStat": {
            return {
                ...oldState,
                datum: oldState.datum,
                datumOd: oldState.datumOd,
                datumDo: oldState.datumDo,
                tip: oldState.tip,
                brojFakture: oldState.brojFakture,
                godina: oldState.godina,
                pozivNaBroj: oldState.pozivNaBroj,
                iznos: oldState.iznos,
                valuta: oldState.valuta,
                paket: oldState.paket,
                popust: oldState.popust,
                
                // This changes:
                status: action.value,
            }
        }

        case "editFinansijeForm/setDatOd": {
            return {
                ...oldState,
                datum: oldState.datum,
                status: oldState.status,
                datumDo: oldState.datumDo,
                tip: oldState.tip,
                brojFakture: oldState.brojFakture,
                godina: oldState.godina,
                pozivNaBroj: oldState.pozivNaBroj,
                iznos: oldState.iznos,
                valuta: oldState.valuta,
                paket: oldState.paket,
                popust: oldState.popust,
                
                // This changes:
                datumOd: action.value,
            }
        }

        case "editFinansijeForm/setDatDo": {
            return {
                ...oldState,
                datum: oldState.datum,
                status: oldState.status,
                datumOd: oldState.datumOd,
                tip: oldState.tip,
                brojFakture: oldState.brojFakture,
                godina: oldState.godina,
                pozivNaBroj: oldState.pozivNaBroj,
                iznos: oldState.iznos,
                valuta: oldState.valuta,
                paket: oldState.paket,
                popust: oldState.popust,
                
                // This changes:
                datumDo: action.value,
            }
        }

        case "editFinansijeForm/setTi": {
            return {
                ...oldState,
                datum: oldState.datum,
                status: oldState.status,
                datumOd: oldState.datumOd,
                datumDo: oldState.datumDo,
                brojFakture: oldState.brojFakture,
                godina: oldState.godina,
                pozivNaBroj: oldState.pozivNaBroj,
                iznos: oldState.iznos,
                valuta: oldState.valuta,
                paket: oldState.paket,
                popust: oldState.popust,
                
                // This changes:
                tip: action.value,
            }
        }

        case "editFinansijeForm/setBrojfakt": {
            return {
                ...oldState,
                datum: oldState.datum,
                status: oldState.status,
                datumOd: oldState.datumOd,
                datumDo: oldState.datumDo,
                tip: oldState.tip,
                godina: oldState.godina,
                pozivNaBroj: oldState.pozivNaBroj,
                iznos: oldState.iznos,
                valuta: oldState.valuta,
                paket: oldState.paket,
                popust: oldState.popust,
                
                // This changes:
                brojFakture: action.value,
            }
        }

        case "editFinansijeForm/setGod": {
            return {
                ...oldState,
                datum: oldState.datum,
                status: oldState.status,
                datumOd: oldState.datumOd,
                datumDo: oldState.datumDo,
                tip: oldState.tip,
                brojFakture: oldState.brojFakture,
                pozivNaBroj: oldState.pozivNaBroj,
                iznos: oldState.iznos,
                valuta: oldState.valuta,
                paket: oldState.paket,
                popust: oldState.popust,
                
                // This changes:
                godina: action.value,
            }
        }

        case "editFinansijeForm/setPozivNaBr": {
            return {
                ...oldState,
                datum: oldState.datum,
                status: oldState.status,
                datumOd: oldState.datumOd,
                datumDo: oldState.datumDo,
                tip: oldState.tip,
                brojFakture: oldState.brojFakture,
                godina: oldState.godina,
                iznos: oldState.iznos,
                valuta: oldState.valuta,
                paket: oldState.paket,
                popust: oldState.popust,
                
                // This changes:
                pozivNaBroj: action.value,
            }
        }
        
        case "editFinansijeForm/setIzn": {
            return {
                ...oldState,
                datum: oldState.datum,
                status: oldState.status,
                datumOd: oldState.datumOd,
                datumDo: oldState.datumDo,
                tip: oldState.tip,
                brojFakture: oldState.brojFakture,
                godina: oldState.godina,
                pozivNaBroj: oldState.pozivNaBroj,
                valuta: oldState.valuta,
                paket: oldState.paket,
                popust: oldState.popust,
                
                // This changes:
                iznos: action.value,
            }
        }
        
        case "editFinansijeForm/setVal": {
            return {
                ...oldState,
                datum: oldState.datum,
                status: oldState.status,
                datumOd: oldState.datumOd,
                datumDo: oldState.datumDo,
                tip: oldState.tip,
                brojFakture: oldState.brojFakture,
                godina: oldState.godina,
                pozivNaBroj: oldState.pozivNaBroj,
                iznos: oldState.iznos,
                paket: oldState.paket,
                popust: oldState.popust,
                
                // This changes:
                valuta: action.value,
            }
        }
        
        case "editFinansijeForm/setPak": {
            return {
                ...oldState,
                datum: oldState.datum,
                status: oldState.status,
                datumOd: oldState.datumOd,
                datumDo: oldState.datumDo,
                tip: oldState.tip,
                brojFakture: oldState.brojFakture,
                godina: oldState.godina,
                pozivNaBroj: oldState.pozivNaBroj,
                iznos: oldState.iznos,
                valuta: oldState.valuta,
                popust: oldState.popust,
                
                // This changes:
                paket: action.value,
            }
        }
        
        case "editFinansijeForm/setPop": {
            return {
                ...oldState,
                datum: oldState.datum,
                status: oldState.status,
                datumOd: oldState.datumOd,
                datumDo: oldState.datumDo,
                tip: oldState.tip,
                brojFakture: oldState.brojFakture,
                godina: oldState.godina,
                pozivNaBroj: oldState.pozivNaBroj,
                iznos: oldState.iznos,
                valuta: oldState.valuta,
                paket: oldState.paket,
                
                // This changes:
                popust: action.value,
            }
        }
        
        
        default: return oldState;
    }
}

function AddUplataFormReducer(oldState: IAddUplataFormState, action: AddUplataFormAction): IAddUplataFormState {
    switch (action.type) {
        case "addUplataForm/setDatu": {
            return {
                ...oldState,
                status: oldState.status,
                pozivNaBroj: oldState.pozivNaBroj,
                iznos: oldState.iznos,
                // This changes:
                datum: action.value,
            }
        }

        case "addUplataForm/setStatu": {
            return {
                ...oldState,
                datum: oldState.datum,
                pozivNaBroj: oldState.pozivNaBroj,
                iznos: oldState.iznos,
                
                // This changes:
                status: action.value,
            }
        }

        case "addUplataForm/setPozivNaBro": {
            return {
                ...oldState,
                datum: oldState.datum,
                status: oldState.status,
                iznos: oldState.iznos,
                
                // This changes:
                pozivNaBroj: action.value,
            }
        }
        
        case "addUplataForm/setIzno": {
            return {
                ...oldState,
                datum: oldState.datum,
                status: oldState.status,
                pozivNaBroj: oldState.pozivNaBroj,
                
                // This changes:
                iznos: action.value,
            }
        }
        
        default: return oldState;
    }
}

export default function AdminFinansijeFinansije(props: IAdminFinansijeProperties) {

    const [upShow, setUpShow] = useState(false);
    const [zaShow, setZaShow] = useState(false);
    const [editZaShow, setEditZaShow] = useState(false);
    const [editZaRaShow, setEditZaRaShow] = useState(false);
    const [selectedPredracun, setSelectedPredracun] = useState<IPredracun>();
    const [selectedRacun, setSelectedRacun] = useState<IRacun>();

    const [ugovor, setUgovor] = useState<IUgovor[]>([]);
    const [dete,setDete] = useState<IDete|null>(null);
    const [ errorMessage, setErrorMessage ] = useState<string>("");
    const [ loading, setLoading ]           = useState<boolean>(false);
    const [predracun, setPredracun] = useState<IPredracun[]>([]);
    const [predracunAll, setPredracunAll] = useState<IPredracun[]>([]);
    const [racun, setRacun] = useState<IRacun[]>([]);
    const [racunAll, setRacunAll] = useState<IRacun[]>([]);
    const [uplata, setUplata] = useState<IUplata[]>([]);

    const [ deleteRequested, setDeleteRequested ] = useState<boolean>(false);
    const [ deleteRequestedRa, setDeleteRequestedRa ] = useState<boolean>(false);
    const [ deleteRequestedU, setDeleteRequestedU ] = useState<boolean>(false);

    const params = useParams<IAdminFinansijeFinansijeUrlParams>();
    const deteId = props.deteId ?? params.id;

    const navigate = useNavigate();

    const [ formState, dispatchFormStateAction ] = useReducer(AddFinansijeFormReducer, {
        datum: "",
        status: "",
        datumOd: "",
        datumDo: "",
        tip: "",
        brojFakture: 0,
        godina: "",
        pozivNaBroj: "",
        iznos: "",
        paket: "",
        valuta: "",
        popust: "",
    });

    const [ editFormState, dispatchEditFormStateAction ] = useReducer(EditFinansijeFormReducer, {
        datum: "",
        status: "",
        datumOd: "",
        datumDo: "",
        tip: "",
        brojFakture: 0,
        godina: "",
        pozivNaBroj: "",
        iznos: "",
        paket: "",
        valuta: "",
        popust: "",
    });

    const [ uFormState, dispatchUFormStateAction ] = useReducer(AddUplataFormReducer, {
        datum: "",
        status: "",
        pozivNaBroj: "",
        iznos: "",
    });

    useEffect(() =>{
        setLoading(true);
        api("get", "api/dete/" + deteId, "administrator")
        .then(res => {
            if(res.status === "error"){
                throw new Error("Could not get dete data!");
            }

            setDete(res.data);
        })
        .catch(error => {
            setErrorMessage(error?.message ?? "Uknown error while loading this dete!");
        })
        .finally(() =>{
            setLoading(false);
        });

        api("get", "api/dete/" + deteId + "/predracun", "administrator")
        .then(res => {
            if(res.status === "error"){
                throw new Error("Could not get predracun data!");
            }

            setPredracun(res.data);
        })
        .catch(error => {
            setErrorMessage(error?.message ?? "Uknown error while loading this predracun!");
        })
        .finally(() =>{
            setLoading(false);
        });

        api("get", "api/dete/" + deteId + "/racun", "administrator")
        .then(res => {
            if(res.status === "error"){
                throw new Error("Could not get predracun data!");
            }

            setRacun(res.data);
        })
        .catch(error => {
            setErrorMessage(error?.message ?? "Uknown error while loading this predracun!");
        })
        .finally(() =>{
            setLoading(false);
        });

        api("get", "api/dete/" + deteId + "/uplata", "administrator")
        .then(res => {
            if(res.status === "error"){
                throw new Error("Could not get uplata data!");
            }

            setUplata(res.data);
        })
        .catch(error => {
            setErrorMessage(error?.message ?? "Uknown error while loading this predracun!");
        })
        .finally(() =>{
            setLoading(false);
        });
    }, [deteId]);

    const loadUgovor = () => {
        api("get", "/api/ugovor", "administrator")
        .then(res => {
            if (res.status !== "ok") {
                throw new Error("Could not load popuste!");
            }

            return res.data;
        })
        .then(ugovor => {
            setUgovor(ugovor);
        })
        .catch(error => {
            setErrorMessage(error?.message ?? "Unknown error!");
        });
    };

    const loadPredracun = (predracunId: number) => {
        api("get", "/api/dete/"+deteId+"/predracun/" + predracunId, "administrator")
        .then(res => {
            if (res.status !== "ok") {
                throw new Error("Could not load predracun!");
            }

            return res.data;
        })
        .then(pred => {
            setSelectedPredracun(pred);
        })
        .catch(error => {
            setErrorMessage(error?.message ?? "Unknown error!");
        })
    }

    const loadRacun = (racunId: number) => {
        api("get", "/api/dete/"+deteId+"/racun/" + racunId, "administrator")
        .then(res => {
            if (res.status !== "ok") {
                throw new Error("Could not load predracun!");
            }

            return res.data;
        })
        .then(rac => {
            setSelectedRacun(rac);
        })
        .catch(error => {
            setErrorMessage(error?.message ?? "Unknown error!");
        })
    }

    const loadRacunAll = () => {
        api("get", "/api/racun", "administrator")
        .then(res => {
            if (res.status !== "ok") {
                throw new Error("Could not load all racun!");
            }

            return res.data;
        })
        .then(racAll => {
            setRacunAll(racAll);
        })
        .catch(error => {
            setErrorMessage(error?.message ?? "Unknown error!");
        })
    }

    const loadPredracunAll = () => {
        api("get", "/api/predracun", "administrator")
        .then(res => {
            if (res.status !== "ok") {
                throw new Error("Could not load all racun!");
            }

            return res.data;
        })
        .then(preAll => {
            setPredracunAll(preAll);
        })
        .catch(error => {
            setErrorMessage(error?.message ?? "Unknown error!");
        })
    }
    useEffect(() => {
        loadRacunAll();
        loadPredracunAll();
    }, []);


    const openModal = (predracun: IPredracun) => {
        setSelectedPredracun(predracun);
        loadPredracun(predracun.predracunId);
        setEditZaShow(true);

    }

    const openModalRa = (racun: IRacun) => {
        setSelectedRacun(racun);
        loadRacun(racun.racunId);
        setEditZaRaShow(true);

    }

    useEffect(() => {
        loadUgovor();
    }, []);

    function doAddZaduzenje() {
        if(formState.tip === "Racun"){
            api("post", "/api/dete/"+deteId+"/racun", "administrator", formState)
            .then(res => {
                if (res.status !== "ok") {
                    throw new Error("Could not add this item! Reason: " + res?.data?.map((error: any) => error?.instancePath + " " + error?.message).join(", "));
                }
                setZaShow(false);
                window.location.reload();
                return res.data;
            })
        } else if (formState.tip === "Predracun"){
            api("post", "/api/dete/"+deteId+"/predracun", "administrator", formState)
            .then(res => {
                if (res.status !== "ok") {
                    throw new Error("Could not add this item! Reason: " + res?.data?.map((error: any) => error?.instancePath + " " + error?.message).join(", "));
                }
                setZaShow(false);
                window.location.reload();
                return res.data;
                
            })
        }
    }
    
    function doAddUplata() {
        api("post", "/api/dete/"+deteId+"/uplata", "administrator", uFormState)
        .then(res => {
            if (res.status !== "ok") {
                throw new Error("Could not add this item! Reason: " + res?.data?.map((error: any) => error?.instancePath + " " + error?.message).join(", "));
            }
            setUpShow(false);
            window.location.reload();
            return res.data;
        })
    }

    const doDeletePre = (predracunId: number) => {
        setPredracun(predracun.filter((predracun) => predracun.predracunId !== predracunId));

        api("delete", "/api/dete/" + deteId + "/predracun/"+ predracunId, "administrator")
        .then(res => {
            if (res.status === 'error') {
                return setErrorMessage("Could not edit this predracun!");
            }
        })
    }

    const doDeleteRa = (racunId: number) => {
        setRacun(racun.filter((racun) => racun.racunId !== racunId));

        api("delete", "/api/dete/" + deteId + "/racun/"+ racunId, "administrator")
        .then(res => {
            if (res.status === 'error') {
                return setErrorMessage("Could not edit this predracun!");
            }
        })
    }

    const doDeleteUplata = (uplataId: number) => {
        setUplata(uplata.filter((uplata) => uplata.uplataId !== uplataId));

        api("delete", "/api/dete/" + deteId + "/uplata/"+ uplataId, "administrator")
        .then(res => {
            if (res.status === 'error') {
                return setErrorMessage("Could not edit this uplata!");
            }
        })
    }

    useEffect(() => {
        dispatchEditFormStateAction({ type: "editFinansijeForm/setDat", value: selectedPredracun?.datum ?? ''});
        dispatchEditFormStateAction({ type: "editFinansijeForm/setStat", value: selectedPredracun?.status ?? ''});
        dispatchEditFormStateAction({ type: "editFinansijeForm/setDatOd", value: selectedPredracun?.datumOd ?? ''});
        dispatchEditFormStateAction({ type: "editFinansijeForm/setDatDo", value: selectedPredracun?.datumDo ?? ''});
        dispatchEditFormStateAction({ type: "editFinansijeForm/setTi", value: selectedPredracun?.tip ?? ''});
        dispatchEditFormStateAction({ type: "editFinansijeForm/setBrojfakt", value: selectedPredracun?.brojFakture ?? 0});
        dispatchEditFormStateAction({ type: "editFinansijeForm/setGod", value: selectedPredracun?.godina ?? ''});
        dispatchEditFormStateAction({ type: "editFinansijeForm/setPozivNaBr", value: selectedPredracun?.pozivNaBroj ?? ''});
        dispatchEditFormStateAction({ type: "editFinansijeForm/setIzn", value: selectedPredracun?.iznos ?? ''});
        dispatchEditFormStateAction({ type: "editFinansijeForm/setPak", value: selectedPredracun?.paket ?? ''});
        dispatchEditFormStateAction({ type: "editFinansijeForm/setVal", value: selectedPredracun?.valuta ?? ''});
        dispatchEditFormStateAction({ type: "editFinansijeForm/setPop", value: selectedPredracun?.popust ?? ''});
    },[selectedPredracun])

    useEffect(() => {
        dispatchEditFormStateAction({ type: "editFinansijeForm/setDat", value: selectedRacun?.datum ?? ''});
        dispatchEditFormStateAction({ type: "editFinansijeForm/setStat", value: selectedRacun?.status ?? ''});
        dispatchEditFormStateAction({ type: "editFinansijeForm/setDatOd", value: selectedRacun?.datumOd ?? ''});
        dispatchEditFormStateAction({ type: "editFinansijeForm/setDatDo", value: selectedRacun?.datumDo ?? ''});
        dispatchEditFormStateAction({ type: "editFinansijeForm/setTi", value: selectedRacun?.tip ?? ''});
        dispatchEditFormStateAction({ type: "editFinansijeForm/setBrojfakt", value: selectedRacun?.brojFakture ?? 0});
        dispatchEditFormStateAction({ type: "editFinansijeForm/setGod", value: selectedRacun?.godina ?? ''});
        dispatchEditFormStateAction({ type: "editFinansijeForm/setPozivNaBr", value: selectedRacun?.pozivNaBroj ?? ''});
        dispatchEditFormStateAction({ type: "editFinansijeForm/setIzn", value: selectedRacun?.iznos ?? ''});
        dispatchEditFormStateAction({ type: "editFinansijeForm/setPak", value: selectedRacun?.paket ?? ''});
        dispatchEditFormStateAction({ type: "editFinansijeForm/setVal", value: selectedRacun?.valuta ?? ''});
        dispatchEditFormStateAction({ type: "editFinansijeForm/setPop", value: selectedRacun?.popust ?? ''});
    },[selectedRacun])

    const doEditPredracun = (predracunId: number) => {
        api("put", "/api/dete/"+ deteId + "/predracun/" + predracunId, "administrator", editFormState)
        .then(res => {
            if (res.status === 'error') {
                return setErrorMessage(res.data + "");
            }

            setEditZaShow(false);
        });
    }

    const doEditRacun = (racunId: number) => {
        api("put", "/api/dete/"+ deteId + "/racun/" + racunId, "administrator", editFormState)
        .then(res => {
            if (res.status === 'error') {
                return setErrorMessage(res.data + "");
            }

            setEditZaRaShow(false);
        });
    }




    const predracunStrings = predracunAll.map((p) => `${p.brojFakture}/${p.godina}`).reverse();
    const predracunString = predracunStrings.join(', ');

    const racunStrings = racunAll.map((p) => `${p.brojFakture}/${p.godina}`).reverse();
    const racunString = racunStrings.join(', ');

    const handleClick = async () => {
        const pdfBlob = await pdf(<RacunPdf />).toBlob();
        saveAs(pdfBlob, 'faktura.pdf');
    }

    const RacunPdf = () => {
        Font.register({
            family: "Lora",
            src: Lora,
            format: "truetype",
          })
        
          Font.register({
            family: "LoraBold",
            src: LoraBold,
            format: "truetype",
          })
        
          const styles = StyleSheet.create({
            page: {
              marginTop: 40,
              marginLeft: 40,
              marginRight: 40,
              marginBottom: 60,
            },
            desniNaslov: {
              fontFamily: "LoraBold",
              fontSize: 13,
              position: "absolute",
              left: 300,
              top: 15
            },
            desniTekst: {
              fontFamily: "Lora",
              fontSize: 13,
              fontWeight: 400,
              position: "absolute",
              left: 300,
              top: 30
            },
            ispodSlikeTekstView: {
              display: "flex",
              flexDirection: "row",
            },
            ispodSlikeTekstView2: {
              display: "flex",
              flexDirection: "row",
            },
            ispodSlikeTekstIme: {
              fontFamily: "Lora",
              fontSize: 13,
              // position: "absolute",
              // top: 150,
              // left: 20
              textAlign: "left",
              marginTop: 15
            },
            ispodSlikeTekstIme2: {
              fontFamily: "LoraBold",
              fontSize: 13,
              // position: "absolute",
              // top: 150,
              // left: 20
              textAlign: "left",
              marginTop: 15,
              textTransform: "uppercase"
            },
            ispodSlikeTekstAd: {
              fontFamily: "Lora",
              fontSize: 13,
              // position: "absolute",
              // top: 170,
              // left: 20
              textAlign: "left",
              marginTop:5
            },
            ispodSlikeTekstAd2: {
              fontFamily: "LoraBold",
              fontSize: 13,
              // position: "absolute",
              // top: 170,
              // left: 20
              textAlign: "left",
              marginTop:5,
              textTransform: "uppercase"
            },
            ispodDesnogTekstaView:{
              display: "flex",
              flexDirection: "row",
              position: "absolute",
              left: 300,
              top: 145
            },
            ispodDesnogTekstaView2:{
              display: "flex",
              flexDirection: "row",
              position: "absolute",
              left: 300,
              top: 165
            },
            ispodDesnogTekstaPro: {
              fontFamily: "Lora",
              fontSize: 13,
              fontWeight: 400,
              // position: "absolute",
              // left: 300,
              // top: 145
            },
            ispodDesnogTekstaPro2: {
              fontFamily: "LoraBold",
              fontSize: 13,
              fontWeight: 400,
              textTransform: "uppercase",
              // position: "absolute",
              // left: 300,
              // top: 145
            },
            ispodDesnogTeksta: {
              fontFamily: "Lora",
              fontSize: 13,
              fontWeight: 400,
              // position: "absolute",
              // left: 300,
              // top: 165
            },
            ispodDesnogTeksta2: {
              fontFamily: "LoraBold",
              fontSize: 13,
              fontWeight: 400,
              textTransform: "uppercase",
              // position: "absolute",
              // left: 300,
              // top: 165
            },
            logo: {
              width: 180,
              height: 130,
              marginLeft: -10
            },
            naslovView: {
              display: "flex",
              flexDirection: "row",
              marginLeft: 155,
            },
            naslov: {
              textAlign: "center",
              marginTop: 30,
              fontFamily: "LoraBold",
            },
            textIspodNaslovaView: {
              display: "flex",
              flexDirection: "row",
              marginTop: 30,
              fontFamily: "LoraBold",
              fontSize: 12
            },
            textIspodNaslovaView1: {
              display: "flex",
              flexDirection: "column",
              fontFamily: "LoraBold",
              fontSize: 12
            },
            textIspodNaslovaView2: {
              display: "flex",
              flexDirection: "column",
              fontFamily: "LoraBold",
              fontSize: 12
            },
            textIspodNaslovaView3: {
              display: "flex",
              flexDirection: "column",
              fontFamily: "LoraBold",
              fontSize: 12
            },
            textIspodNaslova: {
              textAlign: "left",
              marginTop: 10,
              fontFamily: "LoraBold",
              fontSize: 12
            },
            textIspodNaslova2: {
              textAlign: "center",
              marginTop: 10,
              fontFamily: "LoraBold",
              fontSize: 12
            },
            textIspodNaslova3: {
              textAlign: "right",
              marginTop: 10,
              fontFamily: "LoraBold",
              fontSize: 12
            },
            table: { 
              display: "flex", 
              width: 500, 
              height: "auto",
              borderStyle: "solid",
              borderBottomWidth:1,
              borderLeftWidth: 1,
              marginTop: 50
            },
            tableRow: { 
              margin: "auto", 
              flexDirection: "row" 
            }, 
            tableCol: { 
              width: "25%",
              borderStyle: "solid", 
              borderTopWidth:1,
              borderRightWidth: 1
            }, 
            tableCell: { 
              fontFamily: "Lora",
              margin: "auto",
              fontSize: 10 
            },
            tableColPrazan: {
              width: "25%",
              borderStyle: "solid",
              borderTopWidth: 1,
            },
            tableCellUk: {
              fontFamily: "Lora",
              marginLeft: -100,
              fontSize: 12 
            },
            textNaDnu: {
              marginTop: 30,
              fontFamily: "Lora",
              fontSize: 11,
        
            },
        
          })
    
        return (
            <Document>
                <Page style={styles.page}>
                <Image style={styles.logo} src={logo}/>
                <Text style={styles.desniNaslov}>PU MALA FABRIKA MAŠTE</Text>
                <Text style={styles.desniTekst}>Kirila Savića 7, 11000 Voždovac {'\n'}
                        Tel: +381113970449 {'\n'}
                        Email: info@malafabrikamaste.rs {'\n'}
                        Web: www.malafabrikamaste.rs  {'\n'}
                        PIB: 108187688  {'\n'}
                        MB: 17849964
                </Text>
                <View style={styles.ispodSlikeTekstView}>
                    <Text style={styles.ispodSlikeTekstIme}>Ime i prezime: </Text>
                    <Text style={styles.ispodSlikeTekstIme2}> {dete.imePrezime} </Text>
                </View>
                <View style={styles.ispodSlikeTekstView2}>
                    <Text style={styles.ispodSlikeTekstAd}>Adresa: </Text>
                    <Text style={styles.ispodSlikeTekstAd2}>{dete.adresa} </Text>
                </View>
                <View style={styles.ispodDesnogTekstaView}>
                    <Text style={styles.ispodDesnogTekstaPro}>Datum prometa: </Text>
                    <Text style={styles.ispodDesnogTekstaPro2}>{racun.map(r=>r.datumDo)} </Text>
                </View>
                <View style={styles.ispodDesnogTekstaView2}>
                    <Text style={styles.ispodDesnogTeksta}>Datum izdavanja: </Text>
                    <Text style={styles.ispodDesnogTeksta2}>{racun.map(r=>r.datum)} </Text>
                </View>
                <View style={styles.naslovView}>
                    <Text style={styles.naslov}>RAČUN BR. </Text>
                    <Text style={styles.naslov}>{racun.map(r=>r.brojFakture) + "/" + racun.map(r=>r.godina)} </Text>
                </View>
                <View style={styles.textIspodNaslovaView}>
                    <View style={styles.textIspodNaslovaView1}>
                    <Text style={[styles.textIspodNaslova, {fontFamily:'UbuntuBold'}]}>Broj ugovora</Text>
                    <Text style={styles.textIspodNaslova}>{dete.brojUgovora}</Text>
                    </View>
                    <View style={[styles.textIspodNaslovaView2, {marginLeft: 80}]}>
                    <Text style={[styles.textIspodNaslova2, {fontFamily:'UbuntuBold'}]}>Odobren popust</Text>
                    <Text style={styles.textIspodNaslova2}>{dete.popust}</Text>
                    </View>
                    <View style={[styles.textIspodNaslovaView3, {marginLeft: 80}]}>
                    <Text style={[styles.textIspodNaslova3, {fontFamily:'UbuntuBold'}]}>Period korišćenja usluge</Text>
                    <Text style={styles.textIspodNaslova3}>{racun.map(r=>r.datumOd) + "/" + racun.map(r=>r.datumDo)}</Text>
                    </View>
                </View>
                <View style={styles.table}>
                    <View style={styles.tableRow}> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>Opis usluge</Text> 
                    </View> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>Iznos</Text> 
                    </View> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>Popust</Text> 
                    </View> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>Za uplatu</Text> 
                    </View> 
                    </View>
                    <View style={styles.tableRow}> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>{dete.ugovor}</Text> 
                    </View> 
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>{racun.map(r=>r.iznos) + " rsd"}</Text> 
                    </View> 
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{racun.map(r=>r.popust)+ " rsd"}</Text> 
                    </View>
                    <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>{racun.map(r=>r.iznos) + " rsd"}</Text> 
                    </View> 
                    </View>
                    <View style={styles.tableRow}>
                    <View style={styles.tableColPrazan}>
                        <Text style={styles.tableCell}></Text>
                    </View>
                    <View style={styles.tableColPrazan}>
                        <Text style={styles.tableCell}></Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCellUk}>UKUPNO ZA UPLATU</Text>
                    </View>
                    <View style={styles.tableCol}> 
                        <Text style={[styles.tableCell, {fontFamily: "UbuntuBold",}]}>{racun.map(r=>r.iznos) + " rsd"}</Text> 
                    </View> 
                    </View>
                </View>
                <Text style={styles.textNaDnu}>Obveznik nije u sistemu PDV-a. {'\n'}
                        U slučaju kašnjenja sa uplatom, zadržavamo pravo zaračunavanja zakonske zatezne kamate. {'\n'} {'\n'} 
                        Ovaj dokument je izrađen automatskom obradom podataka i ispisan pomoću računara i kao takav {'\n'}
                        punovažan bez pečata i potpisa. {'\n'} {'\n'}
                        Uplata izvršena po profakturi broj {predracun.map(p=>p.brojFakture) + "/" + predracun.map(p=>p.godina)}
                </Text>
                </Page>
            </Document>
        );
    };

    const handleClickPredracun = async () => {
        const pdfBlob = await pdf(<PredracunPdf />).toBlob();
        saveAs(pdfBlob, 'faktura.pdf');
    }

    const monthNames = ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"];
    const extractMonth = (date: string) => {
        const month = date.substring(3,5);
        return monthNames[parseInt(month, 10) - 1];
    }
    

    const PredracunPdf = () => {
        const month = extractMonth(predracun[0].datumOd);
        Font.register({
            family: "Lora",
            src: Lora,
            format: "truetype",
          })
        
          Font.register({
            family: "LoraBold",
            src: LoraBold,
            format: "truetype",
          })

          const styles = StyleSheet.create({
            page: {
              // marginTop: 40,
              // marginLeft: 40,
              // marginRight: 40,
              // marginBottom: 60,
              margin: 30,
              marginBottom: 10,
            },
            desniNaslov: {
              fontFamily: "LoraBold",
              fontSize: 13,
              position: "absolute",
              left: 300,
              top: 15
            },
            desniTekst: {
              fontFamily: "Lora",
              fontSize: 13,
              fontWeight: 400,
              position: "absolute",
              left: 300,
              top: 30
            },
            ispodSlikeTekstView: {
              display: "flex",
              flexDirection: "row",
            },
            ispodSlikeTekstView2: {
              display: "flex",
              flexDirection: "row",
            },
            ispodSlikeTekstIme: {
              fontFamily: "Lora",
              fontSize: 13,
              // position: "absolute",
              // top: 150,
              // left: 20
              textAlign: "left",
              marginTop: 15
            },
            ispodSlikeTekstIme2: {
              fontFamily: "LoraBold",
              fontSize: 13,
              // position: "absolute",
              // top: 150,
              // left: 20
              textAlign: "left",
              marginTop: 15,
              textTransform: "uppercase"
            },
            ispodSlikeTekstAd: {
              fontFamily: "Lora",
              fontSize: 13,
              // position: "absolute",
              // top: 170,
              // left: 20
              textAlign: "left",
              marginTop:5
            },
            ispodSlikeTekstAd2: {
              fontFamily: "LoraBold",
              fontSize: 13,
              // position: "absolute",
              // top: 170,
              // left: 20
              textAlign: "left",
              marginTop:5,
              textTransform: "uppercase"
            },
            ispodDesnogTekstaView:{
              display: "flex",
              flexDirection: "row",
              position: "absolute",
              left: 300,
              top: 145
            },
            ispodDesnogTekstaView2:{
              display: "flex",
              flexDirection: "row",
              position: "absolute",
              left: 300,
              top: 165
            },
            ispodDesnogTekstaPro: {
              fontFamily: "Lora",
              fontSize: 13,
              fontWeight: 400,
              // position: "absolute",
              // left: 300,
              // top: 145
            },
            ispodDesnogTekstaPro2: {
              fontFamily: "LoraBold",
              fontSize: 13,
              fontWeight: 400,
              textTransform: "uppercase",
              // position: "absolute",
              // left: 300,
              // top: 145
            },
            ispodDesnogTeksta: {
              fontFamily: "Lora",
              fontSize: 13,
              fontWeight: 400,
              // position: "absolute",
              // left: 300,
              // top: 165
            },
            ispodDesnogTeksta2: {
              fontFamily: "LoraBold",
              fontSize: 13,
              fontWeight: 400,
              textTransform: "uppercase",
              // position: "absolute",
              // left: 300,
              // top: 165
            },
            logo: {
              width: 180,
              height: 130,
              marginLeft: -10
            },
            naslovView: {
              display: "flex",
              flexDirection: "row",
              marginLeft: 155,
            },
            naslov: {
              textAlign: "center",
              marginTop: 30,
              fontFamily: "LoraBold",
            },
            textIspodNaslovaView: {
              display: "flex",
              flexDirection: "row",
              marginTop: 30,
              fontFamily: "LoraBold",
              fontSize: 12
            },
            textIspodNaslovaView1: {
              display: "flex",
              flexDirection: "column",
              fontFamily: "LoraBold",
              fontSize: 12
            },
            textIspodNaslovaView2: {
              display: "flex",
              flexDirection: "column",
              fontFamily: "LoraBold",
              fontSize: 12
            },
            textIspodNaslovaView3: {
              display: "flex",
              flexDirection: "column",
              fontFamily: "LoraBold",
              fontSize: 12
            },
            textIspodNaslova: {
              textAlign: "left",
              marginTop: 10,
              fontFamily: "LoraBold",
              fontSize: 12
            },
            textIspodNaslova2: {
              textAlign: "center",
              marginTop: 10,
              fontFamily: "LoraBold",
              fontSize: 12
            },
            textIspodNaslova3: {
              textAlign: "right",
              marginTop: 10,
              fontFamily: "LoraBold",
              fontSize: 12
            },
            table: { 
              display: "flex", 
              width: 500, 
              height: "auto",
              borderStyle: "solid",
              borderBottomWidth:1,
              borderLeftWidth: 1,
              marginTop: 50
            },
            tableRow: { 
              margin: "auto", 
              flexDirection: "row" 
            }, 
            tableCol: { 
              width: "25%",
              borderStyle: "solid", 
              borderTopWidth:1,
              borderRightWidth: 1
            }, 
            tableCell: { 
              fontFamily: "Lora",
              margin: "auto",
              fontSize: 10 
            },
            tableColPrazan: {
              width: "25%",
              borderStyle: "solid",
              borderTopWidth: 1,
            },
            tableCellUk: {
              fontFamily: "Lora",
              marginLeft: -100,
              fontSize: 12 
            },
            textNaDnu: {
              marginTop: 30,
              fontFamily: "Lora",
              fontSize: 11,
        
            },
            linija: {
              border:0.5,
              width: "95%",
              color: "grey",
              marginTop: 4,
            },
            linijaNaSredini:{
              position: "absolute",
              left: "23%",
              top: "50%",
              border: 0.8,
              opacity: 0.6,
              width: "50%",
              color: "grey",
              transform: "rotate(90deg)",
            },
            levaStrana: {
              width: "47%",
              height: 260
            },
            desnaStrana:{
              width: "47%",
              height: 260,
              position: "absolute",
              left: "53%",
            },
            uplatnica:{
              marginTop: 5,
              width: "95%",
              height: 260,
            },
            tabele: {
              display: "flex",
              flexDirection: "column",
              marginTop: 14,
            },
            tabeleDesno:{
              display: "flex",
              flexDirection: "column",
              marginTop: 14,
            },
            tabeleDesnoRow:{
              margin: "auto", 
              flexDirection: "row",
            },
            tabeleDesnoCol:{
              width: 50,
              height: 15,
              borderStyle: "solid", 
              border: 1,
              marginTop: 20
            },
            tabeleDesnoCell: { 
              fontFamily: "Lora",
              fontSize: 10
            },
            tabeleCol: { 
              width: 230,
              height: 43,
              borderStyle: "solid", 
              border: 1
            }, 
            tabeleCell: { 
              fontFamily: "Lora",
              fontSize: 10 
            },
            textUplatnica:{
              fontFamily: "Lora",
              fontSize: 10
            },
            potpisLinija:{
              marginTop:25,
              border: 1,
              width: "65%",
            },
            datumLinija:{
              left: 75,
              marginTop:20,
              border: 0.8,
              width: "65%",
            },
            datumLinijaDesno:{
              marginTop:125,
              border: 0.8,
              width: "50%",
            }
        
          })
    return (
          <Document>
            <Page>
              <View style={styles.page}>
                <Image style={styles.logo} src={logo}/>
                <Text style={styles.desniNaslov}>PU MALA FABRIKA MAŠTE</Text>
                <Text style={styles.desniTekst}>Kirila Savića 7, 11000 Voždovac {'\n'}
                      Tel: +381113970449 {'\n'}
                      Email: info@malafabrikamaste.rs {'\n'}
                      Web: www.malafabrikamaste.rs  {'\n'}
                      PIB: 108187688  {'\n'}
                      MB: 17849964
                </Text>
                <View style={styles.ispodSlikeTekstView}>
                  <Text style={styles.ispodSlikeTekstIme}>Ime i prezime: </Text>
                  <Text style={styles.ispodSlikeTekstIme2}> {dete.imePrezime}</Text>
                </View>
                <View style={styles.ispodSlikeTekstView2}>
                  <Text style={styles.ispodSlikeTekstAd}>Adresa: </Text>
                  <Text style={styles.ispodSlikeTekstAd2}> {dete.adresa}</Text>
                </View>
                <View style={styles.ispodDesnogTekstaView}>
                  <Text style={styles.ispodDesnogTekstaPro}>Datum prometa: </Text>
                  <Text style={styles.ispodDesnogTekstaPro2}> {predracun.map(p=>p.datumDo)} </Text>
                </View>
                <View style={styles.ispodDesnogTekstaView2}>
                  <Text style={styles.ispodDesnogTeksta}>Datum izdavanja: </Text>
                  <Text style={styles.ispodDesnogTeksta2}>{predracun.map(p=>p.datum)} </Text>
                </View>
                <View style={styles.naslovView}>
                  <Text style={styles.naslov}>PREDRAČUN BR. </Text>
                  <Text style={styles.naslov}>{predracun.map(p=>p.brojFakture) + "/" + predracun.map(p=>p.godina)} </Text>
                </View>
                <View style={styles.textIspodNaslovaView}>
                  <View style={styles.textIspodNaslovaView1}>
                    <Text style={styles.textIspodNaslova}>Broj ugovora</Text>
                    <Text style={styles.textIspodNaslova}>{dete.brojUgovora}</Text>
                  </View>
                  <View style={[styles.textIspodNaslovaView2, {marginLeft: 80}]}>
                    <Text style={styles.textIspodNaslova2}>Odobren popust</Text>
                    <Text style={styles.textIspodNaslova2}>{dete.popust}</Text>
                  </View>
                  <View style={[styles.textIspodNaslovaView3, {marginLeft: 80}]}>
                    <Text style={styles.textIspodNaslova3}>Period korišćenja usluge</Text>
                    <Text style={styles.textIspodNaslova3}>{predracun.map(p=>p.datumOd) + " - " + predracun.map(p=>p.datumDo)}</Text>
                  </View>
                </View>
                <View style={styles.table}>
                  <View style={styles.tableRow}> 
                    <View style={styles.tableCol}> 
                      <Text style={styles.tableCell}>Opis usluge</Text> 
                    </View> 
                    <View style={styles.tableCol}> 
                      <Text style={styles.tableCell}>Iznos</Text> 
                    </View> 
                    <View style={styles.tableCol}> 
                      <Text style={styles.tableCell}>Popust</Text> 
                    </View> 
                    <View style={styles.tableCol}> 
                      <Text style={styles.tableCell}>Za uplatu</Text> 
                    </View> 
                  </View>
                  <View style={styles.tableRow}> 
                    <View style={styles.tableCol}> 
                      <Text style={styles.tableCell}>{predracun.map(p=>p.paket)}</Text> 
                    </View> 
                    <View style={styles.tableCol}> 
                      <Text style={styles.tableCell}>{predracun.map(p=>p.iznos)} rsd</Text> 
                    </View> 
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{predracun.map(p=>p.popust)} rsd</Text> 
                    </View>
                    <View style={styles.tableCol}> 
                      <Text style={styles.tableCell}>{predracun.map(p=>p.iznos)} rsd</Text> 
                    </View> 
                  </View>
                  <View style={styles.tableRow}>
                    <View style={styles.tableColPrazan}>
                      <Text style={styles.tableCell}></Text>
                    </View>
                    <View style={styles.tableColPrazan}>
                      <Text style={styles.tableCell}></Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCellUk}>UKUPNO ZA UPLATU</Text>
                    </View>
                    <View style={styles.tableCol}> 
                      <Text style={[styles.tableCell, {fontFamily: "LoraBold",}]}>{predracun.map(p=>p.iznos)} rsd</Text> 
                    </View> 
                  </View>
                </View>
                <Text style={styles.textNaDnu}>Obveznik nije u sistemu PDV-a. {'\n'}
                      U slučaju kašnjenja sa uplatom, zadržavamo pravo zaračunavanja zakonske zatezne kamate. {'\n'} {'\n'} 
                      Ovaj dokument je izrađen automatskom obradom podataka i ispisan pomoću računara i kao takav {'\n'}
                      punovažan bez pečata i potpisa. {'\n'} {'\n'}
                </Text>
                <View style={styles.linija}/>
                <View style={styles.uplatnica}>
                  <View style={styles.levaStrana}>
                    <View style={styles.tabele}>
                      <Text style={[styles.textUplatnica, {marginBottom:1, marginLeft:2}]}>platilac</Text>
                      <View style={styles.tabeleCol}> 
                        <Text style={[styles.tabeleCell, {paddingTop: 5, paddingLeft: 2}]}>{dete.imePrezime} {'\n'}{dete.adresa}</Text> 
                      </View> 
                      <Text style={[styles.textUplatnica, {marginBottom: -13.5, marginLeft:2}]}>svrha uplate</Text>
                      <View style={[styles.tabeleCol, {marginTop: 15}]}> 
                        <Text style={[styles.tabeleCell, {paddingLeft: 2}]}>Uplata po predračunu br. {predracun.map(p=>p.brojFakture) + "/" + predracun.map(p=>p.godina)} {'\n'}
                                                        za mesec {month} za objekat Mala fabrika {'\n'}
                                                        mašte - {dete.objekat}
                        </Text> 
                      </View>
                      <Text style={[styles.textUplatnica, {marginBottom: -13.5, marginLeft:2}]}>primalac</Text> 
                      <View style={[styles.tabeleCol, {marginTop: 15}]}> 
                        <Text style={[styles.tabeleCell, {paddingTop:5, paddingLeft:2}]}>PU Mala fabrika mašte, {'\n'}
                                                        Kirila Savića 7, 11000 Voždovac
                        </Text> 
                      </View> 
                    </View>
                    <View style={styles.potpisLinija}/>
                      <Text style={{fontFamily:"Lora", fontSize: 10}}>pečat i potpis platioca</Text>
                    <View style={styles.datumLinija}/>
                      <Text style={{fontFamily:"Lora", fontSize: 10, left: 122}}>mesto i datum prijema</Text>
                  </View>
                  <View style={styles.linijaNaSredini}/>
                  <View style={styles.desnaStrana}>
                    <View style={styles.tabeleDesno}>
                      <View style={styles.tabeleDesnoRow}>
                        <Text style={[styles.textUplatnica, {marginTop:-3 ,marginLeft:2}]}>šifra {'\n'}
                                                                                          plaćanja
                        </Text>
                        <View style={[styles.tabeleDesnoCol, {width: 40, marginLeft: -41, marginTop:25}]}>
                            <Text style={[styles.tabeleDesnoCell, {paddingLeft: 2}]}>189</Text>
                        </View>
                        <Text style={[styles.textUplatnica, {marginTop:11 ,marginLeft:22}]}>valuta</Text>
                        <View style={[styles.tabeleDesnoCol, {width: 40, marginLeft: -30, marginTop:25}]}>
                            <Text style={[styles.tabeleDesnoCell, {textAlign: "center"}]}>RSD</Text>
                        </View>
                        <Text style={[styles.textUplatnica, {marginTop:11 ,marginLeft:22}]}>iznos</Text>
                        <View style={[styles.tabeleDesnoCol, {width: 119.5, marginLeft: -28, marginTop:25}]}>
                            <Text style={[styles.tabeleDesnoCell, {paddingLeft: 2}]}>={predracun.map(p=>p.iznos)}</Text>
                        </View>
                      </View>
                      <View style={styles.tabeleDesnoRow}>
                        <Text style={[styles.textUplatnica, {marginTop:3 ,marginLeft:2}]}>račun primaoca</Text>
                        <View style={[styles.tabeleDesnoCol, {width: 238, marginLeft: -76, marginTop: 16.5}]}>
                          <Text style={[styles.tabeleDesnoCell, {paddingLeft: 2}]}>200-3046160101033-85</Text>
                        </View>
                      </View>
                      <View style={styles.tabeleDesnoRow}>
                        <Text style={[styles.textUplatnica, {position:'absolute', width: 150, left:2, top:3}]}>model i poziv na broj(odobrenje)</Text>
                        <View style={[styles.tabeleDesnoCol, {position:'absolute', width: 35, left:-1, top:-3}]}>
                        </View>
                        <View style={[styles.tabeleDesnoCol, {width: 180, marginLeft: 57, marginTop:17}]}>
                          <Text style={[styles.tabeleDesnoCell, {paddingLeft: 2}]}>{predracun.map(p=>p.brojFakture) + "/" + predracun.map(p=>p.godina)}</Text>
                        </View>
                      </View>
                      <View style={styles.datumLinijaDesno}/>
                      <Text style={{fontFamily:"Lora", fontSize: 10}}>datum izvršenja</Text>
                    </View>
                  </View>
                </View>
              </View>
            </Page>
          </Document>
        );
    };

    
 return (
    <motion.div className="card"
        initial={{
            position: "relative",
            top: 20,
            scale: 0.75,
            opacity: 0,
        }}
        animate={{
            top: 0,
            scale: 1,
            opacity: 1,
        }}
        transition={{
            delay: 0.25,
        }}>
            <Card.Header>
                <p className="h4">Uplate i zaduzenja</p>
                <div className="text-end">
                    <p className="btn btn-primary me-4" onClick={()=> setUpShow(true)}>Uplata</p>
                    <p className="btn btn-primary" onClick={()=> setZaShow(true)}>Zaduzenje</p>
                </div>
                <Modal
                    size="lg"
                    show={upShow}
                    onHide={()=>setUpShow(false)}
                >
                    <Modal.Header closeButton>
                    <Modal.Title>
                        Uplata
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Col>
                            <Row className="mb-5">
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Izaberite datum</Form.Label>
                                        <Form.Control type="text" placeholder="U formatu dd.mm.gggg." 
                                            value={uFormState.datum} 
                                            onChange={ e => dispatchUFormStateAction({ type: "addUplataForm/setDatu", value: e.target.value }) }>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Status</Form.Label>
                                        <Form.Select 
                                            value={uFormState.status}
                                            onChange={ e => dispatchUFormStateAction({ type: "addUplataForm/setStatu", value: e.target.value})}
                                        >
                                            <option value="">Izaberite status</option>
                                            <option value="Neproknjizeno">Neproknjizeno</option>
                                            <option value="Proknjizeno">Proknjizeno</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-5">
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Poziv na broj</Form.Label>
                                        <Form.Control type="text" placeholder="Unesite poziv na broj"
                                            value={uFormState.pozivNaBroj} 
                                            onChange={ e => dispatchUFormStateAction({ type: "addUplataForm/setPozivNaBro", value: e.target.value }) }
                                        >
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Iznos</Form.Label>
                                        <Form.Control type="text" placeholder="Unesit iznos"
                                            value={uFormState.iznos}
                                            onChange={e => dispatchUFormStateAction({ type: "addUplataForm/setIzno", value: e.target.value })}
                                        >
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Col className="mt-5">
                                <button className="btn btn-success" onClick={ () => doAddUplata() }>Sacuvaj</button>
                            </Col>
                        </Col>
                    </Modal.Body>
                </Modal>

                <Modal
                    size="xl"
                    show={zaShow}
                    onHide={() => setZaShow(false)}
                >
                    <Modal.Header closeButton>
                    <Modal.Title>
                        Zaduzenje
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Col>
                            <Row className="mb-5">
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Izaberite datum</Form.Label>
                                        <Form.Control type="text" placeholder="U formatu dd.mm.gggg." 
                                            value={formState.datum} 
                                            onChange={ e => dispatchFormStateAction({ type: "addFinansijeForm/setDatum", value: e.target.value }) }>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Status</Form.Label>
                                        <Form.Select 
                                            value={formState.status}
                                            onChange={ e => dispatchFormStateAction({ type: "addFinansijeForm/setStatus", value: e.target.value})}
                                        >
                                            <option value="">Izaberite status</option>
                                            <option value="Neplaceno">Neplaceno</option>
                                            <option value="Placeno">Placeno</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Datum od</Form.Label>
                                        <Form.Control type="text" placeholder="U formatu dd.mm.gggg."
                                            value={formState.datumOd} 
                                            onChange={ e => dispatchFormStateAction({ type: "addFinansijeForm/setDatumOd", value: e.target.value }) }>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Datum do</Form.Label>
                                        <Form.Control type="text" placeholder="U formatu dd.mm.gggg."
                                            value={formState.datumDo} 
                                            onChange={ e => dispatchFormStateAction({ type: "addFinansijeForm/setDatumDo", value: e.target.value }) }>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-5">
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Tip</Form.Label>
                                        <Form.Select
                                            value={formState.tip} 
                                            onChange={ e => dispatchFormStateAction({ type: "addFinansijeForm/setTip", value: e.target.value }) }
                                        >
                                            <option value="">Izaberite tip</option>
                                            <option value="Racun">Racun</option>
                                            <option value="Predracun">Predracun</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Broj fakture</Form.Label>
                                        <Form.Control type="number" placeholder="Unesit broj"
                                            value={formState.brojFakture} 
                                            onChange={ e => dispatchFormStateAction({ type: "addFinansijeForm/setBrojfakture", value: +e.target.value }) }
                                        >
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Godina</Form.Label>
                                        <Form.Select
                                            value={formState.godina} 
                                            onChange={ e => dispatchFormStateAction({ type: "addFinansijeForm/setGodina", value: e.target.value }) }
                                        >
                                            <option value="20">20</option>
                                            <option value="21">21</option>
                                            <option value="22">22</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Poziv na broj</Form.Label>
                                        <Form.Control type="text" placeholder="Unesite poziv na broj"
                                            value={formState.pozivNaBroj} 
                                            onChange={ e => dispatchFormStateAction({ type: "addFinansijeForm/setPozivNaBroj", value: e.target.value }) }
                                        >
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Paket</Form.Label>
                                        <Form.Select
                                            value={formState.paket} 
                                            onChange={(e) => {
                                                const selectedOption = e.target.value;
                                                const selectedUgovor = ugovor.find(
                                                  (ugovor) => ugovor.ime === selectedOption
                                                );
                                                dispatchFormStateAction({
                                                  type: "addFinansijeForm/setPaket",
                                                  value: selectedOption,
                                                });
                                                dispatchFormStateAction({
                                                  type: "addFinansijeForm/setIznos",
                                                  value: selectedUgovor?.cena ?? "",
                                                });
                                              }}
                                        >
                                            <option value="">Bez paketa</option>
                                            {ugovor.map((ugovor) => (
                                                <option value={ugovor.ime}>{ugovor.ime}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Iznos</Form.Label>
                                        <Form.Control type="text" placeholder="Unesit iznos"
                                            value={formState.paket ? ugovor.find(ugovor => ugovor.ime === formState.paket)?.cena : formState.iznos}
                                            onChange={e => dispatchFormStateAction({ type: "addFinansijeForm/setIznos", value: e.target.value })}
                                        >
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Valuta</Form.Label>
                                        <Form.Select
                                            value={formState.valuta} 
                                            onChange={ e => dispatchFormStateAction({ type: "addFinansijeForm/setValuta", value: e.target.value }) }
                                        >
                                            <option value="">Izaberite valutu</option>
                                            <option value="RSD">RSD</option>
                                            <option value="EUR">EUR</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Popust</Form.Label>
                                        <Form.Select
                                            value={formState.popust} 
                                            onChange={ e => dispatchFormStateAction({ type: "addFinansijeForm/setPopust", value: e.target.value }) }
                                        >
                                            <option value="">Izaberite popust</option>
                                            <option value="0,00">Bez popusta</option>
                                            <option value="50">50%</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mt-5">
                                <Col>
                                        <p>Poslednji dodati broj predracuna: {predracunString}</p>
                                        <p>Poslednji dodati broj racuna: {racunString}</p>
                                </Col>
                            </Row>
                            <Col className="mt-5">
                                <button className="btn btn-success" onClick={ () => doAddZaduzenje() }>Sacuvaj</button>
                            </Col>
                        </Col>
                    </Modal.Body>
                </Modal>

                <Modal
                    size="xl"
                    show={editZaShow}
                    onHide={()=>setEditZaShow(false)}
                    key={selectedPredracun?.predracunId}
                >
                    <Modal.Header closeButton>
                    <Modal.Title>
                        Izmena zaduzenja
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Col>
                            <Row className="mb-5">
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Izaberite datum</Form.Label>
                                        <Form.Control type="text" placeholder="U formatu dd.mm.gggg." 
                                            value={editFormState.datum} 
                                            onChange={ e => dispatchEditFormStateAction({ type: "editFinansijeForm/setDat", value: e.target.value }) }>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Status</Form.Label>
                                        <Form.Select 
                                            value={editFormState.status}
                                            onChange={ e => dispatchEditFormStateAction({ type: "editFinansijeForm/setStat", value: e.target.value})}
                                        >
                                            <option value="">Izaberite status</option>
                                            <option value="Neplaceno">Neplaceno</option>
                                            <option value="Placeno">Placeno</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Datum od</Form.Label>
                                        <Form.Control type="text" placeholder="U formatu dd.mm.gggg."
                                            value={editFormState.datumOd} 
                                            onChange={ e => dispatchEditFormStateAction({ type: "editFinansijeForm/setDatOd", value: e.target.value }) }>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Datum do</Form.Label>
                                        <Form.Control type="text" placeholder="U formatu dd.mm.gggg."
                                            value={editFormState.datumDo} 
                                            onChange={ e => dispatchEditFormStateAction({ type: "editFinansijeForm/setDatDo", value: e.target.value }) }>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-5">
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Tip</Form.Label>
                                        <Form.Select
                                            value={editFormState.tip} 
                                            onChange={ e => dispatchEditFormStateAction({ type: "editFinansijeForm/setTi", value: e.target.value }) }
                                        >
                                            <option value="">Izaberite tip</option>
                                            <option value="Racun">Racun</option>
                                            <option value="Predracun">Predracun</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Broj fakture</Form.Label>
                                        <Form.Control type="text" placeholder="Unesit broj"
                                            value={editFormState.brojFakture} 
                                            onChange={ e => dispatchEditFormStateAction({ type: "editFinansijeForm/setBrojfakt", value: +e.target.value }) }
                                        >
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Godina</Form.Label>
                                        <Form.Select
                                            value={editFormState.godina} 
                                            onChange={ e => dispatchEditFormStateAction({ type: "editFinansijeForm/setGod", value: e.target.value }) }
                                        >
                                            <option value="20">20</option>
                                            <option value="21">21</option>
                                            <option value="22">22</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Poziv na broj</Form.Label>
                                        <Form.Control type="text" placeholder="Unesite poziv na broj"
                                            value={editFormState.pozivNaBroj} 
                                            onChange={ e => dispatchEditFormStateAction({ type: "editFinansijeForm/setPozivNaBr", value: e.target.value }) }
                                        >
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Paket</Form.Label>
                                        <Form.Select
                                            value={editFormState.paket} 
                                            onChange={(e) => {
                                                const selectedOption = e.target.value;
                                                const selectedUgovor = ugovor.find(
                                                  (ugovor) => ugovor.ime === selectedOption
                                                );
                                                dispatchEditFormStateAction({
                                                  type: "editFinansijeForm/setPak",
                                                  value: selectedOption,
                                                });
                                                dispatchEditFormStateAction({
                                                  type: "editFinansijeForm/setIzn",
                                                  value: selectedUgovor?.cena ?? "",
                                                });
                                              }}
                                        >
                                            <option value="">Bez paketa</option>
                                            {ugovor.map((ugovor) => (
                                                <option value={ugovor.ime}>{ugovor.ime}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Iznos</Form.Label>
                                        <Form.Control type="text" placeholder="Unesit iznos"
                                            value={editFormState.paket ? ugovor.find(ugovor => ugovor.ime === editFormState.paket)?.cena : editFormState.iznos}
                                            onChange={e => dispatchEditFormStateAction({ type: "editFinansijeForm/setIzn", value: e.target.value })}
                                        >
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Valuta</Form.Label>
                                        <Form.Select
                                            value={editFormState.valuta} 
                                            onChange={ e => dispatchEditFormStateAction({ type: "editFinansijeForm/setVal", value: e.target.value }) }
                                        >
                                            <option value="">Izaberite valutu</option>
                                            <option value="RSD">RSD</option>
                                            <option value="EUR">EUR</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Popust</Form.Label>
                                        <Form.Select
                                            value={editFormState.popust} 
                                            onChange={ e => dispatchEditFormStateAction({ type: "editFinansijeForm/setPop", value: e.target.value }) }
                                        >
                                            <option value="">Izaberite popust</option>
                                            <option value="0">Bez popusta</option>
                                            <option value="50">50%</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Col className="mt-5">
                                <button className="btn btn-success" onClick={ () => doEditPredracun(selectedPredracun!.predracunId) }>Sacuvaj</button>
                            </Col>
                        </Col>
                    </Modal.Body>
                </Modal>

                <Modal
                    size="xl"
                    show={editZaRaShow}
                    onHide={()=>setEditZaShow(false)}
                    key={selectedRacun?.racunId}
                >
                    <Modal.Header closeButton>
                    <Modal.Title>
                        Izmena zaduzenja
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Col>
                            <Row className="mb-5">
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Izaberite datum</Form.Label>
                                        <Form.Control type="text" placeholder="U formatu dd.mm.gggg." 
                                            value={editFormState.datum} 
                                            onChange={ e => dispatchEditFormStateAction({ type: "editFinansijeForm/setDat", value: e.target.value }) }>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Status</Form.Label>
                                        <Form.Select 
                                            value={editFormState.status}
                                            onChange={ e => dispatchEditFormStateAction({ type: "editFinansijeForm/setStat", value: e.target.value})}
                                        >
                                            <option value="">Izaberite status</option>
                                            <option value="Neplaceno">Neplaceno</option>
                                            <option value="Placeno">Placeno</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Datum od</Form.Label>
                                        <Form.Control type="text" placeholder="U formatu dd.mm.gggg."
                                            value={editFormState.datumOd} 
                                            onChange={ e => dispatchEditFormStateAction({ type: "editFinansijeForm/setDatOd", value: e.target.value }) }>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Datum do</Form.Label>
                                        <Form.Control type="text" placeholder="U formatu dd.mm.gggg."
                                            value={editFormState.datumDo} 
                                            onChange={ e => dispatchEditFormStateAction({ type: "editFinansijeForm/setDatDo", value: e.target.value }) }>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-5">
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Tip</Form.Label>
                                        <Form.Select
                                            value={editFormState.tip} 
                                            onChange={ e => dispatchEditFormStateAction({ type: "editFinansijeForm/setTi", value: e.target.value }) }
                                        >
                                            <option value="">Izaberite tip</option>
                                            <option value="Racun">Racun</option>
                                            <option value="Predracun">Predracun</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Broj fakture</Form.Label>
                                        <Form.Control type="text" placeholder="Unesit broj"
                                            value={editFormState.brojFakture} 
                                            onChange={ e => dispatchEditFormStateAction({ type: "editFinansijeForm/setBrojfakt", value: +e.target.value }) }
                                        >
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Godina</Form.Label>
                                        <Form.Select
                                            value={editFormState.godina} 
                                            onChange={ e => dispatchEditFormStateAction({ type: "editFinansijeForm/setGod", value: e.target.value }) }
                                        >
                                            <option value="20">20</option>
                                            <option value="21">21</option>
                                            <option value="22">22</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Poziv na broj</Form.Label>
                                        <Form.Control type="text" placeholder="Unesite poziv na broj"
                                            value={editFormState.pozivNaBroj} 
                                            onChange={ e => dispatchEditFormStateAction({ type: "editFinansijeForm/setPozivNaBr", value: e.target.value }) }
                                        >
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Paket</Form.Label>
                                        <Form.Select
                                            value={editFormState.paket} 
                                            onChange={(e) => {
                                                const selectedOption = e.target.value;
                                                const selectedUgovor = ugovor.find(
                                                  (ugovor) => ugovor.ime === selectedOption
                                                );
                                                dispatchEditFormStateAction({
                                                  type: "editFinansijeForm/setPak",
                                                  value: selectedOption,
                                                });
                                                dispatchEditFormStateAction({
                                                  type: "editFinansijeForm/setIzn",
                                                  value: selectedUgovor?.cena ?? "",
                                                });
                                              }}
                                        >
                                            <option value="">Bez paketa</option>
                                            {ugovor.map((ugovor) => (
                                                <option value={ugovor.ime}>{ugovor.ime}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Iznos</Form.Label>
                                        <Form.Control type="text" placeholder="Unesit iznos"
                                            value={editFormState.paket ? ugovor.find(ugovor => ugovor.ime === editFormState.paket)?.cena : editFormState.iznos}
                                            onChange={e => dispatchEditFormStateAction({ type: "editFinansijeForm/setIzn", value: e.target.value })}
                                        >
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Valuta</Form.Label>
                                        <Form.Select
                                            value={editFormState.valuta} 
                                            onChange={ e => dispatchEditFormStateAction({ type: "editFinansijeForm/setVal", value: e.target.value }) }
                                        >
                                            <option value="">Izaberite valutu</option>
                                            <option value="RSD">RSD</option>
                                            <option value="EUR">EUR</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Popust</Form.Label>
                                        <Form.Select
                                            value={editFormState.popust} 
                                            onChange={ e => dispatchEditFormStateAction({ type: "editFinansijeForm/setPop", value: e.target.value }) }
                                        >
                                            <option value="">Izaberite popust</option>
                                            <option value="0,00">Bez popusta</option>
                                            <option value="50">50%</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Col className="mt-5">
                                <button className="btn btn-success" onClick={ () => doEditRacun(selectedRacun!.racunId) }>Sacuvaj</button>
                            </Col>
                        </Col>
                    </Modal.Body>
                </Modal>
            </Card.Header>
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Subtitle>Card Subtitle</Card.Subtitle>
                <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                </Card.Text>
            </Card.Body>
            <ListGroup>
                <ListGroupItem>
                {uplata.length === 0 ? (
                        <div></div>
                ) : (
                    uplata.map((uplata) => (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Datum</th>
                            <th>Poziv na broj</th>
                            <th>Iznos</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={uplata.uplataId}>
                            <th>{uplata.uplataId}</th>
                            <th>{uplata.datum}</th>
                            <th>{uplata.pozivNaBroj}</th>
                            <th>{uplata.iznos}</th>
                            <th>{uplata.status}</th>
                            <th>
                                {/* <button className="btn btn-warning me-3" onClick={() => openModalRa(racun)}><FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon></button> */}
                                <button className="btn btn-danger" onClick={ () => setDeleteRequestedU(true) }><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button>
                                { deleteRequestedU && <ConfirmAction
                                    title="Confirm that you want to delete this uplata"
                                    message={ "Are you sure that you want to delete this uplata with ID: \"" + uplata.uplataId + "\"?" }
                                    onNo={ () => setDeleteRequestedU(false) }
                                    onYes={ () => doDeleteUplata(uplata.uplataId) }
                                /> }
                            </th>
                        </tr>
                    </tbody>
                </Table>
                ))
                )}
                </ListGroupItem>
                <ListGroupItem>
                {racun.length === 0 ? (
                        <div></div>
                ) : (
                    racun.map((racun) => (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Datum</th>
                            <th>Tip</th>
                            <th>Broj fakture</th>
                            <th>Poziv na broj</th>
                            <th>Paket</th>
                            <th>Iznos</th>
                            <th>Status</th>
                            <th>Opcije</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={racun.racunId}>
                            <th>{racun.datum}</th>
                            <th>{racun.tip}</th>
                            <th>{racun.brojFakture}</th>
                            <th>{racun.pozivNaBroj}</th>
                            <th>{racun.paket}</th>
                            <th>{racun.iznos}</th>
                            <th>{racun.status}</th>
                            <th>
                                <button className="btn btn-warning me-3" onClick={() => openModalRa(racun)}><FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon></button>
                                <button className="btn btn-primary me-3" onClick={handleClick}><FontAwesomeIcon icon={faPrint}></FontAwesomeIcon></button>
                                <button className="btn btn-danger" onClick={ () => setDeleteRequestedRa(true) }><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button>
                                { deleteRequestedRa && <ConfirmAction
                                    title="Confirm that you want to delete this racun"
                                    message={ "Are you sure that you want to delete this racun: \"" + racun.brojFakture + "/" + racun.godina + "\"?" }
                                    onNo={ () => setDeleteRequestedRa(false) }
                                    onYes={ () => doDeleteRa(racun.racunId) }
                                /> }
                            </th>
                        </tr>
                    </tbody>
                </Table>
                ))
                )}
                </ListGroupItem>
                <ListGroupItem>
                {predracun.length === 0 ? (
                        <div></div>
                ) : (
                    predracun.map((predracun) => (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Datum</th>
                            <th>Tip</th>
                            <th>Broj fakture</th>
                            <th>Poziv na broj</th>
                            <th>Paket</th>
                            <th>Iznos</th>
                            <th>Status</th>
                            <th>Opcije</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={predracun.predracunId}>
                            <th>{predracun.datum}</th>
                            <th>{predracun.tip}</th>
                            <th>{predracun.brojFakture}</th>
                            <th>{predracun.pozivNaBroj}</th>
                            <th>{predracun.paket}</th>
                            <th>{predracun.iznos}</th>
                            <th>{predracun.status}</th>
                            <th>
                                <button className="btn btn-warning me-3" onClick={() => openModal(predracun)}><FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon></button>
                                <button className="btn btn-primary me-3" onClick={handleClickPredracun}><FontAwesomeIcon icon={faPrint}></FontAwesomeIcon></button>
                                <button className="btn btn-danger" onClick={ () => setDeleteRequested(true) }><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button>
                                { deleteRequested && <ConfirmAction
                                    title="Confirm that you want to delete this zaduzenje"
                                    message={ "Are you sure that you want to delete this zaduzenje: \"" + predracun.brojFakture + "/" + predracun.godina + "\"?" }
                                    onNo={ () => setDeleteRequested(false) }
                                    onYes={ () => doDeletePre(predracun.predracunId) }
                                /> }
                            </th>
                        </tr>
                    </tbody>
                </Table>
                ))
                )}
                </ListGroupItem>
            </ListGroup>
            <Card.Body>
            </Card.Body>
    </motion.div>
  )  
}
