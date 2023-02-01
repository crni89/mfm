import { useState } from 'react';
import logo from '../../../template/Logo.png';
import { Document, pdf, Page, Text, StyleSheet, Font, Image, View, } from '@react-pdf/renderer';
import LoraBold from './pdfFonts/Lora-Bold.ttf';
import Lora from './pdfFonts/Lora-Regular.ttf';
import { width } from 'pdfkit/js/page';
// import LoraLight from './pdfFonts/Lora-Light.ttf';

export default function Pretraga() {

  Font.register({
    family: "Lora",
    src: Lora,
    format: "truetype",
  })

  // Font.register({
  //   family: "LoraLight",
  //   src: LoraLight,
  //   format: "truetype",
  // })

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
      border:1,
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
      border:1
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

  const MyPDF = () => {
    return (
      <Document>
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
              <Text style={styles.ispodSlikeTekstIme2}> ime prezime</Text>
            </View>
            <View style={styles.ispodSlikeTekstView2}>
              <Text style={styles.ispodSlikeTekstAd}>Adresa: </Text>
              <Text style={styles.ispodSlikeTekstAd2}>Neka adresa </Text>
            </View>
            <View style={styles.ispodDesnogTekstaView}>
              <Text style={styles.ispodDesnogTekstaPro}>Datum prometa: </Text>
              <Text style={styles.ispodDesnogTekstaPro2}>Datum prometa: </Text>
            </View>
            <View style={styles.ispodDesnogTekstaView2}>
              <Text style={styles.ispodDesnogTeksta}>Datum izdavanja: </Text>
              <Text style={styles.ispodDesnogTeksta2}>Datum izdavanja: </Text>
            </View>
            <View style={styles.naslovView}>
              <Text style={styles.naslov}>PREDRAČUN BR. </Text>
              <Text style={styles.naslov}>RAČUN BR. </Text>
            </View>
            <View style={styles.textIspodNaslovaView}>
              <View style={styles.textIspodNaslovaView1}>
                <Text style={styles.textIspodNaslova}>Broj ugovora</Text>
                <Text style={styles.textIspodNaslova}>Broj ugovora</Text>
              </View>
              <View style={[styles.textIspodNaslovaView2, {marginLeft: 80}]}>
                <Text style={styles.textIspodNaslova2}>Odobren popust</Text>
                <Text style={styles.textIspodNaslova2}>Odobren popust</Text>
              </View>
              <View style={[styles.textIspodNaslovaView3, {marginLeft: 80}]}>
                <Text style={styles.textIspodNaslova3}>Period korišćenja usluge</Text>
                <Text style={styles.textIspodNaslova3}>Period korišćenja usluge</Text>
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
                  <Text style={styles.tableCell}>2</Text> 
                </View> 
                <View style={styles.tableCol}> 
                  <Text style={styles.tableCell}>2</Text> 
                </View> 
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>2</Text> 
                </View>
                <View style={styles.tableCol}> 
                  <Text style={styles.tableCell}>2</Text> 
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
                  <Text style={[styles.tableCell, {fontFamily: "LoraBold",}]}>325148465</Text> 
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
                    <Text style={[styles.tabeleCell, {paddingTop: 5, paddingLeft: 2}]}>Ime prezime {'\n'} Adresa</Text> 
                  </View> 
                  <Text style={[styles.textUplatnica, {marginBottom: -13.5, marginLeft:2}]}>svrha uplate</Text>
                  <View style={[styles.tabeleCol, {marginTop: 15}]}> 
                    <Text style={[styles.tabeleCell, {paddingLeft: 2}]}>Uplata po predračunu br. 1705/22 {'\n'}
                                                    za mesec Januar za objekat Mala fabrika {'\n'}
                                                    mašte - Voždovac
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
                        <Text style={[styles.tabeleDesnoCell, {paddingLeft: 2}]}>=37.000,00</Text>
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
                      <Text style={[styles.tabeleDesnoCell, {paddingLeft: 2}]}>200-3046160101033-85</Text>
                    </View>
                  </View>
                  <View style={styles.datumLinijaDesno}/>
                  <Text style={{fontFamily:"Lora", fontSize: 10}}>datum izvršenja</Text>
                </View>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    );
  };

  const handleClick = async () => {
    const pdfBlob = await pdf(<MyPDF />).toBlob();
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl);
  }


  return (
    <>
    <button onClick={handleClick}>Open PDF</button>
    </>
  );

}