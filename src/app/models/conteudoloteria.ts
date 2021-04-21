import { Loteria } from './loteria';
import { BaseEntityImpl } from "./baseentityimpl";
import { LoteriaResultado } from './loteriaresultado';

export class ConteudoLoteria extends BaseEntityImpl {
    
    public idConteudo:number;
    public idLoteria:number;
    public loteria:Loteria;
    public resultado:LoteriaResultado;
    
}