import { BaseEntityImpl } from "./baseentityimpl";

export class Noticia extends BaseEntityImpl {
    
    public titulo:string;
    public descricao:string;
    public link:string;
    public url:string;
    public dataPublicado:Date;
    public idNoticiaEditoria:number;

    
}