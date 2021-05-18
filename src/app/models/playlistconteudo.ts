import { BaseEntityImpl } from "./baseentityimpl";
import { Conteudo } from "./conteudo";
import { ConteudoResult } from "./result/conteudoresult";

export class PlaylistConteudo extends BaseEntityImpl {
    
    public idConteudo:number;
    public conteudo:ConteudoResult;
    public idPlaylist:number;
    public idVinculado:number;
    public sequencia:number;    
    public vinculados:PlaylistConteudo[];
    
}