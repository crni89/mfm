import { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../api/api";
import IGrupa from '../../../models/IGrupa.model';
import IObjekat from '../../../models/IObjekat.model';
import IUgovor from '../../../models/IUgovor.model';
import IRoditelj from '../../../models/IRoditelj.model';
import dayjs  from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import IPorodicniStatus from "../../../models/IPorodicniStatus.model";

interface IAddDeteFormState {
    imePrezime: string;
    jmbg: string;
    datumRodj: string;
    adresa: string;
    brojUgovora: string;
    datumUgovora: string;
    datumPolaska: string;
    subvencija: boolean;
    popust: string;
    grupa: string;
    objekat: string;
    ugovor: string;
    pstatus: string;
};

type TSetImePrezime          = { type: "addDeteForm/setImePrezime",          value: string };
type TSetJmbg                = { type: "addDeteForm/setJmbg",   value: string };
type TSetDatumRodj           = { type: "addDeteForm/setDatumRodj",   value: string };
type TSetAdresa              = { type: "addDeteForm/setAdresa",   value: string };
type TSetBrojUgovora         = { type: "addDeteForm/setBrojUgovora",   value: string };
type TSetDatumUgovora        = { type: "addDeteForm/setDatumUgovora",   value: string };
type TSetDatumPolaska        = { type: "addDeteForm/setDatumPolaska",   value: string };
type TSetSubvencija          = { type: "addDeteForm/setSubvencija",   value: boolean };
type TSetPopust              = { type: "addDeteForm/setPopust",   value: string };
type TSetObjekat              = { type: "addDeteForm/setObjekat",   value: string };
type TSetGrupa               = { type: "addDeteForm/setGrupa",    value: string };
// type TRemoveGrupa            = { type: "addDeteorm/removeGrupa", value: number };
// type TSetObjekat             = { type: "addDeteForm/setObjekat",    value: number };
// type TRemoveObjekat          = { type: "addDeteorm/removeObjekat", value: number };
type TSetUgovor              = { type: "addDeteForm/setUgovor",    value: string };
// type TRemoveUgovor           = { type: "addDeteorm/removeUgovor", value: number };
type TSetpstatus     = { type: "addDeteForm/setpstatus",    value: string };
// type TRemovepstatus  = { type: "addDeteorm/removepstatus", value: number };
// type TSetRoditelj            = { type: "addDeteForm/setRoditelj",    value: number };
// // type TRemoveRoditelj         = { type: "addDeteorm/removeRoditelj", value: number };

type AddDeteFormAction = TSetImePrezime
                       | TSetJmbg
                       | TSetDatumRodj
                       | TSetAdresa
                       | TSetBrojUgovora
                       | TSetDatumUgovora
                       | TSetDatumPolaska
                       | TSetSubvencija
                       | TSetPopust
                       | TSetGrupa
                       | TSetObjekat
                       | TSetUgovor
                       | TSetpstatus;
                    //    | TSetRoditelj;

function AddDeteFormReducer(oldState: IAddDeteFormState, action: AddDeteFormAction): IAddDeteFormState {
    switch (action.type) {
        case "addDeteForm/setImePrezime": {
            return {
                ...oldState,
                jmbg: oldState.jmbg,
                datumRodj: oldState.datumRodj,
                adresa: oldState.adresa,
                brojUgovora: oldState.brojUgovora,
                datumUgovora: oldState.datumUgovora,
                datumPolaska: oldState.datumPolaska,
                subvencija: oldState.subvencija,
                popust: oldState.popust,
                grupa: oldState.grupa,
                objekat: oldState.objekat,
                ugovor: oldState.ugovor,
                pstatus: oldState.pstatus,
                // This changes:
                imePrezime: action.value,
            }
        }

        case "addDeteForm/setJmbg": {
            return {
                ...oldState,
                imePrezime: oldState.imePrezime,
                datumRodj: oldState.datumRodj,
                adresa: oldState.adresa,
                brojUgovora: oldState.brojUgovora,
                datumUgovora: oldState.datumUgovora,
                datumPolaska: oldState.datumPolaska,
                subvencija: oldState.subvencija,
                popust: oldState.popust,
                grupa: oldState.grupa,
                objekat: oldState.objekat,
                ugovor: oldState.ugovor,
                pstatus: oldState.pstatus,
                
                // This changes:
                jmbg: action.value,
            }
        }

        case "addDeteForm/setDatumRodj": {
            return {
                ...oldState,
                imePrezime: oldState.imePrezime,
                jmbg: oldState.jmbg,
                adresa: oldState.adresa,
                brojUgovora: oldState.brojUgovora,
                datumUgovora: oldState.datumUgovora,
                datumPolaska: oldState.datumPolaska,
                subvencija: oldState.subvencija,
                popust: oldState.popust,
                grupa: oldState.grupa,
                objekat: oldState.objekat,
                ugovor: oldState.ugovor,
                pstatus: oldState.pstatus,
                
                // This changes:
                datumRodj: action.value,
            }
        }

        case "addDeteForm/setAdresa": {
            return {
                ...oldState,
                imePrezime: oldState.imePrezime,
                jmbg: oldState.jmbg,
                datumRodj: oldState.datumRodj,
                brojUgovora: oldState.brojUgovora,
                datumUgovora: oldState.datumUgovora,
                datumPolaska: oldState.datumPolaska,
                subvencija: oldState.subvencija,
                popust: oldState.popust,
                grupa: oldState.grupa,
                objekat: oldState.objekat,
                ugovor: oldState.ugovor,
                pstatus: oldState.pstatus,
                
                // This changes:
                adresa: action.value,
            }
        }

        case "addDeteForm/setBrojUgovora": {
            return {
                ...oldState,
                imePrezime: oldState.imePrezime,
                jmbg: oldState.jmbg,
                datumRodj: oldState.datumRodj,
                adresa: oldState.adresa,
                datumUgovora: oldState.datumUgovora,
                datumPolaska: oldState.datumPolaska,
                subvencija: oldState.subvencija,
                popust: oldState.popust,
                grupa: oldState.grupa,
                objekat: oldState.objekat,
                ugovor: oldState.ugovor,
                pstatus: oldState.pstatus,
                
                // This changes:
                brojUgovora: action.value,
            }
        }

        case "addDeteForm/setDatumUgovora": {
            return {
                ...oldState,
                imePrezime: oldState.imePrezime,
                jmbg: oldState.jmbg,
                datumRodj: oldState.datumRodj,
                adresa: oldState.adresa,
                brojUgovora: oldState.brojUgovora,
                datumPolaska: oldState.datumPolaska,
                subvencija: oldState.subvencija,
                popust: oldState.popust,
                grupa: oldState.grupa,
                objekat: oldState.objekat,
                ugovor: oldState.ugovor,
                pstatus: oldState.pstatus,
                
                // This changes:
                datumUgovora: action.value,
            }
        }

        case "addDeteForm/setDatumPolaska": {
            return {
                ...oldState,
                imePrezime: oldState.imePrezime,
                jmbg: oldState.jmbg,
                datumRodj: oldState.datumRodj,
                adresa: oldState.adresa,
                brojUgovora: oldState.brojUgovora,
                datumUgovora: oldState.datumUgovora,
                subvencija: oldState.subvencija,
                popust: oldState.popust,
                grupa: oldState.grupa,
                objekat: oldState.objekat,
                ugovor: oldState.ugovor,
                pstatus: oldState.pstatus,
                
                // This changes:
                datumPolaska: action.value,
            }
        }

        case "addDeteForm/setSubvencija": {
            return {
                ...oldState,
                imePrezime: oldState.imePrezime,
                jmbg: oldState.jmbg,
                datumRodj: oldState.datumRodj,
                adresa: oldState.adresa,
                brojUgovora: oldState.brojUgovora,
                datumUgovora: oldState.datumUgovora,
                datumPolaska: oldState.datumPolaska,
                popust: oldState.popust,
                grupa: oldState.grupa,
                objekat: oldState.objekat,
                ugovor: oldState.ugovor,
                pstatus: oldState.pstatus,
                
                // This changes:
                subvencija: action.value,
            }
        }
        
        case "addDeteForm/setPopust": {
            return {
                ...oldState,
                imePrezime: oldState.imePrezime,
                jmbg: oldState.jmbg,
                datumRodj: oldState.datumRodj,
                adresa: oldState.adresa,
                brojUgovora: oldState.brojUgovora,
                datumUgovora: oldState.datumUgovora,
                datumPolaska: oldState.datumPolaska,
                subvencija: oldState.subvencija,
                grupa: oldState.grupa,
                objekat: oldState.objekat,
                ugovor: oldState.ugovor,
                pstatus: oldState.pstatus,
                
                // This changes:
                popust: action.value,
            }
        }
        
        case "addDeteForm/setGrupa": {
            return {
                ...oldState,
                imePrezime: oldState.imePrezime,
                jmbg: oldState.jmbg,
                datumRodj: oldState.datumRodj,
                adresa: oldState.adresa,
                brojUgovora: oldState.brojUgovora,
                datumUgovora: oldState.datumUgovora,
                datumPolaska: oldState.datumPolaska,
                subvencija: oldState.subvencija,
                popust: oldState.popust,
                objekat: oldState.objekat,
                ugovor: oldState.ugovor,
                pstatus: oldState.pstatus,
                
                // This changes:
                grupa: action.value,
            }
        }
        
        case "addDeteForm/setObjekat": {
            return {
                ...oldState,
                imePrezime: oldState.imePrezime,
                jmbg: oldState.jmbg,
                datumRodj: oldState.datumRodj,
                adresa: oldState.adresa,
                brojUgovora: oldState.brojUgovora,
                datumUgovora: oldState.datumUgovora,
                datumPolaska: oldState.datumPolaska,
                subvencija: oldState.subvencija,
                popust: oldState.popust,
                grupa: oldState.grupa,
                ugovor: oldState.ugovor,
                pstatus: oldState.pstatus,
                
                // This changes:
                objekat: action.value,
            }
        }
        
        case "addDeteForm/setUgovor": {
            return {
                ...oldState,
                imePrezime: oldState.imePrezime,
                jmbg: oldState.jmbg,
                datumRodj: oldState.datumRodj,
                adresa: oldState.adresa,
                brojUgovora: oldState.brojUgovora,
                datumUgovora: oldState.datumUgovora,
                datumPolaska: oldState.datumPolaska,
                subvencija: oldState.subvencija,
                popust: oldState.popust,
                grupa: oldState.grupa,
                objekat: oldState.objekat,
                pstatus: oldState.pstatus,
                
                // This changes:
                ugovor: action.value,
            }
        }
        
        case "addDeteForm/setpstatus": {
            return {
                ...oldState,
                imePrezime: oldState.imePrezime,
                jmbg: oldState.jmbg,
                datumRodj: oldState.datumRodj,
                adresa: oldState.adresa,
                brojUgovora: oldState.brojUgovora,
                datumUgovora: oldState.datumUgovora,
                datumPolaska: oldState.datumPolaska,
                subvencija: oldState.subvencija,
                popust: oldState.popust,
                grupa: oldState.grupa,
                objekat: oldState.objekat,
                ugovor: oldState.ugovor,
                
                // This changes:
                pstatus: action.value,
            }
        }
        
        


        default: return oldState;
    }
}

export default function AdminDeteAdd() {

    const [ errorMessage, setErrorMessage ] = useState<string>("");
    const [ grupa, setGrupa ] = useState<IGrupa[]>([]);
    const [ objekat, setObjekat ] = useState<IObjekat[]>([]);
    const [ ugovor, setUgovor ] = useState<IUgovor[]>([]);
    const [ ps, setPs ] = useState<IPorodicniStatus[]>([]);
    // const [ roditelj, setRoditelj ] = useState<IRoditelj[]>([]);

    const navigate = useNavigate();

    const [ formState, dispatchFormStateAction ] = useReducer(AddDeteFormReducer, {
        imePrezime: "",
        jmbg: "",
        datumRodj: "",
        adresa: "",
        brojUgovora: "",
        datumUgovora: "",
        datumPolaska: "",
        subvencija: false,
        popust: "",
        grupa: "",
        objekat: "",
        ugovor: "",
        pstatus: "",
    });

    const loadGrupa = () => {
        api("get", "/api/grupa", "administrator")
        .then(res => {
            if (res.status !== "ok") {
                throw new Error("Could not load this grupa!");
            }

            return res.data;
        })
        .then(grupa => {
            setGrupa(grupa);
        })
        .catch(error => {
            setErrorMessage(error?.message ?? "Unknown error!");
        });
    };
    
    const loadObjekat = () => {
        api("get", "/api/objekat", "administrator")
        .then(res => {
            if (res.status !== "ok") {
                throw new Error("Could not load this category!");
            }

            return res.data;
        })
        .then(objekat => {
            setObjekat(objekat);
        })
        .catch(error => {
            setErrorMessage(error?.message ?? "Unknown error!");
        });
    };

    const loadUgovor = () => {
        api("get", "/api/ugovor", "administrator")
        .then(res => {
            if (res.status !== "ok") {
                throw new Error("Could not load this category!");
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
    
    const loadPordStat = () => {
        api("get", "/api/porodicniStatus", "administrator")
        .then(res => {
            if (res.status !== "ok") {
                throw new Error("Could not load this category!");
            }

            return res.data;
        })
        .then(pstatus => {
            setPs(pstatus);
        })
        .catch(error => {
            setErrorMessage(error?.message ?? "Unknown error!");
        });
    };

    // const loadRoditelj = () => {
    //     api("get", "/api/roditelj", "administrator")
    //     .then(res => {
    //         if (res.status !== "ok") {
    //             throw new Error("Could not load this category!");
    //         }

    //         return res.data;
    //     })
    //     .then(roditelj => {
    //         setRoditelj(roditelj);
    //     })
    //     .catch(error => {
    //         setErrorMessage(error?.message ?? "Unknown error!");
    //     });
    // };

    function doAddDete() {
        api("post", "/api/dete", "administrator", formState)
        .then(res => {
            if (res.status === 'error') {
                return setErrorMessage(res.data + "");
            }

            navigate("/admin/dashboard/roditelj/dodaj", {
                replace: true,
            });
        });
    }

    useEffect(() => {
        loadGrupa();
        loadObjekat();
        loadUgovor();
        loadPordStat();
        // loadRoditelj();
    }, []);

    // const handleDateChange = (date: Dayjs) => {
    //     dispatchFormStateAction({ type: "addDeteForm/setDatumRodj", value: date.format('DD.MM.YYYY.') });
    //   };

  return (
    <div className="card">
        <div className='card-body'>
            <div className='card-title'>
                <h1 className='h4 text-center'>Dodaj dete</h1>
            </div>
            <div className='card-text'>
                <div className='row mb-3'>
                    <div className='col'>
                        <label>Ime i prezime</label>
                        <input type="text" className='form-control' placeholder='Unesite ime i prezime' 
                            value={ formState.imePrezime }
                            onChange={ e => dispatchFormStateAction({ type: "addDeteForm/setImePrezime", value: e.target.value }) }
                        />
                    </div>
                    <div className='col'>
                        <label>JMBG</label>
                        <input type="text" className='form-control' placeholder='Unesite jmbg'
                         value={ formState.jmbg }
                         onChange={ e => dispatchFormStateAction({ type: "addDeteForm/setJmbg", value: e.target.value }) }
                        />
                    </div>
                    <div className='col'>
                        {/* <label>Datum rodjenja</label>
                        <input type="text" className='form-control' placeholder="U formatu dd.mm.gggg."
                        value={ formState.datumRodj }
                        onChange={ e => dispatchFormStateAction({ type: "addDeteForm/setDatumRodj", value: e.target.value }) }
                        /> */}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Datum rodjenja"
                                value={dayjs(formState.datumRodj, 'DD.MM.YYYY.')}
                                onChange={(date) => dispatchFormStateAction({ type: "addDeteForm/setDatumRodj", value: date.format('DD.MM.YYYY.')})}
                                renderInput={(params) => <TextField {...params} />}
                                inputFormat="DD/MM/YYYY"
                            />
                        </LocalizationProvider>
                    </div>
                </div>
                <div className='row mb-3'>
                    <div className='col'>
                        <label>Ugovor</label>
                        <select className='form-select'
                        value={ formState.ugovor }
                        onChange={ e => dispatchFormStateAction({ type: "addDeteForm/setUgovor", value: e.target.value }) }
                        >
                            <option>Izaberite ugovor</option>
                            {ugovor.map((ugovor) => (
                                <option value={ugovor.ime}>{ugovor.ime}</option>
                            ))}
                        </select>
                    </div>
                    <div className='col'>
                        <label>Adresa prebivališta</label>
                        <input type="text" className='form-control' placeholder='Unesite adresu' 
                        value={ formState.adresa }
                        onChange={ e => dispatchFormStateAction({ type: "addDeteForm/setAdresa", value: e.target.value }) }
                        />
                    </div>
                    <div className='col'>
                        <label>Porodični status</label>
                        <select className='form-select'
                        value={ formState.pstatus }
                        onChange={ e => dispatchFormStateAction({ type: "addDeteForm/setpstatus", value: e.target.value }) }
                        >
                            <option>Izaberite status</option>
                            {ps.map((ps) => (
                                <option value={ps.ime}>{ps.ime}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className='col'>
                        <label>Objekat</label>
                        <select className='form-select'
                        value={ formState.objekat }
                        onChange={ e => dispatchFormStateAction({ type: "addDeteForm/setObjekat", value: e.target.value }) }
                        >
                            <option>Izaberite objekat</option>
                            {objekat.map((objekat) => (
                                <option value={objekat.ime}>{objekat.ime}</option>
                            ))}
                        </select>
                    </div>
                    <div className='col'>
                        <label>Grupa</label>
                        <select className='form-select'
                        value={ formState.grupa }
                        onChange={ e => dispatchFormStateAction({ type: "addDeteForm/setGrupa", value: e.target.value }) }
                        >
                            <option>Izaberite grupu</option>
                            {grupa.map((grupa) => (
                                <option value={grupa.ime}>{grupa.ime}</option>
                            ))}
                        </select>
                    </div>
                    <div className='col'>
                        <label>Broj ugovora</label>
                        <input type="text" className='form-control' placeholder='Unesite broj ugovora' 
                        value={ formState.brojUgovora }
                        onChange={ e => dispatchFormStateAction({ type: "addDeteForm/setBrojUgovora", value: e.target.value }) }
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className='col'>
                        {/* <label>Datum ugovora</label>
                        <input type="text" className='form-control' placeholder="U formatu dd.mm.gggg."
                        value={ formState.datumUgovora }
                        onChange={ e => dispatchFormStateAction({ type: "addDeteForm/setDatumUgovora", value: e.target.value }) }
                        /> */}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Datum ugovora"
                                value={dayjs(formState.datumUgovora, 'DD.MM.YYYY')}
                                onChange={ e => dispatchFormStateAction({ type: "addDeteForm/setDatumUgovora", value: e.format('DD.MM.YYYY.') }) }
                                renderInput={(params) => <TextField {...params} />}
                                inputFormat="DD/MM/YYYY"
                            />
                        </LocalizationProvider>
                    </div>
                    <div className='col'>
                        {/* <label>Datum polaska</label>
                        <input type="text" className='form-control' placeholder="U formatu dd.mm.gggg."
                        value={ formState.datumPolaska }
                        onChange={ e => dispatchFormStateAction({ type: "addDeteForm/setDatumPolaska", value: e.target.value }) }
                        /> */}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Datum polaska"
                                value={dayjs(formState.datumPolaska, 'DD.MM.YYYY')}
                                onChange={ e => dispatchFormStateAction({ type: "addDeteForm/setDatumPolaska", value: e.format('DD.MM.YYYY.') }) }
                                renderInput={(params) => <TextField {...params} />}
                                inputFormat="DD/MM/YYYY"
                            />
                        </LocalizationProvider>
                    </div>
                    <div className='col'>
                        <label>Popust</label>
                        <select className='form-select'
                        value={ formState.popust }
                        onChange={ e => dispatchFormStateAction({ type: "addDeteForm/setPopust", value: e.target.value }) }
                        >
                            <option>Izaberite popust</option>
                            <option value="Bez popusta">Bez popusta</option>
                            <option value="50%">50%</option>
                        </select>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="flexCheckDefault"
                            onChange={ e => dispatchFormStateAction({ type: "addDeteForm/setSubvencija", value: e.target.checked }) }
                            />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Subvencija
                            </label>
                        </div>
                    </div>
                </div>
                <div className="row" style={{marginLeft:"45%"}}>
                    <div className="col">
                        <button className="btn btn-primary" style={{width:'150px', height:"50px"}} onClick={ () => doAddDete() }>
                            Add item
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
