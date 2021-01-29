import { BaseEntityImpl } from "@radoccmodels/baseentityimpl";
import { Cargo } from "./cargo";
import { Cidade } from "./cidade";

export class Pessoa extends BaseEntityImpl {

    public razaoSocial:string;
    public fantasia:string;
    public cnpj:string;
    public juridica:boolean;
    public sexo:string;
    public telefone:string;
    public celular:string;
    public email:string;
    public bairro:string ;
    public rua:string;
    public complemento:string;
    public cep:number;
    public cidade:Cidade;
    public cargo: Cargo;
    public idCargo: number;
}