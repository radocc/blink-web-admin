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
import { CustomValidators } from 'ng2-validation';

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
  
  public form:FormGroup = null;
  
  public usuario:Usuario;
  public grupos:GrupoUsuario[] = [];

  constructor(public eventService:EventBrokerService, private usuarioService:UsuarioService,
    private grupoUsuarioService:GrupoUsuarioService) {
      super(eventService)
  }

  ngOnInit(): void { 
    super.ngOnInit();
    const senha = new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(50)]));
    const confirmeSenha = new FormControl('', Validators.compose([CustomValidators.equalTo(senha), Validators.required]));
    this.form = new FormGroup({
      nome:new FormControl('', Validators.required),
      email:new FormControl('', Validators.required),
      senha:senha,
      confirmeSenha:confirmeSenha,
      grupoUsuario:new FormControl(null, Validators.required)
    }) 

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
    this.form.controls['email'].setValue(usuario.email, {emitEvent:false});
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
    this.usuario.login = this.form.controls['email'].value;
    this.usuario.email = this.form.controls['email'].value;
    this.usuario.cnpj = '0';
    this.usuario.senha = this.form.controls['senha'].value;
    this.usuario.grupoUsuario = this.form.controls['grupoUsuario'].value;
    
    this.usuarioService.save(this.usuario).subscribe((usuario)=>{
      this.usuario = usuario;
      this.page.showSuccessMsg('SALVO_COM_SUCESSO');
      this.eventService.publishEvent(Events.atualizarLista);
    }, resp=>{      
      this.page.showErrorMsg(resp.error.message);
      console.log(resp);
    })
  }

  public validarEmail(){
    let idUsuario = -1
    if ( this.usuario != null){
      idUsuario = this.usuario.id;
    }
    let email = this.form.controls['email'].value;
    this.usuarioService.existeEmail(email, idUsuario).subscribe((res)=>{
      if (res){
        this.form.controls['email'].setErrors({ 'jaExiste':true});
      }else{
        this.form.controls['email'].setErrors(null);
      }
    })
  }

}
