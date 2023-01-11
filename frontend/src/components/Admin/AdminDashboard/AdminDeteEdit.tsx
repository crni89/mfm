import { useEffect, useReducer, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import IGrupa from '../../../models/IGrupa.model';
import IObjekat from '../../../models/IObjekat.model';
import IPorodicniStatus from '../../../models/IPorodicniStatus.model';
import IUgovor from '../../../models/IUgovor.model';
import { api } from '../../../api/api';
import IDete from '../../../models/IDete.model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCheckSquare, faCircle, faSquare } from '@fortawesome/free-regular-svg-icons';
import { motion } from 'framer-motion';

export interface IAdminDeteEditParams extends Record<string, string|undefined>{
    id: string;
}

interface IEditDeteFormState {
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
    porodicniStatus: string;
};

type TSetImePrezime          = { type: "editDeteForm/setImePrezime",          value: string };
type TSetJmbg                = { type: "editDeteForm/setJmbg",   value: string };
type TSetDatumRodj           = { type: "editDeteForm/setDatumRodj",   value: string };
type TSetAdresa              = { type: "editDeteForm/setAdresa",   value: string };
type TSetBrojUgovora         = { type: "editDeteForm/setBrojUgovora",   value: string };
type TSetDatumUgovora        = { type: "editDeteForm/setDatumUgovora",   value: string };
type TSetDatumPolaska        = { type: "editDeteForm/setDatumPolaska",   value: string };
type TToggleSubvencija          = { type: "editDeteForm/toggleSubvencija" };
type TSetPopust              = { type: "editDeteForm/setPopust",   value: string };
type TSetObjekat              = { type: "editDeteForm/setObjekat",   value: string };
type TSetGrupa               = { type: "editDeteForm/setGrupa",    value: string };
// type TRemoveGrupa            = { type: "editDeteorm/removeGrupa", value: number };
// type TSetObjekat             = { type: "editDeteForm/setObjekat",    value: number };
// type TRemoveObjekat          = { type: "editDeteorm/removeObjekat", value: number };
type TSetUgovor              = { type: "editDeteForm/setUgovor",    value: string };
// type TRemoveUgovor           = { type: "editDeteorm/removeUgovor", value: number };
type TSetPorodicniStatus     = { type: "editDeteForm/setPorodicniStatus",    value: string };
// type TRemovePorodicniStatus  = { type: "editDeteorm/removePorodicniStatus", value: number };
// type TSetRoditelj            = { type: "editDeteForm/setRoditelj",    value: number };
// // type TRemoveRoditelj         = { type: "editDeteorm/removeRoditelj", value: number };

type EditDeteFormAction = TSetImePrezime
                       | TSetJmbg
                       | TSetDatumRodj
                       | TSetAdresa
                       | TSetBrojUgovora
                       | TSetDatumUgovora
                       | TSetDatumPolaska
                       | TToggleSubvencija
                       | TSetPopust
                       | TSetGrupa
                       | TSetObjekat
                       | TSetUgovor
                       | TSetPorodicniStatus;
                    //    | TSetRoditelj;

function EditDeteFormReducer(oldState: IEditDeteFormState, action: EditDeteFormAction): IEditDeteFormState {
    switch (action.type) {
        case "editDeteForm/setImePrezime": {
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
                porodicniStatus: oldState.porodicniStatus,
                // This changes:
                imePrezime: action.value,
            }
        }

        case "editDeteForm/setJmbg": {
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
                porodicniStatus: oldState.porodicniStatus,
                
                // This changes:
                jmbg: action.value,
            }
        }

        case "editDeteForm/setDatumRodj": {
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
                porodicniStatus: oldState.porodicniStatus,
                
                // This changes:
                datumRodj: action.value,
            }
        }

        case "editDeteForm/setAdresa": {
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
                porodicniStatus: oldState.porodicniStatus,
                
                // This changes:
                adresa: action.value,
            }
        }

        case "editDeteForm/setBrojUgovora": {
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
                porodicniStatus: oldState.porodicniStatus,
                
                // This changes:
                brojUgovora: action.value,
            }
        }

        case "editDeteForm/setDatumUgovora": {
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
                porodicniStatus: oldState.porodicniStatus,
                
                // This changes:
                datumUgovora: action.value,
            }
        }

        case "editDeteForm/setDatumPolaska": {
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
                porodicniStatus: oldState.porodicniStatus,
                
                // This changes:
                datumPolaska: action.value,
            }
        }

        case "editDeteForm/toggleSubvencija": {
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
                porodicniStatus: oldState.porodicniStatus,
                
                // This changes:
                subvencija: !oldState.subvencija,
            }
        }
        
        case "editDeteForm/setPopust": {
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
                porodicniStatus: oldState.porodicniStatus,
                
                // This changes:
                popust: action.value,
            }
        }
        
        case "editDeteForm/setGrupa": {
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
                porodicniStatus: oldState.porodicniStatus,
                
                // This changes:
                grupa: action.value,
            }
        }
        
        case "editDeteForm/setObjekat": {
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
                porodicniStatus: oldState.porodicniStatus,
                
                // This changes:
                objekat: action.value,
            }
        }
        
        case "editDeteForm/setUgovor": {
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
                porodicniStatus: oldState.porodicniStatus,
                
                // This changes:
                ugovor: action.value,
            }
        }
        
        case "editDeteForm/setPorodicniStatus": {
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
                porodicniStatus: action.value,
            }
        }
        
        


        default: return oldState;
    }
}

export default function AdminDeteEdit() {
    const params = useParams<IAdminDeteEditParams>();
    const deteId = +(params.id ?? '');
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [ grupa, setGrupa ] = useState<IGrupa[]>([]);
    const [ objekat, setObjekat ] = useState<IObjekat[]>([]);
    const [ ugovor, setUgovor ] = useState<IUgovor[]>([]);
    const [ ps, setPs ] = useState<IPorodicniStatus[]>([]);
    const [ dete, setDete] = useState<IDete>();

    const [ formState, dispatchFormStateAction ] = useReducer(EditDeteFormReducer, {
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
        porodicniStatus: "",
    });

    const loadGrupa = () => {
        api("get", "/api/grupa", "administrator")
        .then(res => {
            if (res.status !== "ok") {
                throw new Error("Could not load this category!");
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
        .then(porodicniStatus => {
            setPs(porodicniStatus);
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

    const loadDete = () => {
        api("get", "/api/dete/"+ deteId, "administrator")
        .then(res => {
            if (res.status !== "ok") {
                throw new Error("Could not load this category!");
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

    
    useEffect(() => {
        loadGrupa();
        loadObjekat();
        loadUgovor();
        loadPordStat();
        // loadRoditelj();
    }, []);

    useEffect(() => {
        setErrorMessage("");
        loadDete();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ params.id ]);

    useEffect(() => {
        dispatchFormStateAction({ type: "editDeteForm/setImePrezime", value: dete?.imePrezime ?? '' });
        dispatchFormStateAction({ type: "editDeteForm/setJmbg", value: dete?.jmbg ?? '' });
        dispatchFormStateAction({ type: "editDeteForm/setDatumRodj", value: dete?.datumRodj ?? '' });
        dispatchFormStateAction({ type: "editDeteForm/setAdresa", value: dete?.adresa ?? '' });
        dispatchFormStateAction({ type: "editDeteForm/setBrojUgovora", value: dete?.brojUgovora ?? '' });
        dispatchFormStateAction({ type: "editDeteForm/setDatumUgovora", value: dete?.datumUgovora ?? '' });
        dispatchFormStateAction({ type: "editDeteForm/setDatumPolaska", value: dete?.datumPolaska ?? '' });
        dispatchFormStateAction({ type: "editDeteForm/setPopust", value: dete?.popust ?? '' });
        dispatchFormStateAction({ type: "editDeteForm/setObjekat", value: dete?.objekat ?? '' });
        dispatchFormStateAction({ type: "editDeteForm/setUgovor", value: dete?.ugovor ?? '' });
        dispatchFormStateAction({ type: "editDeteForm/setGrupa", value: dete?.grupa ?? '' });
        dispatchFormStateAction({ type: "editDeteForm/setPorodicniStatus", value: dete?.porodicniStatus ?? '' });
        
        if (dete?.subvencija) {
            dispatchFormStateAction({type: "editDeteForm/toggleSubvencija"});
        }
    }, [ dete ]);
    
    function doEditDete() {
        api("put", "/api/dete/"+ deteId, "administrator", formState)
        .then(res => {
            if (res.status === 'error') {
                return setErrorMessage(res.data + "");
            }

            navigate("/admin/dashboard/dete/"+ deteId, {
                replace: true,
            });
        });
    }

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
                delay: 0.3,
            }}>
        <div className='card-body'>
            <div className='card-title'>
                <h1 className='h4 text-center'>Izmena deteta {dete?.imePrezime}</h1>
            </div>
            <div className='card-text'>
                <div className='row mb-3'>
                    <div className='col'>
                        <label>Ime i prezime</label>
                        <input type="text" className='form-control' placeholder='Unesite ime i prezime' 
                            value={ formState.imePrezime }
                            onChange={ e => dispatchFormStateAction({ type: "editDeteForm/setImePrezime", value: e.target.value }) }
                        />
                    </div>
                    <div className='col'>
                        <label>JMBG</label>
                        <input type="text" className='form-control' placeholder='Unesite jmbg'
                         value={ formState.jmbg }
                         onChange={ e => dispatchFormStateAction({ type: "editDeteForm/setJmbg", value: e.target.value }) }
                        />
                    </div>
                    <div className='col'>
                        <label>Datum rodjenja</label>
                        <input type="text" className='form-control' placeholder="U formatu dd.mm.gggg."
                        value={ formState.datumRodj }
                        onChange={ e => dispatchFormStateAction({ type: "editDeteForm/setDatumRodj", value: e.target.value }) }
                        />
                    </div>
                </div>
                <div className='row mb-3'>
                    <div className='col'>
                        <label>Ugovor</label>
                        <select className='form-select'
                        value={ formState.ugovor }
                        onChange={ e => dispatchFormStateAction({ type: "editDeteForm/setUgovor", value: e.target.value }) }
                        >
                            <option value="">Izaberite ugovor</option>
                            {ugovor.map((ugovor) => (
                                <option value={ugovor.ime}>{ugovor.ime}</option>
                            ))}
                        </select>
                    </div>
                    <div className='col'>
                        <label>Adresa prebivališta</label>
                        <input type="text" className='form-control' placeholder='Unesite adresu' 
                        value={ formState.adresa }
                        onChange={ e => dispatchFormStateAction({ type: "editDeteForm/setAdresa", value: e.target.value }) }
                        />
                    </div>
                    <div className='col'>
                        <label>Porodični status</label>
                        <select className='form-select'
                        value={ formState.porodicniStatus }
                        onChange={ e => dispatchFormStateAction({ type: "editDeteForm/setPorodicniStatus", value: e.target.value }) }
                        >
                            <option value=''>Izaberite status</option>
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
                        onChange={ e => dispatchFormStateAction({ type: "editDeteForm/setObjekat", value: e.target.value }) }
                        >
                            <option value=''>Izaberite objekat</option>
                            {objekat.map((objekat) => (
                                <option value={objekat.ime}>{objekat.ime}</option>
                            ))}
                        </select>
                    </div>
                    <div className='col'>
                        <label>Grupa</label>
                        <select className='form-select'
                        value={ formState.grupa }
                        onChange={ e => dispatchFormStateAction({ type: "editDeteForm/setGrupa", value: e.target.value }) }
                        >
                            <option value=''>Izaberite grupu</option>
                            {grupa.map((grupa) => (
                                <option value={grupa.ime}>{grupa.ime}</option>
                            ))}
                        </select>
                    </div>
                    <div className='col'>
                        <label>Broj ugovora</label>
                        <input type="text" className='form-control' placeholder='Unesite broj ugovora' 
                        value={ formState.brojUgovora }
                        onChange={ e => dispatchFormStateAction({ type: "editDeteForm/setBrojUgovora", value: e.target.value }) }
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className='col'>
                        <label>Datum ugovora</label>
                        <input type="text" className='form-control' placeholder="U formatu dd.mm.gggg."
                        value={ formState.datumUgovora }
                        onChange={ e => dispatchFormStateAction({ type: "editDeteForm/setDatumUgovora", value: e.target.value }) }
                        />
                    </div>
                    <div className='col'>
                        <label>Datum polaska</label>
                        <input type="text" className='form-control' placeholder="U formatu dd.mm.gggg."
                        value={ formState.datumPolaska }
                        onChange={ e => dispatchFormStateAction({ type: "editDeteForm/setDatumPolaska", value: e.target.value }) }
                        />
                    </div>
                    <div className='col'>
                        <label>Popust</label>
                        <select className='form-select'
                        value={ formState.popust }
                        onChange={ e => dispatchFormStateAction({ type: "editDeteForm/setPopust", value: e.target.value }) }
                        >
                            <option value=''>Izaberite popust</option>
                            <option value="Bez popusta">Bez popusta</option>
                            <option value="50%">50%</option>
                        </select>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <div className="form-check">
                        <label>Subvencija</label>
                            <div className="input-group">
                                <div onClick={ () => dispatchFormStateAction({ type: "editDeteForm/toggleSubvencija" }) }>
                                    <FontAwesomeIcon icon={ formState.subvencija ? faCheckCircle : faCircle } /> { formState.subvencija ? "Da" : "Ne" }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row" style={{marginLeft:"45%"}}>
                    <div className="col">
                        <button className="btn btn-primary" style={{width:'150px', height:"50px"}} onClick={ () => doEditDete() }>
                            Izmeni
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </motion.div>
  )
}