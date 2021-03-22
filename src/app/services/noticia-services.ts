import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { TVBlinkService } from './tvblink-services'; 
import { Noticia } from '@radoccmodels/noticia';

@Injectable()
export class NoticiaService extends TVBlinkService<Noticia> {

    constructor(router: Router, http: HttpClient) {
        super(router, http,"TVBlink-Web");

    }

    public getWebService(): string {
        return 'noticia';
    }
    
}