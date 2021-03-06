import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
import { TipoConteudo } from '@radoccmodels/tipoconteudo';
import { TipoConteudoService } from '@radoccservices/tipoconteudo-services';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-tipoconteudo-cadastro',
  templateUrl: './tipoconteudo-cadastro.component.html',
  styleUrls: ['./tipoconteudo-cadastro.component.scss'],
  providers:[ 
    MessageService,TipoConteudoService
  ]
})
export class TipoConteudoCadastroComponent implements OnInit {
  public config:{
    titulo:string,
    subTitle:string,
    btnSalvar:string;
  }={
    titulo:'TIPO_DE_CONTEUDO',
    subTitle:'',
    btnSalvar:'SALVAR'
  }
  
  public form:FormGroup = new FormGroup({
    nome:new FormControl('', Validators.required),
    sequencia:new FormControl('', Validators.required)
  }) 
  
  public tipo:TipoConteudo;

  constructor(private msgService:MessageService, private tipoConteudoService:TipoConteudoService) {

  }

  ngOnInit(): void { 
  } 
  
  public salvar(event){    
    if (this.form.invalid){
      this.msgService.add({
        severity:'error', summary:'Campos inválidos', detail:'Verifique os campos com asterisco vermelho'
      })
      return ;
    }
    if (this.tipo == null){
      this.tipo = new TipoConteudo();
    }
    this.tipo.nome = this.form.controls['nome'].value;
    this.tipo.sequencia = this.form.controls['sequencia'].value;
    
    this.tipoConteudoService.save(this.tipo).subscribe((equipamento)=>{
      this.tipo = equipamento;
    }, error=>{
      console.log(error);
    })
  }
 

}
