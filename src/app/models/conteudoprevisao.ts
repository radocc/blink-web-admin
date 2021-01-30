import { Cidade } from "./base/cidade";
import { BaseEntityImpl } from "./baseentityimpl";

export class ConteudoPrevisao extends BaseEntityImpl {
    
    public idConteudo:number;
    public idCidade:number;
    public cidade:Cidade;
    
}