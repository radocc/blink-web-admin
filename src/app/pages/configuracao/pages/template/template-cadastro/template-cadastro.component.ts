import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ImagemService } from '@radoccservices/base/imagem-service';
import { ArquivoService } from '@radoccservices/base/arquivo-service';
import { Arquivo } from '@radoccmodels/base/arquivo';
import { FileUpload } from 'primeng/fileupload';
import ECampoTipo from '@radoccmodels/enum/campo-tipo-enum';
import { TemplateCampo } from '@radoccmodels/templatecampo';
import EFontFamily from '@radoccmodels/enum/fonte-family-enum';
import EImagemFormato from '@radoccmodels/enum/imagem-formato-enum';
import EFonteEspessura from '@radoccmodels/enum/fonte-espessura-enum';
import { CdkDrag, CdkDragMove } from '@angular/cdk/drag-drop';
import { CadForm } from '@radocccomponentes/pagecadastro/cadform';
import { ResizeObserver } from '@juggle/resize-observer';
import { Template } from '@radoccmodels/template';
import { ActivatedRoute } from '@angular/router';
import { TemplateService } from '@radoccservices/template-services';
import { TipoConteudoService } from '@radoccservices/tipoconteudo-services';
import { TipoConteudo } from '@radoccmodels/tipoconteudo';
import { EventBrokerService } from 'ng-event-broker';
import { Events } from '@radoccmodels/enum/events';
import { TemplateCampoService } from '@radoccservices/templatecampo-services';
import { VariaveisTipo } from '@radoccmodels/enum/variaveis-tipo-enum';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { ETipoConteudo } from '@radoccmodels/enum/etipoConteudo';
import ETextAlinhamento from '@radoccmodels/enum/text-alinhamento-enum';
import { Accordion } from 'primeng/accordion';
import { ConfigAmbienteService } from '@radoccservices/configambiente-services';
import { ConfigAmbiente } from '@radoccmodels/configambiente';

@Component({
  selector: 'app-template-cadastro',
  templateUrl: './template-cadastro.component.html',
  styleUrls: ['./template-cadastro.component.scss'],
  providers: [ ArquivoService, TemplateService, TipoConteudoService, TemplateCampoService, ConfigAmbienteService ]
})
export class TemplateCadastroComponent extends CadForm implements OnInit {

  @ViewChild('fileupload', {static: true}) inputFile: FileUpload;
  @ViewChild('imageContainer', {static: false}) imageContainer: ElementRef;
  @ViewChildren(CdkDrag) cdkDrags: QueryList<CdkDrag>;
  @ViewChild("accordion", {static:true}) accordion:Accordion;

  public template: Template = new Template();
  public imageHeight = 400;
  public form: FormGroup;
  public loadImage: boolean = false;
  public arquivo:Arquivo;
  public inputUpload;
  public camposAdicionais: TemplateCampo[] = [];
  public tipos = ECampoTipo.values;
  public fontes = EFontFamily.values;
  public alinhamentos = ETextAlinhamento.values;
  public formatos = EImagemFormato.values;
  public espessuras = EFonteEspessura.values;
  public proportion: number = 1;
  public tiposConteudos: TipoConteudo[];
  public variaveisNoticias = VariaveisTipo.map.noticia;
  public variaveisPrevisoes = VariaveisTipo.map.previsao;
  public variaveisLoteria = VariaveisTipo.map.loteria;
  private subscriptionTipo: Subscription;
  public campoSelecionado: TemplateCampo;
  public configAmbiente:ConfigAmbiente;

  constructor(private fb: FormBuilder,
    private imagemService: ImagemService,
    private arquivoService: ArquivoService,
    private route:ActivatedRoute,
    private service: TemplateService,
    private tipoConteudoService: TipoConteudoService,
    public eventService: EventBrokerService,
    private configService:ConfigAmbienteService,
    private campoService : TemplateCampoService) { 
      super(eventService);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome:new FormControl(null,[Validators.required]),
      tipoConteudo:new FormControl(null,[Validators.required]),
      todasEmpresas:new FormControl(true)
    })
    super.ngOnInit()
    
    this.route.params.subscribe((param)=>{
      if (param['id']){
        this.buscar(param['id']);
      } else {
        this.template = new Template();
      }
    });

    this.buscarTiposConteudo();
    this.configService.getConfig().subscribe((config)=>{
      this.configAmbiente = config;
      this.form.controls['todasEmpresas'].setValue(config.criaTemplatePublico);
    })
  }

  ngAfterViewInit(): void {
    let me = this;
    this.setContainerImageHeight(me.imageContainer.nativeElement);
    window.addEventListener('resize', function(event) {
      me.setContainerImageHeight(me.imageContainer.nativeElement);
    });

    this.subscriptionTipo = this.eventService.subscribeEvent(Events.configAtualizaTipoTemplate).subscribe((tipo: TipoConteudo) => {
      if (this.template.id == null) {
        this.template.idTipoConteudo = tipo.id;
        this.template.tipoConteudo = tipo;
      }
    });
  }

  ngOnDestroy() {
    this.subscriptionTipo.unsubscribe();
  }

  public novo() {    
    this.clearForm();
    this.template = new Template();
    this.template.idTipoConteudo = parseInt(localStorage.getItem('configTipoConteudo'));
    this.form.controls['todasEmpresas'].setValue(this.configAmbiente.criaTemplatePublico);
    this.inputFile.clear();
  }

  public async copiar(id:number) {
    this.template = await this.service.findById(id).toPromise();
    if (this.template != null) {
      this.arquivo = await this.arquivoService.findById(this.template.idArquivo).toPromise();
      this.form.controls['nome'].setValue(this.template.nome);
      this.form.controls['todasEmpresas'].setValue(this.template.todasEmpresas);
      
    }      
    this.camposAdicionais = await this.campoService.getByTemplate(this.template.id)
      .pipe(
        map((campos) => {
          campos.forEach(campo => {
            campo.hash = uuidv4();
            campo.preenchimento = !campo.cadastro;
            campo.id = null;
            campo.versao = null;
          });
          return campos;
        })
      )
      .toPromise();
    this.template.id = null;
    this.template.versao = null;

    setTimeout(() => {
      this.setContainerImageHeight(this.imageContainer.nativeElement);
      this.camposAdicionais.forEach((campo) => {
        campo.valor = 'Texto aqui';
        setTimeout(() => {
          const drag = document.getElementById(campo.hash);
          const dragContent: any = drag.getElementsByClassName('drag-content').item(0);
          campo.width = (Math.round(this.imageContainer.nativeElement.clientWidth) * campo.width) / 100;
          campo.height = (Math.round(this.imageContainer.nativeElement.clientHeight) * campo.height) / 100;

          dragContent.style.width = campo.width + 'px';
          dragContent.style.height = campo.height + 'px';
          this.setTamanhoCampo(campo);
        }, 300);        
      });
      for (let w =0;w < this.camposAdicionais.length;w++){
        this.accordion.activeIndex = w;
      }
    }, 100);
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
    this.prepararCampos();
    if (this.arquivo == null) {
      this.page.showErrorMsg('E_NECESSARIO_ADICIONAR_UMA_IMAGEM');
      return;
    }
    this.template.idArquivo = this.arquivo.id;
    this.template.campos = this.camposAdicionais;
    this.template.nome = this.form.controls['nome'].value;
    this.template.todasEmpresas = this.form.controls['todasEmpresas'].value;
    this.service.save(this.template).subscribe(
      (data) => {
        this.page.showSuccessMsg('Template salvo com sucesso!');
        this.eventService.publishEvent(Events.atualizarLista);
        this.novo();
      },
      (err) => {
        console.error(err);
        this.page.showErrorMsg('Algo deu errado ao tentar salvar o Template');
      }
    );
  }

  private prepararCampos() {
    // this.camposAdicionais.forEach((campo) => {
    //   if (campo.tipo == 4) {
    //     campo.width = campo.width * this.proportion;
    //     campo.height = campo.height * this.proportion;
    //   }
    // });

    this.template.campos = this.camposAdicionais;
  }

  public async buscar(id) {
    this.template = await this.service.findById(id).toPromise();
    if (this.template != null) {
      this.arquivo = await this.arquivoService.findById(this.template.idArquivo).toPromise();
      this.form.controls['nome'].setValue(this.template.nome);
      this.form.controls['todasEmpresas'].setValue(this.template.todasEmpresas);
    }      
    this.camposAdicionais = await this.campoService.getByTemplate(this.template.id)
      .pipe(
        map((campos) => {
          campos.forEach(campo => {
            campo.hash = uuidv4();
            campo.preenchimento = !campo.cadastro;
          });
          return campos;
        })
      )
      .toPromise();
    setTimeout(() => {
      this.setContainerImageHeight(this.imageContainer.nativeElement);
      this.camposAdicionais.forEach((campo) => {
        campo.valor = 'Texto aqui';
        setTimeout(() => {
          const drag = document.getElementById(campo.hash);
          const dragContent: any = drag.getElementsByClassName('drag-content').item(0);
          campo.width = (Math.round(this.imageContainer.nativeElement.clientWidth) * campo.width) / 100;
          campo.height = (Math.round(this.imageContainer.nativeElement.clientHeight) * campo.height) / 100;

          dragContent.style.width = campo.width + 'px';
          dragContent.style.height = campo.height + 'px';
          this.setTamanhoCampo(campo);
        }, 300);        
      });
      for (let w =0;w < this.camposAdicionais.length;w++){
        this.accordion.activeIndex = w;
      }
    }, 100);
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
    console.log(event);
    if (event.files.length > 0){
      event.progress = 10;
      this.arquivoService.postFile(event.files[0]).then((res)=>{
        event.progress = 100;
        this.arquivo = res;
        this.proportion = this.arquivo.height / this.imageHeight;
        console.log(res);
      }).catch(err => {
        console.error(err);
        this.page.showErrorMsg(err?.message);
        this.inputFile.clear();
      });
    }    
  }

  public adicionarImagemCampo(event, campo: TemplateCampo) {
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
    campo.hash = uuidv4();
    campo.sequencia = this.camposAdicionais.length + 1;
    if (campo.sequencia > 1) {
      campo.positionTop = this.camposAdicionais.length * 10;
      this.setDistancia(campo);
    }
    this.camposAdicionais.push(campo);
    this.accordion.updateSelectionState();
    this.campoSelecionado = campo;    
    setTimeout(() => {
      this.setTamanhoCampo(campo);
      // this.accordion.activeIndex = this.accordion.tabList.length-1;
    }, 300);
  }

  private setTamanhoCampo(campo: TemplateCampo) {
    let drag = document.getElementById(campo.hash);
    campo.height = drag.offsetHeight;
    campo.width = drag.offsetWidth;

    //**Detecta alteração de tamanho do campo */
    new ResizeObserver(() => {
      campo.height = drag.offsetHeight;
      campo.width = drag.offsetWidth;
      console.log(this.imageContainer.nativeElement.clientHeight);
      console.log(this.imageContainer.nativeElement.clientWidth);
      if (this.imageContainer.nativeElement){
        let height = this.imageContainer.nativeElement.clientHeight;
        let proporHeigth = campo.height * 100 / height;
        campo.height = proporHeigth;
        let width =  this.imageContainer.nativeElement.clientWidth;
        let proporWidth = campo.width * 100 / width;
        campo.width = proporWidth;
      }      
      let campoImagem = document.getElementById(campo.hash+'-imagem');
      if (campoImagem != null) {
        campoImagem.style.height = (drag.offsetHeight - 2) + 'px';
        campoImagem.style.width = (drag.offsetWidth - 2) + 'px';
      }
    }).observe(drag);
  }

  public onResize(event) {
    console.log('resize', event);
  }

  public movendoCampo(event: CdkDragMove, campo: TemplateCampo) {
    // var content: any = event.source.element.nativeElement.children.namedItem('drag-content');
    let width = this.arquivo.width / this.proportion;
    // console.log('width: ', width);
    let position = event.source.getFreeDragPosition();
    // console.log('drag position', position);
    // let childPos = content.offset();
    // console.log('childPos: ', childPos);
    // position = {x: childPos.top - position.x, y: childPos.left - position.y};
    
    // console.log('position: ', position);
    let left = (Math.round(position.x) / width) * 100;
    let top = (Math.round(position.y) / this.imageHeight) * 100;
    // let left = Math.round(position.x);
    // let top = Math.round(position.y);
    if (left < 0 || left == Infinity || isNaN(left)) left = 0;
    if (top < 0 || top == Infinity || isNaN(top)) top = 0;

    // console.log('left: ', left);
    // console.log('top: ', top);
    campo.positionLeft = left;
    campo.positionTop = top;


  }

  public setDistancia(campo: TemplateCampo) {
    campo.drag = {x: (campo.positionLeft * (this.arquivo.width / this.proportion)) / 100, y: (campo.positionTop * this.imageHeight) / 100};
  }

  public selecionarCampo(event: any, campo: TemplateCampo) {
    if (!event) {
      this.campoSelecionado = new TemplateCampo();
      this.campoSelecionado.hash = '0';
    } else {
      this.campoSelecionado = campo;
    }
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

  public changeCadastro(event, campo: TemplateCampo) {
    // campo.cadastro = !event.checked;
  }

  public changeVariavel(event, campo: TemplateCampo) {
    if (campo.cadastro) {
      if (campo.variavel == 'variavelCustomizado'){
        campo.nome = '';
        return;
      }
      let tipoConteudo = this.form.controls['tipoConteudo'].value;
      if (tipoConteudo.tipo == ETipoConteudo.Noticias) {
        campo.nome = VariaveisTipo.getNome('noticia', campo.variavel);
      } else if (tipoConteudo.tipo == ETipoConteudo.PrevisaoTempo) {
        campo.nome = VariaveisTipo.getNome('previsao', campo.variavel);
      }else if (tipoConteudo.tipo == ETipoConteudo.Loteria) {
        campo.nome = VariaveisTipo.getNome('loteria', campo.variavel);
      }else {
        campo.nome = campo.variavel;
      }      
    }
  }

  public excluirCampo(campo){
    let index = this.camposAdicionais.indexOf(campo);
    this.camposAdicionais.splice(index,1);
  }
}
