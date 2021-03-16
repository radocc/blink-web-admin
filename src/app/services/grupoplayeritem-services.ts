import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { TVBlinkService } from './tvblink-services';
import { Observable } from 'rxjs';
import { GrupoPlayerItem } from '@radoccmodels/grupoplayeritem';
import { Player } from '@radoccmodels/player';

@Injectable()
export class GrupoPlayerItemService extends TVBlinkService<GrupoPlayerItem> {

    constructor(router: Router, http: HttpClient) {
        super(router, http,"TVBlink-Web");

    }

    public getWebService(): string {
        return 'grupoplayeritem';
    }
    
    public getParaEditar(idGrupo:number): Observable<Array<Player>> {
        return this.http.get<Array<Player>>(this.urlWebBase + `/players/grupoplayer/${idGrupo}`).pipe();
    }
    
}