import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { TVBlinkService } from './tvblink-services';
import { ConteudoAgendamento } from '@radoccmodels/conteudoagendamento';

@Injectable()
export class ConteudoAgendamentoService extends TVBlinkService<ConteudoAgendamento> {

    constructor(router: Router, http: HttpClient) {
        super(router, http,"TVBlink-Web");

    }

    public getWebService(): string {
        return 'conteudoagendamento';
    }
    
}