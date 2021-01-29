import { BaseEntityImpl } from "./baseentityimpl";

export class Playlist extends BaseEntityImpl {
    
    public nome:string;
    public campanha:string;
    public dataInicio:Date;
    public dataFim:Date;
    public regraExibicao:number;
    public idPublicacao:number;

    
}