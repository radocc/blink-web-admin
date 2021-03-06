import { BaseEntityImpl } from "./baseentityimpl";
import { NoticiaEditoria } from "./noticiaeditoria";
import { Template } from "./template";

export class FonteNoticia extends BaseEntityImpl {
    
    public nome:string;
    public url:string;
    public idTemplate:number;
    public template:Template;
    public editorias:NoticiaEditoria[] = [];
    
}