import { AbstractEntity } from './abstract-entity';

export class Acao extends AbstractEntity  {

    constructor(acao:Acao){
        super();
        this.id = acao.id;
        this.deletado = acao.deletado;
        this.dataCadastro = acao.dataCadastro
        this.dataAlteracao = acao.dataAlteracao
        this.action = acao.action
        this.descricao = acao.descricao
        this.icone = acao.icone
        this.nome = acao.nome
        this.versao = acao.versao
    }

    public action:string;
    public icone:string;
    public nome:string;
    public descricao:string;
    
}