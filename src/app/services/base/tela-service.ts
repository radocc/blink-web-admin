import { AbstractService } from './abstract-service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tela } from '@radoccmodels/base/tela';
import { Menu } from '@radoccmodels/base/menu';

@Injectable()
export class TelaService extends AbstractService<Tela> {

    constructor(router: Router, http: HttpClient) {
        super(router, http);
    }

    public getWebService(): string {
        return 'tela';
    }

    public findTelasPorAcesso(menu: Menu): Observable<any> {
        let url = this.urlWebBase + "/findtelasporacesso/" + menu.id;
        return this.http.get(url);
    }

    public findTelasPorAcessoIdMenu(idMenu: number): Observable<any> {
        let url = this.urlWebBase + "/findtelasporacesso/" + idMenu;
        return this.http.get(url);
    }

    public findPorNome(nome: string): Observable<any> {
        let url = this.urlWebBase + "/findpornome/";
        return this.http.post(url, nome);
    }

    // public buscarTelasComAcoesPorMenu(menu: Menu, grupoUsuario: GrupoUsuario): Observable<any> {
    //     let url = this.urlWebBase + "/buscartelascomacoespormenu/" + menu.id + "/" + grupoUsuario.id;
    //     return this.http.get(url);
    // }

    public findTelasFilha(idTela, idGrupo) {
        let url = this.urlWebBase + "/buscartelascomacoesportela/" + idTela + "/" + idGrupo;
        return this.http.get(url);
    }

    public findUrl() {
        let url = this.urlWebBase + "/buscarurlpordireito";
        return this.http.get(url);
    }

    public findHome(): Observable<Tela[]>{
        return this.http.get<Tela[]>(this.urlWebBase + '/findhome')
    }
}
