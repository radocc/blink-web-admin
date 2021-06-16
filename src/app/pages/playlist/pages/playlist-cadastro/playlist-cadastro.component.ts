import { Events } from '../../../../models/enum/events';
import { EventBrokerService } from 'ng-event-broker';
import { CadForm } from '@radocccomponentes/pagecadastro/cadform';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
import { Playlist } from '@radoccmodels/playlist';
import { PlaylistConteudo } from '@radoccmodels/playlistconteudo';
import { PlaylistService } from '@radoccservices/playlist-services';
import { PlaylistConteudoService } from '@radoccservices/playlistconteudo-services';
import { ConteudoService } from '@radoccservices/conteudo-services';
import { ConteudoDialogComponent } from './dialog-conteudo/conteudo-dialog.component';
import { DialogService } from 'primeng/dynamicdialog';
import { Player } from '@radoccmodels/player';
import { PlayerService } from '@radoccservices/player-services';
import { MenuItem } from 'primeng/api';
import { OrderList } from 'primeng/orderlist';

@Component({
  selector: 'app-playlist-cadastro',
  templateUrl: './playlist-cadastro.component.html',
  styleUrls: ['./playlist-cadastro.component.scss'],
  providers:[
    PlaylistService, PlaylistConteudoService, ConteudoService,DialogService,
    PlayerService
  ]
})
export class PlaylistCadastroComponent extends CadForm implements OnInit {
  @ViewChild("orderList")public orderList:OrderList;
  public config:{
    titulo:string,
    subTitle:string,
    btnSalvar:string;
  }={
    titulo:'CAMPANHA',
    subTitle:'',
    btnSalvar:'SALVAR'
  }
  public form:FormGroup = new FormGroup({
    nome:new FormControl('', Validators.required),
    campanha:new FormControl(true),
    dataInicio:new FormControl(),
    dataFim:new FormControl(),
    regraExibicao:new FormControl(),
    status:new FormControl(2),
    intercalacao:new FormControl(3)
  }) 
  
  public playlist:Playlist;
  public status:any;
  public players:Player[] = [];
  public playersSelecionados:Player[] = [];
  public items: MenuItem[];
  public activeIndex:number=0;
  public listaConteudo:PlaylistConteudo[] = [];
  public listaStatus:{ id:number, nome:string }[] = [{
    id:1,
    nome:'SALVO'
  },
  {
    id:2,
    nome:'AGUARDANDO_APROVACAO'
  },{
    id:3,
    nome:'APROVADO'
  },{
    id:4,
    nome:'PUBLICADO'
  },{
    id:5,
    nome:'REPROVADO'
  }];
  public tiposIntercalacao:any[] = [
    {
      name: '1|1', 
      id:1
    },
    { 
      name: '2|2', 
      id:2
    },
    { 
      name: '3|3', 
      id:3
    },
    { 
      name: '4|4', 
      id:4
    },
  ];

  constructor(private playlistService:PlaylistService, private playlistConteudoService:PlaylistConteudoService,
     public eventService:EventBrokerService, public dialogService:DialogService,
     private playerService:PlayerService) {
      super(eventService);
  }

  ngOnInit(): void { 
    super.ngOnInit();
    this.playerService.findAll().subscribe((lista)=>{
      this.players = lista;
    })
    this.items = [
      {
          label: 'Dados',
          command: (event: any) => {
              this.activeIndex = 0;
          }
      },
      {
          label: 'Conteúdos',
          command: (event: any) => {
              this.activeIndex = 1;
          }
      },
      {
          label: 'Players',
          command: (event: any) => {
              this.activeIndex = 2;
          }
      }
  ];
  } 

  public novo(){
    super.novo();
    this.playlist = null;
  }

  public buscar(id:number, editavel:boolean){
      this.playlistService.findById(id).subscribe((player)=>{
        this.montarForm(player,editavel);
      })
  };

  public montarForm(playlist:Playlist, editavel:boolean){
    this.playlist = playlist;
    this.form.controls['nome'].setValue(playlist.nome,{emitEvent:false});
    this.form.controls['status'].setValue(playlist.status,{emitEvent:false});
    this.form.controls['dataInicio'].setValue(new Date(playlist.dataInicio),{emitEvent:false});    
    this.form.controls['dataFim'].setValue(new Date(playlist.dataFim),{emitEvent:false});    
    this.form.controls['intercalacao'].setValue(playlist.intercalacao, {emitEvent:false});
    this.playersSelecionados = [];
    if (this.playlist.players != null){
      let ids = this.playlist.players.split(',');
      for (let w = 0;w < this.players.length;w++){
        for (let i = 0; i < ids.length;i++){
          if (this.players[w].id === parseInt(ids[i])){
            this.playersSelecionados.push(this.players[w]);
            break;
          }
        }      
      }
    }    
    this.playlistConteudoService.buscarPorPlayList(playlist.id).subscribe((lista)=>{
      this.listaConteudo = lista;
    })
    if (editavel == false){
      this.form.disable();
    }    
  }

  // public pesquisarEquipamento(nome:string){
  //   this.equipamentoService.findNome(nome).subscribe((lista)=>{
  //     this.listaConteudo = lista;
  //   });
  // }
  
  public salvar(event:any){
    if (this.form.invalid){
      this.page.showWarnMsg('EXISTEM_CAMPOS_INVALIDOS');
      return ;
    }
    if (this.playlist == null){
      this.playlist = new Playlist();
    }
    
    this.playlist.nome = this.form.controls['nome'].value;
    this.playlist.campanha = this.form.controls['campanha'].value;
    this.playlist.dataInicio = this.form.controls['dataInicio'].value;
    this.playlist.dataFim = this.form.controls['dataFim'].value;    
    this.playlist.status = this.form.controls['status'].value;
    this.playlist.intercalacao = this.form.controls['intercalacao'].value;
    let idsPlayes = []
    for (let w =0; w < this.playersSelecionados.length;w++){
      idsPlayes.push(this.playersSelecionados[w].id);
    }
    this.playlist.players = idsPlayes.join(',');
    for (let w =0; w < this.listaConteudo.length;w++){
      this.listaConteudo[w].sequencia = w+1;
    }
    this.playlist.playlistConteudos = this.listaConteudo;
    
    this.playlistService.save(this.playlist).subscribe((playlist)=>{
      this.playlist = playlist;
      this.listaConteudo = playlist.playlistConteudos;
      this.page.showSuccessMsg('SALVO_COM_SUCESSO');
      this.eventService.publishEvent(Events.atualizarLista);
    }, error=>{
      this.page.showErrorMsg('FALHA_AO_SALVAR');
      console.log(error);
    })
  } 

  public abrirLista(){
    const dialog = this.dialogService.open(ConteudoDialogComponent, {
      data:this.listaConteudo,
      width: '80%',
      modal:true,
      showHeader:false,
      closable:false,
      closeOnEscape:false
    });
    dialog.onClose.subscribe((lista)=>{
      this.listaConteudo = [];
      if (this.orderList != null){
        let me = this;
        setTimeout(()=>{
          this.listaConteudo = lista;
          me.orderList.value = lista;
        },700);        
      }
    }); 
  }
  
  public excluirConteudo(itemConteudo:PlaylistConteudo){
    let index = this.listaConteudo.indexOf(itemConteudo);
    this.listaConteudo.splice(index,1);
  }
}
