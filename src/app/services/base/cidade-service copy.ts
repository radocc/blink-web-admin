import { AbstractService } from './abstract-service';
import { Cidade } from './../../models/base/cidade';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CidadeService extends AbstractService<Cidade> {


    constructor(router: Router, http: HttpClient) {
        super(router, http);
    }

    public getWebService(): string {
        return 'cidade';
    } 
    
    public getPorIdEstado(idEstado: number): Observable<any> {
        let url = this.urlBase + "cidade/getporidestado/" + idEstado;
        return this.http.get<any>(url).pipe();
    }
 
    public findPorNome(idEstado: number, val: any): Observable<Array<Cidade>> {
        let url = this.urlWebBase + "/findpornome?idestado=" + idEstado + "&nome=" + val;
        return this.http.get<Array<Cidade>>(url).pipe();
    }
  
    public findNomeIdEstado(nome: any, idEstado: number): Observable<Array<Cidade>> {
        return this.http.post<Array<Cidade>>(this.urlWebBase + "/findpornomeeidestado/" + idEstado, nome).pipe();
    }

    public findNome(nome: any): Observable<Array<Cidade>> {
        return this.http.post<Array<Cidade>>(this.urlWebBase + "/nome", nome).pipe();
    }
 
    public buscarCidadePeloCep(req: any): Observable<Array<Cidade>> {
        return this.http.post<Array<Cidade>>(this.urlWebBase + "/cidadeporcep", req).pipe();
    }

    public findPorNomeEEstados(nome: string,estados:number[]): Observable<any> {
        let url = this.urlWebBase + "/findpornomeeestados";
        let json = {
            estados:estados,
            nome:nome
        }
        return this.http.post(url, JSON.stringify(json));
    }

    public findPorIds(ids:number[]): Observable<any> {
        let url = this.urlWebBase + "/findporids";
        return this.http.post(url, ids);
    }

    public buscarPorCep(cep: string): Observable<any> {
        cep = cep.replace('-','').replace('.','');
        return this.http.post<any>(this.urlWebBase + "/porcep", cep);
    }

    
}
