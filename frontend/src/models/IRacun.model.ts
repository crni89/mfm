import IDete from './IDete.model';

export default interface IRacun {
    racunId: number;
    datum: string;
    status: string;
    datumOd: string;
    datumDo: string;
    tip: string;
    brojFakture: string;
    godina: string;
    pozivNaBroj: string;
    iznos: string;
    paket: string;
    valuta: string;
    popust: string;
    deteId: number;
    dete?: IDete | null;
}