import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { TVBlinkService } from './tvblink-services';
import { Template } from '@radoccmodels/template';
import { Observable } from 'rxjs';

@Injectable()
export class TemplateService extends TVBlinkService<Template> {

    constructor(router: Router, http: HttpClient) {
        super(router, http,"TVBlink-Web");

    }

    public getWebService(): string {
        return 'template';
    }

    public findNomeETipoConteudo(nome:string,tipoConteudo:number): Observable<Array<Template>> {
        return this.http.post<Array<Template>>(this.urlWebBase + `/find/nome/tipoconteudo/${tipoConteudo}`, nome).pipe();
    }    

    public findNomeETipoConteudoTipo(nome:string,tipo:number): Observable<Array<Template>> {
        return this.http.post<Array<Template>>(this.urlWebBase + `/find/nome/tipoconteudo/tipo/${tipo}`, nome).pipe();
    }    
}