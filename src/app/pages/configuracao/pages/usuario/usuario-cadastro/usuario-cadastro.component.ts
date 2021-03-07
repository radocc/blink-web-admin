import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
import { PageCadastroComponent } from '@radocccomponentes/pagecadastro/pagecadastro.component';
import { Usuario } from '@radoccmodels/base/usuario';
import { TipoConteudo } from '@radoccmodels/tipoconteudo';
import { UsuarioService } from '@radoccservices/base/usuario-service';
import { TipoConteudoService } from '@radoccservices/tipoconteudo-services';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.scss'],
  providers:[ 
    MessageService,UsuarioService
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
    sequencia:new FormControl('', Validators.required)
  }) 
  
  public usuario:Usuario;

  constructor(private msgService:MessageService, private usuarioService:UsuarioService) {

  }

  ngOnInit(): void { 
  } 
  
  public salvar(event){    
    if (this.form.invalid){
      this.pageCadastro.showWarnMsg('EXISTEM_CAMPOS_INVALIDOS');
      return ;
    }
    // if (this.tipo == null){
    //   this.tipo = new TipoConteudo();
    // }
    // this.tipo.nome = this.form.controls['nome'].value;
    // this.tipo.sequencia = this.form.controls['sequencia'].value;
    
    // this.tipoConteudoService.save(this.tipo).subscribe((equipamento)=>{
    //   this.tipo = equipamento;
    //   this.pageCadastro.showSuccessMsg('SALVO_COM_SUCESSO');
    // }, error=>{
    //   this.pageCadastro.showErrorMsg('FALHA_AO_SALVAR');
    //   console.log(error);
    // })
  }
 

}
