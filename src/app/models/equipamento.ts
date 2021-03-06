import { BaseEntityImpl } from "./baseentityimpl";

export class Equipamento extends BaseEntityImpl {
    
    public nome:string;
    public identificador:string;
    public uuid:string;
    public dataCompra:Date;
    public fornecedor:string;

    
}