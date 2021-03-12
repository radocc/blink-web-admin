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
export class UsuarioCadastroComponent implements OnInit {
  public config:{
    titulo:string,
    subTitle:string,
    btnSalvar:string;
  }={
    titulo:'USUARIO',
    subTitle:'',
    btnSalvar:'SALVAR'
  }
  @ViewChild("pageCadastro") public pageCadastro:PageCadastroComponent;
  
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

  constructor(private eventService:EventBrokerService, private usuarioService:UsuarioService,
    private grupoUsuarioService:GrupoUsuarioService) {

  }

  ngOnInit(): void { 
  } 
  
  public pesquisarGrupo(nome:string){ 
    this.grupoUsuarioService.buscarPorNome(nome).subscribe((lista)=>{
      this.grupos = lista;
    })
  }

  public salvar(event){    
    if (this.form.invalid){
      this.pageCadastro.showWarnMsg('EXISTEM_CAMPOS_INVALIDOS');
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
      this.pageCadastro.showSuccessMsg('SALVO_COM_SUCESSO');
      this.eventService.publishEvent(Events.atualizarLista);
    }, error=>{
      this.pageCadastro.showErrorMsg('FALHA_AO_SALVAR');
      console.log(error);
    })
  }
 

}
