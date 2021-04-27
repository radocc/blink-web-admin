import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { TVBlinkService } from './tvblink-services';
import { NoticiaEditoria } from '@radoccmodels/noticiaeditoria';

@Injectable()
export class NoticiaEditoriaService extends TVBlinkService<NoticiaEditoria> {

    constructor(router: Router, http: HttpClient) {
        super(router, http,"TVBlink-Web");

    }

    public getWebService(): string {
        return 'noticiaeditoria';
    }

    public findPorFonte(idFonte:number): Observable<Array<NoticiaEditoria>> {
        return this.http.get<Array<NoticiaEditoria>>(this.urlWebBase + `/ativas/fonte/${idFonte}`).pipe();
    }   
    
    public atualizar(idEditoria: number): Observable<any> {
        return this.http.get(this.urlWebBase + `/atualizar/${idEditoria}`).pipe();
    }
}