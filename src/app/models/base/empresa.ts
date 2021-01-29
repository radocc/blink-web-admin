import{Estado} from './estado';
import{Cidade} from './cidade';
import { AbstractEntity } from './abstract-entity';

export class Empresa extends AbstractEntity {

    public fantasia: string;
    public razaoSocial:string;
    public cnpj:string;
    public estado:Estado;
    public idCidade:number;
    public cidade:Cidade;
    public ativo:boolean;
    public dataCadastro:Date;
    public telefone:string;
    public caixaPostal:string;
    public bairro:string;
    public complemento:string;
    public numero:string;
    public rua:string;
    public cep:string;
    public email:string;
    public fax: string;
    public gmt: number;
    public idPlano: number;
    public situacao:number;
    public latitude:number;
    public longitude:number;
    public site:string;
    public nomeApresentacao:string;
    public slogan:string;
    public sobre:string;

}
