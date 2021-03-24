import { CadForm } from '@radocccomponentes/pagecadastro/cadform';
import { Events } from '../../../../../models/enum/events';
import { EventBrokerService } from 'ng-event-broker';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
import { PageCadastroComponent } from '@radocccomponentes/pagecadastro/pagecadastro.component';
import { Loteria } from '@radoccmodels/loteria';
import { LoteriaService } from '@radoccservices/loteria-services';
import { MessageService } from 'primeng/api';
import { NoticiaService } from '@radoccservices/noticia-services';
import { Noticia } from '@radoccmodels/noticia';

@Component({
  selector: 'app-noticia-cadastro',
  templateUrl: './noticia-cadastro.component.html',
  styleUrls: ['./noticia-cadastro.component.scss'],
  providers:[ 
    MessageService,NoticiaService
  ]
})
export class NoticiaCadastroComponent extends CadForm implements OnInit {
  public config:{
    titulo:string,
    subTitle:string,
    btnSalvar:string;
  }={
    titulo:'NOTICIA',
    subTitle:'',
    btnSalvar:'SALVAR'
  } 
  
  public form:FormGroup = new FormGroup({
    titulo:new FormControl('', Validators.required),
    descricao:new FormControl(''),
    link:new FormControl('')
  }) 
  
  public noticia:Noticia;

  constructor(private msgService:MessageService, private noticiaService:NoticiaService,
    public eventService: EventBrokerService) {
      super(eventService)

  }

  ngOnInit(): void { 
    super.ngOnInit();
  } 

  public novo(){
    super.novo();
    this.noticia = null;
  }
  
  public buscar(id:number, editavel:boolean){
    this.noticiaService.findById(id).subscribe((loteria)=>{
      this.montarForm(loteria,editavel);
    })
  }

  public montarForm(noticia:Noticia, editavel:boolean){
    this.noticia = noticia;
    this.form.controls['titulo'].setValue(noticia.titulo, {emitEvent:false});
    this.form.controls['descricao'].setValue(noticia.descricao, {emitEvent:false});
    this.form.controls['link'].setValue(noticia.link, {emitEvent:false});
    
    if (editavel == false){
      this.form.disable();
    }    
  }

  public salvar(event){    
    if (this.form.invalid){
      this.page.showWarnMsg('EXISTEM_CAMPOS_OBRIGATORIOS');
      return ;
    }
    if (this.noticia == null){
      this.noticia = new Noticia();
    }
    this.noticia.titulo = this.form.controls['titulo'].value;
    this.noticia.descricao = this.form.controls['descricao'].value;
    this.noticiaService.save(this.noticia).subscribe((loteria)=>{
      this.noticia = loteria;
      this.page.showSuccessMsg('SALVO_COM_SUCESSO');
      this.eventService.publishEvent(Events.atualizarLista);
    }, error=>{
      console.log(error);
      this.page.showErrorMsg("FALHA_AO_SALVAR");
    })
  }
 

}
