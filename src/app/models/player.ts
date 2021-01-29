import { BaseEntityImpl } from "./baseentityimpl";

export class Player extends BaseEntityImpl {
    
    public nome:string;
    public dataImplantacao:Date;
    public horaInicio:Date;
    public horaFim:Date;
    public orientacao:number;
    public idEmpresa:number;

    
}