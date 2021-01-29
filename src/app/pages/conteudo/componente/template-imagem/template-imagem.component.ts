import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Arquivo } from '@radoccmodels/base/arquivo';
import { Conteudo } from '@radoccmodels/conteudo';
import { ArquivoService } from '@radoccservices/base/arquivo-service';
import { ConteudoService } from '@radoccservices/conteudo-services';
import { RegisterActionComponent } from 'app/componentes/register-action/register-action.component';
import { MessageService } from 'primeng/api';
import { PanelAgendamentoComponent } from '../panel-agendamento/panel-agendamento.component';

@Component({
  selector: 'app-template-imagem-conteudo',
  templateUrl: './template-imagem.component.html',
  styleUrls: ['./template-imagem.component.scss'],
  providers:[
    ArquivoService,
    MessageService,ConteudoService
  ]
})
export class TemplateImagemComponent implements OnInit {

  @ViewChild("panelAgendamento") public panelAgendamento:PanelAgendamentoComponent;

  public form:FormGroup = new FormGroup({
    titulo:new FormControl('', Validators.required),    
    minutos:new FormControl(),
    segundos:new FormControl(),
  }) 
  
  public arquivo:Arquivo;
  public files:File[] = [];
  public conteudo:Conteudo;
  public mostrarPreview:boolean = false;

  constructor(public arquivoService:ArquivoService, private msgService:MessageService, private conteudoService:ConteudoService,private router:Router,
    private route:ActivatedRoute) {

  }

  ngOnInit(): void { 
    this.route.params.subscribe((param)=>{
      if (param['id']){
          this.buscar(param['id']);
      }
    })
  }

  public buscar(id:number){
    this.conteudoService.findConteudoImagem(id).subscribe((conteudo)=>{
      this.conteudo = conteudo;
      if (conteudo != null){
        this.form.controls['titulo'].setValue(conteudo.titulo);
        let min = (conteudo.tempoExibicao / 60).toFixed(0);
        let segundos = (conteudo.tempoExibicao % 60);
        this.form.controls['minutos'].setValue(min);
        this.form.controls['segundos'].setValue(segundos);
        this.arquivo = conteudo.arquivo;
        let file = new File([], this.arquivo.nome);
        this.files = [file ];
        this.panelAgendamento.setAgendamento(conteudo.agendamento);
      }
    });
  }

  public uploadFile(event){
    if (event.files.length > 0){
      event.progress = 10;
      this.arquivoService.postFile(event.files[0]).then((res)=>{
        event.progress = 100;
        this.arquivo = res;
        console.log(res);
      })
    }    
  }  
  
  public salvar(){    
    if (this.form.invalid || this.panelAgendamento.validar()==false && this.arquivo != null){
      this.msgService.add({
        severity:'error', summary:'Campos inválidos', detail:'Verifique os campos com asterisco vermelho'
      })
      return ;
    }
    if (this.conteudo == null){
      this.conteudo = new Conteudo();
    }
    this.conteudo.titulo = this.form.controls['titulo'].value;
    this.conteudo.idTipoConteudo = 2//Imagens
    let segundos = this.form.controls['segundos'].value;
    segundos += (this.form.controls['minutos'].value * 60);
    this.conteudo.tempoExibicao = segundos;
    this.conteudo.idTemplate = null;
    this.conteudo.idArquivo = this.arquivo.id;
    this.conteudo.agendamento = this.panelAgendamento.getAgendamento();
    this.conteudoService.save(this.conteudo).subscribe((conteudo)=>{
      this.conteudo = conteudo;
      this.panelAgendamento.setAgendamento(conteudo.agendamento);
      this.msgService.add({
        detail:'SALVO_COM_SUCESSO',
        summary:'ESTA SALVO'
      })
    }, error=>{
      console.log(error);
    })
  }

  public publicar(){

  }

  public preview(){
    this.mostrarPreview = true;
  }

  public importar(){

  }

  public novo(){
    this.form.reset();
    this.arquivo = null;
    this.panelAgendamento.reset();
    this.router.navigate(['admin/conteudo/panel/imagem']);
  }

}
