import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { TVBlinkService } from './tvblink-services'; 
import { Publicacao } from '@radoccmodels/publicacao';
import { Observable } from 'rxjs';

@Injectable()
export class PublicacaoService extends TVBlinkService<Publicacao> {

    constructor(router: Router, http: HttpClient) {
        super(router, http,"TVBlink-Web");

    }

    public getWebService(): string {
        return 'publicacao';
    }
    
    public buscarPorGrupoPlayer(idGrupoPlayer:number): Observable<Publicacao> {
        return this.http.get<Publicacao>(this.urlWebBase + `/grupoplayer/${idGrupoPlayer}`).pipe();
    }

    public buscarPorPlayer(idPlayer:number): Observable<Publicacao> {
        return this.http.get<Publicacao>(this.urlWebBase + `/player/${idPlayer}`).pipe();
    }
}