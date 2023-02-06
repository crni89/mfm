import React, { useEffect, useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { api } from '../../../api/api';
import IDete from '../../../models/IDete.model';
import Select from 'react-select';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import Multiselect from 'multiselect-react-dropdown';
import { response } from 'express';

interface IAddRoditeljFormState {
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
};

type TSetImePrezime       = { type: "addRoditeljForm/setImePrezime",          value: string };
type TSetJmbg             = { type: "addRoditeljForm/setJmbg",   value: string };
type TSetBrLicne          = { type: "addRoditeljForm/setBrLicne",   value: string };
type TSetMobilni          = { type: "addRoditeljForm/setMobilni",   value: string };
type TSetEmail            = { type: "addRoditeljForm/setEmail",   value: string };
type TSetAdresa           = { type: "addRoditeljForm/setAdresa",   value: string };
type TSetOpstina          = { type: "addRoditeljForm/setOpstina",   value: string };
type TSetNosilacUgovora   = { type: "addRoditeljForm/setNosilacUgovora",   value: boolean };
type TSetTekuciRacun      = { type: "addRoditeljForm/setTekuciRacun",   value: string };
type TSetBrojResenja      = { type: "addRoditeljForm/setBrojResenja",    value: string };
type TSetDete             = { type: "addRoditeljForm/setDete",    value: number[] };
// type TRemoveRoditelj          = { type: "addRoditeljorm/removeRoditelj", value: number };

type AddRoditeljFormAction = TSetImePrezime
                       | TSetJmbg
                       | TSetBrLicne
                       | TSetMobilni
                       | TSetEmail
                       | TSetAdresa
                       | TSetOpstina
                       | TSetNosilacUgovora
                       | TSetTekuciRacun
                       | TSetBrojResenja
                       | TSetDete;
                    //    | TSetRoditelj;

function AddRoditeljFormReducer(oldState: IAddRoditeljFormState, action: AddRoditeljFormAction): IAddRoditeljFormState {
    switch (action.type) {
        case "addRoditeljForm/setImePrezime": {
            return {
                ...oldState,
                jmbg: oldState.jmbg,
                brLicne: oldState.brLicne,
                mobilni: oldState.mobilni,
                email: oldState.email,
                adresa: oldState.adresa,
                opstina: oldState.opstina,
                tekuciRacun: oldState.tekuciRacun,
                brojResenja: oldState.brojResenja,
                nosilacUgovora: oldState.nosilacUgovora,
                deteId: oldState.deteId,
                // This changes:
                imePrezime: action.value,
            }
        }

        case "addRoditeljForm/setJmbg": {
            return {
                ...oldState,
                imePrezime: oldState.imePrezime,
                brLicne: oldState.brLicne,
                mobilni: oldState.mobilni,
                email: oldState.email,
                adresa: oldState.adresa,
                opstina: oldState.opstina,
                tekuciRacun: oldState.tekuciRacun,
                brojResenja: oldState.brojResenja,
                nosilacUgovora: oldState.nosilacUgovora,
                deteId: oldState.deteId,
                // This changes:
                jmbg: action.value,
            }
        }

        case "addRoditeljForm/setBrLicne": {
            return {
                ...oldState,
                imePrezime: oldState.imePrezime,
                jmbg: oldState.jmbg,
                mobilni: oldState.mobilni,
                email: oldState.email,
                adresa: oldState.adresa,
                opstina: oldState.opstina,
                tekuciRacun: oldState.tekuciRacun,
                brojResenja: oldState.brojResenja,
                nosilacUgovora: oldState.nosilacUgovora,
                deteId: oldState.deteId,
                // This changes:
                brLicne: action.value,
            }
        }

        case "addRoditeljForm/setMobilni": {
            return {
                ...oldState,
                imePrezime: oldState.imePrezime,
                jmbg: oldState.jmbg,
                brLicne: oldState.brLicne,
                email: oldState.email,
                adresa: oldState.adresa,
                opstina: oldState.opstina,
                tekuciRacun: oldState.tekuciRacun,
                brojResenja: oldState.brojResenja,
                nosilacUgovora: oldState.nosilacUgovora,
                deteId: oldState.deteId,
                // This changes:
                mobilni: action.value,
            }
        }

        case "addRoditeljForm/setEmail": {
            return {
                ...oldState,
                imePrezime: oldState.imePrezime,
                jmbg: oldState.jmbg,
                brLicne: oldState.brLicne,
                mobilni: oldState.mobilni,
                adresa: oldState.adresa,
                opstina: oldState.opstina,
                tekuciRacun: oldState.tekuciRacun,
                brojResenja: oldState.brojResenja,
                nosilacUgovora: oldState.nosilacUgovora,
                deteId: oldState.deteId,
                // This changes:
                email: action.value,
            }
        }

        case "addRoditeljForm/setAdresa": {
            return {
                ...oldState,
                imePrezime: oldState.imePrezime,
                jmbg: oldState.jmbg,
                brLicne: oldState.brLicne,
                mobilni: oldState.mobilni,
                email: oldState.email,
                opstina: oldState.opstina,
                tekuciRacun: oldState.tekuciRacun,
                brojResenja: oldState.brojResenja,
                nosilacUgovora: oldState.nosilacUgovora,
                deteId: oldState.deteId,
                // This changes:
                adresa: action.value,
            }
        }

        case "addRoditeljForm/setOpstina": {
            return {
                ...oldState,
                imePrezime: oldState.imePrezime,
                jmbg: oldState.jmbg,
                brLicne: oldState.brLicne,
                mobilni: oldState.mobilni,
                email: oldState.email,
                adresa: oldState.adresa,
                tekuciRacun: oldState.tekuciRacun,
                brojResenja: oldState.brojResenja,
                nosilacUgovora: oldState.nosilacUgovora,
                deteId: oldState.deteId,
                // This changes:
                opstina: action.value,
            }
        }

        case "addRoditeljForm/setNosilacUgovora": {
            return {
                ...oldState,
                imePrezime: oldState.imePrezime,
                jmbg: oldState.jmbg,
                brLicne: oldState.brLicne,
                mobilni: oldState.mobilni,
                email: oldState.email,
                adresa: oldState.adresa,
                tekuciRacun: oldState.tekuciRacun,
                brojResenja: oldState.brojResenja,
                opstina: oldState.opstina,
                deteId: oldState.deteId,
                // This changes:
                nosilacUgovora: action.value,
            }
        }
        
        case "addRoditeljForm/setTekuciRacun": {
            return {
                ...oldState,
                imePrezime: oldState.imePrezime,
                jmbg: oldState.jmbg,
                brLicne: oldState.brLicne,
                mobilni: oldState.mobilni,
                email: oldState.email,
                adresa: oldState.adresa,
                nosilacUgovora: oldState.nosilacUgovora,
                brojResenja: oldState.brojResenja,
                opstina: oldState.opstina,
                deteId: oldState.deteId,
                // This changes:
                tekuciRacun: action.value,
            }
        }
        
        case "addRoditeljForm/setBrojResenja": {
            return {
                ...oldState,
                imePrezime: oldState.imePrezime,
                jmbg: oldState.jmbg,
                brLicne: oldState.brLicne,
                mobilni: oldState.mobilni,
                email: oldState.email,
                adresa: oldState.adresa,
                nosilacUgovora: oldState.nosilacUgovora,
                tekuciRacun: oldState.tekuciRacun,
                opstina: oldState.opstina,
                deteId: oldState.deteId,
                // This changes:
                brojResenja: action.value,
            }
        }
        
        case "addRoditeljForm/setDete": {
            return {
                ...oldState,
                imePrezime: oldState.imePrezime,
                jmbg: oldState.jmbg,
                brLicne: oldState.brLicne,
                mobilni: oldState.mobilni,
                email: oldState.email,
                adresa: oldState.adresa,
                nosilacUgovora: oldState.nosilacUgovora,
                tekuciRacun: oldState.tekuciRacun,
                opstina: oldState.opstina,
                brojResenja: oldState.brojResenja,
                // This changes:
                deteId: action.value,
            }
        }
        
        
        default: return oldState;
    }
}


export default function AdminRoditeljiAdd() {

    const [ errorMessage, setErrorMessage ] = useState<string>("");
    const [ dete, setDete ] = useState<IDete[]>([]);

    const navigate = useNavigate();

    const [ formState, dispatchFormStateAction ] = useReducer(AddRoditeljFormReducer, {
        imePrezime: "",
        jmbg: "",
        brLicne: "",
        mobilni: "",
        email: "",
        adresa: "",
        opstina: "",
        tekuciRacun: "",
        brojResenja: "",
        nosilacUgovora: false,
        deteId: [],
    });

    const loadDete = () => {
        api("get", "/api/dete", "administrator")
        .then(res => {
            if (res.status !== "ok") {
                throw new Error("Could not load dete!");
            }

            return res.data;
        })
        .then(dete => {
            setDete(dete);
        })
        .catch(error => {
            setErrorMessage(error?.message ?? "Unknown error!");
        });
    };

    function doAddRoditelj() {
        api("post", "/api/roditelj", "administrator", formState)
        .then(res => {
            if (res.status === 'error') {
                return setErrorMessage(res.data + "");
            }

            navigate("/admin/dashboard", {
                replace: true,
            });
        });
    }

    useEffect(() => {
        loadDete();
    }, []);
    
  return (
    <div className="bg">
        <div className="card">
            <div className='card-body'>
                <div className='card-title'>
                    <h1 className='h4 text-center'>Dodaj Roditelj</h1>
                </div>
                <div className='card-text'>
                    <div className='row mb-3'>
                        <div className='col'>
                            <label>Ime i prezime</label>
                            <input type="text" className='form-control' placeholder='Unesite ime i prezime' 
                                value={ formState.imePrezime }
                                onChange={ e => dispatchFormStateAction({ type: "addRoditeljForm/setImePrezime", value: e.target.value }) }
                            />
                        </div>
                        <div className='col'>
                            <label>JMBG</label>
                            <input type="text" className='form-control' placeholder='Unesite jmbg'
                            value={ formState.jmbg }
                            onChange={ e => dispatchFormStateAction({ type: "addRoditeljForm/setJmbg", value: e.target.value }) }
                            />
                        </div>
                        <div className='col'>
                            <label>Broj licne karte</label>
                            <input type="text" className='form-control' placeholder="Unesite broj lince karte"
                            value={ formState.brLicne }
                            onChange={ e => dispatchFormStateAction({ type: "addRoditeljForm/setBrLicne", value: e.target.value }) }
                            />
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col'>
                            <label>Mobilni</label>
                            <input type="text" className='form-control' placeholder="Unesite br. mobilnog telefona"
                            value={ formState.mobilni }
                            onChange={ e => dispatchFormStateAction({ type: "addRoditeljForm/setMobilni", value: e.target.value }) }
                            />
                        </div>
                        <div className='col'>
                            <label>Email</label>
                            <input type="text" className='form-control' placeholder='Unesite email' 
                            value={ formState.email }
                            onChange={ e => dispatchFormStateAction({ type: "addRoditeljForm/setEmail", value: e.target.value }) }
                            />
                        </div>
                        <div className='col'>
                            <label>Adresa</label>
                            <input type="text" className='form-control' placeholder="Unesite adresu"
                            value={ formState.adresa }
                            onChange={ e => dispatchFormStateAction({ type: "addRoditeljForm/setAdresa", value: e.target.value }) }
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className='col'>
                            <label>Opstina</label>
                            <input type="text" className='form-control' placeholder='Unesite opstinu' 
                            value={ formState.opstina }
                            onChange={ e => dispatchFormStateAction({ type: "addRoditeljForm/setOpstina", value: e.target.value }) }
                            />
                        </div>
                        <div className='col'>
                            <label>Tekuci racun</label>
                            <input type="text" className='form-control' placeholder="Unesite tekuci racun"
                            value={ formState.tekuciRacun }
                            onChange={ e => dispatchFormStateAction({ type: "addRoditeljForm/setTekuciRacun", value: e.target.value }) }
                            />
                        </div>
                        <div className='col'>
                            <label>Broj resenja</label>
                            <input type="text" className='form-control' placeholder="Unesite broj resenja"
                            value={ formState.brojResenja }
                            onChange={ e => dispatchFormStateAction({ type: "addRoditeljForm/setBrojResenja", value: e.target.value }) }
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        {/* <div className="col">
                            <label>Dete</label>
                            <select className='form-select'
                            multiple
                            value={ formState.deteId.map((id) => id.toString()) }
                            onChange={ e => dispatchFormStateAction({ type: "addRoditeljForm/setDete", value: Array.from(e.target.selectedOptions, (option)=> +option.value) }) }
                            >
                                <option>Izaberite dete</option>
                                {dete.map((dete) => (
                                    <option value={dete.deteId}>{dete.imePrezime}</option>
                                ))}
                            </select>
                            
                        </div> */}
                        <div className='col'>
                            <label>Dete</label>
                            <Select
                            options={dete.map((dete) => ({ value: dete.deteId, label: dete.imePrezime }))}
                            isMulti
                            value={formState.deteId.map((id) => ({ value: id, label: dete.find((d) => d.deteId === id)?.imePrezime }))}
                            onChange={(selectedOptions) =>
                                dispatchFormStateAction({
                                type: "addRoditeljForm/setDete",
                                value: selectedOptions.map((option) => option.value),
                                })
                            }
                            />
                        </div>
                        <div className="col">
                            <div className="form-check">
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Nosilac ugovora
                                </label>
                                <input className="form-check-input" type="checkbox" id="flexCheckDefault"
                                onChange={ e => dispatchFormStateAction({ type: "addRoditeljForm/setNosilacUgovora", value: e.target.checked }) }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{marginLeft:"45%"}}>
                        <div className="col">
                            <button className="btn btn-primary" style={{width:'150px', height:"50px"}} onClick={ () => doAddRoditelj() }>
                                Dodaj roditelja
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
