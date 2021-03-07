import { AbstractService } from './abstract-service' 
import { Injectable } from '@angular/core'; 
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { Usuario } from '@radoccmodels/base/usuario';
import { Logar } from '@radoccmodels/base/logar';

@Injectable()
export class UsuarioService extends AbstractService<Usuario> {

    constructor(router: Router, http: HttpClient) {
        super(router, http);
    }

    public getWebService(): string {
        return 'usuario';
    }

    public buscarPorCodigoOuRazaoSocial(razaoSocial): Observable<Array<Usuario>> {
        return this.http.post<Array<Usuario>>(this.urlWebBase + "/buscarporcodigoourazaosocial", razaoSocial);
    }

    public buscarperfil() {
        let url = this.urlWebBase + '/buscarperfil';
        return this.http.get(url);
    }

    public existeLogin(login: string, idUsuario: number): Observable<any> {
        let obj = {
            idUsuario: idUsuario,
            login: login
        }
        JSON.stringify(obj);
        return this.http.post(this.urlWebBase + "/existelogin", obj);
    }

    public existeEmail(email: string, idUsuario: number): Observable<any> {
        let obj = {
            idUsuario: idUsuario,
            email: email
        }
        JSON.stringify(obj);
        return this.http.post(this.urlWebBase + "/existe/email", obj);
    }

    public existeEmailNaEmpresa(email: string, idUsuario: number, validarUsuarioLogado: boolean): Observable<any> {
        let obj = {
            idUsuario: idUsuario,
            email: email,
            validarUsuarioLogado: validarUsuarioLogado
        }
        JSON.stringify(obj);
        return this.http.post(this.urlWebBase + "/na/empresa/existe/email", obj);
    }

    public findPorUsuario(): Observable<Usuario> {
        let url = this.urlWebBase + "/findporusuario";
        return this.http.get<Usuario>(url);
    }

    public alterarSenha(login: Logar): Observable<Logar> {
        return this.http.post<Logar>(this.urlWebBase + "/alterarsenha", login);
    }

    public buscarPorEmpresa(idEmpresa: number): Observable<Array<Usuario>> {
        return this.http.get<Array<Usuario>>(this.urlWebBase + '/buscarporempresa?idempresa=' + idEmpresa);
    }

    // public buscarMeusContatos(): Observable<Array<ContatoUsuario>> {
    //     return this.http.get<Array<ContatoUsuario>>(this.urlWebBase + '/meuscontatos');
    // }

    // public salvarPerfilImagem(image: ImagemReq): Observable<ImagemReq> {
    //     return this.http.post<ImagemReq>(this.urlWebBase + '/salvarperfilimagem', image);
    // }

    // public buscarPorNome(nome: string) {
    //     return this.http.post<Autocomplete[]>(this.urlWebBase + `/buscarpornome`, nome);
    // }

    // public membrosEmpresa() {
    //     return this.http.post<Autocomplete[]>(this.urlWebBase + `/membros`, null);
    // }

    // public membrosEmpresaPorGrupo(idGrupo: number) {
    //     return this.http.post<Autocomplete[]>(this.urlWebBase + `/membrosporgrupo/` + idGrupo, null);
    // }

    // public membrosPesquisaGrupo(idGrupo: number) {
    //     return this.http.post<Autocomplete[]>(this.urlWebBase + `/membrospesquisa`, idGrupo);
    // }

    public alterarMembro(membro: any): Observable<any> {
        let obj = {
            razaoSocial: membro.razaoSocial,
            idCargo: membro.idCargo,
            idGrupoUsuario: membro.idGrupoUsuario,
            idMembro: membro.id
        }

        return this.http.post(this.urlWebBase + "/alterarmembro", JSON.stringify(obj));
    }

    public existeMembroEmail(email: string, idUsuario: number): Observable<any> {
        let obj = {
            idUsuario: idUsuario,
            email: email
        }
        JSON.stringify(obj);
        return this.http.post(this.urlWebBase + "/existemembro/email", obj);
    }




}
