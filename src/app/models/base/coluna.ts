import { Filtro } from './filtro';
import { AbstractEntity } from './abstract-entity';

export class Coluna extends AbstractEntity  {

    public titulo:string ;
    public propriedade:string;
    public variavel:string ;
    public tipo:string = 'String';
    public visivel:boolean = true;
    public posicao:number;
    public largura:number;
    public filtroPadrao:Boolean = false;
    public alinhamento:string;
    public filtro:Filtro;
    public mascara:string;     
    public idFiltro:number;
    public tipoColuna: number;
    public corTexto: string;
}