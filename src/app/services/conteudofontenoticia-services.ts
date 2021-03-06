import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { TVBlinkService } from './tvblink-services';
import { ConteudoFonteNoticia } from '@radoccmodels/conteudofontenoticia';
import { Observable } from 'rxjs';

@Injectable()
export class ConteudoFonteNoticiaService extends TVBlinkService<ConteudoFonteNoticia> {

    constructor(router: Router, http: HttpClient) {
        super(router, http,"TVBlink-Web");

    }

    public getWebService(): string {
        return 'conteudofontenoticia';
    }

    public prepare(id: number): Observable<Array<ConteudoFonteNoticia>> {
        if (id == null){
            id = 0;
        }
        return this.http.get<Array<ConteudoFonteNoticia>>(this.urlWebBase + `/prepare/edicao/conteudo/${id}`).pipe();
    }
    
}