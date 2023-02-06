/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import IDete from '../../../models/IDete.model';
import { api } from '../../../api/api';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheckCircle, faCircle } from '@fortawesome/free-regular-svg-icons';
import ConfirmAction from '../../../helpers/ConfirmAction';


export interface IAdminDeteUrlParams extends Record<string, string | undefined>{
    id: string
}

export interface IAdminDeteProperties {
    deteId?: number;
}


export default function AdminDete(props: IAdminDeteProperties) {
    const[dete,setDete] = useState<IDete|null>(null);
    const [ errorMessage, setErrorMessage ] = useState<string>("");
    const [ loading, setLoading ]           = useState<boolean>(false);
    const [ deleteRequested, setDeleteRequested ] = useState<boolean>(false);

    const params = useParams<IAdminDeteUrlParams>();
    const deteId = props.deteId ?? params.id;

    const navigate = useNavigate();

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
    }, [deteId]);

    function deleteDete() {
        api("delete", "/api/dete/" + deteId, "administrator")
        .then(res => {
            if (res.status === 'error') {
                return setErrorMessage("Could not edit this grupa!");
            }

            navigate("/admin/dashboard/deca/list");
        })
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
                    delay: 0.25,
                }}>
                <div className="card-body">
                    <div className="card-title text-center">
                        <h2 className="h4">Detalji deteta {dete?.imePrezime}</h2>
                    </div>

                    <div className="card-text mt-3">
                        <div className="row">
                            <div className="col">
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group mb-3">
                                            <label className="mb-2">Ime i prezime</label>
                                            <div className="input-group">
                                                <input className="form-control" value={dete?.imePrezime }disabled/>
                                            </div>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="mb-2">Jmbg</label>
                                            <div className="input-group">
                                                <input className="form-control" value={dete?.jmbg }disabled/>
                                            </div>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="mb-2">Datum rodjenja</label>
                                            <div className="input-group">
                                                <input className="form-control" value={ dete?.datumRodj }disabled/>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="mb-2">Adresa</label>
                                            <div className="input-group">
                                                <input className="form-control" value={ dete?.adresa }disabled/>
                                            </div>
                                        </div>
                                    </div>    
                                    <div className="col">
                                        <div className="form-group mb-3">
                                            <label className="mb-2">Ugovor</label>
                                            <div className="input-group">
                                                <input className="form-control" value={ dete?.ugovor }disabled/>
                                            </div>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="mb-2">Broj ugovora</label>
                                            <div className="input-group">
                                                <input className="form-control" value={ dete?.brojUgovora }disabled/>
                                            </div>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="mb-2">Datum ugovora</label>
                                            <div className="input-group">
                                                <input className="form-control" value={dete?.datumUgovora }disabled/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="mb-2">Popust</label>
                                            <div className="input-group">
                                                <input className="form-control" value={ dete?.popust }disabled/>
                                            </div>
                                        </div>
                                    </div>    
                                </div>
                            </div>
                            <div className="col">
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group mb-3">
                                            <label className="mb-2">Objekat</label>
                                            <div className="input-group">
                                                <input className="form-control" value={ dete?.objekat }disabled/>
                                            </div>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="mb-2">Grupa</label>
                                            <div className="input-group">
                                                <input className="form-control" value={dete?.grupa }disabled/>
                                            </div>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="mb-2">Datum polaska</label>
                                            <div className="input-group">
                                                <input className="form-control" value={ dete?.datumPolaska }disabled/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group" style={{marginTop:'46px'}}>
                                                <Link to={"/admin/dashboard/dete/edit/" + deteId} className='btn btn-warning'>Izmeni dete</Link>
                                                <Link to={"/admin/dashboard/dete/"+ deteId +"/finansije"} className='btn btn-primary'>Finansije</Link>
                                            </div>
                                        </div>
                                    </div>    
                                    <div className="col">
                                        <div className="form-group mb-3">
                                            <label className="mb-2">Roditelji</label>
                                            <div className="input-group">
                                                <input className="form-control" value={dete?.roditelji?.map(r=>r.imePrezime).join(', ') }disabled/>
                                            </div>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="mb-2">Porodicni status</label>
                                            <div className="input-group">
                                                <input className="form-control" value={ dete?.pstatus }disabled/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="mb-2">Subvencija</label>
                                            <div className="input-group">
                                            {
                                                dete?.subvencija
                                                ? <p className='form-control'><FontAwesomeIcon icon={faCheckCircle}/> Da</p>
                                                : <p className='form-control'><FontAwesomeIcon icon={ faCircle } /> Ne</p>
                                                }
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group" style={{marginTop: '30px'}}>
                                                <button className='btn btn-danger px-4' onClick={ () => setDeleteRequested(true) }>
                                                    Obrisi
                                                </button>
                                                { deleteRequested && <ConfirmAction
                                                    title="Potvrdite da hocete da obrisete dete"
                                                    message={ "Da li ste sigurni da hocete da obrisete: \"" + dete.imePrezime + "\"?" }
                                                    onNo={ () => setDeleteRequested(false) }
                                                    onYes={ () => deleteDete() }
                                                /> }
                                            </div>
                                        </div>
                                    </div>    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
    </div>
  )
}
