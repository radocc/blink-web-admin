import { Loteria } from './loteria';
import { BaseEntityImpl } from "./baseentityimpl";

export class ConteudoLoteria extends BaseEntityImpl {
    
    public idConteudo:number;
    public idLoteria:number;
    public loteria:Loteria;
    
}