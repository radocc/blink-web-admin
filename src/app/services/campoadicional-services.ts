import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { TVBlinkService } from './tvblink-services';
import { CampoAdicional } from '@radoccmodels/campoadicional';

@Injectable()
export class CampoAdicionalService extends TVBlinkService<CampoAdicional> {

    constructor(router: Router, http: HttpClient) {
        super(router, http,"TVBlink-Web");

    }

    public getWebService(): string {
        return 'campoadicional';
    }
    
}