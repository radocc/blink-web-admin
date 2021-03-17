import { BaseEntityImpl } from "./baseentityimpl";
import { PlaylistConteudo } from "./playlistconteudo";

export class Playlist extends BaseEntityImpl {
    
    public nome:string;
    public campanha:boolean= false;
    public dataInicio:Date;
    public dataFim:Date;
    public status:number;
    public idOrigem:number;
    public playlistConteudos:PlaylistConteudo[] = [];

    
}