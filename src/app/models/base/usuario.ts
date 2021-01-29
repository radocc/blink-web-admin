import { GrupoUsuario } from "./grupousuario";
import { Idioma } from "./idioma";
import { Pessoa } from "./pessoa";

export class Usuario extends Pessoa {

    public login:string;
    public senha:string;
    public token:string;
    public grupoUsuario:GrupoUsuario =null;
    public idGrupoUsuario : number;
    public idioma:Idioma = null;
    public ativo: Boolean = true;
    public enviarEmail: Boolean = true;
    public observacao: string;
    public razaoSocial: string;
    public idIdioma : number;
    public enderecos : any = [];
    public idEmpresa : number;
    public senhaCriptografada : string;
    public foto:string;
    public idTurno:number;
}
