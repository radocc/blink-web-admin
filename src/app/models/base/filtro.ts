import { Coluna } from './coluna';
import { Tela } from './tela';
import { AbstractEntity } from './abstract-entity';
export class Filtro extends AbstractEntity {

    public descricao: string = '';
    public nome: string;
    public sql: string;
    public colunas: Coluna[];
    public tela: Tela;
    public atualiza: Boolean;
    public intervaloAtualizacao: number;
    public modoColuna : String = "force";
    public idTela : number;
}
