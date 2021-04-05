import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { TVBlinkService } from './tvblink-services';
import { ConteudoCampo } from '@radoccmodels/conteudocampo';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ConteudoCampoService extends TVBlinkService<ConteudoCampo> {

    constructor(router: Router, http: HttpClient) {
        super(router, http,"TVBlink-Web");

    }

    public getWebService(): string {
        return 'conteudocampo';
    }
    
    public getPreenchimentoManualByConteudoETemplate(idConteudo:number,idTemplate: number): Observable<Array<ConteudoCampo>> {
        return this.http.get<Array<ConteudoCampo>>(this.urlWebBase + `/cadastro/manual/conteudo/${idConteudo}/template/${idTemplate}`).pipe(
            map(campos => {
                let lista = [];
                campos.map(campo => {
                    let c = Object.assign(new ConteudoCampo(), campo)
                    lista.push(c);
                    return c;
                });
                return lista;
            })
        );
    } 
}