import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { TVBlinkService } from './tvblink-services'; 
import { Publicacao } from '@radoccmodels/publicacao';

@Injectable()
export class PublicacaoService extends TVBlinkService<Publicacao> {

    constructor(router: Router, http: HttpClient) {
        super(router, http,"TVBlink-Web");

    }

    public getWebService(): string {
        return 'publicacao';
    }
    
}