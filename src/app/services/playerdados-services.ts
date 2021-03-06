import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { TVBlinkService } from './tvblink-services';
import { PlayerDados } from '@radoccmodels/playerdados';
import { Observable } from 'rxjs';

@Injectable()
export class PlayerDadosService extends TVBlinkService<PlayerDados> {

    constructor(router: Router, http: HttpClient) {
        super(router, http,"TVBlink-Web");

    }

    public getWebService(): string {
        return 'playerdados';
    }

    public findPorPlayer(idPlayer:number): Observable<Array<PlayerDados>> {
        return this.http.get<Array<PlayerDados>>(this.urlWebBase + `/find/player/${idPlayer}`).pipe();
    }
    
}