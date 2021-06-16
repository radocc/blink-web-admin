import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { TVBlinkService } from './tvblink-services';
import { Observable } from 'rxjs';
import { ConfigAmbiente } from '@radoccmodels/configambiente';

@Injectable()
export class ConfigAmbienteService extends TVBlinkService<ConfigAmbiente> {

    constructor(router: Router, http: HttpClient) {
        super(router, http,"TVBlink-Web");

    }

    public getWebService(): string {
        return 'configambiente';
    }
    
    public getConfig(): Observable<ConfigAmbiente> {
        return this.http.get<ConfigAmbiente>(this.urlWebBase + `/config`);
    } 
}