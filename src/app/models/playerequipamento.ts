import { Player } from '@radoccmodels/player';
import { Empresa } from './base/empresa';
import { Equipamento } from '@radoccmodels/equipamento';
import { BaseEntityImpl } from "./baseentityimpl";

export class PlayerEquipamento extends BaseEntityImpl {
    
    public idPlayer:number;
    public player:Player;
    public idEquipamento:number;
    public equipamento:Equipamento;
    public idEmpresa:number;
    public empresa:Empresa;
    public dataImplantacao:Date;
    public dataRemocao:Date;
    
}