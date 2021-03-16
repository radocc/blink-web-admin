import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { TVBlinkService } from './tvblink-services'; 
import { Observable } from 'rxjs';
import { GrupoPlayer } from '@radoccmodels/grupoplayer';

@Injectable()
export class GrupoPlayerService extends TVBlinkService<GrupoPlayer> {

    constructor(router: Router, http: HttpClient) {
        super(router, http,"TVBlink-Web");

    }

    public getWebService(): string {
        return 'grupoplayer';
    }
    
    public findNome(nome:string): Observable<Array<GrupoPlayer>> {
        return this.http.post<Array<GrupoPlayer>>(this.urlWebBase + `/find/nome`, nome).pipe();
    }
}