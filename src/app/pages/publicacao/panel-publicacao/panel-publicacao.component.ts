import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';  
import { CadForm } from '@radocccomponentes/pagecadastro/cadform';
import { GrupoPlayer } from '@radoccmodels/grupoplayer';
import { Player } from '@radoccmodels/player';
import { Playlist } from '@radoccmodels/playlist';
import { PlaylistConteudo } from '@radoccmodels/playlistconteudo';
import { Publicacao } from '@radoccmodels/publicacao';
import { ConteudoResult } from '@radoccmodels/result/conteudoresult';
import { TipoConteudo } from '@radoccmodels/tipoconteudo';
import { ConteudoService } from '@radoccservices/conteudo-services';
import { GrupoPlayerService } from '@radoccservices/grupoplayer-services';
import { PlayerService } from '@radoccservices/player-services';
import { PlaylistService } from '@radoccservices/playlist-services';
import { PlaylistConteudoService } from '@radoccservices/playlistconteudo-services';
import { PublicacaoService } from '@radoccservices/publicacao-services';
import { TipoConteudoService } from '@radoccservices/tipoconteudo-services'; 
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { PlaylistPesquisaDialogComponent } from '../componente/dialog-playlist-pesquisa/playlist-pesquisa-dialog.component';
import { PlaylistDialogComponent } from '../componente/dialog-playlist/playlist-dialog.component';
import { GaleriaConteudoComponent } from '../componente/galeria-conteudo/galeria-conteudo.component';

@Component({
  selector: 'app-panel-publicacao',
  templateUrl: './panel-publicacao.component.html',
  styleUrls: ['./panel-publicacao.component.scss'],
  providers:[
    TipoConteudoService, ConteudoService, PlayerService, GrupoPlayerService, PublicacaoService,MessageService, PlaylistConteudoService,
    DialogService,PlaylistService
  ]
})
export class PanelPublicacaoComponent implements OnInit {

  public nomeBusca:string = "";
  public tiposConteudos: TipoConteudo[] = [ ]
  public conteudos:ConteudoResult[] = [];
  public tipoConteudo:TipoConteudo= null;
  public eventLista = null;
  public pesquisaTipo:string;
  public tempoLista:number = 0;
  public form:FormGroup = new FormGroup({
    grupoPlayer:new FormControl(null),    
    player:new FormControl(null),
    tipoPublicacao:new FormControl(1),
    tipoIntercalacao:new FormControl(1),
  })   
  
  public mostrarPreview:boolean = false;
  public players:Player[] = [];
  public grupoPlayers:GrupoPlayer[] = [];
  public idTipoPublicacao:any = 1;
  public tiposPublicacao:any[] = [
    {name: 'PLAYER', id:1},
    {name: 'GRUPO', id:2}    
  ];
  // {name: 'CAMPANHA', id: 3}
  public listaConteudo:PlaylistConteudo[] = [];
  public conteudo:ConteudoResult;
  public playlist:Playlist;
  public publicacao:Publicacao; 
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

  constructor(private router:Router, private tipoConteudoService:TipoConteudoService, private conteudoService:ConteudoService,private msgService:MessageService,
    private playlistService:PlaylistService,
    private playerService:PlayerService, private grupoPlayerService:GrupoPlayerService, private publicacaoService:PublicacaoService, private playlistConteudoService:PlaylistConteudoService,
    public dialogService:DialogService) { 
      
  }

  ngOnInit(): void {
    this.buscarTipos();
    this.form.controls['grupoPlayer'].valueChanges.subscribe((grupo)=> {
      this.buscarPublicacaoPorGrupo();
    })
    this.form.controls['player'].valueChanges.subscribe((grupo)=> {
      this.buscarPublicacaoPorPlayer();
    })
  }

  public atualizarTempo(){
    this.tempoLista = 0;
    for (let w = 0; w < this.listaConteudo.length;w++){
      this.tempoLista += this.listaConteudo[w].conteudo.tempoExibicao;
    }
    this.tempoLista = this.tempoLista;
  }

  public buscarTipos(){
    this.tipoConteudoService.findAll().subscribe( (lista) =>{
      this.tiposConteudos = lista;
      if (lista.length > 0){
        this.tipoConteudo = lista[0];
        this.filtrarTipo(this.tipoConteudo);
      }
    })
  }

  public pesquisarTipo(nome:string){
    this.tipoConteudoService.findNome(nome).subscribe((lista)=>{
      this.tiposConteudos = lista;
    })
  }

  public filtrarTipo(tipo:TipoConteudo){
    this.tipoConteudo = tipo; 
    this.conteudoService.filtrarTipo(tipo.id,this.nomeBusca).subscribe((lista)=>{
      this.conteudos = lista;
    })
  }

  public alterarConteudo(conteudo){

  }

  public excluirConteudo(itemConteudo:PlaylistConteudo){
    let index = this.listaConteudo.indexOf(itemConteudo);
    this.listaConteudo.splice(index,1);
    this.atualizarTempo();
  }

  public visualizarConteudo(conteudo){
    
  }

  public arquivoConteudo(conteudo){
    
  }

  public buscarPlayListConteudoPorGrupo(){
    this.playlistConteudoService.buscarPorGrupoPlayer(this.form.controls['grupoPlayer'].value.id).subscribe((lista)=>{
      this.listaConteudo = lista;
    })
  }  

  public buscarPlayListConteudoPorPlayer(){
    this.playlistConteudoService.buscarPorPlayer(this.form.controls['player'].value.id).subscribe((lista)=>{
      this.listaConteudo = lista;
    })
  }

  public buscarPlayListConteudo(idPlaylist:number){
    this.playlistConteudoService.buscarPorPlayList(idPlaylist).subscribe((lista)=>{
      this.listaConteudo = lista;
      this.atualizarTempo();
    })
  }

  public buscarPublicacaoPorGrupo(){
    this.publicacaoService.buscarPorGrupoPlayer(this.form.controls['grupoPlayer'].value.id).subscribe((publicacao)=>{
      this.publicacao = publicacao;
      
      if (publicacao != null){
        this.form.controls['tipoIntercalacao'].setValue(publicacao.intercalacao);
        this.playlist = publicacao.playlist;
        this.listaConteudo = this.playlist.playlistConteudos;
      }else {
        this.playlist = null;
        this.listaConteudo = [];
      }
      this.atualizarTempo();
    })
  }

  public buscarPublicacaoPorPlayer(){
    this.publicacaoService.buscarPorPlayer(this.form.controls['player'].value.id).subscribe((publicacao)=>{
      this.publicacao = publicacao;
      if (publicacao != null){
        this.form.controls['tipoIntercalacao'].setValue(publicacao.intercalacao);
        this.playlist = publicacao.playlist;
        this.listaConteudo = this.playlist.playlistConteudos;
      }else {
        this.playlist = null;
        this.listaConteudo = [];
      }      
      this.atualizarTempo();
    })
  }

  public pesquisarPlayer(nome:string){
    this.playerService.findNome(nome).subscribe((players)=>{
      this.players = players;
    })
  }

  public pesquisarGrupoPlayer(nome:string){
    this.grupoPlayerService.findNome(nome).subscribe((lista)=>{
      this.grupoPlayers = lista;
    })
  }

  // public buscar(id:number){
  //   this.conteudoService.findConteudoImagem(id).subscribe((conteudo)=>{
       
  //   });
  // }
  
  public salvar(){    
    if (this.form.invalid ){
      this.msgService.add({
        severity:'error', summary:'Campos inválidos', detail:'Verifique os campos com asterisco vermelho'
      })
      this.timerClose();
      return ;
    }
    if (this.playlist == null){
      const dialog = this.dialogService.open(PlaylistDialogComponent, {
        data:this.playlist,
        // width: '50%',
        modal:true,
        showHeader:true,
        closable:true,
        header:'Playlist',
        closeOnEscape:true
      });
      dialog.onClose.subscribe((playlist)=>{
        this.playlist = playlist;
        if (this.playlist != null){
          this.playlist.playlistConteudos = this.listaConteudo;
          this.playlistService.save(playlist).subscribe((playlist)=>{
            this.playlist = playlist;
            this.listaConteudo = playlist.playlistConteudos;
            this.msgService.add({
              severity:'success', summary:'Salvo', detail:'Salvo com sucesso'
            })
            this.timerClose();
          })
        }
      }); 
    }
    
  }

  public publicar(){
    if (this.form.invalid){
      this.msgService.add({
        severity:'error', summary:'Campos inválidos', detail:'Verifique os campos com asterisco vermelho'
      })
      this.timerClose();
      return;
    }
    if (this.publicacao == null){
      this.publicacao = new Publicacao();
    }
    if (this.idTipoPublicacao == 1){
      this.publicacao.idPlayer = this.form.controls['player'].value.id;
    }else if (this.idTipoPublicacao == 2){
      this.publicacao.idGrupoPlayer = this.form.controls['grupoPlayer'].value.id;
    }
    this.publicacao.dataPublicado = new Date();
    this.publicacao.intercalacao = this.form.controls['tipoIntercalacao'].value;
    if (this.playlist == null){
      this.playlist = new Playlist();
      if (this.idTipoPublicacao == 1){
        this.playlist.nome = this.form.controls['player'].value.nome;
      }else if (this.idTipoPublicacao == 2){
        this.playlist.nome = this.form.controls['grupoPlayer'].value.nome;
      }      
    }
    this.publicacao.idPlaylist = this.playlist.id;
    this.playlist.status = 2;
    this.publicacao.playlist = this.playlist;
    

    this.publicacaoService.save(this.publicacao).subscribe((publicacao)=>{
      this.publicacao = publicacao;
      this.playlist = publicacao.playlist;
      this.listaConteudo = this.playlist.playlistConteudos;
      this.msgService.add({
        severity:'success', summary:'Publicado', detail:'Publicado com sucesso'
      })
      this.timerClose();
    });
  }

  public preview(){
    const dialog = this.dialogService.open(GaleriaConteudoComponent, {
      data:this.listaConteudo,
      modal:true,
      showHeader:true,
      closable:true,
      header:'Playlist',
      closeOnEscape:true
    });
    dialog.onClose.subscribe((playlist)=>{
      
    }); 
  }

  public importar(){
    const dialog = this.dialogService.open(PlaylistPesquisaDialogComponent, {
      width: '60%',
      modal:true,
      showHeader:true,
      closable:true,
      header:'Playlist',
      closeOnEscape:true
    });
    dialog.onClose.subscribe((playlist)=>{
      this.playlist = playlist;    
      if (this.playlist != null){
        this.buscarPlayListConteudo(this.playlist.id);
      }  
    }); 
  }

  dragStart(conteudo: ConteudoResult) {
    this.conteudo = conteudo;
    console.log('DRAG START', conteudo);
  }

  drop(event) {
      if (this.conteudo) {
        let playConteudo = new PlaylistConteudo();
        playConteudo.conteudo = this.conteudo;
        playConteudo.idConteudo = this.conteudo.id;
        playConteudo.sequencia = this.listaConteudo.length;
        
        this.listaConteudo.push(playConteudo);
        this.conteudo = null;
        this.atualizarTempo();
      }
  }

  dragEnd(event) {
      this.conteudo = null;
  } 

  public timerClose() {
    setTimeout(() => {
      this.msgService.clear();
    }, 3000);
  }

  public previewPlayer(){
    // this.playerService.
    const dialog = this.dialogService.open(GaleriaConteudoComponent, {
      data:this.listaConteudo,
      modal:true,
      showHeader:true,
      closable:true,
      header:'Playlist',
      closeOnEscape:true
    });
    dialog.onClose.subscribe((playlist)=>{
      
    }); 
  }

}
