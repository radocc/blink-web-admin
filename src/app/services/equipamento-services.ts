import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { TVBlinkService } from './tvblink-services';
import { Equipamento } from '@radoccmodels/equipamento';
import { Observable } from 'rxjs';

@Injectable()
export class EquipamentoService extends TVBlinkService<Equipamento> {

    constructor(router: Router, http: HttpClient) {
        super(router, http,"TVBlink-Web");

    }

    public getWebService(): string {
        return 'equipamento';
    }

    public findNome(nome: string): Observable<Array<Equipamento>> {
        return this.http.post<Array<Equipamento>>(this.urlWebBase + `/find/nome`, nome).pipe();
    }

    public findUUID(uuid: string): Observable<Equipamento> {
        return this.http.post<Equipamento>(this.urlWebBase + `/find/uuid`, uuid).pipe();
    }
    
}