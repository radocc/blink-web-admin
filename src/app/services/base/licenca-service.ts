import { Licenca } from '@radoccmodels/base/licenca';
import { AbstractService } from './abstract-service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { AcompanhamentoResult } from '../pages/acompanhamento-licencas/result/acompanhamento-licenca-result';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class LicencaService extends AbstractService<Licenca> {

    constructor(router: Router, http: HttpClient) {
        super(router, http);
    }

    getWebService(): string {
        return 'licenca';
    }

    public salvarLicenca(licenca: Licenca): Observable<Licenca> {
        return this.http.post<Licenca>(this.urlWebBase + '/salvarlicenca', licenca);
    }

    public buscarPorId(id): Observable<Licenca> {
        return this.http.get<Licenca>(this.urlWebBase + '/buscarporid?id=' + id);
    }

    // public getAcompanhamentos(data): Observable<AcompanhamentoResult[]> {
    //     return this.http.post<AcompanhamentoResult[]>(this.urlWebBase + '/acompanhamento', data);
    // }

    // public buscarPorEmpresa(): Observable<AcompanhamentoResult> {
    //     return this.http.get<AcompanhamentoResult>(this.urlWebBase + '/buscarporempresa');
    // }

    public buscarUsuariosQuantitativo(): Observable<Licenca> {
        return this.http.get<Licenca>(this.urlWebBase + '/usuariosquantitativo');
    }

    public validarLimiteUsuarios(qtdAdd: number): Observable<any> {
        return this.http.post<any>(this.urlWebBase + '/validarlimiteusuarios', qtdAdd);
    }
}