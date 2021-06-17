import { jsonIgnore } from "json-ignore";
import { Arquivo } from "./base/arquivo";
import { BaseEntityImpl } from "./baseentityimpl";

export class ConteudoCampo extends BaseEntityImpl {
    
    public idConteudo:number;
    public idTemplateCampo:number;
    public valor:string;
    public nome:string;
    public tipo:number;
    @jsonIgnore() public arquivo:Arquivo;
    
}