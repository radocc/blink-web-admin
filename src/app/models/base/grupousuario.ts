import { AbstractEntity } from './abstract-entity';
export class GrupoUsuario extends AbstractEntity {


    public nome: string;
    public ativo:boolean= true;
    public descricao:string;
    public cor: string;

}
