import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { TVBlinkService } from './tvblink-services';
import { Loteria } from '@radoccmodels/loteria';

@Injectable()
export class LoteriaService extends TVBlinkService<Loteria> {

    constructor(router: Router, http: HttpClient) {
        super(router, http,"TVBlink-Web");

    }

    public getWebService(): string {
        return 'loteria';
    }
    
    public findNome(nome: string): Observable<Array<Loteria>> {
        return this.http.post<Array<Loteria>>(this.urlWebBase + `/find/nome`, nome).pipe();
    }

    public atualizarResultado(idLoteria: number): Observable<any> {
        return this.http.get(this.urlWebBase + `/atualizar/resultado/${idLoteria}`).pipe();
    }
}