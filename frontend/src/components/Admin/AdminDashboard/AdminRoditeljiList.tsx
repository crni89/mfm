import { faCheckSquare, faSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { api } from '../../../api/api';
import IRoditelj from '../../../models/IRoditelj.model';
import { Link } from 'react-router-dom';

export default function AdminRoditeljiList() {

    const [ roditelj, setRoditelj ] = useState<IRoditelj[]>([]);
    const [ errorMessage, setErrorMessage ] = useState<string>("");

    const loadRoditelj = () => {
        api("get", "/api/roditelj", "administrator")
        .then(res => {
            if (res.status !== "ok") {
                throw new Error("Could not load roditelj!");
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

    useEffect(loadRoditelj, []);
    
  return (
    <div className="">
            <div className="card-body">
                <div className="card-text">
                    { errorMessage && <div className="alern alert-danger">{ errorMessage }</div> }
                    <div className="table-responsive">
                        <table className="table table-striped caption-top table-bordered table-sm">
                            <thead>
                                <tr>
                                    <th>Ime prezime</th>
                                    <th>JMBG</th>
                                    <th>Broj licne karte</th>
                                    <th>Br. mobilnog</th>
                                    <th>Email</th>
                                    <th>Adresa</th>
                                    <th>Opstina</th>
                                    <th>Tekuci racun</th>
                                    <th>Broj resenja</th>
                                    <th>Nosilac ugovora</th>
                                    <th>Deca</th>
                                </tr>
                            </thead>
                            <tbody>
                                { roditelj.length === 0 && <tr><td colSpan={7}>No Roditelj</td></tr> }

                                { roditelj.map(roditelj => (
                                    <tr key={ "dete-" + roditelj.roditeljId }>
                                        <td>
                                            
                                            <Link to={"/admin/dashboard/roditelj/" + roditelj.roditeljId} target="_blank"> {roditelj.imePrezime} </Link>
                                            
                                        </td>
                                        <td>{ roditelj.jmbg }</td>
                                        <td>{ roditelj.brLicne }</td>
                                        <td>{ roditelj.mobilni }</td>
                                        <td>{ roditelj.email }</td>
                                        <td>{ roditelj.adresa }</td>
                                        <td>{ roditelj.opstina }</td>
                                        <td>{ roditelj.tekuciRacun }</td>
                                        <td>{ roditelj.brojResenja }</td>
                                        <td>
                                            {
                                                roditelj.nosilacUgovora
                                                ? <><FontAwesomeIcon icon={ faCheckSquare } /> Da </>
                                                : <><FontAwesomeIcon icon={ faSquare } /> Ne </>
                                            }
                                        </td>
                                        <td>{ roditelj.deca?.map(d => d.imePrezime).join(", ") }</td>
                                    </tr>
                                )) }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    </div>
  )
}
