import { AbstractEntity } from './abstract-entity'; 
import { Pais } from './pais';

export class Estado extends AbstractEntity{

    public nome:string;
    public uf:string;
    public pais:Pais;
    
}