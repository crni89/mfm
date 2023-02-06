import { useEffect, useReducer, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../../api/api';
import IRoditelj from '../../../models/IRoditelj.model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircle } from '@fortawesome/free-regular-svg-icons';
import { motion } from 'framer-motion';

export interface IAdminRoditeljEditParams extends Record<string, string|undefined>{
    id: string;
}

interface IEditRoditeljFormState {
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
};

type TSetImePrezime          = { type: "editRoditeljForm/setImePrezime",          value: string };
type TSetJmbg                = { type: "editRoditeljForm/setJmbg",   value: string };
type TSetBrLicne             = { type: "editRoditeljForm/setBrLicne",   value: string };
type TSetMobilni             = { type: "editRoditeljForm/setMobilni",   value: string };
type TSetEmail               = { type: "editRoditeljForm/setEmail",   value: string };
type TSetAdresa              = { type: "editRoditeljForm/setAdresa",   value: string };
type TSetOpstina             = { type: "editRoditeljForm/setOpstina",   value: string };
type TSetTekuciRacun         = { type: "editRoditeljForm/setTekuciRacun",   value: string };
type TSetBrojResenja         = { type: "editRoditeljForm/setBrojResenja",   value: string };
type TToggleNosilacUgovora   = { type: "editRoditeljForm/toggleNosilacUgovora" };

type EditRoditeljFormAction = TSetImePrezime
                       | TSetJmbg
                       | TSetBrLicne
                       | TSetMobilni
                       | TSetEmail
                       | TSetAdresa
                       | TSetOpstina
                       | TSetTekuciRacun
                       | TSetBrojResenja
                       | TToggleNosilacUgovora

function EditRoditeljFormReducer(oldState: IEditRoditeljFormState, action: EditRoditeljFormAction): IEditRoditeljFormState {
    switch (action.type) {
        case "editRoditeljForm/setImePrezime": {
            return {
                ...oldState,
                jmbg: oldState.jmbg,
                brLicne: oldState.brLicne,
                adresa: oldState.adresa,
                mobilni: oldState.mobilni,
                email: oldState.email,
                opstina: oldState.opstina,
                nosilacUgovora: oldState.nosilacUgovora,
                tekuciRacun: oldState.tekuciRacun,
                brojResenja: oldState.brojResenja,
                // This changes:
                imePrezime: action.value,
            }
        }

        case "editRoditeljForm/setJmbg": {
            return {
                ...oldState,
                imePrezime: oldState.imePrezime,
                brLicne: oldState.brLicne,
                adresa: oldState.adresa,
                mobilni: oldState.mobilni,
                email: oldState.email,
                opstina: oldState.opstina,
                nosilacUgovora: oldState.nosilacUgovora,
                tekuciRacun: oldState.tekuciRacun,
                brojResenja: oldState.brojResenja,
                
                // This changes:
                jmbg: action.value,
            }
        }

        case "editRoditeljForm/setBrLicne": {
            return {
                ...oldState,
                imePrezime: oldState.imePrezime,
                jmbg: oldState.jmbg,
                adresa: oldState.adresa,
                mobilni: oldState.mobilni,
                email: oldState.email,
                opstina: oldState.opstina,
                nosilacUgovora: oldState.nosilacUgovora,
                tekuciRacun: oldState.tekuciRacun,
                brojResenja: oldState.brojResenja,
                
                // This changes:
                brLicne: action.value,
            }
        }

        case "editRoditeljForm/setMobilni": {
            return {
                ...oldState,
                imePrezime: oldState.imePrezime,
                jmbg: oldState.jmbg,
                brLicne: oldState.brLicne,
                mobilni: oldState.mobilni,
                email: oldState.email,
                opstina: oldState.opstina,
                nosilacUgovora: oldState.nosilacUgovora,
                tekuciRacun: oldState.tekuciRacun,
                brojResenja: oldState.brojResenja,
                
                // This changes:
                adresa: action.value,
            }
        }

        case "editRoditeljForm/setEmail": {
            return {
                ...oldState,
                imePrezime: oldState.imePrezime,
                jmbg: oldState.jmbg,
                brLicne: oldState.brLicne,
                adresa: oldState.adresa,
                email: oldState.email,
                opstina: oldState.opstina,
                nosilacUgovora: oldState.nosilacUgovora,
                tekuciRacun: oldState.tekuciRacun,
                brojResenja: oldState.brojResenja,
                
                // This changes:
                mobilni: action.value,
            }
        }

        case "editRoditeljForm/setAdresa": {
            return {
                ...oldState,
                imePrezime: oldState.imePrezime,
                jmbg: oldState.jmbg,
                brLicne: oldState.brLicne,
                adresa: oldState.adresa,
                mobilni: oldState.mobilni,
                opstina: oldState.opstina,
                nosilacUgovora: oldState.nosilacUgovora,
                tekuciRacun: oldState.tekuciRacun,
                brojResenja: oldState.brojResenja,
                
                // This changes:
                email: action.value,
            }
        }

        case "editRoditeljForm/setOpstina": {
            return {
                ...oldState,
                imePrezime: oldState.imePrezime,
                jmbg: oldState.jmbg,
                brLicne: oldState.brLicne,
                adresa: oldState.adresa,
                mobilni: oldState.mobilni,
                email: oldState.email,
                nosilacUgovora: oldState.nosilacUgovora,
                tekuciRacun: oldState.tekuciRacun,
                brojResenja: oldState.brojResenja,
                
                // This changes:
                opstina: action.value,
            }
        }

        case "editRoditeljForm/toggleNosilacUgovora": {
            return {
                ...oldState,
                imePrezime: oldState.imePrezime,
                jmbg: oldState.jmbg,
                brLicne: oldState.brLicne,
                adresa: oldState.adresa,
                mobilni: oldState.mobilni,
                email: oldState.email,
                opstina: oldState.opstina,
                tekuciRacun: oldState.tekuciRacun,
                brojResenja: oldState.brojResenja,
                
                // This changes:
                nosilacUgovora: !oldState.nosilacUgovora,
            }
        }
        
        case "editRoditeljForm/setTekuciRacun": {
            return {
                ...oldState,
                imePrezime: oldState.imePrezime,
                jmbg: oldState.jmbg,
                brLicne: oldState.brLicne,
                adresa: oldState.adresa,
                mobilni: oldState.mobilni,
                email: oldState.email,
                opstina: oldState.opstina,
                nosilacUgovora: oldState.nosilacUgovora,
                brojResenja: oldState.brojResenja,
                
                // This changes:
                tekuciRacun: action.value,
            }
        }
        
        case "editRoditeljForm/setBrojResenja": {
            return {
                ...oldState,
                imePrezime: oldState.imePrezime,
                jmbg: oldState.jmbg,
                brLicne: oldState.brLicne,
                adresa: oldState.adresa,
                mobilni: oldState.mobilni,
                email: oldState.email,
                opstina: oldState.opstina,
                nosilacUgovora: oldState.nosilacUgovora,
                tekuciRacun: oldState.tekuciRacun,
                
                // This changes:
                brojResenja: action.value,
            }
        }

        default: return oldState;
    }
}

export default function AdminRoditeljEdit() {
    const params = useParams<IAdminRoditeljEditParams>();
    const roditeljId = +(params.id ?? '');
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [ roditelj, setRoditelj] = useState<IRoditelj>();

    const [ formState, dispatchFormStateAction ] = useReducer(EditRoditeljFormReducer, {
        imePrezime: "",
        jmbg: "",
        brLicne: "",
        adresa: "",
        mobilni: "",
        email: "",
        opstina: "",
        nosilacUgovora: false,
        tekuciRacun: "",
        brojResenja: "",
    });

    const loadRoditelj = () => {
        api("get", "/api/roditelj/"+ roditeljId, "administrator")
        .then(res => {
            if (res.status !== "ok") {
                throw new Error("Could not load this category!");
            }

            return res.data;
        })
        .then(roditelj => {
            setRoditelj(roditelj);
        })
        .catch(error => {
            setErrorMessage(error?.message ?? "Unknown error!");
        });
    };

    useEffect(() => {
        setErrorMessage("");
        loadRoditelj();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ params.id ]);

    useEffect(() => {
        dispatchFormStateAction({ type: "editRoditeljForm/setImePrezime", value: roditelj?.imePrezime ?? '' });
        dispatchFormStateAction({ type: "editRoditeljForm/setJmbg", value: roditelj?.jmbg ?? '' });
        dispatchFormStateAction({ type: "editRoditeljForm/setBrLicne", value: roditelj?.brLicne ?? '' });
        dispatchFormStateAction({ type: "editRoditeljForm/setMobilni", value: roditelj?.adresa ?? '' });
        dispatchFormStateAction({ type: "editRoditeljForm/setEmail", value: roditelj?.mobilni ?? '' });
        dispatchFormStateAction({ type: "editRoditeljForm/setAdresa", value: roditelj?.email ?? '' });
        dispatchFormStateAction({ type: "editRoditeljForm/setOpstina", value: roditelj?.opstina ?? '' });
        dispatchFormStateAction({ type: "editRoditeljForm/setTekuciRacun", value: roditelj?.tekuciRacun ?? '' });
        dispatchFormStateAction({ type: "editRoditeljForm/setBrojResenja", value: roditelj?.brojResenja ?? '' });
        
        if (roditelj?.nosilacUgovora) {
            dispatchFormStateAction({type: "editRoditeljForm/toggleNosilacUgovora"});
        }
    }, [ roditelj ]);
    
    function doEditRoditelj() {
        api("put", "/api/roditelj/"+ roditeljId, "administrator", formState)
        .then(res => {
            if (res.status === 'error') {
                return setErrorMessage(res.data + "");
            }

            navigate("/admin/dashboard/roditelj/"+ roditeljId, {
                replace: true,
            });
        });
    }

  return (
    <div className="bg">
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
                    <h1 className='h4 text-center'>Izmena roditeljta {roditelj?.imePrezime}</h1>
                </div>
                <div className='card-text'>
                    <div className='row mb-3'>
                        <div className='col'>
                            <label>Ime i prezime</label>
                            <input type="text" className='form-control' placeholder='Unesite ime i prezime' 
                                value={ formState.imePrezime }
                                onChange={ e => dispatchFormStateAction({ type: "editRoditeljForm/setImePrezime", value: e.target.value }) }
                            />
                        </div>
                        <div className='col'>
                            <label>JMBG</label>
                            <input type="text" className='form-control' placeholder='Unesite jmbg'
                            value={ formState.jmbg }
                            onChange={ e => dispatchFormStateAction({ type: "editRoditeljForm/setJmbg", value: e.target.value }) }
                            />
                        </div>
                        <div className='col'>
                            <label>Broj licne karte</label>
                            <input type="text" className='form-control' placeholder="U formatu dd.mm.gggg."
                            value={ formState.brLicne }
                            onChange={ e => dispatchFormStateAction({ type: "editRoditeljForm/setBrLicne", value: e.target.value }) }
                            />
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col'>
                            <label>Mobilni</label>
                            <input type="text" className='form-control' placeholder="U formatu dd.mm.gggg."
                            value={ formState.mobilni }
                            onChange={ e => dispatchFormStateAction({ type: "editRoditeljForm/setMobilni", value: e.target.value }) }
                            />
                        </div>
                        <div className='col'>
                            <label>Email adresa</label>
                            <input type="text" className='form-control' placeholder="U formatu dd.mm.gggg."
                            value={ formState.email }
                            onChange={ e => dispatchFormStateAction({ type: "editRoditeljForm/setEmail", value: e.target.value }) }
                            />
                        </div>
                        <div className='col'>
                            <label>Adresa</label>
                            <input type="text" className='form-control' placeholder="U formatu dd.mm.gggg."
                            value={ formState.adresa }
                            onChange={ e => dispatchFormStateAction({ type: "editRoditeljForm/setAdresa", value: e.target.value }) }
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className='col'>
                            <label>Opstina</label>
                            <input type="text" className='form-control' placeholder="U formatu dd.mm.gggg."
                            value={ formState.opstina }
                            onChange={ e => dispatchFormStateAction({ type: "editRoditeljForm/setOpstina", value: e.target.value }) }
                            />
                        </div>
                        <div className='col'>
                            <label>Tekuci racun</label>
                            <input type="text" className='form-control' placeholder="U formatu dd.mm.gggg."
                            value={ formState.tekuciRacun }
                            onChange={ e => dispatchFormStateAction({ type: "editRoditeljForm/setTekuciRacun", value: e.target.value }) }
                            />
                        </div>
                        <div className='col'>
                            <label>Broj resenja</label>
                            <input type="text" className='form-control' placeholder='Unesite broj ugovora' 
                            value={ formState.brojResenja }
                            onChange={ e => dispatchFormStateAction({ type: "editRoditeljForm/setBrojResenja", value: e.target.value }) }
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className='col'>
                        <div className="form-check">
                            <label>NosilacUgovora</label>
                                <div className="input-group">
                                    <div onClick={ () => dispatchFormStateAction({ type: "editRoditeljForm/toggleNosilacUgovora" }) }>
                                        <FontAwesomeIcon icon={ formState.nosilacUgovora ? faCheckCircle : faCircle } /> { formState.nosilacUgovora ? "Da" : "Ne" }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{marginLeft:"45%"}}>
                        <div className="col">
                            <button className="btn btn-primary" style={{width:'150px', height:"50px"}} onClick={ () => doEditRoditelj() }>
                                Izmeni
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    </div>
  )
}