import { AbstractService } from './abstract-service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Periodo } from '@radoccmodels/base/periodo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class PeriodoService extends AbstractService<Periodo> {

    constructor(router: Router, http: HttpClient) {
        super(router, http);
    }

    getWebService(): string {
        return 'periodo';
    }

    public buscarPorDescricao(desc:string):Observable<Array<Periodo>>{
        return this.http.get<Array<Periodo>>(this.urlWebBase + '/buscarpordescricao?desc=' + desc);
    }
}