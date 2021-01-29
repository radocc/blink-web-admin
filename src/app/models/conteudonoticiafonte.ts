import { BaseEntityImpl } from "./baseentityimpl";
import { FonteNoticia } from "./fontenoticia";
import { NoticiaEditoria } from "./noticiaeditoria";

export class ConteudoNoticiaFonte extends BaseEntityImpl {
    
    public idConteudo:number;
    public idFonte:number;
    public fonte:FonteNoticia;
    public idsEditorias:string;
    public editorias:NoticiaEditoria[] = [];
    public editoriasSelecionado:NoticiaEditoria[] = [];
    
}