import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { TVBlinkService } from './tvblink-services';
import { PrevisaoTempo } from '@radoccmodels/previsaotempo';

@Injectable()
export class PrevisaoTempoService extends TVBlinkService<PrevisaoTempo> {

    constructor(router: Router, http: HttpClient) {
        super(router, http,"TVBlink-Web");

    }

    public getWebService(): string {
        return 'previsaotempo';
    }
    
}