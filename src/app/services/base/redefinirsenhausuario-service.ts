import { SolicitaRecuperaSenha } from '../../models/solicita-recupera-senha';
import { Usuario } from '../../models/base/usuario';
import { Injectable } from '@angular/core'; 
import {
    Router
} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AbstractService } from './abstract-service';

@Injectable()
export class RedefinirSenhaUsuarioService extends AbstractService<Usuario> {


    constructor(router: Router, http: HttpClient) {
        super(router, http);

    }

    public getWebService(): string {
        return 'redefinirsenhausuario';
    }

    
    public contato(nome:string):Observable<any>{
        return this.http.post<any>(this.urlWebBase + '/contato', nome).pipe();
    }

    public solicitar(obj:SolicitaRecuperaSenha ):Observable<any>{
        return this.http.post<any>(this.urlWebBase + '/solicitar', obj).pipe();
    }

    public validar(token:string):Observable<any>{
        return this.http.post<any>(this.urlWebBase + '/validar/'+token, null).pipe();
    }

    public redefinir(obj:{token:string,senha:string}):Observable<any>{
        return this.http.post<any>(this.urlWebBase + '/redefinir', obj).pipe();
    }
}