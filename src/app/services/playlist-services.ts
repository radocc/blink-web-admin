import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { TVBlinkService } from './tvblink-services';
import { Playlist } from '@radoccmodels/playlist';
import { Observable } from 'rxjs';

@Injectable()
export class PlaylistService extends TVBlinkService<Playlist> {

    constructor(router: Router, http: HttpClient) {
        super(router, http,"TVBlink-Web");

    }

    public getWebService(): string {
        return 'playlist';
    }

    public findNome(nome: string): Observable<Array<Playlist>> {
        return this.http.post<Array<Playlist>>(this.urlWebBase + `/find/nome`, nome).pipe();
    }
    
}