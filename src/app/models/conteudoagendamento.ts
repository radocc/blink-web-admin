import { BaseEntityImpl } from "./baseentityimpl";

export class ConteudoAgendamento extends BaseEntityImpl {
    
    public dataInicio:Date;
    public dataFim:Date;
    public diasSemana:string;
    public horaInicio:Date;
    public horaFim:Date;
    public idConteudo:number;

    
}