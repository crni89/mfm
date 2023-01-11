import IDete from './IDete.model';

export default interface IUplata {
    uplataId: number;
    datum: string;
    status: string;
    pozivNaBroj: string;
    iznos: string;
    deteId: number;
    dete?: IDete | null;
}