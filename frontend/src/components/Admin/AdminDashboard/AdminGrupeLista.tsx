import React, { useEffect, useState } from 'react'
import { api } from '../../../api/api';
import ConfirmAction from '../../../helpers/ConfirmAction';
import IGrupa from '../../../models/IGrupa.model';

interface IAdminGrupaListaRowProperties {
    grupa: IGrupa,
}

export default function AdminGrupeLista() {
 
    const [ grupa, setgrupa ] = useState<IGrupa[]>([]);
    const [ errorMessage, setErrorMessage ] = useState<string>("");
    const [ showAddNewgrupa, setShowAddNewgrupa ] = useState<boolean>(false);

    function AdminGrupeListaRow(props: IAdminGrupaListaRowProperties) {
        const [ ime, setIme ] = useState<string>(props.grupa.ime);
        const [ deleteRequested, setDeleteRequested ] = useState<boolean>(false);

        const nameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
            setIme( e.target.value );
        }

        const doEditgrupa = (e: any) => {
            api("put", "/api/grupa/" + props.grupa.grupaId, "administrator", { ime })
            .then(res => {
                if (res.status === 'error') {
                    return setErrorMessage("Could not edit this grupa!");
                }

                loadGrupe();
            })
        }

        const doDeletegrupa = () => {
            api("delete", "/api/grupa/" + props.grupa.grupaId, "administrator")
            .then(res => {
                if (res.status === 'error') {
                    return setErrorMessage("Could not edit this grupa!");
                }

                loadGrupe();
            })
        }

        return (
            <tr>
                <td>{ props.grupa.grupaId }</td>
                <td>
                    <div className="input-group">
                        <input className="form-control form-control-sm"
                               type="text"
                               onChange={ e => nameChanged(e) }
                               value={ ime } />
                        { props.grupa.ime !== ime
                            ? <button className="btn btn-primary btn-sm" onClick={ e => doEditgrupa(e) }>
                                  Save
                              </button>
                            : ''
                        }
                        <button className='btn btn-danger' onClick={ () => setDeleteRequested(true) }>Obriši</button>
                        { deleteRequested && <ConfirmAction
                        title="Potvrdite da želite da izbrišete"
                        message={ "Da li ste sigurni da želite da izbrišete grupu: \"" + props.grupa.ime + "\"?" }
                        onNo={ () => setDeleteRequested(false) }
                        onYes={ () => doDeletegrupa() }
                    /> }
                    </div>
                </td>
            </tr>
        );
    }

    function AdmingrupaAddRow() {
        const [ ime, setIme ] = useState<string>("");

        const nameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
            setIme( e.target.value );
        }

        const doAddgrupa = (e: any) => {
            api("post", "/api/grupa/", "administrator", { ime })
            .then(res => {
                if (res.status === 'error') {
                    return setErrorMessage("Could not add this grupa!");
                }

                loadGrupe();

                setIme("");
                setShowAddNewgrupa(false);
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
                            ? <button className="btn btn-primary btn-sm" onClick={ e => doAddgrupa(e) }>
                                  Save
                              </button>
                            : ''
                        }
                    </div>
                </td>
                <td>
                    <button className="btn btn-danger btn-sm" onClick={ () => {
                        setShowAddNewgrupa(false);
                        setIme("");
                    } }>
                        Cancel
                    </button>
                </td>
            </tr>
        );
    }

    const loadGrupe = () => {
        api("get", "/api/grupa", "administrator")
        .then(apiResponse => {
            console.log("GET categories response: ", apiResponse);

            if (apiResponse.status === 'ok') {
                return setgrupa(apiResponse.data);
            }

            throw new Error("Unknown error while loading categories...");
        })
        .catch(error => {
            setErrorMessage(error?.message ?? 'Unknown error while loading categories...');
        });
    }

    useEffect(() => {
        loadGrupe();
    }, [ ]);

    return (
        <div className='bg'>
            { errorMessage && <p>Error: { errorMessage }</p> }
            { !errorMessage &&
                <div>
                    <button className="btn btn-primary btn-sm" onClick={() => setShowAddNewgrupa(true)}>Dodaj grupu</button>

                    <table className="table table-bordered table-striped table-hover table-sm mt-3 table-dark">
                        <thead>
                            <tr>
                                <th className="category-row-id">ID</th>
                                <th>Ime</th>
                            </tr>
                        </thead>
                        <tbody>
                            { showAddNewgrupa && <AdmingrupaAddRow /> }
                            { grupa.map(grupa => <AdminGrupeListaRow key={ "grupa-row-" + grupa.grupaId } grupa={ grupa } /> ) }
                        </tbody>
                    </table>
                </div>
            }
        </div>
    );
}
