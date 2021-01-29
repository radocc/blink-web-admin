import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { TVBlinkService } from './tvblink-services';
import { ConteudoPrevisao } from '@radoccmodels/conteudoprevisao';

@Injectable()
export class ConteudoPrevisaoService extends TVBlinkService<ConteudoPrevisao> {

    constructor(router: Router, http: HttpClient) {
        super(router, http,"TVBlink-Web");

    }

    public getWebService(): string {
        return 'conteudoprevisao';
    }
    
}