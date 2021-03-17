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
import { DialogService } from 'primeng/dynamicdialog';
import { PublicacaoService } from '@radoccservices/publicacao-services';
import { Publicacao } from '@radoccmodels/publicacao';

@Component({
  selector: 'app-publicacao-cadastro',
  templateUrl: './publicacao-cadastro.component.html',
  styleUrls: ['./publicacao-cadastro.component.scss'],
  providers:[
    PlaylistService, PublicacaoService, ConteudoService,DialogService
  ]
})
export class PublicacaoCadastroComponent extends CadForm implements OnInit {

  public config:{
    titulo:string,
    subTitle:string,
    btnSalvar:string;
  }={
    titulo:'PUBLICACAO',
    subTitle:'',
    btnSalvar:'SALVAR'
  }
  public form:FormGroup = new FormGroup({
    dataPublicado:new FormControl(),
    idGrupoPlayer:new FormControl(),
    idPlayer:new FormControl(),
    intercalacao:new FormControl()
  }) 
  
  public publicacao:Publicacao;
  public listaPlaylist:Playlist[] = [];

  constructor(private playlistService:PlaylistService, private publicacaoService:PublicacaoService,
     public eventService:EventBrokerService, public dialogService:DialogService) {
      super(eventService);
  }

  ngOnInit(): void { 
    super.ngOnInit();
  } 

  public buscar(id:number, editavel:boolean){
      this.publicacaoService.findById(id).subscribe((publicacao)=>{
        this.montarForm(publicacao,editavel);
      })
  };

  public montarForm(publicacao:Publicacao, editavel:boolean){
    this.publicacao = publicacao;
    // this.form.controls['nome'].setValue(publicacao.dataPublicado,{emitEvent:false});
    
    
    if (editavel == false){
      this.form.disable();
    }    
  }
  
  public salvar(event:any){
    if (this.form.invalid){
      this.page.showWarnMsg('EXISTEM_CAMPOS_INVALIDOS');
      return ;
    }
    if (this.publicacao == null){
      this.publicacao = new Publicacao();
    }
    
    // this.publicacao.nome = this.form.controls['nome'].value;
    
    this.publicacaoService.save(this.publicacao).subscribe((playlist)=>{
      this.publicacao = playlist;
      this.page.showSuccessMsg('SALVO_COM_SUCESSO');
      this.eventService.publishEvent(Events.atualizarLista);
    }, error=>{
      this.page.showErrorMsg('FALHA_AO_SALVAR');
      console.log(error);
    })
  } 

}
