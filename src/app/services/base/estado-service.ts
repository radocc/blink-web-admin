import { Observable } from 'rxjs';
import { AbstractService } from './abstract-service';
import { Estado } from './../../models/base/estado';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EstadoService extends AbstractService<Estado> {

    constructor(router: Router, http: HttpClient) {
        super(router, http);
    }

    public getWebService(): string {
        return 'estado';
    }

    // public findPorNome(idPais: number, nome: any): Observable<Array<Estado>> {
    //     let url = this.urlWebBase + "/findpornomeidpais?idpais=" + idPais + "&nome=" + nome;
    //     return this.http.get(url, null).map(res => {
    //         return res.json();
    //     });
    // }

    // public findNome(nome: string): Observable<any> {
    //     let url = this.urlWebBase + "/findpornome";
    //     return this.http.post(url, nome).map(res => {
    //         return res.json();
    //     });
    // }

    public findPorNome(idPais: number, nome: any): Observable<Array<Estado>> {
        let url = this.urlWebBase + "/findpornomeidpais?idpais=" + idPais + "&nome=" + nome;
        return this.http.get<Array<Estado>>(url);
    }

    public findNome(nome: string): Observable<any> {
        let url = this.urlWebBase + "/findpornome";
        return this.http.post(url, nome);
    }

    public findPorNomeEPaises(nome: string,paises:number[]): Observable<any> {
        let url = this.urlWebBase + "/findpornomeepaises";
        let json = {
            paises:paises,
            nome:nome
        }
        return this.http.post(url, JSON.stringify(json));
    }

    public findPorIds(ids:number[]): Observable<any> {
        let url = this.urlWebBase + "/findporids";
        return this.http.post(url, ids);
    }
}
