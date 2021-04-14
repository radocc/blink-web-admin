import { Observable } from 'rxjs';
import { AbstractService } from './abstract-service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Empresa } from '@radoccmodels/base/empresa';
import { NovoAmbiente } from '@radoccmodels/request/novo-ambiente';
import { Usuario } from '@radoccmodels/base/usuario';

@Injectable()
export class EmpresaService extends AbstractService<Empresa> {

    constructor(router: Router, http: HttpClient) {
        super(router, http);
    }

    public getWebService(): string {
        return 'empresa';
    }

    public findPorUsuario(): Observable<Empresa> {
        let url = this.urlWebBase + "/findporusuario";
        return this.http.get<Empresa>(url);
    }
 
    public novoAmbiente(novoAmbiente: NovoAmbiente): Observable<Empresa> {
        let url = this.urlWebBase + "/novoambiente";
        return this.http.post<Empresa>(url, JSON.stringify(novoAmbiente));
    }

    public criarAmbiente(usuario: Usuario): Observable<Empresa> {
        let url = this.urlWebBase + "/criarambiente";
        return this.http.post<Empresa>(url, JSON.stringify(usuario));
    }

    // public novaOrganizacao(req: ReqPlanoEmpresa): Observable<any> {
    //     let url = this.urlWebBase + "/nova/organizacao";
    //     return this.http.post<any>(url, JSON.stringify(req)).pipe(map((res) => {
    //         return res;
    //     }));
    // }

    // public editarOrganizacao(req: ReqPlanoEmpresa): Observable<any> {
    //     let url = this.urlWebBase + "/editar/organizacao";
    //     return this.http.post<any>(url, JSON.stringify(req)).pipe(map((res) => {
    //         return res;
    //     }));
    // }
    
    public buscarOrganzizacao(): Observable<any> {
        return this.http.post<any>(this.urlWebBase + "/buscar/organizacao", null);
    }
    
    public buscarPorNome(val): Observable<Array<Empresa>> {
        return this.http.post<Empresa[]>(this.urlWebBase + '/buscarpornome', val);
    }

    public existeCnpj(cnpj: string, idEmpresa: number): Observable<any> {
        let obj = {
            idEmpresa: idEmpresa,
            cnpj: cnpj
        }
        JSON.stringify(obj);
        return this.http.post(this.urlWebBase + "/existecnpj", obj);
    }

    buscarCep(cep: string) {
        var url = 'https://viacep.com.br/ws/' + cep + '/json/';
        return fetch(url).then((res) => res.json());
    }

    public buscarPorVinculo(nome: string): Observable<Array<Empresa>> {
        return this.http.get<Array<Empresa>>(this.urlWebBase + `/buscarporvinculo/${nome}`);
    }

    public buscarPorUsuario(): Observable<Array<Empresa>> {
        return this.http.get<Array<Empresa>>(this.urlWebBase + `/por/usuario`);
    }

    // public getLogada(): Observable<EmpresaLogada> {
    //     return this.http.get<EmpresaLogada>(this.urlWebBase + `/logada`);
    // }

    public consultarCNPJ(cnpj: string): Observable<Empresa> {
        cnpj = cnpj.replace(/\./g,'').replace(/-/g,'').replace('/','');
        return this.http.get<Empresa>(this.urlWebBase + `/consultar/cnpj/${cnpj}`);
    }
}