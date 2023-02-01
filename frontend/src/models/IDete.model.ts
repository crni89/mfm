import IGrupa from './IGrupa.model';
import IObjekat from './IObjekat.model';
import IUgovor from './IUgovor.model';
import IPorodicniStatus from './IPorodicniStatus.model';
import IRoditelj from './IRoditelj.model';
import IPredracun from './IPredracun.model';

export default interface IDete {
    deteId: number;
    imePrezime: string;
    jmbg: string;
    datumRodj: string;
    adresa: string;
    brojUgovora: string;
    datumUgovora: string;
    datumPolaska: string;
    subvencija: boolean;
    popust: string;
    objekat: string;
    ugovor: string;
    grupa: string;
    pstatus: string;

    grupe?: IGrupa[];
    objekti?: IObjekat[];
    ugovori?: IUgovor[];
    porodicniStatusi?: IPorodicniStatus[];
    roditelji?: IRoditelj[];
    predracuni?: IPredracun[];
}