import { BaseEntityImpl } from "./baseentityimpl";
import { TemplateCampo } from "./templatecampo";

export class Template extends BaseEntityImpl {
    
    public nome:string;
    public idTipoConteudo:number;
    public idArquivo:number;
    public todasEmpresas:boolean = true;
    public campos: TemplateCampo[];
    
}