import { BaseEntityImpl } from "./baseentityimpl";

export class LoteriaResultado extends BaseEntityImpl {
    
    public idLoteria:number;
    public dataAtualizacao:Date;
    public codigoSorteio:number;
    public dataSorteio:Date;
    public numeros:string;
    public numeros2:string;
    public jsonPremios:string;
    public dataProximoSorteio:Date;
    public valorProximoSorteio:number;
    private jsonCidades:string;
    
}