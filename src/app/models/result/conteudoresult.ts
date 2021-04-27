import { Noticia } from "@radoccmodels/noticia";
import { jsonIgnore } from "json-ignore";

export class ConteudoResult  {
    
    public id:number;
    public idTipoConteudo:number;
    public titulo:string;
    public audio:number;
    public tipo:number;
    public idTemplate:number;
    public idArquivo:number;
    public tempoExibicao:number;
    public data:Date;
    public url:string;
    public permiteEdicao:boolean;

    @jsonIgnore() public noticia:Noticia;
    
}