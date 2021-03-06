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

@Component({
  selector: 'app-playlist-cadastro',
  templateUrl: './playlist-cadastro.component.html',
  styleUrls: ['./playlist-cadastro.component.scss'],
  providers:[
    PlaylistService, PlaylistConteudoService, ConteudoService,DialogService
  ]
})
export class PlaylistCadastroComponent extends CadForm implements OnInit {

  public config:{
    titulo:string,
    subTitle:string,
    btnSalvar:string;
  }={
    titulo:'PLAYLIST',
    subTitle:'',
    btnSalvar:'SALVAR'
  }
  public form:FormGroup = new FormGroup({
    nome:new FormControl('', Validators.required),
    campanha:new FormControl(false),
    dataInicio:new FormControl(),
    dataFim:new FormControl(),
    regraExibicao:new FormControl(),
    status:new FormControl(2)
  }) 
  
  public playlist:Playlist;
  public status:any;
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

  constructor(private playlistService:PlaylistService, private playlistConteudoService:PlaylistConteudoService,
     public eventService:EventBrokerService, public dialogService:DialogService) {
      super(eventService);
  }

  ngOnInit(): void { 
    super.ngOnInit();
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
    // this.playlist.campanha = this.form.controls['campanha'].value;
    this.playlist.dataInicio = this.form.controls['dataInicio'].value;
    this.playlist.dataFim = this.form.controls['dataFim'].value;    
    this.playlist.status = this.form.controls['status'].value;
    for (let w =0; w < this.listaConteudo.length;w++){
      this.listaConteudo[w].sequencia = w+1;
    }
    this.playlist.playlistConteudos = this.listaConteudo;
    
    this.playlistService.save(this.playlist).subscribe((playlist)=>{
      this.playlist = playlist;
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
      // height:'80%',
      modal:true,
      showHeader:false,
      closable:false,
      closeOnEscape:false
    });
    dialog.onClose.subscribe((lista)=>{
      this.listaConteudo = lista;
    }); 
  }
  public excluirConteudo(itemConteudo:PlaylistConteudo){
    let index = this.listaConteudo.indexOf(itemConteudo);
    this.listaConteudo.splice(index,1);
  }
}
