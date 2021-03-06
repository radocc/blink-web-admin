import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
import { ETipoConteudo } from '@radoccmodels/enum/etipoConteudo';
import { FonteNoticia } from '@radoccmodels/fontenoticia';
import { Template } from '@radoccmodels/template';
import { TipoConteudo } from '@radoccmodels/tipoconteudo';
import { FonteNoticiaService } from '@radoccservices/fontenoticia-services';
import { TemplateService } from '@radoccservices/template-services';
import { TipoConteudoService } from '@radoccservices/tipoconteudo-services';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-fontenoticia-cadastro',
  templateUrl: './fontenoticia-cadastro.component.html',
  styleUrls: ['./fontenoticia-cadastro.component.scss'],
  providers:[ 
    MessageService,FonteNoticiaService, TemplateService
  ]
})
export class FonteNoticiaCadastroComponent implements OnInit {
  public config:{
    titulo:string,
    subTitle:string,
    btnSalvar:string;
  }={
    titulo:'FONTE_DE_NOTICIA',
    subTitle:'',
    btnSalvar:'SALVAR'
  }
  
  public form:FormGroup = new FormGroup({
    nome:new FormControl('', Validators.required),
    url:new FormControl('', Validators.required),
    template:new FormControl('', Validators.required)
  }) 
  public templates:Template[] = []
  
  public fonteNoticia:FonteNoticia;

  constructor(private msgService:MessageService, private fonteNoticiaService:FonteNoticiaService, private templateService:TemplateService) {

  }

  ngOnInit(): void { 
  } 

  public pesquisarTemplate(nome){
    this.templateService.findNomeETipo(nome,ETipoConteudo.Noticias).subscribe((lista)=>{
      this.templates = lista;
    })
  }
  
  public salvar(event){    
    if (this.form.invalid){
      this.msgService.add({
        severity:'error', summary:'Campos inválidos', detail:'Verifique os campos com asterisco vermelho'
      })
      return ;
    }
    if (this.fonteNoticia == null){
      this.fonteNoticia = new FonteNoticia();
    }
    this.fonteNoticia.nome = this.form.controls['nome'].value;
    this.fonteNoticia.url = this.form.controls['url'].value;
    this.fonteNoticia.template = this.form.controls['template'].value;
    
    this.fonteNoticiaService.save(this.fonteNoticia).subscribe((fonteNoticia)=>{
      this.fonteNoticia = fonteNoticia;
    }, error=>{
      console.log(error);
    })
  }
 

}