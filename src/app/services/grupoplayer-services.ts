import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { TVBlinkService } from './tvblink-services';
import { GrupoPlayer } from '@radoccmodels/grupoplayer';

@Injectable()
export class GrupoPlayerService extends TVBlinkService<GrupoPlayer> {

    constructor(router: Router, http: HttpClient) {
        super(router, http,"TVBlink-Web");

    }

    public getWebService(): string {
        return 'grupoplayer';
    }
    
}