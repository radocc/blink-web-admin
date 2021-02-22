import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ImagemRequest } from '@radoccmodels/request/imagem-request';
import { ImagemService } from '@radoccservices/base/imagem-service';
import { ArquivoService } from '@radoccservices/base/arquivo-service';
import { Arquivo } from '@radoccmodels/base/arquivo';
import { FileUpload } from 'primeng/fileupload';
import { CampoAdicional } from '@radoccmodels/campoadicional';
import ECampoTipo from '@radoccmodels/enum/campo-tipo-enum';
import { TemplateCampoAdicional } from '@radoccmodels/templatecampoadicional';
import EFontFamily from '@radoccmodels/enum/fonte-family-enum';
import EImagemFormato from '@radoccmodels/enum/imagem-formato-enum';
import EFonteEspessura from '@radoccmodels/enum/fonte-espessura-enum';
import { CdkDrag, CdkDragMove } from '@angular/cdk/drag-drop';
import { Portal } from '@angular/cdk/portal';

@Component({
  selector: 'app-template-cadastro',
  templateUrl: './template-cadastro.component.html',
  styleUrls: ['./template-cadastro.component.scss'],
  providers: [ArquivoService]
})
export class TemplateCadastroComponent implements OnInit {

  @ViewChild('fileupload', {static: true}) inputFile: FileUpload;
  @ViewChild('imageContainer', {static: false}) imageContainer: ElementRef;
  @ViewChildren(CdkDrag) cdkDrags: QueryList<CdkDrag>;

  public imageHeight = 400;
  public form: FormGroup;
  public loadImage: boolean = false;
  public arquivo:Arquivo;
  public inputUpload;
  public camposAdicionais: TemplateCampoAdicional[] = [];
  public tipos = ECampoTipo.values;
  public fontes = EFontFamily.values;
  public formatos = EImagemFormato.values;
  public espessuras = EFonteEspessura.values;
  public proportion: number = 1;

  constructor(private fb: FormBuilder,
    private imagemService: ImagemService,
    private arquivoService: ArquivoService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    let me = this;
    this.setHeight(me.imageContainer.nativeElement);
    window.addEventListener('resize', function(event) {
      me.setHeight(me.imageContainer.nativeElement);
    });
  }

  //** Seta a altura para manter a proporção 16:9 */
  private setHeight(div: HTMLDivElement) {
    this.imageHeight = div.offsetWidth * 0.5625;
    div.style.setProperty('height', this.imageHeight + 'px');
    if (this.arquivo != null) {
      this.proportion = this.arquivo.height / this.imageHeight;  
      for (let i = 0; i < this.camposAdicionais.length; i++) {
        this.setDistancia(this.camposAdicionais[i]);
      }
    }
    
  }

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

  public toArrayBuffer(file, retorno) {
    var reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function () {
        retorno(reader.result);
    };
  }

  public adicionarCampo() {
    this.camposAdicionais.push(new TemplateCampoAdicional());
    
  }

  public movendoCampo(event: CdkDragMove, campo: TemplateCampoAdicional) {
    
    let width = this.arquivo.width / this.proportion;
    console.log('width: ', width);
    let position = event.source.getFreeDragPosition();
    console.log('position: ', position);
    let left = (Math.round(position.x) / width) * 100;
    let top = (Math.round(position.y) / this.imageHeight) * 100;
    if (left < 0) left = 0;
    if (top < 0) top = 0;

    console.log('left: ', left);
    console.log('top: ', top);
    campo.left = left;
    campo.top = top;


  }

  public setDistancia(campo: TemplateCampoAdicional) {
    campo.drag = {x: (campo.left * (this.arquivo.width / this.proportion)) / 100, y: (campo.top * this.imageHeight) / 100};
  }

  public onKeyPress(event: KeyboardEvent, campo: TemplateCampoAdicional) {
    if (event.key == 'Enter') {
      this.setDistancia(campo);
    }
  }
}
