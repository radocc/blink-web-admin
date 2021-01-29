import { BaseEntityImpl } from "./baseentityimpl";
import { NoticiaEditoria } from "./noticiaeditoria";

export class FonteNoticia extends BaseEntityImpl {
    
    public nome:string;
    public url:string;
    public editorias:NoticiaEditoria[] = [];
    
}