import { AbstractEntity } from './abstract-entity';

export class Direito extends AbstractEntity {

    public idAcao: number;
    public idTela: number;
    public idGrupoUsuario: number;
    public nome: string;
    public descricao: string;
    public icone: string;
    public action: string;
    public posicao: number;
    public status: boolean;
}
