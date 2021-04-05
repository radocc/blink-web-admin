import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { TVBlinkService } from './tvblink-services';
import { TemplateCampo } from '@radoccmodels/templatecampo';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TemplateCampoService extends TVBlinkService<TemplateCampo> {

    constructor(router: Router, http: HttpClient) {
        super(router, http,"TVBlink-Web");

    }

    public getWebService(): string {
        return 'templatecampo';
    }
    
    public getByTemplate(idTemplate: number): Observable<Array<TemplateCampo>> {
        return this.http.get<Array<TemplateCampo>>(this.urlWebBase + `/template/${idTemplate}`).pipe(
            map(campos => {
                let lista = [];
                campos.map(campo => {
                    let c = Object.assign(new TemplateCampo(), campo)
                    lista.push(c);
                    return c;
                });
                return lista;
            })
        );
    } 
    
    public getPreenchimentoManualByTemplate(idTemplate: number): Observable<Array<TemplateCampo>> {
        return this.http.get<Array<TemplateCampo>>(this.urlWebBase + `/cadastro/manual/template/${idTemplate}`).pipe(
            map(campos => {
                let lista = [];
                campos.map(campo => {
                    let c = Object.assign(new TemplateCampo(), campo)
                    lista.push(c);
                    return c;
                });
                return lista;
            })
        );
    } 
}