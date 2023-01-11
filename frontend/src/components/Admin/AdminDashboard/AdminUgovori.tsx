import React, { useEffect, useState } from 'react'
import { api } from '../../../api/api';
import ConfirmAction from '../../../helpers/ConfirmAction';
import IUgovor from '../../../models/IUgovor.model';

interface IAdminUgovorListaRowProperties {
    ugovor: IUgovor,
}

export default function AdminUgovori() {

    const [ ugovor, setUgovor ] = useState<IUgovor[]>([]);
    const [ errorMessage, setErrorMessage ] = useState<string>("");
    const [ showAddNewUgovor, setShowAddNewUgovor ] = useState<boolean>(false);

    function AdminUgovoriListaRow(props: IAdminUgovorListaRowProperties) {
        const [ ime, setIme ] = useState<string>(props.ugovor.ime);
        const [ cena, setCena ] = useState<string>(props.ugovor.cena);
        const [ deleteRequested, setDeleteRequested ] = useState<boolean>(false);

        const nameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
            setIme( e.target.value );
        }

        const cenaChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
            setCena( e.target.value );
        }

        const doEditUgovor = (e: any) => {
            api("put", "/api/ugovor/" + props.ugovor.ugovorId, "administrator", { ime,cena })
            .then(res => {
                if (res.status === 'error') {
                    return setErrorMessage("Could not edit this ugovor!");
                }

                loadUgovori();
            })
        }

        const doDeleteUgovor = () => {
            api("delete", "/api/ugovor/" + props.ugovor.ugovorId, "administrator")
            .then(res => {
                if (res.status === 'error') {
                    return setErrorMessage("Could not edit this ugovor!");
                }

                loadUgovori();
            })
        }

        return (
            <tr>
                <td>{ props.ugovor.ugovorId }</td>
                <td>
                    <div className="input-group">
                        <input className="form-control form-control-sm"
                               type="text"
                               onChange={ e => nameChanged(e) }
                               value={ ime } />
                        { props.ugovor.ime !== ime
                            ? <button className="btn btn-primary btn-sm" onClick={ e => doEditUgovor(e) }>
                                  Save
                              </button>
                            : ''
                        }
                        {/* <button className='btn btn-danger' onClick={ () => setDeleteRequested(true) }>Obriši</button>
                        { deleteRequested && <ConfirmAction
                        title="Confirm that you want to delete this ugovor"
                        message={ "Are you sure that you want to delete this item: \"" + props.ugovor.ime + "\"?" }
                        onNo={ () => setDeleteRequested(false) }
                        onYes={ () => doDeleteUgovor() }
                    /> } */}
                    </div>
                </td>
                <td>
                    <div className="input-group">
                        <input className="form-control form-control-sm"
                               type="text"
                               onChange={ e => cenaChanged(e) }
                               value={ cena } />
                        { props.ugovor.cena !== cena
                            ? <button className="btn btn-primary btn-sm" onClick={ e => doEditUgovor(e) }>
                                  Save
                              </button>
                            : ''
                        }
                        <button className='btn btn-danger' onClick={ () => setDeleteRequested(true) }>Obriši</button>
                        { deleteRequested && <ConfirmAction
                        title="Confirm that you want to delete this ugovor"
                        message={ "Are you sure that you want to delete this item: \"" + props.ugovor.ime + "\"?" }
                        onNo={ () => setDeleteRequested(false) }
                        onYes={ () => doDeleteUgovor() }
                    /> }
                    </div>
                </td>
            </tr>
        );
    }

    function AdminUgovorAddRow() {
        const [ ime, setIme ] = useState<string>("");
        const [ cena, setCena ] = useState<string>("");

        const nameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
            setIme( e.target.value );
        }

        const cenaChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
            setCena( e.target.value );
        }

        const doAddUgovor = (e: any) => {
            api("post", "/api/ugovor/", "administrator", { ime,cena })
            .then(res => {
                if (res.status === 'error') {
                    return setErrorMessage("Could not add this ugovor!");
                }

                loadUgovori();

                setIme("");
                setCena("");
                setShowAddNewUgovor(false);
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
                        {/* { ime.trim().length >= 1 && ime.trim().length <= 32
                            ? <button className="btn btn-primary btn-sm" onClick={ e => doAddUgovor(e) }>
                                  Save
                              </button>
                            : ''
                        } */}
                    </div>
                </td>
                <td>
                    <div className="input-group">
                        <input className="form-control form-control-sm"
                               type="text"
                               onChange={ e => cenaChanged(e) }
                               value={ cena } />
                        { cena.trim().length >= 1 && ime.trim().length <= 50
                            ? <button className="btn btn-primary btn-sm" onClick={ e => doAddUgovor(e) }>
                                  Save
                              </button>
                            : ''
                        }
                    </div>
                </td>
                <td>
                    <button className="btn btn-danger btn-sm" onClick={ () => {
                        setShowAddNewUgovor(false);
                        setIme("");
                        setCena("");
                    } }>
                        Cancel
                    </button>
                </td>
            </tr>
        );
    }

    const loadUgovori = () => {
        api("get", "/api/ugovor", "administrator")
        .then(apiResponse => {
            console.log("GET categories response: ", apiResponse);

            if (apiResponse.status === 'ok') {
                return setUgovor(apiResponse.data);
            }

            throw new Error("Unknown error while loading ugovore...");
        })
        .catch(error => {
            setErrorMessage(error?.message ?? 'Unknown error while loading ugovore...');
        });
    }

    useEffect(() => {
        loadUgovori();
    }, [ ]);

  return (
    <div>
        { errorMessage && <p>Error: { errorMessage }</p> }
        { !errorMessage &&
            <div>
                <button className="btn btn-primary btn-sm" onClick={() => setShowAddNewUgovor(true)}>Dodaj ugovor</button>

                <table className="table table-bordered table-striped table-hover table-sm mt-3">
                    <thead>
                        <tr>
                            <th className="category-row-id">ID</th>
                            <th>Name</th>
                            <th>Cena</th>
                        </tr>
                    </thead>
                    <tbody>
                        { showAddNewUgovor && <AdminUgovorAddRow /> }
                        { ugovor.map(ugovor => <AdminUgovoriListaRow key={ "grupa-row-" + ugovor.ugovorId } ugovor={ ugovor } /> ) }
                    </tbody>
                </table>
            </div>
        }
    </div>
  )
}
