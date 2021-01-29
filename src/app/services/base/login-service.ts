import { AbstractService } from './abstract-service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Usuario } from '@radoccmodels/base/usuario';
import { Logar } from '@radoccmodels/base/logar';

@Injectable()
export class LoginService extends AbstractService<Usuario> {

    constructor(router: Router, http: HttpClient) {
        super(router, http);
    }

    public getWebService(): string {
        return 'usuario';
    }

    public events:Subject<string> = new Subject<string>();

    public emetir(data: string){
        this.events.next(data);
    }

    public logar(user: Logar): Observable<Usuario> {
        return this.http.post<Usuario>(this.urlWebBase + "/logar", user);
    }

    public logout(user: Usuario): Observable<Usuario> {
        return this.http.post<Usuario>(this.urlWebBase + "/logout", user);
    }

    public fecharNotificacao(id): Observable<any> {
        return this.http.post(this.urlWebBase + '/notificacao/marcarvisualizado', id);
    }

}
