import {Estado} from './estado';
import { AbstractEntity } from './abstract-entity';
export class Cidade extends AbstractEntity {

    public nome:string;
    public ddd:number;
    public codigo:string;
    public estado:Estado;
}