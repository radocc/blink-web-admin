import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { TVBlinkService } from './tvblink-services';
import { PrevisaoTempoImagem } from '@radoccmodels/previsaotempoimagem';

@Injectable()
export class PrevisaoTempoImagemService extends TVBlinkService<PrevisaoTempoImagem> {

    constructor(router: Router, http: HttpClient) {
        super(router, http,"TVBlink-Web");

    }

    public getWebService(): string {
        return 'previsaotempoimagem';
    }
    
}