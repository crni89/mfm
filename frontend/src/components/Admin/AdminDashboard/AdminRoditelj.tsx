/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import IRoditelj from '../../../models/IRoditelj.model';
import { api } from '../../../api/api';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheckCircle, faCircle } from '@fortawesome/free-regular-svg-icons';


export interface IAdminRoditeljUrlParams extends Record<string, string | undefined>{
    id: string
}

export interface IAdminRoditeljProperties {
    roditeljId?: number;
}


export default function AdminRoditelj(props: IAdminRoditeljProperties) {
    const[roditelj,setRoditelj] = useState<IRoditelj|null>(null);
    const [ errorMessage, setErrorMessage ] = useState<string>("");
    const [ loading, setLoading ]           = useState<boolean>(false);

    const params = useParams<IAdminRoditeljUrlParams>();
    const roditeljId = props.roditeljId ?? params.id;

    useEffect(() =>{
        setLoading(true);
        api("get", "api/roditelj/" + roditeljId, "administrator")
        .then(res => {
            if(res.status === "error"){
                throw new Error("Could not get roditelj data!");
            }

            setRoditelj(res.data);
        })
        .catch(error => {
            setErrorMessage(error?.message ?? "Uknown error while loading this roditelj!");
        })
        .finally(() =>{
            setLoading(false);
        });
    }, [roditeljId]);

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
            <div className="card-body">
                <div className="card-title text-center">
                    <h2 className="h4">Detalji roditeljta {roditelj?.imePrezime}</h2>
                </div>

                <div className="card-text mt-3">
                    <div className="row">
                        <div className="col">
                            <div className="row">
                                <div className="col">
                                    <div className="form-group mb-3">
                                        <label className="mb-2">Ime i prezime</label>
                                        <div className="input-group">
                                            <input className="form-control" value={roditelj?.imePrezime }disabled/>
                                        </div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="mb-2">Jmbg</label>
                                        <div className="input-group">
                                            <input className="form-control" value={roditelj?.jmbg }disabled/>
                                        </div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="mb-2">Broj licne karte</label>
                                        <div className="input-group">
                                            <input className="form-control" value={ roditelj?.brLicne }disabled/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="mb-2">Mobilni</label>
                                        <div className="input-group">
                                            <input className="form-control" value={ roditelj?.mobilni }disabled/>
                                        </div>
                                    </div>
                                </div>    
                                <div className="col">
                                    <div className="form-group mb-3">
                                        <label className="mb-2">Email adresa</label>
                                        <div className="input-group">
                                            <input className="form-control" value={ roditelj?.email }disabled/>
                                        </div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="mb-2">Adresa</label>
                                        <div className="input-group">
                                            <input className="form-control" value={ roditelj?.adresa }disabled/>
                                        </div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="mb-2">Opstina</label>
                                        <div className="input-group">
                                            <input className="form-control" value={roditelj?.opstina }disabled/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="mb-2">Tekuci racun</label>
                                        <div className="input-group">
                                            <input className="form-control" value={ roditelj?.tekuciRacun }disabled/>
                                        </div>
                                    </div>
                                </div>    
                            </div>
                        </div>
                        <div className="col">
                        <div className="row">
                                <div className="col">
                                    <div className="form-group mb-3">
                                        <label className="mb-2">Broj resenja</label>
                                        <div className="input-group">
                                            <input className="form-control" value={ roditelj?.brojResenja }disabled/>
                                        </div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="mb-2">Nosilac ugovora</label>
                                        <div className="input-group">
                                        {
                                            roditelj?.nosilacUgovora
                                            ? <p className='form-control'><FontAwesomeIcon icon={faCheckCircle}/> Da</p>
                                            : <p className='form-control'><FontAwesomeIcon icon={ faCircle } /> Ne</p>
                                            }
                                        </div>
                                    </div>
                                    {/* <div className="form-group mb-3">
                                        <label className="mb-2">Datum polaska</label>
                                        <div className="input-group">
                                            <input className="form-control" value={ roditelj?.datumPolaska }disabled/>
                                        </div>
                                    </div> */}
                                    <div className="form-group">
                                        <div className="input-group" style={{marginTop:'46px'}}>
                                            <Link to={"/admin/dashboard/roditelj/edit/" + roditeljId} className='btn btn-warning'>Izmeni roditelj</Link>
                                        </div>
                                    </div>
                                </div>    
                                {/* <div className="col">
                                    <div className="form-group mb-3">
                                        <label className="mb-2">Roditelji</label>
                                        <div className="input-group">
                                            <input className="form-control" value={roditelj?.roditelji?.map(r=>r.imePrezime).join(', ') }disabled/>
                                        </div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="mb-2">Porodicni status</label>
                                        <div className="input-group">
                                            <input className="form-control" value={ roditelj?.porodicniStatus }disabled/>
                                        </div>
                                    </div>
                                </div>     */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
  )
}
