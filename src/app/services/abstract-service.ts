 
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';  
import { environment } from 'environments/environment';
import { Filter } from '@radoccmodels/base/filter';

@Injectable()
export abstract class AbstractService<T>{

    protected protocolo: string = environment.protocol;
    public ip: string = environment.serverHost;  
    public porta: string = environment.serverPort;
    protected contextBase: string = 'TVBlink-Web/rest/';
    protected contextSistema: string = '';
    protected contextAdmin: string = 'AdminWeb/rest/';
    protected urlBase: string = this.protocolo + '://' + this.ip + ':' + this.porta + '/' + this.contextBase;
    protected urlSistema: string = this.protocolo + '://' + this.ip + ':' + this.porta + '/' + this.contextSistema;
    protected urlWebBase: string = '';
    protected urlWebSistema: string = '';

    constructor(protected router: Router, protected http: HttpClient) {
        this.urlWebBase = this.urlBase + this.getWebService();
        this.urlWebSistema = this.urlSistema + this.getWebService();
    }

    public abstract getWebService(): string;

    public findAll(): Observable<Array<T>> {
        return this.http.get<Array<T>>(this.urlWebBase).pipe();
    }

    public findById(id: number): Observable<T> {
        return this.http.get<T>(this.urlWebBase + `/${id}`).pipe();
    }
    public remove(id: number): Observable<T> {
        return this.http.delete<T>(this.urlWebBase + `/${id}`)
    }

    public save(obj: T): Observable<T> {
        return this.http.post<T>(this.urlWebBase + '/salvar', obj).pipe();
    }

    public getConfiguracao(filtro: number): Observable<any> {
        let url = this.urlBase + "filtro/getconfiguracao/" + filtro;
        return this.http.get<any>(url).pipe();
    }

    public getConfiguracaoPorTela(idTela: number): Observable<any> {
        let url = this.urlBase + "filtro/getconfiguracaoportela/" + idTela;
        return this.http.get<any>(url).pipe();
    } 


}
