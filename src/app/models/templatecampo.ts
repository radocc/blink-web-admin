import { jsonIgnore } from "json-ignore";
import { BaseEntityImpl } from "./baseentityimpl";
import EFonteEspessura from "./enum/fonte-espessura-enum";
import EFontFamily from "./enum/fonte-family-enum";

export class TemplateCampo extends BaseEntityImpl {
    
    public idTemplate: number;
    public nome: string;
    public tipo: number;
    public resolucaoImagem: string;
    public limite: number;
    public fonte: string = EFontFamily.ARIAL.name;
    public fonteTamanho: number = 18;
    public fonteCor: string = '#000000';
    public fonteEspessura: string = EFonteEspessura.REGULAR.name;
    public cadastro: boolean = false;
    public positionTop: number = 0;
    public positionLeft: number = 0;
    public angulo: number = 0;
    public imagemFormato: number;
    public numeroLinhas: number = 1;
    public sequencia: number;
    public height: number = 0;
    public width: number = 0;
    public indice: number = 0;
    public alinhamento: string;
    public variavel: string;
    public variavelCustomizado: string;    
    public valorFormato: string;    

    @jsonIgnore() public valor: any = 'Texto aqui';
    @jsonIgnore() public drag = {x: 0, y: 0};
    @jsonIgnore() public hash: string;
    @jsonIgnore() public file: File;
    @jsonIgnore() public preenchimento: boolean = false;

}