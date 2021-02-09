import { AbstractEntity } from './abstract-entity';
import { Modulo } from './modulo';
import { Tela } from './tela';
export class Menu extends AbstractEntity {

    public nome:string;
    public descricao:string;
    public posicao: number;
    public ativo:boolean; 
    public expandido:boolean;
    public icone:string;
    public modulo:Modulo;
    public telas:Tela[] = [];
    
}     