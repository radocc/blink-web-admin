
import { AbstractEntity } from './abstract-entity';
export class Arquivo extends AbstractEntity {

    public nome:string;
    public diretorio:number;
    public url:string;
    public inputStream:any;
    public conteudo:any[];
    public tipo:number;
    public descricao:string;
    public idArquivo: number;
    public width: number;
    public height: number;
}