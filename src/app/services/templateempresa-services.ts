import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { TVBlinkService } from './tvblink-services';
import { Player } from '@radoccmodels/player';
import { TemplateEmpresa } from '@radoccmodels/templateempresa';

@Injectable()
export class TemplateEmpresaService extends TVBlinkService<TemplateEmpresa> {

    constructor(router: Router, http: HttpClient) {
        super(router, http,"TVBlink-Web");

    }

    public getWebService(): string {
        return 'templateempresa';
    }
    
}