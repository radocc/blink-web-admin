import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { TVBlinkService } from './tvblink-services';
import { PlayerEquipamento } from '@radoccmodels/playerequipamento';
import { Observable } from 'rxjs';

@Injectable()
export class PlayerEquipamentoService extends TVBlinkService<PlayerEquipamento> {

    constructor(router: Router, http: HttpClient) {
        super(router, http,"TVBlink-Web");

    }

    public getWebService(): string {
        return 'playerequipamento';
    }

    public findPorEquipamento(idEquipamento: number): Observable<Array<PlayerEquipamento>> {
        return this.http.get<Array<PlayerEquipamento>>(this.urlWebBase + `/find/equipamento/${idEquipamento}` ).pipe();
    }
    
}