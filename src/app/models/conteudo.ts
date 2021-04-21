import { Arquivo } from "./base/arquivo";
import { BaseEntityImpl } from "./baseentityimpl";
import { ConteudoAgendamento } from "./conteudoagendamento";
import { ConteudoFiltro } from "./conteudofiltro";
import { ConteudoFonteNoticia } from "./conteudofontenoticia";
import { ConteudoPrevisao } from "./conteudoprevisao";
import { Template } from "./template";
import { ConteudoCampo } from './conteudocampo';
import { PrevisaoTempo } from './previsaotempo';
import { ConteudoLoteria } from "./conteudoloteria";

export class Conteudo extends BaseEntityImpl {
    
    public idTipoConteudo:number;
    public titulo:string;
    public idTemplate:number;
    public template:Template;
    public idArquivo:number;
    public tempoExibicao:number;
    public agendamento:ConteudoAgendamento;
    public arquivo:Arquivo;
    public fontes:ConteudoFonteNoticia[] = [];
    public filtro:ConteudoFiltro;
    public conteudoPrevisaoTempo:ConteudoPrevisao;
    public conteudoLoteria:ConteudoLoteria;
    public campos:ConteudoCampo[] = [];
    public previsaoTempo:PrevisaoTempo;
    
    
}