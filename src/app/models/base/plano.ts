import { AbstractEntity } from './abstract-entity';
// import { Funcionalidade } from './funcionalidade';
// import { FuncionalidadeAplicacao } from './funcionalidade-aplicacao';
// import { Armazenamento } from './armazenamento';
// import { TransmissaoVideo } from './transmissaoVideo';

export class Plano extends AbstractEntity {

    constructor(plano: Plano) {
        super();
        if (plano == null) {
            return;
        }
        this.id = plano.id;
        this.dataAlteracao = plano.dataAlteracao
        this.dataCadastro = plano.dataCadastro;
        this.ativo = plano.ativo;
        this.deletado = plano.deletado;
        this.nome = plano.nome;
        this.descricao = plano.descricao
        this.nivel = plano.nivel;
        this.ativo = plano.ativo;
        this.valor = plano.valor;
        // this.funcionalidadeApliacoes = plano.funcionalidadeApliacoes == null ? [] : plano.funcionalidadeApliacoes;
    }

    public nome: String;
    public descricao: String;
    public nivel: number;
    public ativo: boolean;
    public valor: number;
    // public funcionalidadeApliacoes: FuncionalidadeAplicacao[] = [];
    public valorPorUsuario: boolean;
    public quantidadeUsuarios: number;
    public quantidadeConvidado: number;
    // public armazenamento:Armazenamento;
    // public transmissaoVideo:TransmissaoVideo;
    public qtdArmazenamento: number;
    public qtdTransmissaoVideo: number;
    public duracao: number;

}