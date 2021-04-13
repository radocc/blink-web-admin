import { Usuario } from './usuario';
import { AbstractEntity } from './abstract-entity';

export class EmailUsuario extends AbstractEntity {


    public host: string;
    public porta:number;
    public email:string;
    public senha: string;
    public protocolo:string;
    public autenticar:boolean;
    public tlsAtivo:boolean;
    public assinatura:string;
    public usuario:Usuario;
    public usuarioConta: string;

}
