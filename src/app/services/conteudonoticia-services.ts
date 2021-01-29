import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { TVBlinkService } from './tvblink-services';
import { ConteudoNoticiaFonte } from '@radoccmodels/conteudonoticiafonte';
import { Observable } from 'rxjs';

@Injectable()
export class ConteudoFonteNoticiaService extends TVBlinkService<ConteudoNoticiaFonte> {

    constructor(router: Router, http: HttpClient) {
        super(router, http,"TVBlink-Web");

    }

    public getWebService(): string {
        return 'conteudofontenoticia';
    }

    public prepare(id: number): Observable<Array<ConteudoNoticiaFonte>> {
        if (id == null){
            id = 0;
        }
        return this.http.get<Array<ConteudoNoticiaFonte>>(this.urlWebBase + `/prepare/edicao/conteudo/${id}`).pipe();
    }
    
}