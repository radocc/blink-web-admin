import { BaseEntityImpl } from "./baseentityimpl";
import { FonteNoticia } from "./fontenoticia";
import { NoticiaEditoria } from "./noticiaeditoria";

export class ConteudoFonteNoticia extends BaseEntityImpl {
    
    public idConteudo:number;
    public idFonteNoticia:number;
    public fonte:FonteNoticia;
    public idsEditorias:string;
    public editorias:NoticiaEditoria[] = [];
    public editoriasSelecionado:NoticiaEditoria[] = [];
    
}