import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { TVBlinkService } from './tvblink-services';
import { GrupoPlayers } from '@radoccmodels/grupoplayers';

@Injectable()
export class GrupoPlayersService extends TVBlinkService<GrupoPlayers> {

    constructor(router: Router, http: HttpClient) {
        super(router, http,"TVBlink-Web");

    }

    public getWebService(): string {
        return 'grupoplayers';
    }
    
}