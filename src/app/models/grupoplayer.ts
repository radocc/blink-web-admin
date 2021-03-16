import { BaseEntityImpl } from "./baseentityimpl";
import { GrupoPlayerItem } from "./grupoplayeritem";
import { Player } from "./player";

export class GrupoPlayer extends BaseEntityImpl {
    
    public nome:string;
    public observacao:string;
    public itens:GrupoPlayerItem[];
    public players:Player[];
    
}