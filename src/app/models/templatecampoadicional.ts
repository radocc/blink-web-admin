import { jsonIgnore } from "json-ignore";
import { BaseEntityImpl } from "./baseentityimpl";
import EFonteEspessura from "./enum/fonte-espessura-enum";
import EFontFamily from "./enum/fonte-family-enum";

export class TemplateCampoAdicional extends BaseEntityImpl {
    
    public idTemplate: number;
    public nome: string;
    public tipo: number;
    public resolucaoImagem: string;
    public limite: number;
    public fonte: string = EFontFamily.ARIAL.name;
    public fonteTamanho: number = 18;
    public fonteCor: string = '#000000';
    public fonteEspessura: string = EFonteEspessura.REGULAR.name;
    public cadastro: boolean;
    public top: number = 0;
    public left: number = 0;
    public angulo: number;
    public imagemFormato: number;
    public numeroLinhas: number;
    public sequencia: number;
    public height: number;
    public width: number;

    @jsonIgnore() public valorTeste: string = 'Texto aqui';
    @jsonIgnore() public drag = {x: 0, y: 0};
    @jsonIgnore() public hash: string = Date.now().toString();
}