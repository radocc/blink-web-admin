import { Plano } from './plano';
import { LicencaFatura } from './licencafatura';
import { AbstractEntity } from "./abstract-entity";
import { Empresa } from "./empresa";
import { FuncionalidadeAdicional } from './funcionalidadeadicional';
import { Periodo } from './periodo';


export class Licenca extends AbstractEntity{

    constructor(li:Licenca){
        super();
        if(li == null)return;
        this.id = li.id;
        this.dataAlteracao = li.dataAlteracao;
        this.dataCadastro = li.dataCadastro;
        this.versao = li.versao;
        this.deletado = li.deletado
        this.empresa = li.empresa;
        this.plano = li.plano;
        this.periodo = li.periodo;
        this.numeroVendedores = li.numeroVendedores;
        this.diaVencimento = li.diaVencimento;
        this.adicionais = li.adicionais;
        this.idEmpresa = li.idEmpresa;
        this.idPeriodo = li.idPeriodo;
        this.idPlano = li.idPlano;
        this.valor = li.valor;
        this.valorAdicional = li.valorAdicional;
        this.situacao = li.situacao;
        this.descricaoSituacao = li.descricaoSituacao;
        this.valorTotal = li.valorTotal;
        this.dataInicio = li.dataInicio;
        this.dataFim = li.dataFim;
        this.faturas = li.faturas;
    }

    public empresa:Empresa;
    public plano:Plano;
    public periodo:Periodo;
    public numeroVendedores:number;
    public numero2:number;
    public diaVencimento:number;
    public adicionais:Array<FuncionalidadeAdicional> = [];
    public faturas:Array<LicencaFatura> = [];
    public idEmpresa:number;
    public idPeriodo:number;
    public idPlano:number;
    public valorTotal:number;
    public valor:number;
    public valor2:number;
    public valorAdicional:number;
    public dataFim:Date;
    public dataInicio:Date;
    public situacao:number;
    public descricaoSituacao:string;
    public idCondicaoPagamento:number;
    public idFormaPagamento:number
    public qtdUsuarios: number;
    public qtdConvidados: number;
}