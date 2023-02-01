import IDete from './IDete.model';

export default interface IPredracun {
    predracunId: number;
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
    deteId: number;
    
    deca?: IDete[];
}