import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { TVBlinkService } from './tvblink-services';
import { PlaylistConteudo } from '@radoccmodels/playlistconteudo';
import { Observable } from 'rxjs';

@Injectable()
export class PlaylistConteudoService extends TVBlinkService<PlaylistConteudo> {

    constructor(router: Router, http: HttpClient) {
        super(router, http,"TVBlink-Web");

    }

    public getWebService(): string {
        return 'playlistconteudo';
    }
    
    public buscarPorPlayList(idPlaylist:number): Observable<Array<PlaylistConteudo>> {
        return this.http.get<Array<PlaylistConteudo>>(this.urlWebBase + `/playlist/${idPlaylist}`).pipe();
    }

    public buscarPorPlayer(idPlayer:number): Observable<Array<PlaylistConteudo>> {
        return this.http.get<Array<PlaylistConteudo>>(this.urlWebBase + `/playlist/player/${idPlayer}`).pipe();
    }

    public buscarPorGrupoPlayer(idGrupoPlayer:number): Observable<Array<PlaylistConteudo>> {
        return this.http.get<Array<PlaylistConteudo>>(this.urlWebBase + `/playlist/grupoplayer/${idGrupoPlayer}`).pipe();
    }

}