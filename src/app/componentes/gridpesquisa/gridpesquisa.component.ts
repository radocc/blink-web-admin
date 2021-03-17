import { Component, ElementRef, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Direito } from '@radoccmodels/base/direito';
import { Filtro } from '@radoccmodels/base/filtro';
import { Events } from '@radoccmodels/enum/events'; 
import { DireitoGrupoService } from '@radoccservices/base/direitogrupo-service';
import { FiltroService } from '@radoccservices/base/filtro-service';
import { EventBrokerService } from 'ng-event-broker';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { FiltroPanel } from './filtropanel';

@Component({
  selector: 'app-grid-pesquisa',
  templateUrl: './gridpesquisa.component.html',
  styleUrls: ['./gridpesquisa.component.scss'],
  providers: [FiltroService, DireitoGrupoService, MessageService]
})
export class GridPesquisaComponent extends FiltroPanel implements OnInit {

  @ViewChild('divTable', { static: true }) divTable: ElementRef;
  @ViewChild('pTable', { static: true }) table: Table;

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
  private atualizarListaEvent: any;
  private time: any;

  constructor(private router: Router,public filtroService: FiltroService,private direitoGrupoService: DireitoGrupoService,
    public translate: TranslateService, public zone: NgZone, public fb: FormBuilder, private eventService: EventBrokerService,
    private msgService:MessageService) {
    super(filtroService, zone, fb, translate);
   }

  ngOnInit(): void {
    this.atualizarListaEvent = this.eventService.subscribeEvent(Events.atualizarLista).subscribe(
      () => {
        this.pesquisar();
      },
      (err) => {
        console.error(err)
    });
  }

  ngAfterViewChecked(): void {
      if (this.getGridPesquisa) {
          this.getGridPesquisa(this);
      }
  }

  ngAfterViewInit(): void {
    var me = this;

    window.addEventListener('resize', function(event) {
      if (me.time == null) {
        me.time = setTimeout(() => {
          me.setGridHeight();   
          me.time = null;
        }, 300);
      }
    });

    me.setGridHeight();   
  }

  ngOnDestroy(): void {
    if (this.atualizarListaEvent){
      this.atualizarListaEvent.unsubscribe();
    }    
    window.removeEventListener('resize', (event) => {
      console.log('removido evento de resize');
    });
  }

  private setGridHeight() {
    //** Seta o tamanho fixo para a grid */
    this.table.el.nativeElement.style.height = this.divTable.nativeElement.offsetHeight + 'px';
    this.table.el.nativeElement.style.display = 'flex';
  }

  public buscarDados():Promise<void>{
    return new Promise((resolve, reject) => {
      this.selection = null;
      let filTemp = {...this.filter};
      filTemp.page = 1;
      filTemp.start = 0;
      filTemp.limit = 100;
      filTemp.variaveis = this.variaveis;
      this.filtroService.filter(filTemp).subscribe((data) => {
        this.dataSource = data.data;
        resolve();
      }, (error) => {
        reject(error);
      });
    });
    
  }

  abrirPesquisa() {
    // this.mostrapesquisa = !this.mostrapesquisa;
  }
 
  public onCliclPesquisar(){
    this.pesquisar();
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

  public getService():any {
      return this.service;
  }

  public alterar() {
    // if (this.selection) {
    //     this.translateService.get('FAVOR_SELECIONAR_APENAS_UM_REGISTRO').subscribe(FAVOR_SELECIONAR_APENAS_UM_REGISTRO => {
    //         // this.showMessage(FAVOR_SELECIONAR_APENAS_UM_REGISTRO, '');
    //     });
    // } else 
    if (this.selection == null) {
        this.translateService.get('FAVOR_SELECIONAR_UM_REGISTRO').subscribe(frase => {
            this.msgService.add(
              {
                severity: 'info',
                summary: 'Informação',
                detail: frase
              });
        });
    } else {
      this.eventService.publishEvent(Events.editar, {id: this.selection.id});
    }
  }
  
  public visualizar() {
      if (this.selection == null) {
        this.translateService.get('FAVOR_SELECIONAR_UM_REGISTRO').subscribe(frase => {
            this.msgService.add(
              {
                severity: 'info',
                summary: 'Informação',
                detail: frase
              });
        });
      } else {
        this.eventService.publishEvent(Events.visualizar, {id: this.selection.id});
      }
  }

  public excluir() {
    if (this.selection == null) {
      this.translateService.get('FAVOR_SELECIONAR_UM_REGISTRO').subscribe(frase => {
        this.msgService.add(
          {
            severity: 'info',
            summary: 'Informação!',
            detail: frase
          });
        });
    } else {
      this.getService().remove(this.selection.id).subscribe((result)=>{
        let index = this.dataSource.indexOf(this.selection);
        this.dataSource.splice(index,1);
      });
    } 
  }

  public novo(){
    this.eventService.publishEvent(Events.novo);
  }

}
