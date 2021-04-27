import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { TVBlinkService } from './tvblink-services'; 
import { Noticia } from '@radoccmodels/noticia';
import { Observable } from 'rxjs';

@Injectable()
export class NoticiaService extends TVBlinkService<Noticia> {

    constructor(router: Router, http: HttpClient) {
        super(router, http,"TVBlink-Web");

    }

    public getWebService(): string {
        return 'noticia';
    }

    public buscarUltimas(idEditoria:number,quantidade:number): Observable<Array<Noticia>> {
        return this.http.get<Array<Noticia>>(this.urlWebBase + `/ultimas/editoria/${idEditoria}/${quantidade}`).pipe();
    } 
    
}