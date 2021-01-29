import { AbstractEntity } from './abstract-entity';
import { Empresa } from './empresa';

export class Cargo extends AbstractEntity {

    public nome: string;
	public descricao: string;
	public idGrupoUsuario: number;
    public idEmpresa: number;
    public empresa: Empresa;
}