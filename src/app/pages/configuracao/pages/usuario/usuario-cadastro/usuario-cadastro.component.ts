import { CadForm } from '@radocccomponentes/pagecadastro/cadform';
import { Events } from './../../../../../models/enum/events';
import { EventBrokerService } from 'ng-event-broker';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
import { PageCadastroComponent } from '@radocccomponentes/pagecadastro/pagecadastro.component';
import { GrupoUsuario } from '@radoccmodels/base/grupousuario';
import { Usuario } from '@radoccmodels/base/usuario';
import { TipoConteudo } from '@radoccmodels/tipoconteudo';
import { GrupoUsuarioService } from '@radoccservices/base/grupousuario-service';
import { UsuarioService } from '@radoccservices/base/usuario-service';
import { TipoConteudoService } from '@radoccservices/tipoconteudo-services';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.scss'],
  providers:[ 
    MessageService,UsuarioService,GrupoUsuarioService
  ]
})
export class UsuarioCadastroComponent extends CadForm implements OnInit {
  public config:{
    titulo:string,
    subTitle:string,
    btnSalvar:string;
  }={
    titulo:'USUARIO',
    subTitle:'',
    btnSalvar:'SALVAR'
  }
  
  public form:FormGroup = new FormGroup({
    nome:new FormControl('', Validators.required),
    cnpj:new FormControl('', Validators.required),
    login:new FormControl('', Validators.required),
    email:new FormControl('', Validators.required),
    senha:new FormControl('', Validators.required),
    confirmeSenha:new FormControl('', Validators.required),
    grupoUsuario:new FormControl(null, Validators.required)
  }) 
  
  public usuario:Usuario;
  public grupos:GrupoUsuario[] = [];

  constructor(public eventService:EventBrokerService, private usuarioService:UsuarioService,
    private grupoUsuarioService:GrupoUsuarioService) {
      super(eventService)
  }

  ngOnInit(): void { 
    super.ngOnInit();
  } 

  public novo(){
    super.novo();
    this.usuario = null;
  }

  public buscar(id:number, editavel:boolean){
    this.usuarioService.findById(id).subscribe((usuario)=>{
      this.montarForm(usuario,editavel);
    })
  }

  public montarForm(usuario:Usuario, editavel:boolean){
    this.usuario = usuario;
    this.form.controls['nome'].setValue(usuario.razaoSocial, {emitEvent:false});
    this.form.controls['login'].setValue(usuario.login, {emitEvent:false});
    this.form.controls['email'].setValue(usuario.email, {emitEvent:false});
    this.form.controls['cnpj'].setValue(usuario.cnpj, {emitEvent:false});
    this.form.controls['grupoUsuario'].setValue(usuario.grupoUsuario, {emitEvent:false});
    this.form.controls['senha'].setValue(usuario.senha, {emitEvent:false});
    this.form.controls['confirmeSenha'].setValue(usuario.senha, {emitEvent:false});
    if (editavel == false){
      this.form.disable();
    }    
  }
  
  public pesquisarGrupo(nome:string){ 
    this.grupoUsuarioService.buscarPorNome(nome).subscribe((lista)=>{
      this.grupos = lista;
    })
  }

  public salvar(event){    
    if (this.form.invalid){
      this.page.showWarnMsg('EXISTEM_CAMPOS_INVALIDOS');
      return ;
    }
    if (this.usuario == null){
      this.usuario = new Usuario();
    }
    this.usuario.razaoSocial = this.form.controls['nome'].value;
    this.usuario.login = this.form.controls['login'].value;
    this.usuario.email = this.form.controls['email'].value;
    this.usuario.cnpj = this.form.controls['cnpj'].value;
    this.usuario.senha = this.form.controls['senha'].value;
    this.usuario.grupoUsuario = this.form.controls['grupoUsuario'].value;
    
    this.usuarioService.save(this.usuario).subscribe((usuario)=>{
      this.usuario = usuario;
      this.page.showSuccessMsg('SALVO_COM_SUCESSO');
      this.eventService.publishEvent(Events.atualizarLista);
    }, error=>{
      this.page.showErrorMsg('FALHA_AO_SALVAR');
      console.log(error);
    })
  }
 

}
