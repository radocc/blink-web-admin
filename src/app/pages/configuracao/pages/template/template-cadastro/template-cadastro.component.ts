import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ImagemRequest } from '@radoccmodels/request/imagem-request';
import { ImagemService } from '@radoccservices/base/imagem-service';
import { ArquivoService } from '@radoccservices/base/arquivo-service';
import { Arquivo } from '@radoccmodels/base/arquivo';
import { FileUpload } from 'primeng/fileupload';
import { CampoAdicional } from '@radoccmodels/campoadicional';
import ECampoTipo from '@radoccmodels/enum/campo-tipo-enum';
import { TemplateCampo } from '@radoccmodels/templatecampo';
import EFontFamily from '@radoccmodels/enum/fonte-family-enum';
import EImagemFormato from '@radoccmodels/enum/imagem-formato-enum';
import EFonteEspessura from '@radoccmodels/enum/fonte-espessura-enum';
import { CdkDrag, CdkDragMove } from '@angular/cdk/drag-drop';
import { Portal } from '@angular/cdk/portal';
import { CadForm } from '@radocccomponentes/pagecadastro/cadform';
import { ResizeObserver } from '@juggle/resize-observer';
import { Template } from '@radoccmodels/template';
import { ActivatedRoute } from '@angular/router';
import { TemplateService } from '@radoccservices/template-services';
import { TipoConteudoService } from '@radoccservices/tipoconteudo-services';
import { TipoConteudo } from '@radoccmodels/tipoconteudo';
import { EventBrokerService } from 'ng-event-broker';
import { Events } from '@radoccmodels/enum/events';

@Component({
  selector: 'app-template-cadastro',
  templateUrl: './template-cadastro.component.html',
  styleUrls: ['./template-cadastro.component.scss'],
  providers: [ ArquivoService, TemplateService, TipoConteudoService ]
})
export class TemplateCadastroComponent extends CadForm implements OnInit {

  @ViewChild('fileupload', {static: true}) inputFile: FileUpload;
  @ViewChild('imageContainer', {static: false}) imageContainer: ElementRef;
  @ViewChildren(CdkDrag) cdkDrags: QueryList<CdkDrag>;

  public template: Template;
  public imageHeight = 400;
  public form: FormGroup;
  public loadImage: boolean = false;
  public arquivo:Arquivo;
  public inputUpload;
  public camposAdicionais: TemplateCampo[] = [];
  public tipos = ECampoTipo.values;
  public fontes = EFontFamily.values;
  public formatos = EImagemFormato.values;
  public espessuras = EFonteEspessura.values;
  public proportion: number = 1;
  public tiposConteudos: TipoConteudo[];

  constructor(private fb: FormBuilder,
    private imagemService: ImagemService,
    private arquivoService: ArquivoService,
    private route:ActivatedRoute,
    private service: TemplateService,
    private tipoConteudoService: TipoConteudoService,
    private eventService: EventBrokerService) { 
      super();
  }

  ngOnInit(): void {
    this.route.params.subscribe((param)=>{
      if (param['id']){
        this.buscar(param['id']);
      } else {
        this.template = new Template();
      }
    });

    this.buscarTiposConteudo();
  }

  ngAfterViewInit(): void {
    let me = this;
    this.setContainerImageHeight(me.imageContainer.nativeElement);
    window.addEventListener('resize', function(event) {
      me.setContainerImageHeight(me.imageContainer.nativeElement);
    });

  }

  //** Seta a altura para manter a proporção 16:9 */
  private setContainerImageHeight(div: HTMLDivElement) {
    this.imageHeight = div.offsetWidth * 0.5625;
    div.style.setProperty('height', this.imageHeight + 'px');
    if (this.arquivo != null) {
      this.proportion = this.arquivo.height / this.imageHeight;  
      for (let i = 0; i < this.camposAdicionais.length; i++) {
        this.setDistancia(this.camposAdicionais[i]);
      }
    }
    
  }

  public salvar() {
    this.template.campos = this.camposAdicionais;
    this.template.idArquivo = this.arquivo.id;

    this.service.save(this.template).subscribe(
      (data) => {
        this.page.showSuccessMsg('Template salvo com sucesso!');
        this.eventService.publishEvent(Events.atualizarLista);
        this.clearForm();
      },
      (err) => {
        console.error(err);
        this.page.showErrorMsg('Algo deu errado ao tentar salvar o Template');
      }
    );
  }

  public buscar(id) {
    this.service.findById(id).subscribe(
      (data) => {
        this.template = data;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  public async buscarTiposConteudo() {
    this.tiposConteudos = await this.tipoConteudoService.findAll().toPromise();
  }

  public clearForm() {
    this.template = new Template();
    this.arquivo = null;
    this.camposAdicionais = [];
  }

  //** Métodos para imagens */

  public pesquisarImagem() {
    if (this.inputUpload == null)
      this.inputUpload = this.inputFile.basicFileInput;
    this.inputUpload.nativeElement.click();
  }

  public adicionarImagem(event) {
    if (event.files.length > 0){
      event.progress = 10;
      this.arquivoService.postFile(event.files[0]).then((res)=>{
        event.progress = 100;
        this.arquivo = res;
        this.proportion = this.arquivo.height / this.imageHeight;
        console.log(res);
      })
    }    
  }


  //** Métodos dos campos adicionais */

  public adicionarCampo() {
    if (this.arquivo == null) {
      this.page.showWarnMsg('Necessário carregar uma imagem antes de adicionar um campo');
      // return;
    }
    let campo = new TemplateCampo();
    campo.sequencia = this.camposAdicionais.length + 1;
    this.camposAdicionais.push(campo);

    setTimeout(() => {
      let drag = document.getElementById(campo.hash);
      campo.height = drag.offsetHeight;
      campo.width = drag.offsetWidth;

      //**Detecta alteração de tamanho do campo */
      new ResizeObserver(() => {
        campo.height = drag.offsetHeight;
        campo.width = drag.offsetWidth;
      }).observe(drag);
    }, 300);
  }

  public onResize(event) {
    // console.log('resize');
  }

  public movendoCampo(event: CdkDragMove, campo: TemplateCampo) {
    // var content: any = event.source.element.nativeElement.children.namedItem('drag-content');
    let width = this.arquivo.width / this.proportion;
    // console.log('width: ', width);
    let position = event.source.getFreeDragPosition();
    // let childPos = content.offset();
    // console.log('childPos: ', childPos);
    // position = {x: childPos.top - position.x, y: childPos.left - position.y};
    
    // console.log('position: ', position);
    let left = (Math.round(position.x) / width) * 100;
    let top = (Math.round(position.y) / this.imageHeight) * 100;
    if (left < 0) left = 0;
    if (top < 0) top = 0;

    // console.log('left: ', left);
    // console.log('top: ', top);
    campo.left = left;
    campo.top = top;


  }

  public setDistancia(campo: TemplateCampo) {
    campo.drag = {x: (campo.left * (this.arquivo.width / this.proportion)) / 100, y: (campo.top * this.imageHeight) / 100};
  }

  public onKeyPress(event: KeyboardEvent, campo: TemplateCampo) {
    if (event.key == 'Enter') {
      this.setDistancia(campo);
    }
  }

  public setFieldWidth(event, campo: TemplateCampo) {
    let drag = document.getElementById(campo.hash);
    let content: any = drag.children.namedItem('drag-content');
    content.style.width = campo.width + 'px';
  }

  public setFieldHeight(event, campo: TemplateCampo) {
    let drag = document.getElementById(campo.hash);
    let content: any = drag.children.namedItem('drag-content');
    content.style.height = campo.height + 'px';
  }
}
