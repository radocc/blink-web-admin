import { jsonIgnore } from "json-ignore";
import { BaseEntityImpl } from "./baseentityimpl";

export class ConteudoCampo extends BaseEntityImpl {
    
    public idConteudo:number;
    public idTemplateCampo:number;
    public valor:string;
    @jsonIgnore() public nome:string;
    @jsonIgnore() public tipo:number;
    
}