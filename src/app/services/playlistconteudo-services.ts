import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { TVBlinkService } from './tvblink-services';
import { PlaylistConteudo } from '@radoccmodels/playlistconteudo';

@Injectable()
export class PlaylistConteudoService extends TVBlinkService<PlaylistConteudo> {

    constructor(router: Router, http: HttpClient) {
        super(router, http,"TVBlink-Web");

    }

    public getWebService(): string {
        return 'playlistconteudo';
    }
    
}