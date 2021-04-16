import { Cidade } from "./base/cidade";
import { BaseEntityImpl } from "./baseentityimpl";

export class PrevisaoTempo extends BaseEntityImpl {
    
    public cidade:Cidade;
    public idCidade:number;
    public dataPrevisao:Date;
    public jsonDatas:string;

    
}