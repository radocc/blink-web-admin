import { Empresa } from "@radoccmodels/base/empresa";
import { Licenca } from "@radoccmodels/base/licenca";
import { Usuario } from "@radoccmodels/base/usuario";

export class NovoAmbiente{
    public usuario: Usuario;
    public empresa: Empresa;
    public licenca: Licenca;
}