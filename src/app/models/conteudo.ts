import { Arquivo } from "./base/arquivo";
import { BaseEntityImpl } from "./baseentityimpl";
import { ConteudoAgendamento } from "./conteudoagendamento";
import { ConteudoFiltro } from "./conteudofiltro";
import { ConteudoNoticiaFonte } from "./conteudonoticiafonte";

export class Conteudo extends BaseEntityImpl {
    
    public idTipoConteudo:number;
    public titulo:string;
    public idTemplate:number;
    public idArquivo:number;
    public tempoExibicao:number;
    public agendamento:ConteudoAgendamento;
    public arquivo:Arquivo;
    public fontes:ConteudoNoticiaFonte[] = [];
    public filtro:ConteudoFiltro;
    
    
}