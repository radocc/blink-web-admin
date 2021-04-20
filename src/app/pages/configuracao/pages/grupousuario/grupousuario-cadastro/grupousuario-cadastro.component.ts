import { CadForm } from '@radocccomponentes/pagecadastro/cadform';
import { Events } from './../../../../../models/enum/events';
import { EventBrokerService } from 'ng-event-broker';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
import { PageCadastroComponent } from '@radocccomponentes/pagecadastro/pagecadastro.component';
import { GrupoUsuario } from '@radoccmodels/base/grupousuario';
import { GrupoUsuarioService } from '@radoccservices/base/grupousuario-service';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { DireitoAcessoDialogComponent } from '../dialog-direitoacesso/direitoacesso-dialog.component';

@Component({
  selector: 'app-grupousuario-cadastro',
  templateUrl: './grupousuario-cadastro.component.html',
  styleUrls: ['./grupousuario-cadastro.component.scss'],
  providers:[ 
    MessageService,GrupoUsuarioService, DialogService
  ]
})
export class GrupoUsuarioCadastroComponent extends CadForm implements OnInit {
  public config:{
    titulo:string,
    subTitle:string,
    btnSalvar:string;
  }={
    titulo:'GRUPO_DE_USUARIO',
    subTitle:'',
    btnSalvar:'SALVAR'
  }
  @ViewChild("pageCadastro") public pageCadastro:PageCadastroComponent;
  
  public form:FormGroup = new FormGroup({
    nome:new FormControl(null, Validators.required),
    descricao:new FormControl(null),
    cor:new FormControl('#ddd', Validators.required),
    ativo:new FormControl(true, Validators.required)
  }); 
  
  public grupoUsuario:GrupoUsuario = new GrupoUsuario();

  constructor(private grupoUsuarioService:GrupoUsuarioService,public eventService:EventBrokerService,
    public dialogService:DialogService) {
    super(eventService);

  }

  ngOnInit(): void { 
    super.ngOnInit();
  } 

  public novo(){
    super.novo();
    this.grupoUsuario = new GrupoUsuario();
  }
   
  public buscar(id:number, editavel:boolean){
    this.grupoUsuarioService.findById(id).subscribe((grupo)=>{
      this.montarForm(grupo,editavel);
    })
  }

  public montarForm(grupo:GrupoUsuario, editavel){
    this.grupoUsuario = grupo;
    this.form.controls['nome'].setValue(grupo.nome, {emitEvent:false});
    this.form.controls['descricao'].setValue(grupo.descricao, {emitEvent:false});
    this.form.controls['ativo'].setValue(grupo.ativo, {emitEvent:false});
    this.form.controls['cor'].setValue(grupo.cor, {emitEvent:false});
    
    if (editavel == false){
      this.form.disable();
    }    
  }

  public salvar(event){    
    if (this.form.invalid){
      this.pageCadastro.showWarnMsg('EXISTEM_CAMPOS_INVALIDOS');
      return ;
    }
    if (this.grupoUsuario == null){
      this.grupoUsuario = new GrupoUsuario();
    }
    this.grupoUsuario.nome = this.form.controls['nome'].value;
    this.grupoUsuario.cor = this.form.controls['cor'].value;
    this.grupoUsuario.ativo = this.form.controls['ativo'].value;
    this.grupoUsuario.descricao = this.form.controls['descricao'].value;
    this.grupoUsuarioService.save(this.grupoUsuario).subscribe((grupo)=>{
      this.grupoUsuario = grupo;
      this.pageCadastro.showSuccessMsg('SALVO_COM_SUCESSO');
      this.eventService.publishEvent(Events.atualizarLista);
    }, error=>{
      this.pageCadastro.showErrorMsg('FALHA_AO_SALVAR');
      console.log(error);
    })
  }

  public abrirDireitosAcesso(){
    const dialog = this.dialogService.open(DireitoAcessoDialogComponent, {
      data:this.grupoUsuario,
      modal:true,
      showHeader:true,
      closable:true,
      header:'Definir Acessos',
      closeOnEscape:true
    });
    dialog.onClose.subscribe((playlist)=>{
      
    });
  }

}
