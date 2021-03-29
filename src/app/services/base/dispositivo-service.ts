
import { AbstractService } from './abstract-service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DispositivoService extends AbstractService<any> {

    constructor(router: Router, http: HttpClient) {
        super(router, http);
    }

    public getWebService(): string {
        return 'dispositivo';
    }

    public alterarEmpresa(idEmpresa:number): Observable<Array<any>> {
        return this.http.get<Array<any>>(this.urlWebBase + `/alterar/empresa/${idEmpresa}`);
    }
}
