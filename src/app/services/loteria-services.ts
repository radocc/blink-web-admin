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
    
}