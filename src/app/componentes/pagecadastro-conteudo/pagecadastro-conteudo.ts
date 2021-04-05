import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from "@angular/core";

@Component({
    selector: 'app-pagecadastro-conteudo',
    templateUrl: './pagecadastro-conteudo.html',
    styleUrls: ['./pagecadastro-conteudo.scss']
})
export class PageCadastroConteudoComponent implements OnInit {

    
    @Output("preview") public onPreview: EventEmitter<any> = new EventEmitter();
    @Output("publicar") public onPublicar: EventEmitter<any> = new EventEmitter();
    @Output("salvar") public onSalvar: EventEmitter<any> = new EventEmitter();
    @Output("importar") public onImportar: EventEmitter<any> = new EventEmitter();
    @Output("novo") public onNovo: EventEmitter<any> = new EventEmitter();

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

    public preview() {
      this.onPreview.emit();
    }

    public publicar() {
      this.onPublicar.emit();
    }

    public salvar() {
      this.onSalvar.emit();
    }

    public importar() {
      this.onImportar.emit();
    }

    public novo() {
      this.onNovo.emit();
    }
}