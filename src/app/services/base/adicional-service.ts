import { AbstractService } from './abstract-service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Adicional } from '@radoccmodels/base/adicional';
import { FuncionalidadeAdicional } from '@radoccmodels/base/funcionalidadeadicional';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable()
export class AdicionalService extends AbstractService<Adicional> {


    constructor(router: Router, http: HttpClient) {
        super(router, http);

    }

    public getWebService(): string {
        return 'adicional';
    }

    // public buscarPorNome(nome:string):Observable<Array<Adicional>>{
    //     return this.http.get(this.urlWebBase + '/buscarpornome?nome=' + nome).map(res => res.json());
    // }
    
    public buscarPorNome(nome:string):Observable<Array<Adicional>>{
        return this.http.get<Array<Adicional>>(this.urlWebBase + '/buscarpornome?nome=' + nome).pipe();
    }

    public filtrarPorLicenca(id:number):Observable<Array<FuncionalidadeAdicional>>{
        
        return this.http.get<Array<FuncionalidadeAdicional>>(this.urlWebBase + `/filtrarporlicenca/${id == undefined ? -1 : id}`).pipe();
    }
}