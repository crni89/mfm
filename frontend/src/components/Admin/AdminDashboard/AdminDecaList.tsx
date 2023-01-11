
import { useEffect, useReducer, useState } from 'react'
import { Link } from 'react-router-dom';
import { api } from '../../../api/api';
import IDete from '../../../models/IDete.model';
import IObjekat from '../../../models/IObjekat.model';
import IUgovor from '../../../models/IUgovor.model';
import { Col, Form, Modal, Row } from 'react-bootstrap';
import IPredracun from '../../../models/IPredracun.model';

interface IAddFinansijeFormState {
    datum: string;
    status: string;
    datumOd: string;
    datumDo: string;
    tip: string;
    brojFakture: number;
    godina: string;
    pozivNaBroj: string;
    iznos: string;
    paket: string;
    valuta: string;
    popust: string;
};

type TSetDatum          = { type: "addFinansijeForm/setDatum",          value: string };
type TSetStatus         = { type: "addFinansijeForm/setStatus",   value: string };
type TSetDatumOd        = { type: "addFinansijeForm/setDatumOd",   value: string };
type TSetDatumDo        = { type: "addFinansijeForm/setDatumDo",   value: string };
type TSetTip            = { type: "addFinansijeForm/setTip",   value: string };
type TSetBrojfakture    = { type: "addFinansijeForm/setBrojfakture",   value: number };
type TSetGodina         = { type: "addFinansijeForm/setGodina",   value: string };
type TSetPozivNaBroj    = { type: "addFinansijeForm/setPozivNaBroj",   value: string };
type TSetIznos          = { type: "addFinansijeForm/setIznos",   value: string };
type TSetPaket          = { type: "addFinansijeForm/setPaket",   value: string };
type TSetValuta         = { type: "addFinansijeForm/setValuta",    value: string };
type TSetPopust         = { type: "addFinansijeForm/setPopust",    value: string };

type AddFinansijeFormAction = TSetDatum
                            | TSetStatus
                            | TSetDatumOd
                            | TSetDatumDo
                            | TSetTip
                            | TSetBrojfakture
                            | TSetGodina
                            | TSetPozivNaBroj
                            | TSetIznos
                            | TSetValuta
                            | TSetPaket
                            | TSetPopust;

function AddFinansijeFormReducer(oldState: IAddFinansijeFormState, action: AddFinansijeFormAction): IAddFinansijeFormState {
    switch (action.type) {
        case "addFinansijeForm/setDatum": {
            return {
                ...oldState,
                status: oldState.status,
                datumOd: oldState.datumOd,
                datumDo: oldState.datumDo,
                tip: oldState.tip,
                brojFakture: oldState.brojFakture,
                godina: oldState.godina,
                pozivNaBroj: oldState.pozivNaBroj,
                iznos: oldState.iznos,
                valuta: oldState.valuta,
                paket: oldState.paket,
                popust: oldState.popust,
                // This changes:
                datum: action.value,
            }
        }

        case "addFinansijeForm/setStatus": {
            return {
                ...oldState,
                datum: oldState.datum,
                datumOd: oldState.datumOd,
                datumDo: oldState.datumDo,
                tip: oldState.tip,
                brojFakture: oldState.brojFakture,
                godina: oldState.godina,
                pozivNaBroj: oldState.pozivNaBroj,
                iznos: oldState.iznos,
                valuta: oldState.valuta,
                paket: oldState.paket,
                popust: oldState.popust,
                
                // This changes:
                status: action.value,
            }
        }

        case "addFinansijeForm/setDatumOd": {
            return {
                ...oldState,
                datum: oldState.datum,
                status: oldState.status,
                datumDo: oldState.datumDo,
                tip: oldState.tip,
                brojFakture: oldState.brojFakture,
                godina: oldState.godina,
                pozivNaBroj: oldState.pozivNaBroj,
                iznos: oldState.iznos,
                valuta: oldState.valuta,
                paket: oldState.paket,
                popust: oldState.popust,
                
                // This changes:
                datumOd: action.value,
            }
        }

        case "addFinansijeForm/setDatumDo": {
            return {
                ...oldState,
                datum: oldState.datum,
                status: oldState.status,
                datumOd: oldState.datumOd,
                tip: oldState.tip,
                brojFakture: oldState.brojFakture,
                godina: oldState.godina,
                pozivNaBroj: oldState.pozivNaBroj,
                iznos: oldState.iznos,
                valuta: oldState.valuta,
                paket: oldState.paket,
                popust: oldState.popust,
                
                // This changes:
                datumDo: action.value,
            }
        }

        case "addFinansijeForm/setTip": {
            return {
                ...oldState,
                datum: oldState.datum,
                status: oldState.status,
                datumOd: oldState.datumOd,
                datumDo: oldState.datumDo,
                brojFakture: oldState.brojFakture,
                godina: oldState.godina,
                pozivNaBroj: oldState.pozivNaBroj,
                iznos: oldState.iznos,
                valuta: oldState.valuta,
                paket: oldState.paket,
                popust: oldState.popust,
                
                // This changes:
                tip: action.value,
            }
        }

        case "addFinansijeForm/setBrojfakture": {
            return {
                ...oldState,
                datum: oldState.datum,
                status: oldState.status,
                datumOd: oldState.datumOd,
                datumDo: oldState.datumDo,
                tip: oldState.tip,
                godina: oldState.godina,
                pozivNaBroj: oldState.pozivNaBroj,
                iznos: oldState.iznos,
                valuta: oldState.valuta,
                paket: oldState.paket,
                popust: oldState.popust,
                
                // This changes:
                brojFakture: action.value,
            }
        }

        case "addFinansijeForm/setGodina": {
            return {
                ...oldState,
                datum: oldState.datum,
                status: oldState.status,
                datumOd: oldState.datumOd,
                datumDo: oldState.datumDo,
                tip: oldState.tip,
                brojFakture: oldState.brojFakture,
                pozivNaBroj: oldState.pozivNaBroj,
                iznos: oldState.iznos,
                valuta: oldState.valuta,
                paket: oldState.paket,
                popust: oldState.popust,
                
                // This changes:
                godina: action.value,
            }
        }

        case "addFinansijeForm/setPozivNaBroj": {
            return {
                ...oldState,
                datum: oldState.datum,
                status: oldState.status,
                datumOd: oldState.datumOd,
                datumDo: oldState.datumDo,
                tip: oldState.tip,
                brojFakture: oldState.brojFakture,
                godina: oldState.godina,
                iznos: oldState.iznos,
                valuta: oldState.valuta,
                paket: oldState.paket,
                popust: oldState.popust,
                
                // This changes:
                pozivNaBroj: action.value,
            }
        }
        
        case "addFinansijeForm/setIznos": {
            return {
                ...oldState,
                datum: oldState.datum,
                status: oldState.status,
                datumOd: oldState.datumOd,
                datumDo: oldState.datumDo,
                tip: oldState.tip,
                brojFakture: oldState.brojFakture,
                godina: oldState.godina,
                pozivNaBroj: oldState.pozivNaBroj,
                valuta: oldState.valuta,
                paket: oldState.paket,
                popust: oldState.popust,
                
                // This changes:
                iznos: action.value,
            }
        }
        
        case "addFinansijeForm/setValuta": {
            return {
                ...oldState,
                datum: oldState.datum,
                status: oldState.status,
                datumOd: oldState.datumOd,
                datumDo: oldState.datumDo,
                tip: oldState.tip,
                brojFakture: oldState.brojFakture,
                godina: oldState.godina,
                pozivNaBroj: oldState.pozivNaBroj,
                iznos: oldState.iznos,
                paket: oldState.paket,
                popust: oldState.popust,
                
                // This changes:
                valuta: action.value,
            }
        }
        
        case "addFinansijeForm/setPaket": {
            return {
                ...oldState,
                datum: oldState.datum,
                status: oldState.status,
                datumOd: oldState.datumOd,
                datumDo: oldState.datumDo,
                tip: oldState.tip,
                brojFakture: oldState.brojFakture,
                godina: oldState.godina,
                pozivNaBroj: oldState.pozivNaBroj,
                iznos: oldState.iznos,
                valuta: oldState.valuta,
                popust: oldState.popust,
                
                // This changes:
                paket: action.value,
            }
        }
        
        case "addFinansijeForm/setPopust": {
            return {
                ...oldState,
                datum: oldState.datum,
                status: oldState.status,
                datumOd: oldState.datumOd,
                datumDo: oldState.datumDo,
                tip: oldState.tip,
                brojFakture: oldState.brojFakture,
                godina: oldState.godina,
                pozivNaBroj: oldState.pozivNaBroj,
                iznos: oldState.iznos,
                valuta: oldState.valuta,
                paket: oldState.paket,
                
                // This changes:
                popust: action.value,
            }
        }
        
        
        default: return oldState;
    }
}



export default function AdminDecaList() {

    const [ dete, setDete ] = useState<IDete[]>([]);
    const [objekat, setObjekat] = useState<IObjekat | undefined>(undefined);
    const [ugovor, setUgovor] = useState<IUgovor | undefined>(undefined);
    const [objekats, setObjekats] = useState<IObjekat[]>([]);
    const [ugovors, setUgovors] = useState<IUgovor[]>([]);
    const [ errorMessage, setErrorMessage ] = useState<string>("");
    const [results, setResults] = useState<IDete[]>([]);

    const [zaShow, setZaShow] = useState(false);

    const [predracunAll, setPredracunAll] = useState<IPredracun[]>([]);
    const [ug, setUg] = useState<IUgovor[]>([]);

    const [selectedIds, setSelectedIds] = useState([]);

    const [ formState, dispatchFormStateAction ] = useReducer(AddFinansijeFormReducer, {
        datum: "",
        status: "",
        datumOd: "",
        datumDo: "",
        tip: "",
        brojFakture: 0,
        godina: "",
        pozivNaBroj: "",
        iznos: "",
        paket: "",
        valuta: "",
        popust: "",
    });

    const handleSelectChange = deteId => {
        if (selectedIds.includes(deteId)) {
          setSelectedIds(selectedIds.filter(id => id !== deteId));
        } else {
          setSelectedIds([...selectedIds, deteId]);
        }
      };

    const handleSelectAllChange = event => {
        const deteIds = results.map(dete => dete.deteId);
        setSelectedIds(event.target.checked ? deteIds : []);
    };

    const loadDete = () => {
        api("get", "/api/dete", "administrator")
        .then(res => {
            if (res.status !== "ok") {
                throw new Error("Could not load deca!");
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

    const loadObjekat = () => {
        api("get", "/api/objekat", "administrator")
        .then(res => {
            if (res.status !== "ok") {
                throw new Error("Could not load objekati!");
            }

            return res.data;
        })
        .then(objekat => {
            setObjekats(objekat);
        })
        .catch(error => {
            setErrorMessage(error?.message ?? "Unknown error!");
        });
    };

    const loadUgovor = () => {
        api("get", "/api/ugovor", "administrator")
        .then(res => {
            if (res.status !== "ok") {
                throw new Error("Could not load ugovore!");
            }

            return res.data;
        })
        .then(ugovor => {
            setUgovors(ugovor);
        })
        .catch(error => {
            setErrorMessage(error?.message ?? "Unknown error!");
        });
    };

    const loadUg = () => {
        api("get", "/api/ugovor", "administrator")
        .then(res => {
            if (res.status !== "ok") {
                throw new Error("Could not load ugovore!");
            }

            return res.data;
        })
        .then(ug => {
            setUg(ug);
        })
        .catch(error => {
            setErrorMessage(error?.message ?? "Unknown error!");
        });
    };

    useEffect(() => {
        loadDete();
        loadObjekat();
        loadUgovor();
        loadUg();
    }, []);    

    const handleObjekatChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = objekats.find(objekat => objekat.ime === event.target.value);
        setObjekat(selectedOption);
      };
      const handleUgovorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = ugovors.find(ugovor => ugovor.ime === event.target.value);
        setUgovor(selectedOption);
      };

    const search = async () => {
      console.log('Searching...');
      // let url;
      if (!objekat || !ugovor) {
        // If objekat or ugovor is null or undefined, retrieve all data from the API
        // url = 'http://localhost:10000/api/dete';
        api('get', "/api/dete", "administrator")
        .then(apiResponse => {
          console.log("GET dete response: ", apiResponse);

          if (apiResponse.status === 'ok') {
              return setResults(apiResponse.data);
            }
          throw new Error("Unknown error while loading categories...");
      })
      .catch(error => {
          setErrorMessage(error?.message ?? 'Unknown error while loading categories...');
      });
      } else {
        // Otherwise, make a request to the detesearch API with the objekat and ugovor values
        // url = `http://localhost:10000/api/detesearch?objekat=${objekat.ime}&ugovor=${ugovor.ime}`;
        api('get', `/api/deca?objekat=${objekat.ime}&ugovor=${ugovor.ime}`, "administrator")
        .then(apiResponse => {
          console.log("GET dete response: ", apiResponse);

          if (apiResponse.status === 'ok') {
              return setResults(apiResponse.data);
          }

          throw new Error("Unknown error while loading categories...");
      })
      .catch(error => {
          setErrorMessage(error?.message ?? 'Unknown error while loading categories...');
      });
      }
    };

    const loadPredracunAll = () => {
        api("get", "/api/predracun", "administrator")
        .then(res => {
            if (res.status !== "ok") {
                throw new Error("Could not load all racun!");
            }

            return res.data;
        })
        .then(preAll => {
            setPredracunAll(preAll);
        })
        .catch(error => {
            setErrorMessage(error?.message ?? "Unknown error!");
        })
    }
    useEffect(() => {
        loadPredracunAll();
    }, [predracunAll]);

    const predracunStrings = predracunAll.map((p) => `${p.brojFakture}/${p.godina}`).reverse();
    const predracunString = predracunStrings.join(', ');

    // const racunStrings = racunAll.map((p) => `${p.brojFakture}/${p.godina}`).reverse();
    // const racunString = racunStrings.join(', ');

    const doAddZaduzenje = (deteId, index) => {

        const updatedFormState = {
          ...formState,
          brojFakture: index + 1
        };

      if (formState.tip === "Racun") {
        api("post", "/api/dete/" + deteId + "/racun", "administrator", updatedFormState)
          .then(res => {
            if (res.status !== "ok") {
              throw new Error(
                "Could not add this item! Reason: " +
                  res?.data
                    ?.map((error: any) => error?.instancePath + " " + error?.message)
                    .join(", ")
              );
            }
            setZaShow(false);
            return res.data;
          });
      } else if (formState.tip === "Predracun") {
        api("post", "/api/dete/" + deteId + "/predracun", "administrator", updatedFormState)
          .then(res => {
            if (res.status !== "ok") {
              throw new Error(
                "Could not add this item! Reason: " +
                  res?.data
                    ?.map((error: any) => error?.instancePath + " " + error?.message)
                    .join(", ")
              );
            }
            setZaShow(false);
            return res.data;
          });
      }
    };

    const handleAddZaduzenjeClick = () => {
      selectedIds.forEach((deteId, index) => doAddZaduzenje(deteId, index));
    };
    
  return (
    <div className="card">
        <div className="card-body">
            <div className="card-title">
                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="objekat-select">Objekat:</label>
                        <select  id="objekat-select" value={objekat ? objekat.ime : ''} onChange={handleObjekatChange}>
                            <option value="">Izaberite Objekat</option>
                            {objekats.map(objekat => (
                            <option key={objekat.ime} value={objekat.ime}>
                                {objekat.ime}
                            </option>
                            ))}
                        </select>
                    </div>
                    <div className="col">
                        <label htmlFor="ugovor-select">Ugovor:</label>
                        <select id="ugovor-select" value={ugovor ? ugovor.ime : ''} onChange={handleUgovorChange}>
                            <option value="">Izaberite ugovor</option>
                            {ugovors.map(ugovor => (
                            <option key={ugovor.ime} value={ugovor.ime}>
                                {ugovor.ime}
                            </option>
                            ))}
                        </select>
                    </div>
                    <div className="col">
                        <button className='btn btn-primary' onClick={search}>Search</button>
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col d-flex justify-content-end">
                        <p className='btn btn-outline-primary' onClick={()=> setZaShow(true)}>Dodaj zaduzenje</p>
                    </div>
                </div>
            <br />
            </div>
            <div className="card-text">
                { errorMessage && <div className="alern alert-danger">{ errorMessage }</div> }
                <div className="table-responsive">
                    <table className="table table-striped caption-top table-bordered table-sm">
                        <caption>Dece: {results.length}</caption>
                        <thead>
                            <tr>
                                <th>
                                    <Form.Check
                                        type="checkbox"
                                        id="select-all"
                                        label="Select All"
                                        checked={selectedIds.length === results.length}
                                        onChange={handleSelectAllChange}
                                    />
                                </th>
                                <th>Dete</th>
                                <th>Roditelji</th>
                                <th>Broj Ugovora</th>
                                <th>Objekat</th>
                                <th>Grupa</th>
                                <th>Ugovor</th>
                            </tr>
                        </thead>
                        <tbody>
                            { results.map(dete => (
                                <tr key={ "dete-" + dete.deteId }>
                                    <td>
                                        <Form.Check
                                            type="checkbox"
                                            id={dete.deteId.toString()}
                                            label=""
                                            checked={selectedIds.includes(dete.deteId)}
                                            onChange={() => handleSelectChange(dete.deteId)}
                                        />
                                    </td>
                                    <td>
                                        <Link to={"/admin/dashboard/dete/" + dete.deteId} target="_blank" className='text-decoration-none'>
                                        {
                                            dete.imePrezime
                                        }
                                        </Link>
                                    </td>
                                    <td>{ dete.roditelji?.map(r => r.imePrezime).join(", ")}</td>
                                    <td>{ dete.brojUgovora }</td>
                                    <td>{ dete.objekat }</td>
                                    <td>{ dete.grupa }</td>
                                    <td>{ dete.ugovor}</td>
                                </tr>
                            )) }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <Modal
            size="xl"
            show={zaShow}
            onHide={() => setZaShow(false)}
        >
            <Modal.Header closeButton>
            <Modal.Title>
                Zaduzenje
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Col>
                    <Row className="mb-5">
                        <Col>
                            <Form.Group>
                                <Form.Label>Izaberite datum</Form.Label>
                                <Form.Control type="text" placeholder="U formatu dd.mm.gggg." 
                                    value={formState.datum} 
                                    onChange={ e => dispatchFormStateAction({ type: "addFinansijeForm/setDatum", value: e.target.value }) }>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Status</Form.Label>
                                <Form.Select 
                                    value={formState.status}
                                    onChange={ e => dispatchFormStateAction({ type: "addFinansijeForm/setStatus", value: e.target.value})}
                                >
                                    <option value="">Izaberite status</option>
                                    <option value="Neplaceno">Neplaceno</option>
                                    <option value="Placeno">Placeno</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Datum od</Form.Label>
                                <Form.Control type="text" placeholder="U formatu dd.mm.gggg."
                                    value={formState.datumOd} 
                                    onChange={ e => dispatchFormStateAction({ type: "addFinansijeForm/setDatumOd", value: e.target.value }) }>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Datum do</Form.Label>
                                <Form.Control type="text" placeholder="U formatu dd.mm.gggg."
                                    value={formState.datumDo} 
                                    onChange={ e => dispatchFormStateAction({ type: "addFinansijeForm/setDatumDo", value: e.target.value }) }>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-5">
                        <Col>
                            <Form.Group>
                                <Form.Label>Tip</Form.Label>
                                <Form.Select
                                    value={formState.tip} 
                                    onChange={ e => dispatchFormStateAction({ type: "addFinansijeForm/setTip", value: e.target.value }) }
                                >
                                    <option value="">Izaberite tip</option>
                                    <option value="Racun">Racun</option>
                                    <option value="Predracun">Predracun</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Broj fakture</Form.Label>
                                <Form.Control type="number" placeholder="Unesit broj"
                                    value={formState.brojFakture} 
                                    onChange={ e => dispatchFormStateAction({ type: "addFinansijeForm/setBrojfakture", value: +e.target.value }) }
                                >
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Godina</Form.Label>
                                <Form.Select
                                    value={formState.godina} 
                                    onChange={ e => dispatchFormStateAction({ type: "addFinansijeForm/setGodina", value: e.target.value }) }
                                >
                                    <option value="">Izaberite godinu</option>
                                    <option value="23">23</option>
                                    <option value="22">22</option>
                                    <option value="21">21</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Poziv na broj</Form.Label>
                                <Form.Control type="text" placeholder="Unesite poziv na broj"
                                    value={formState.pozivNaBroj} 
                                    onChange={ e => dispatchFormStateAction({ type: "addFinansijeForm/setPozivNaBroj", value: e.target.value }) }
                                >
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Paket</Form.Label>
                                <Form.Select
                                    value={formState.paket} 
                                    onChange={(e) => {
                                        const selectedOption = e.target.value;
                                        const selectedUgovor = ug.find(
                                          (ugovor) => ugovor.ime === selectedOption
                                        );
                                        dispatchFormStateAction({
                                          type: "addFinansijeForm/setPaket",
                                          value: selectedOption,
                                        });
                                        dispatchFormStateAction({
                                          type: "addFinansijeForm/setIznos",
                                          value: selectedUgovor?.cena ?? "",
                                        });
                                      }}
                                >
                                    <option value="">Bez paketa</option>
                                    {ug.map((ugovor) => (
                                        <option value={ugovor.ime}>{ugovor.ime}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Iznos</Form.Label>
                                <Form.Control type="text" placeholder="Unesit iznos"
                                    value={formState.paket ? ug.find(ugovor => ugovor.ime === formState.paket)?.cena : formState.iznos}
                                    onChange={e => dispatchFormStateAction({ type: "addFinansijeForm/setIznos", value: e.target.value })}
                                >
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Valuta</Form.Label>
                                <Form.Select
                                    value={formState.valuta} 
                                    onChange={ e => dispatchFormStateAction({ type: "addFinansijeForm/setValuta", value: e.target.value }) }
                                >
                                    <option value="">Izaberite valutu</option>
                                    <option value="RSD">RSD</option>
                                    <option value="EUR">EUR</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Popust</Form.Label>
                                <Form.Select
                                    value={formState.popust} 
                                    onChange={ e => dispatchFormStateAction({ type: "addFinansijeForm/setPopust", value: e.target.value }) }
                                >
                                    <option value="">Izaberite popust</option>
                                    <option value="0">Bez popusta</option>
                                    <option value="50">50%</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Col>
                                <p>Poslednji dodati broj predracuna: {predracunString}</p>
                                {/* <p>Poslednji dodati broj racuna: {racunString}</p> */}
                        </Col>
                    </Row>
                    <Col className="mt-5">
                        <button className="btn btn-success" onClick={handleAddZaduzenjeClick}>Sacuvaj</button>
                    </Col>
                </Col>
            </Modal.Body>
        </Modal>
    </div>
  )
}


