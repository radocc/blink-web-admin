import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { TVBlinkService } from './tvblink-services';
import { NoticiaEditoria } from '@radoccmodels/noticiaeditoria';

@Injectable()
export class NoticiaEditoriaService extends TVBlinkService<NoticiaEditoria> {

    constructor(router: Router, http: HttpClient) {
        super(router, http,"TVBlink-Web");

    }

    public getWebService(): string {
        return 'noticiaeditoria';
    }

    
    
}