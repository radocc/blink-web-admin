import { AbstractEntity } from './abstract-entity';
import { GrupoUsuario } from './grupousuario';

export class DireitoGrupo extends AbstractEntity  {

    public grupoUsuario:GrupoUsuario;
    public icone:string;
    public nome:string;
    public descricao:string;
    
}