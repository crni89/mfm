import IDete from './IDete.model';
export default interface IRoditelj {
    roditeljId: number;
    imePrezime: string;
    jmbg: string;
    brLicne: string;
    adresa: string;
    mobilni: string;
    email: string;
    opstina: string;
    tekuciRacun: string;
    brojResenja: string;
    nosilacUgovora: boolean;

    deca?: IDete[];
}