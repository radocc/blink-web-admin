import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { TVBlinkService } from './tvblink-services';
import { Player } from '@radoccmodels/player';
import { Observable } from 'rxjs';

@Injectable()
export class PlayerService extends TVBlinkService<Player> {

    constructor(router: Router, http: HttpClient) {
        super(router, http,"TVBlink-Web");

    }

    public getWebService(): string {
        return 'player';
    }

    public findNome(nome:string): Observable<Array<Player>> {
        return this.http.post<Array<Player>>(this.urlWebBase + `/find/nome`, nome).pipe();
    }

    public findUUID(uuid:string): Observable<Player> {
        return this.http.post<Player>(this.urlWebBase + `/find/uuid`, uuid).pipe();
    }
}