import { Component, Input, NgZone, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Direito } from '@radoccmodels/base/direito';
import { Filtro } from '@radoccmodels/base/filtro';
import { DireitoGrupoService } from '@radoccservices/base/direitogrupo-service';
import { FiltroService } from '@radoccservices/base/filtro-service';
import { FiltroPanel } from './filtropanel';

@Component({
  selector: 'app-grid-pesquisa',
  templateUrl: './gridpesquisa.component.html',
  styleUrls: ['./gridpesquisa.component.scss'],
  providers: [FiltroService, DireitoGrupoService]
})
export class GridPesquisaComponent extends FiltroPanel implements OnInit {

  @Input() public urlToNovo = "";
  @Input() public urlToAlterar = "";
  @Input() public service = null;
  @Input() public getGridPesquisa;
  @Input() public mostrapesquisa: Boolean = true;    
  // variaveis de configuracao da paginacao
  public limit: number = 25;
  public rowHeight: number = 30;
  public limitOptions: number[] = [25, 50, 75, 100];
  
  // controles de layout
  // public selected: any[] = [];
  public exibePaginator: boolean = true;
  public loading = false;
  
  // informacoes da grid
  public nomeSistema: any;
  protected idFiltro: number;
  protected _idTela: number;
  public direitos: Direito[];
  
  constructor(private router: Router,public filtroService: FiltroService,private direitoGrupoService: DireitoGrupoService,
    public translate: TranslateService, public zone: NgZone, public fb: FormBuilder) {
    super(filtroService, zone, fb, translate);
   }

  ngOnInit(): void {
    
  }

  ngAfterViewChecked(): void {
      if (this.getGridPesquisa) {
          this.getGridPesquisa(this);
      }
  }

  public buscarDados():Promise<void>{
    return new Promise((resolve, reject) => {
      this.selection.clear();
      let filTemp = {...this.filter};
      filTemp.page = 1;
      filTemp.start = 0;
      filTemp.limit = 100;
      filTemp.variaveis = this.variaveis;
      this.service.filter(filTemp).subscribe((data) => {
        this.dataSource = data.data;
        resolve();
      }, (error) => {
        reject(error);
      });
    });
    
  }

  abrirPesquisa() {
    this.mostrapesquisa = !this.mostrapesquisa;
  }

  public onClickButton(direito) {
    let me = this;
    let fn = new Function('direito, me', ' me.' + direito.action + '();   ');
    fn(direito, me);
  }

  @Input()
  set idTela(idTela: number) {
        this._idTela = idTela;
        // this.dataSource = new LessonsDataSource(this.getService());
        this.filtroService.getConfiguracaoPorTela(this._idTela).subscribe((filtro: Filtro) => {
            this.montarTable(filtro);
        });

        this.direitoGrupoService.findByIdTela(this._idTela).subscribe((direitos: Direito[]) => {
            this.direitos = direitos;
            var me = this;
            this.direitos.forEach(direito => {
                let button = {
                    title: direito.nome,
                    icon: direito.icone,
                    action: (d) => {
                        me.onClickButton(d)
                    },
                    direito: direito
                }
                this.contextMenuButtons.push(button);
            });
        });
    }

    get idTela() {
        return this._idTela;
    }

    public getUrlToNovo() {
        return this.urlToNovo;
    }

    public getUrlToAlterar() {
        return this.urlToAlterar;
    }

    public getService() {
        return this.service;
    }

    public alterar() {}
    public visualizar() {}
    public excluir() {}

}
