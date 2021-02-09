import { AbstractService } from './abstract-service'; 
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DireitoGrupo } from '@radoccmodels/base/direitogrupo';
import { Direito } from '@radoccmodels/base/direito';

@Injectable()
export class DireitoGrupoService extends AbstractService<DireitoGrupo> {

    constructor(router: Router, http: HttpClient) {
        super(router, http);
    }

    public getWebService(): string {
        return 'direitogrupo';
    }
    
    public findByIdTela(id: number): Observable<Direito[]> {
        return this.http.get<Direito[]>(this.urlWebBase + "/findbyidtela/" + id).pipe();
    }

    public salvarDireitos(direitos: Array<{ id: number, status: boolean }>, usuarios: Array<{ id: number, idGrupoUsuario: number }>,
            homes: {idTela: number, idGrupo: number}[]): Observable<any> {
        let url = this.urlWebBase + "/salvardireitos";
        return this.http.post(url, { direitos: direitos, usuarios: usuarios, homes: homes });
    }

    public findDireitoPorTelaEAcao(idTela: number, idAcao: number): Observable<Direito[]> {
        return this.http.get<Direito[]>(this.urlWebBase + `/find/tela/${idTela}/acao/${idAcao}`).pipe();
    }

}