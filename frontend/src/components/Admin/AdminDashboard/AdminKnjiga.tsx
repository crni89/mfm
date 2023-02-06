import React from 'react'
import { useState, useEffect } from 'react';
import IObjekat from '../../../models/IObjekat.model';
import { api } from '../../../api/api';
import IUgovor from '../../../models/IUgovor.model';
import IDete from '../../../models/IDete.model';
import { Dropdown, Form } from 'react-bootstrap';
import logo from '../../../template/Logo.png';
import { Document, pdf, Page, Text, StyleSheet, Font, Image, View, } from '@react-pdf/renderer';
import LoraBold from './pdfFonts/Lora-Bold.ttf';
import Lora from './pdfFonts/Lora-Regular.ttf';
import { saveAs } from 'file-saver';



export default function AdminKnjiga() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [objekti, setObjekti] = useState<IObjekat[]>([]);
  const [ugovori, setUgovori] = useState<IUgovor[]>([]);

  const [objekat, setObjekat] = useState<IObjekat | undefined>(undefined);
  const [ugovor, setUgovor] = useState<IUgovor | undefined>(undefined);
  const [status, setStatus] = useState<string>("");

  const [dete, setDete] = useState<IDete[]>([]);

  const [selectedIds, setSelectedIds] = useState([]);


  const loadObjekti = () => {
    api("get", "/api/objekat" , "administrator")
    .then(res => {
      if(res.status !=="ok") {
        throw new Error("Could not load objekat!");
      }

      return res.data;
    })
    .then(objekti => {
      setObjekti(objekti);
    })
    .catch(error => {
      setErrorMessage(error?.message ?? "Uknown error!");
    })
  }

  const loadUgovori = () => {
    api("get", "/api/ugovor" , "administrator")
    .then(res => {
      if(res.status !=="ok") {
        throw new Error("Could not load ugovor!");
      }

      return res.data;
    })
    .then(ugovori => {
      setUgovori(ugovori);
    })
    .catch(error => {
      setErrorMessage(error?.message ?? "Uknown error!");
    })
  }

  const handleObjekatChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = objekti.find(objekat => objekat.ime === event.target.value);
    setObjekat(selectedOption);
  };

  const handleUgovorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = ugovori.find(ugovor => ugovor.ime === event.target.value);
    setUgovor(selectedOption);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  }

  const pretraga = async () => {
    api("get",`/api/decap?objekat=${objekat.ime}&ugovor=${ugovor.ime}&status=${status}`, "administrator")
    .then(res => {
      console.log("GET DETE RESPONSE: ", res)

      if (res.status === 'ok') {
        setDete(res.data);
    }

    throw new Error("Unknown error while loading categories...");
    })
    .catch(error => {
      setErrorMessage(error?.message ?? 'Unknown error while loading categories...');
    });
  }

  useEffect(() => {
    loadObjekti();
    loadUgovori();
  }, []);

  const handleSelectChange = perdracunId => {
    if (selectedIds.includes(perdracunId)) {
      setSelectedIds(selectedIds.filter(id => id !== perdracunId));
    } else {
      setSelectedIds([...selectedIds, perdracunId]);
    }
  };

  const handleSelectAllChange = event => {
      const predracunIds = dete.flatMap(d => d.predracuni.map(p => p.predracunId));
      setSelectedIds(event.target.checked ? predracunIds : []);
  };

  const handleClickPredracun = async (predracunId) => {
    const pdfBlob = await pdf(<PredracunPdf />).toBlob();
    saveAs(pdfBlob, 'faktura.pdf');
  }

  const printZaduzenje = () => {
    selectedIds.forEach((predracunId) => handleClickPredracun(predracunId));
  }

const monthNames = ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"];
const monthNameFromDate = (date: string) => {
  const dateObject = new Date(date.split('.').reverse().join('-'));
  return monthNames[dateObject.getMonth()];
};

const PredracunPdf = () => {
    
    Font.register({
        family: "Lora",
        src: Lora,
        format: "truetype",
      })
    
      Font.register({
        family: "LoraBold",
        src: LoraBold,
        format: "truetype",
      })

      const styles = StyleSheet.create({
        page: {
          // marginTop: 40,
          // marginLeft: 40,
          // marginRight: 40,
          // marginBottom: 60,
          margin: 30,
          marginBottom: 10,
        },
        desniNaslov: {
          fontFamily: "LoraBold",
          fontSize: 13,
          position: "absolute",
          left: 300,
          top: 15
        },
        desniTekst: {
          fontFamily: "Lora",
          fontSize: 13,
          fontWeight: 400,
          position: "absolute",
          left: 300,
          top: 30
        },
        ispodSlikeTekstView: {
          display: "flex",
          flexDirection: "row",
        },
        ispodSlikeTekstView2: {
          display: "flex",
          flexDirection: "row",
        },
        ispodSlikeTekstIme: {
          fontFamily: "Lora",
          fontSize: 13,
          // position: "absolute",
          // top: 150,
          // left: 20
          textAlign: "left",
          marginTop: 15
        },
        ispodSlikeTekstIme2: {
          fontFamily: "LoraBold",
          fontSize: 13,
          // position: "absolute",
          // top: 150,
          // left: 20
          textAlign: "left",
          marginTop: 15,
          textTransform: "uppercase"
        },
        ispodSlikeTekstAd: {
          fontFamily: "Lora",
          fontSize: 13,
          // position: "absolute",
          // top: 170,
          // left: 20
          textAlign: "left",
          marginTop:5
        },
        ispodSlikeTekstAd2: {
          fontFamily: "LoraBold",
          fontSize: 13,
          // position: "absolute",
          // top: 170,
          // left: 20
          textAlign: "left",
          marginTop:5,
          textTransform: "uppercase"
        },
        ispodDesnogTekstaView:{
          display: "flex",
          flexDirection: "row",
          position: "absolute",
          left: 300,
          top: 145
        },
        ispodDesnogTekstaView2:{
          display: "flex",
          flexDirection: "row",
          position: "absolute",
          left: 300,
          top: 165
        },
        ispodDesnogTekstaPro: {
          fontFamily: "Lora",
          fontSize: 13,
          fontWeight: 400,
          // position: "absolute",
          // left: 300,
          // top: 145
        },
        ispodDesnogTekstaPro2: {
          fontFamily: "LoraBold",
          fontSize: 13,
          fontWeight: 400,
          textTransform: "uppercase",
          // position: "absolute",
          // left: 300,
          // top: 145
        },
        ispodDesnogTeksta: {
          fontFamily: "Lora",
          fontSize: 13,
          fontWeight: 400,
          // position: "absolute",
          // left: 300,
          // top: 165
        },
        ispodDesnogTeksta2: {
          fontFamily: "LoraBold",
          fontSize: 13,
          fontWeight: 400,
          textTransform: "uppercase",
          // position: "absolute",
          // left: 300,
          // top: 165
        },
        logo: {
          width: 180,
          height: 130,
          marginLeft: -10
        },
        naslovView: {
          display: "flex",
          flexDirection: "row",
          marginLeft: 155,
        },
        naslov: {
          textAlign: "center",
          marginTop: 30,
          fontFamily: "LoraBold",
        },
        textIspodNaslovaView: {
          display: "flex",
          flexDirection: "row",
          marginTop: 30,
          fontFamily: "LoraBold",
          fontSize: 12
        },
        textIspodNaslovaView1: {
          display: "flex",
          flexDirection: "column",
          fontFamily: "LoraBold",
          fontSize: 12
        },
        textIspodNaslovaView2: {
          display: "flex",
          flexDirection: "column",
          fontFamily: "LoraBold",
          fontSize: 12
        },
        textIspodNaslovaView3: {
          display: "flex",
          flexDirection: "column",
          fontFamily: "LoraBold",
          fontSize: 12
        },
        textIspodNaslova: {
          textAlign: "left",
          marginTop: 10,
          fontFamily: "LoraBold",
          fontSize: 12
        },
        textIspodNaslova2: {
          textAlign: "center",
          marginTop: 10,
          fontFamily: "LoraBold",
          fontSize: 12
        },
        textIspodNaslova3: {
          textAlign: "right",
          marginTop: 10,
          fontFamily: "LoraBold",
          fontSize: 12
        },
        table: { 
          display: "flex", 
          width: 500, 
          height: "auto",
          borderStyle: "solid",
          borderBottomWidth:1,
          borderLeftWidth: 1,
          marginTop: 50
        },
        tableRow: { 
          margin: "auto", 
          flexDirection: "row" 
        }, 
        tableCol: { 
          width: "25%",
          borderStyle: "solid", 
          borderTopWidth:1,
          borderRightWidth: 1
        }, 
        tableCell: { 
          fontFamily: "Lora",
          margin: "auto",
          fontSize: 10 
        },
        tableColPrazan: {
          width: "25%",
          borderStyle: "solid",
          borderTopWidth: 1,
        },
        tableCellUk: {
          fontFamily: "Lora",
          marginLeft: -100,
          fontSize: 12 
        },
        textNaDnu: {
          marginTop: 30,
          fontFamily: "Lora",
          fontSize: 11,
    
        },
        linija: {
          border:0.5,
          width: "95%",
          color: "grey",
          marginTop: 4,
        },
        linijaNaSredini:{
          position: "absolute",
          left: "23%",
          top: "50%",
          border: 0.8,
          opacity: 0.6,
          width: "50%",
          color: "grey",
          transform: "rotate(90deg)",
        },
        levaStrana: {
          width: "47%",
          height: 260
        },
        desnaStrana:{
          width: "47%",
          height: 260,
          position: "absolute",
          left: "53%",
        },
        uplatnica:{
          marginTop: 5,
          width: "95%",
          height: 260,
        },
        tabele: {
          display: "flex",
          flexDirection: "column",
          marginTop: 14,
        },
        tabeleDesno:{
          display: "flex",
          flexDirection: "column",
          marginTop: 14,
        },
        tabeleDesnoRow:{
          margin: "auto", 
          flexDirection: "row",
        },
        tabeleDesnoCol:{
          width: 50,
          height: 15,
          borderStyle: "solid", 
          border: 1,
          marginTop: 20
        },
        tabeleDesnoCell: { 
          fontFamily: "Lora",
          fontSize: 10
        },
        tabeleCol: { 
          width: 230,
          height: 43,
          borderStyle: "solid", 
          border: 1
        }, 
        tabeleCell: { 
          fontFamily: "Lora",
          fontSize: 10 
        },
        textUplatnica:{
          fontFamily: "Lora",
          fontSize: 10
        },
        potpisLinija:{
          marginTop:25,
          border: 1,
          width: "65%",
        },
        datumLinija:{
          left: 75,
          marginTop:20,
          border: 0.8,
          width: "65%",
        },
        datumLinijaDesno:{
          marginTop:125,
          border: 0.8,
          width: "50%",
        }
    
      })
return (
  <Document>
        {dete.map(dete => (
                  dete.predracuni.map(p => (
        <Page>
          <View style={styles.page}>
            <Image style={styles.logo} src={logo}/>
            <Text style={styles.desniNaslov}>PU MALA FABRIKA MAŠTE</Text>
            <Text style={styles.desniTekst}>Kirila Savića 7, 11000 Voždovac {'\n'}
                  Tel: +381113970449 {'\n'}
                  Email: info@malafabrikamaste.rs {'\n'}
                  Web: www.malafabrikamaste.rs  {'\n'}
                  PIB: 108187688  {'\n'}
                  MB: 17849964
            </Text>
            <View style={styles.ispodSlikeTekstView}>
              <Text style={styles.ispodSlikeTekstIme}>Ime i prezime: </Text>
              <Text style={styles.ispodSlikeTekstIme2}> {dete.imePrezime}</Text>
            </View>
            <View style={styles.ispodSlikeTekstView2}>
              <Text style={styles.ispodSlikeTekstAd}>Adresa: </Text>
              <Text style={styles.ispodSlikeTekstAd2}> {dete.adresa}</Text>
            </View>
            <View style={styles.ispodDesnogTekstaView}>
              <Text style={styles.ispodDesnogTekstaPro}>Datum prometa: </Text>
              <Text style={styles.ispodDesnogTekstaPro2}> {p.datumDo} </Text>
            </View>
            <View style={styles.ispodDesnogTekstaView2}>
              <Text style={styles.ispodDesnogTeksta}>Datum izdavanja: </Text>
              <Text style={styles.ispodDesnogTeksta2}>{p.datum} </Text>
            </View>
            <View style={styles.naslovView}>
              <Text style={styles.naslov}>PREDRAČUN BR. </Text>
              <Text style={styles.naslov}>{p.brojFakture + "/" + p.godina} </Text>
            </View>
            <View style={styles.textIspodNaslovaView}>
              <View style={styles.textIspodNaslovaView1}>
                <Text style={styles.textIspodNaslova}>Broj ugovora</Text>
                <Text style={styles.textIspodNaslova}>{dete.brojUgovora}</Text>
              </View>
              <View style={[styles.textIspodNaslovaView2, {marginLeft: 80}]}>
                <Text style={styles.textIspodNaslova2}>Odobren popust</Text>
                <Text style={styles.textIspodNaslova2}>{p.popust}</Text>
              </View>
              <View style={[styles.textIspodNaslovaView3, {marginLeft: 80}]}>
                <Text style={styles.textIspodNaslova3}>Period korišćenja usluge</Text>
                <Text style={styles.textIspodNaslova3}>{p.datumOd + " - " + p.datumDo}</Text>
              </View>
            </View>
            <View style={styles.table}>
              <View style={styles.tableRow}> 
                <View style={styles.tableCol}> 
                  <Text style={styles.tableCell}>Opis usluge</Text> 
                </View> 
                <View style={styles.tableCol}> 
                  <Text style={styles.tableCell}>Iznos</Text> 
                </View> 
                <View style={styles.tableCol}> 
                  <Text style={styles.tableCell}>Popust</Text> 
                </View> 
                <View style={styles.tableCol}> 
                  <Text style={styles.tableCell}>Za uplatu</Text> 
                </View> 
              </View>
              <View style={styles.tableRow}> 
                <View style={styles.tableCol}> 
                  <Text style={styles.tableCell}>{p.paket}</Text> 
                </View> 
                <View style={styles.tableCol}> 
                  <Text style={styles.tableCell}>{p.iznos} rsd</Text> 
                </View> 
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{p.popust} rsd</Text> 
                </View>
                <View style={styles.tableCol}> 
                  <Text style={styles.tableCell}>{p.iznos} rsd</Text> 
                </View> 
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableColPrazan}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableColPrazan}>
                  <Text style={styles.tableCell}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCellUk}>UKUPNO ZA UPLATU</Text>
                </View>
                <View style={styles.tableCol}> 
                  <Text style={[styles.tableCell, {fontFamily: "LoraBold",}]}>{p.iznos} rsd</Text> 
                </View> 
              </View>
            </View>
            <Text style={styles.textNaDnu}>Obveznik nije u sistemu PDV-a. {'\n'}
                  U slučaju kašnjenja sa uplatom, zadržavamo pravo zaračunavanja zakonske zatezne kamate. {'\n'} {'\n'} 
                  Ovaj dokument je izrađen automatskom obradom podataka i ispisan pomoću računara i kao takav {'\n'}
                  punovažan bez pečata i potpisa. {'\n'} {'\n'}
            </Text>
            <View style={styles.linija}/>
            <View style={styles.uplatnica}>
              <View style={styles.levaStrana}>
                <View style={styles.tabele}>
                  <Text style={[styles.textUplatnica, {marginBottom:1, marginLeft:2}]}>platilac</Text>
                  <View style={styles.tabeleCol}> 
                    <Text style={[styles.tabeleCell, {paddingTop: 5, paddingLeft: 2}]}>{dete.imePrezime} {'\n'}{dete.adresa}</Text> 
                  </View> 
                  <Text style={[styles.textUplatnica, {marginBottom: -13.5, marginLeft:2}]}>svrha uplate</Text>
                  <View style={[styles.tabeleCol, {marginTop: 15}]}> 
                    <Text style={[styles.tabeleCell, {paddingLeft: 2}]}>Uplata po predračunu br. {p.brojFakture + "/" + p.godina} {'\n'}
                                                    za mesec {monthNameFromDate(p.datumOd)} za objekat Mala fabrika {'\n'}
                                                    mašte - {dete.objekat}
                    </Text> 
                  </View>
                  <Text style={[styles.textUplatnica, {marginBottom: -13.5, marginLeft:2}]}>primalac</Text> 
                  <View style={[styles.tabeleCol, {marginTop: 15}]}> 
                    <Text style={[styles.tabeleCell, {paddingTop:5, paddingLeft:2}]}>PU Mala fabrika mašte, {'\n'}
                                                    Kirila Savića 7, 11000 Voždovac
                    </Text> 
                  </View> 
                </View>
                <View style={styles.potpisLinija}/>
                  <Text style={{fontFamily:"Lora", fontSize: 10}}>pečat i potpis platioca</Text>
                <View style={styles.datumLinija}/>
                  <Text style={{fontFamily:"Lora", fontSize: 10, left: 122}}>mesto i datum prijema</Text>
              </View>
              <View style={styles.linijaNaSredini}/>
              <View style={styles.desnaStrana}>
                <View style={styles.tabeleDesno}>
                  <View style={styles.tabeleDesnoRow}>
                    <Text style={[styles.textUplatnica, {marginTop:-3 ,marginLeft:2}]}>šifra {'\n'}
                                                                                      plaćanja
                    </Text>
                    <View style={[styles.tabeleDesnoCol, {width: 40, marginLeft: -41, marginTop:25}]}>
                        <Text style={[styles.tabeleDesnoCell, {paddingLeft: 2}]}>189</Text>
                    </View>
                    <Text style={[styles.textUplatnica, {marginTop:11 ,marginLeft:22}]}>valuta</Text>
                    <View style={[styles.tabeleDesnoCol, {width: 40, marginLeft: -30, marginTop:25}]}>
                        <Text style={[styles.tabeleDesnoCell, {textAlign: "center"}]}>RSD</Text>
                    </View>
                    <Text style={[styles.textUplatnica, {marginTop:11 ,marginLeft:22}]}>iznos</Text>
                    <View style={[styles.tabeleDesnoCol, {width: 119.5, marginLeft: -28, marginTop:25}]}>
                        <Text style={[styles.tabeleDesnoCell, {paddingLeft: 2}]}>={p.iznos}</Text>
                    </View>
                  </View>
                  <View style={styles.tabeleDesnoRow}>
                    <Text style={[styles.textUplatnica, {marginTop:3 ,marginLeft:2}]}>račun primaoca</Text>
                    <View style={[styles.tabeleDesnoCol, {width: 238, marginLeft: -76, marginTop: 16.5}]}>
                      <Text style={[styles.tabeleDesnoCell, {paddingLeft: 2}]}>200-3046160101033-85</Text>
                    </View>
                  </View>
                  <View style={styles.tabeleDesnoRow}>
                    <Text style={[styles.textUplatnica, {position:'absolute', width: 150, left:2, top:3}]}>model i poziv na broj(odobrenje)</Text>
                    <View style={[styles.tabeleDesnoCol, {position:'absolute', width: 35, left:-1, top:-3}]}>
                    </View>
                    <View style={[styles.tabeleDesnoCol, {width: 180, marginLeft: 57, marginTop:17}]}>
                      <Text style={[styles.tabeleDesnoCell, {paddingLeft: 2}]}>{p.brojFakture + "/" + p.godina}</Text>
                    </View>
                  </View>
                  <View style={styles.datumLinijaDesno}/>
                  <Text style={{fontFamily:"Lora", fontSize: 10}}>datum izvršenja</Text>
                </View>
              </View>
            </View>
          </View>
        </Page>
      ))))}
      </Document>

      

    );
};

  return (
    <div className="bg">
      <div className="card">
        <div className="card-body">
          <div className="card-title">
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="">Objekat</label>
                  <select className="form-control" value={objekat ? objekat.ime : ''} onChange={handleObjekatChange}>
                    <option value="">Izaberite objekat</option>
                    {objekti.map(o => (
                      <option key={o.ime} value={o.ime}>{o.ime}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="">Ugovor</label>
                  <select className="form-control" value={ugovor ? ugovor.ime : ''} onChange={handleUgovorChange}>
                    <option value="">Izaberite ugovor</option>
                    {ugovori.map( u => (
                      <option value={u.ime}>{u.ime}</option>
                    ))}
                  </select>
                </div>
              </div>
              {/* <div className="col">
                <div className="form-group">
                  <label htmlFor="">Predracun/Racun</label>
                  <select className='form-control'>
                    <option value="Predracun">Predracun</option>
                    <option value="Racun">Racun</option>
                  </select>
                </div>
              </div> */}
              <div className="col">
                <div className="form-group">
                  <label htmlFor="">Status</label>
                  <select className='form-control' value={status} onChange={handleStatusChange}>
                    <option value="">Izaberite status</option>
                    <option value="Placeno">Placeno</option>
                    <option value="Neplaceno">Neplaceno</option>
                  </select>
                </div>
              </div>
              <div className="col">
                <button className='btn btn-primary mt-4 ms-5 px-5' onClick={pretraga}>Pretrazi</button>
              </div>
            </div>
          </div>
          <div className="card-text">
            <div className="d-flex justify-content-end col mt-5">
              <Dropdown>
                <Dropdown.Toggle variant='secondary'>
                  Alatke
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={printZaduzenje}>Odstampaj</Dropdown.Item>
                  <Dropdown.Item>Izmeni statusa predracuna</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <table className='table table-striped table-bordered caption-top table-sm mt-2'>
            <thead>
                <tr>
                  <th>
                  <Form.Check
                      type="checkbox"
                      id="select-all"
                      label="Izaberi sve"
                      checked={selectedIds.length === dete.length}
                      onChange={handleSelectAllChange}
                  />
                  </th>
                  <th>Dete</th>
                  <th>Broj ugovora</th>
                  <th>Objekat</th>
                  <th>Grupa</th>
                  <th>Broj fakture</th>
                  <th>Poziv na broj</th>
                  <th>Paket</th>
                  <th>Datum fakture</th>
                  <th>Iznos</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                  {dete.map(dete => (
                    dete.predracuni.map(p => (
                      <tr key={"predracun-" + p.predracunId}>
                        <td>
                          <Form.Check
                              type="checkbox"
                              id={p.predracunId.toString()}
                              label=""
                              checked={selectedIds.includes(p.predracunId)}
                              onChange={() => handleSelectChange(p.predracunId)}
                          />
                        </td>
                        <td>{dete.imePrezime}</td>
                        <td>{dete.brojUgovora}</td>
                        <td>{dete.objekat}</td>
                        <td>{dete.grupa}</td>
                        <td>{p.brojFakture}/{p.godina}</td>
                        <td>{p.pozivNaBroj}/{p.godina}</td>
                        <td>{p.paket}</td>
                        <td>{p.datum}</td>
                        <td>{p.iznos}</td>
                        <td>{p.status}</td>
                      </tr>
                    ))
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}