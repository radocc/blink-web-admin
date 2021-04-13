import { Plano } from './../../models/base/plano';
import { Injectable } from "@angular/core";
import { AbstractService } from "./abstract-service";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PlanoService extends AbstractService<Plano>{
    
    constructor(router: Router, http: HttpClient) {
        super(router, http);
    }

    public getWebService(): string {
        return 'plano';
    }

    public buscarAtivos(): Observable<Array<Plano>> {
        return this.http.get<Array<Plano>>(this.urlWebBase+"/buscarativos");
    }

    public buscarPorNome(nome:string):Observable<Array<Plano>>{
        return this.http.get<Array<Plano>>(this.urlWebBase + '/buscarpornome?nome=' + nome);
    }

    public buscarPorId(id:number):Observable<Plano>{
        return this.http.get<Plano>(this.urlWebBase + '/buscarporid?id=' + id);
    }

    public buscarPlanos():Observable<Array<Plano>>{
        return this.http.get<Array<Plano>>(this.urlWebBase + '/buscarplanos');
    }

    public buscarPlanosComercial():Observable<Array<Plano>>{
        return this.http.get<Array<Plano>>(this.urlWebBase + '/planoscomercial');
    }
}

