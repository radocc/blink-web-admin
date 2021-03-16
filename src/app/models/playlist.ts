import { BaseEntityImpl } from "./baseentityimpl";

export class Playlist extends BaseEntityImpl {
    
    public nome:string;
    public campanha:boolean;
    public dataInicio:Date;
    public dataFim:Date;
    public status:number;
    public idOrigem:number;

    
}