import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { TVBlinkService } from './tvblink-services';
import { Equipamento } from '@radoccmodels/equipamento';

@Injectable()
export class EquipamentoService extends TVBlinkService<Equipamento> {

    constructor(router: Router, http: HttpClient) {
        super(router, http,"TVBlink-Web");

    }

    public getWebService(): string {
        return 'equipamento';
    }
    
}