import { Component, Input, OnInit, TemplateRef } from "@angular/core";

@Component({
    selector: 'app-pagecadastro-conteudo',
    templateUrl: './pagecadastro-conteudo.html',
    styleUrls: ['./pagecadastro-conteudo.scss']
})
export class PageCadastroConteudoComponent implements OnInit {

    
    @Input("preview") preview: Function;
    @Input("publicar") publicar: Function;
    @Input("salvar") salvar: Function;
    @Input("importar") importar: Function;
    @Input("novo") novo: Function;

    @Input("botaoNovo") botaoNovo: string;

    @Input("content") content: TemplateRef<any>;

    @Input("config") public config:{
        titulo:string,
        subTitle:string,
        btnSalvar:string;
        btnNovo:string;
      }={
        titulo:'Unidade',
        subTitle:'',
        btnSalvar:'SALVAR',
        btnNovo: 'NOVO'
      }

    ngOnInit(): void {
    
    }

}