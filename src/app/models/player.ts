import { BaseEntityImpl } from "./baseentityimpl";
import { PlayerEquipamento } from "./playerequipamento";

export class Player extends BaseEntityImpl {
    
    public nome:string;
    public observacao:string;
    public horaInicio:Date;
    public horaFim:Date;    
    public orientacao:number;    
    public idItem:number;
    public playerEquipamento:PlayerEquipamento;

    
}