import { BaseEntityImpl } from "./baseentityimpl";
import { TemplateCampo } from "./templatecampo";
import { TipoConteudo } from "./tipoconteudo";

export class Template extends BaseEntityImpl {
    
    public nome:string;
    public idTipoConteudo:number;
    public tipoConteudo:TipoConteudo;
    public idArquivo:number;
    public todasEmpresas:boolean = true;
    public campos: TemplateCampo[];
    
}