import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { TVBlinkService } from './tvblink-services';
import { ConteudoLoteria } from '@radoccmodels/conteudoloteria';

@Injectable()
export class ConteudoLoteriaService extends TVBlinkService<ConteudoLoteria> {

    constructor(router: Router, http: HttpClient) {
        super(router, http,"TVBlink-Web");

    }

    public getWebService(): string {
        return 'conteudoloteria';
    }
    
}