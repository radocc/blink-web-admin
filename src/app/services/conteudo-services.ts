import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { TVBlinkService } from './tvblink-services';
import { Conteudo } from '@radoccmodels/conteudo';
import { Observable } from 'rxjs';
import { ConteudoResult } from '@radoccmodels/result/conteudoresult';

@Injectable()
export class ConteudoService extends TVBlinkService<Conteudo> {

    constructor(router: Router, http: HttpClient) {
        super(router, http,"TVBlink-Web");

    }

    public getWebService(): string {
        return 'conteudo';
    }

    public filtrarTipo(idTipo: number,nome:string): Observable<Array<ConteudoResult>> {
        return this.http.post<Array<ConteudoResult>>(this.urlWebBase + `/filtrar/tipo/${idTipo}`, nome).pipe();
    }

    public findConteudoImagem(id: number): Observable<Conteudo> {
        return this.http.get<Conteudo>(this.urlWebBase + `/find/${id}/tipo/imagem`).pipe();
    }

    public findConteudoNoticia(id: number): Observable<Conteudo> {
        return this.http.get<Conteudo>(this.urlWebBase + `/find/${id}/tipo/noticia`).pipe();
    }

    public salvarNoticia(conteudo: Conteudo): Observable<Conteudo> {
        return this.http.post<Conteudo>(this.urlWebBase + `/salvar/noticia`, conteudo).pipe();
    }
}