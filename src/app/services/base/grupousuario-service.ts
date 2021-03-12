import { AbstractService } from './abstract-service'; 
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { GrupoUsuario } from '@radoccmodels/base/grupousuario';

@Injectable()
export class GrupoUsuarioService extends AbstractService<GrupoUsuario> {

    constructor(router: Router, http: HttpClient) {
        super(router, http);
    }

    public getWebService(): string {
        return 'grupousuario';
    }

    public findParaDireitosAcesso(): Observable<Array<GrupoUsuario>> {
        return this.http.get<Array<GrupoUsuario>>(this.urlWebBase + "/findparadireitosacesso");
    }

    // public montarDireitoPadrao(idGrupo:number): Observable<GrupoResult>{
    //     return this.http.get<GrupoResult>(this.urlWebBase + '/montardireitopadrao/'+idGrupo);
    // }

    public buscarPorNome(nome:string): Observable<Array<GrupoUsuario>> { 
        return this.http.post<Array<GrupoUsuario>>(this.urlWebBase + "/buscarpornome", nome);
    }

    // public montarDireitoAcesso(): Observable<GrupoResult[]>{
    //     return this.http.get<GrupoResult[]>(this.urlWebBase + '/montardireitoacesso');
    // }
}