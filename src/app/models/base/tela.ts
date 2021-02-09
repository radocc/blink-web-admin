import { AbstractEntity } from './abstract-entity';
import { Direito } from './direito';

export class Tela extends AbstractEntity  {

    public action:string;
    public icone:string;
    public nome:string;
    public url:string;
    public descricao:string;
    public sistema:any;
    public direitos: Direito[] = [];
    public filhas: Tela[] = [];
}