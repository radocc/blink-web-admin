import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { TVBlinkService } from './tvblink-services';
import { TemplateCampo } from '@radoccmodels/templatecampo';

@Injectable()
export class TemplateCampoAdicionalService extends TVBlinkService<TemplateCampo> {

    constructor(router: Router, http: HttpClient) {
        super(router, http,"TVBlink-Web");

    }

    public getWebService(): string {
        return 'templatecampoadicional';
    }
    
}