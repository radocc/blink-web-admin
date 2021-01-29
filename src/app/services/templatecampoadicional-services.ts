import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { TVBlinkService } from './tvblink-services';
import { TemplateCampoAdicional } from '@radoccmodels/templatecampoadicional';

@Injectable()
export class TemplateCampoAdicionalService extends TVBlinkService<TemplateCampoAdicional> {

    constructor(router: Router, http: HttpClient) {
        super(router, http,"TVBlink-Web");

    }

    public getWebService(): string {
        return 'templatecampoadicional';
    }
    
}