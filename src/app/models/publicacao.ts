import { BaseEntityImpl } from "./baseentityimpl";
import { Playlist } from "./playlist";

export class Publicacao extends BaseEntityImpl {
    
    public dataPublicado:Date;
    public idGrupoPlayer:number;
    public idPlayer:number;
    public idPlaylist:number;
    public intercalacao:number;
    public playlist:Playlist;
    
}