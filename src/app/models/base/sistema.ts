import { AbstractEntity } from './abstract-entity';

export class Sistema extends AbstractEntity  {

    public nome:string;
    public build:number;
    public dataBuild:Date;
    public logo: any;
    public usuarioBanco : String;
    public senhaBanco : String;
    public urlJdbc : String;
    public usaTenants : String;
    public acaoNotificacao: number;
    public logoAdmin: string;
    public urlAtualizaBanco:string;
}