import BaseService from "../../common/BaseService";
import IAdapterOptions from "../../common/IAdapterOptions.interface";
import PredracunModel from "./PredracunModel.model";
import IAddPredracun from './dto/IAddPredracun.dto';
import IEditPredracun from './dto/IEditPredracun.dto';

export interface IPredracunOptions extends IAdapterOptions {
    loadDete: boolean;
}

export const DefaultPredracunOptions: IPredracunOptions = {
    loadDete: true,
}

class PredracunService extends BaseService<PredracunModel, IPredracunOptions> {
    tableName(): string {
        return "predracun";
    }

    protected  adaptToModel(data: any, options: IPredracunOptions): Promise<PredracunModel> {
        return new Promise(async (resolve) =>{

            const predracun = new PredracunModel();
    
            predracun.predracunId    = +data?.predracun_id;
            predracun.datum          = data?.datum;
            predracun.status         = data?.status;
            predracun.datumOd        = data?.datum_od;
            predracun.datumDo        = data?.datum_do;
            predracun.tip            = data?.tip;
            predracun.brojFakture    = +data?.broj_fakture;
            predracun.godina         = data?.godina;
            predracun.pozivNaBroj    = data?.poziv_na_broj;
            predracun.iznos          = data?.iznos;
            predracun.paket          = data?.paket;
            predracun.valuta         = data?.valuta;
            predracun.popust         = data?.popust;
            predracun.deteId         = +data?.dete_id;
            
            if(options.loadDete){
                predracun.dete = await this.services.dete.getById(predracun.deteId,{loadRoditelj: false});
            }

            resolve(predracun);
        })

    }

    public async getAllByDeteId(deteId: number){
        return this.getAllByFieldNameAndValue("dete_id", deteId, DefaultPredracunOptions);
    }

    public async add(data: IAddPredracun): Promise<PredracunModel> {
        return this.baseAdd(data, DefaultPredracunOptions);
    }

    public async edit(id: number, data: IEditPredracun): Promise<PredracunModel> {
        return this.baseEditById(id, data, DefaultPredracunOptions);
    }

    public async deleteById(deteId: number): Promise<true> {
        return this.baseDeleteById(deteId);
    }

}

export default PredracunService;