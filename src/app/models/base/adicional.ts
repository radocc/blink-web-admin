// import { Funcionalidade } from "./funcionalidade";
import { AbstractEntity } from "./abstract-entity";

export class Adicional extends AbstractEntity{

    constructor(add:Adicional){
        super();
        if(add == null)return;
        this.dataAlteracao = add.dataAlteracao;
        this.dataCadastro = add.dataCadastro
        this.deletado = add.deletado
        this.descricao = add.descricao
        // this.funcionalidade = add.funcionalidade;
        this.id = add.id
        this.nome = add.nome
        this.valor = add.valor
        this.versao = add.versao
        this.idFuncionalidade = add.idFuncionalidade
    }

    public nome:string;
    public descricao:string;
    // public funcionalidade:Funcionalidade;
    public idFuncionalidade:number;
    public valor:number;

}