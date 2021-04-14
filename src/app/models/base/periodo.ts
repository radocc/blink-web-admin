import { AbstractEntity } from "./abstract-entity";

export class Periodo extends AbstractEntity{

    constructor(periodo:Periodo){
        super();
        if(periodo != null){
            this.id = periodo.id;
            this.dataAlteracao = periodo.dataAlteracao;
            this.dataCadastro = periodo.dataCadastro;
            this.deletado = periodo.deletado
            this.descricao = periodo.descricao;
            this.duracao = periodo.duracao;
            this.versao = periodo.versao;
        }
    }
    
    public descricao:String;
    public duracao:number;
    
}