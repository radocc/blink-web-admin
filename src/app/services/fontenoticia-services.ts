import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { TVBlinkService } from './tvblink-services';
import { FonteNoticia } from '@radoccmodels/fontenoticia';
import { Observable } from 'rxjs';

@Injectable()
export class FonteNoticiaService extends TVBlinkService<FonteNoticia> {

    constructor(router: Router, http: HttpClient) {
        super(router, http,"TVBlink-Web");

    }

    public getWebService(): string {
        return 'fontenoticia';
    }
    
    public findAtivas(): Observable<Array<FonteNoticia>> {
        return this.http.get<Array<FonteNoticia>>(this.urlWebBase + `/ativas`).pipe();
    }

}