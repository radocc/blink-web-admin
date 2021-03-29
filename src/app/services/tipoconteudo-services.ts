
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { TVBlinkService } from './tvblink-services';
import { TipoConteudo } from '@radoccmodels/tipoconteudo';
import { Observable } from 'rxjs';

@Injectable()
export class TipoConteudoService extends TVBlinkService<TipoConteudo> {

    constructor(router: Router, http: HttpClient) {
        super(router, http,"TVBlink-Web");

    }

    public getWebService(): string {
        return 'tipoconteudo';
    }

    public findNome(nome:string): Observable<Array<TipoConteudo>> {
        return this.http.post<Array<TipoConteudo>>(this.urlWebBase + `/find/nome`, nome).pipe();
    }    
    
}