import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { TVBlinkService } from './tvblink-services';
import { PlayerEquipamento } from '@radoccmodels/playerequipamento';

@Injectable()
export class PlayerEquipamentoService extends TVBlinkService<PlayerEquipamento> {

    constructor(router: Router, http: HttpClient) {
        super(router, http,"TVBlink-Web");

    }

    public getWebService(): string {
        return 'playerequipamento';
    }
    
}