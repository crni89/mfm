import React, { useEffect, useState } from 'react'
import { api } from '../../../api/api';
import ConfirmAction from '../../../helpers/ConfirmAction';
import IObjekat from '../../../models/IObjekat.model';


interface IAdminObjekatListaRowProperties {
    objekat: IObjekat,
}

export default function AdminObjektiLista() {

    const [ objekat, setObjekat ] = useState<IObjekat[]>([]);
    const [ errorMessage, setErrorMessage ] = useState<string>("");
    const [ showAddNewObjekat, setShowAddNewObjekat ] = useState<boolean>(false);

    function AdminObjektiListaRow(props: IAdminObjekatListaRowProperties) {
        const [ ime, setIme ] = useState<string>(props.objekat.ime);
        const [ deleteRequested, setDeleteRequested ] = useState<boolean>(false);

        const nameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
            setIme( e.target.value );
        }

        const doEditObjekat = (e: any) => {
            api("put", "/api/objekat/" + props.objekat.objekatId, "administrator", { ime })
            .then(res => {
                if (res.status === 'error') {
                    return setErrorMessage("Could not edit this objekat!");
                }

                loadObjekti();
            })
        }

        const doDeleteObjekat = () => {
            api("delete", "/api/objekat/" + props.objekat.objekatId, "administrator")
            .then(res => {
                if (res.status === 'error') {
                    return setErrorMessage("Could not edit this objekat!");
                }

                loadObjekti();
            })
        }

        return (
            <tr>
                <td>{ props.objekat.objekatId }</td>
                <td>
                    <div className="input-group">
                        <input className="form-control form-control-sm"
                               type="text"
                               onChange={ e => nameChanged(e) }
                               value={ ime } />
                        { props.objekat.ime !== ime
                            ? <button className="btn btn-primary btn-sm" onClick={ e => doEditObjekat(e) }>
                                  Save
                              </button>
                            : ''
                        }
                        <button className='btn btn-danger' onClick={ () => setDeleteRequested(true) }>Obriši</button>
                        { deleteRequested && <ConfirmAction
                        title="Confirm that you want to delete this ingredient"
                        message={ "Are you sure that you want to delete this item: \"" + props.objekat.ime + "\"?" }
                        onNo={ () => setDeleteRequested(false) }
                        onYes={ () => doDeleteObjekat() }
                    /> }
                    </div>
                </td>
            </tr>
        );
    }

    function AdminObjekatAddRow() {
        const [ ime, setIme ] = useState<string>("");

        const nameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
            setIme( e.target.value );
        }

        const doAddObjekat = (e: any) => {
            api("post", "/api/objekat/", "administrator", { ime })
            .then(res => {
                if (res.status === 'error') {
                    return setErrorMessage("Could not add this objekat!");
                }

                loadObjekti();

                setIme("");
                setShowAddNewObjekat(false);
            });
        }

        return (
            <tr>
                <td> </td>
                <td>
                    <div className="input-group">
                        <input className="form-control form-control-sm"
                               type="text"
                               onChange={ e => nameChanged(e) }
                               value={ ime } />
                        { ime.trim().length >= 4 && ime.trim().length <= 32
                            ? <button className="btn btn-primary btn-sm" onClick={ e => doAddObjekat(e) }>
                                  Save
                              </button>
                            : ''
                        }
                    </div>
                </td>
                <td>
                    <button className="btn btn-danger btn-sm" onClick={ () => {
                        setShowAddNewObjekat(false);
                        setIme("");
                    } }>
                        Cancel
                    </button>
                </td>
            </tr>
        );
    }

    const loadObjekti = () => {
        api("get", "/api/objekat", "administrator")
        .then(apiResponse => {
            console.log("GET categories response: ", apiResponse);

            if (apiResponse.status === 'ok') {
                return setObjekat(apiResponse.data);
            }

            throw new Error("Unknown error while loading categories...");
        })
        .catch(error => {
            setErrorMessage(error?.message ?? 'Unknown error while loading categories...');
        });
    }

    useEffect(() => {
        loadObjekti();
    }, [ ]);

    return (
        <div>
            { errorMessage && <p>Error: { errorMessage }</p> }
            { !errorMessage &&
                <div>
                    <button className="btn btn-primary btn-sm" onClick={() => setShowAddNewObjekat(true)}>Dodaj objekat</button>

                    <table className="table table-bordered table-striped table-hover table-sm mt-3">
                        <thead>
                            <tr>
                                <th className="category-row-id">ID</th>
                                <th>Ime</th>
                            </tr>
                        </thead>
                        <tbody>
                            { showAddNewObjekat && <AdminObjekatAddRow /> }
                            { objekat.map(objekat => <AdminObjektiListaRow key={ "objekat-row-" + objekat.objekatId } objekat={ objekat } /> ) }
                        </tbody>
                    </table>
                </div>
            }
        </div>
    );
}
