import { CadForm } from '@radocccomponentes/pagecadastro/cadform';
import { Events } from '../../../../../models/enum/events';
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
import { EmpresaService } from '@radoccservices/base/empresa-service';
import { EstadoService } from '@radoccservices/base/estado-service';
import { CidadeService } from '@radoccservices/base/cidade-service';
import { Empresa } from '@radoccmodels/base/empresa';
import { Estado } from '@radoccmodels/base/estado';
import { Cidade } from '@radoccmodels/base/cidade';

@Component({
  selector: 'app-empresa-cadastro',
  templateUrl: './empresa-cadastro.component.html',
  styleUrls: ['./empresa-cadastro.component.scss'],
  providers: [
    EmpresaService, EstadoService, CidadeService
  ]
})
export class EmpresaCadastroComponent extends CadForm implements OnInit {
  public config: {
    titulo: string,
    subTitle: string,
    btnSalvar: string;
  } = {
      titulo: 'EMPRESA',
      subTitle: '',
      btnSalvar: 'SALVAR'
    }

  getPorIdEstado: any;
  public empresa: Empresa = new Empresa();
  public formCadastro: FormData;
  public listaEstado: Estado[];
  public listaCidade: Cidade[];
  public cidade: Cidade = new Cidade();
  public cep = new Empresa();
  public cidadeChangeObserver: any;
  public estadoChangeObserver: any;
  public mascara: string = '999.999.999-99?';
  public confirmaSenha: string;
  //private md5Service: MD5Service = new MD5Service();

  constructor(public eventService: EventBrokerService, private empresaService: EmpresaService,
    public estadoService: EstadoService, public cidadeService: CidadeService,) {
    super(eventService)
  }

  public form: FormGroup = new FormGroup({
    razaoSocial: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(150)])),
    cnpjEmpresa: new FormControl('', Validators.required),
    fantasiaEmpresa: new FormControl(null),
    cep: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(10)])),
    estado: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])),
    cidade: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(150)])),
    emailEmpresa: new FormControl('', Validators.required),
    telefoneEmpresa: new FormControl(null),
    bairro: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])),
    rua: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])),
    complemento: new FormControl(null),
    numero: new FormControl(null),
    site: new FormControl(null),
  })


  ngOnInit(): void {
    super.ngOnInit();
  }

  public novo() {
    super.novo();
    this.empresa = null;
  }

  public buscar(id: number, editavel: boolean) {
    this.empresaService.findById(id).subscribe((empresa) => {
      this.montarForm(empresa, editavel);
    })
  }

  public findCidadePorNomeEIdEstado(nome: string) {
    this.cidadeService.findNomeIdEstado(nome, this.form.controls['estado'].value.id).subscribe((lista: Cidade[]) => {
        this.listaCidade = lista;
    });
}

public findEstadoPorNome(nome: string) {
    this.estadoService.findNome(nome).subscribe((lista: Estado[]) => {
        this.listaEstado = lista;
    });
}

  public montarForm(empresa: Empresa, editavel: boolean) {
    this.empresa = empresa;
    this.form.controls['razaoSocial'].setValue(empresa.razaoSocial);
    this.form.controls['fantasiaEmpresa'].setValue(empresa.fantasia);
    this.form.controls['cnpjEmpresa'].setValue(empresa.cnpj);
    this.form.controls['cep'].setValue(empresa.cep);
    this.form.controls['telefoneEmpresa'].setValue(empresa.telefone);
    this.form.controls['email'].setValue(empresa.email);
    this.form.controls['estado'].setValue(empresa.estado);
    this.form.controls['cidade'].setValue(empresa.cidade);
    this.form.controls['bairro'].setValue(empresa.bairro);
    this.form.controls['rua'].setValue(empresa.rua);
    this.form.controls['numero'].setValue(empresa.numero);
    this.form.controls['complemento'].setValue(empresa.complemento);
    this.form.controls['site'].setValue(empresa.site);
  }

  // public pesquisarGrupo(nome: string) {
  //   this.grupoUsuarioService.buscarPorNome(nome).subscribe((lista) => {
  //     this.grupos = lista;
  //   })
  // }

  public salvar(event) {
    if (this.form.invalid) {
      this.page.showWarnMsg('EXISTEM_CAMPOS_INVALIDOS');
      return;
    }
    if (this.empresa == null) {
      this.empresa = new Empresa();
    }
    this.empresa.razaoSocial = this.form.controls['razaoSocial'].value;
    this.empresa.fantasia = this.form.controls['fantasiaEmpresa'].value;
        this.empresa.cnpj = this.form.controls['cnpjEmpresa'].value;
        this.empresa.cep = this.form.controls['cep'].value;
        this.empresa.email = this.form.controls['emailEmpresa'].value;
        this.empresa.estado = this.form.controls['estado'].value;
        this.empresa.cidade = this.form.controls['cidade'].value;
        this.empresa.bairro = this.form.controls['bairro'].value;
        this.empresa.rua = this.form.controls['rua'].value;
        this.empresa.numero = this.form.controls['numero'].value;
        this.empresa.complemento = this.form.controls['complemento'].value;
        this.empresa.telefone = this.form.controls['telefoneEmpresa'].value;
        this.empresa.site = this.form.controls['site'].value;

    this.empresaService.save(this.empresa).subscribe((empresa) => {
      this.empresa = empresa;
      this.page.showSuccessMsg('SALVO_COM_SUCESSO');
      this.eventService.publishEvent(Events.atualizarLista);
    }, error => {
      this.page.showErrorMsg('FALHA_AO_SALVAR');
      console.log(error);
    })
  }

  buscarCep(event) {

    if (event == undefined || event.length < 8) {
        return
    }
    this.empresaService.buscarCep(event).then((cep: any) => {
        this.cep = cep;
        this.empresa.bairro = cep.bairro
        this.empresa.complemento = cep.complemento
        this.empresa.rua = cep.logradouro
        let req = {
            cidade: cep.localidade,
            uf: cep.uf
        }
        this.cidadeService.buscarCidadePeloCep(req).subscribe((cidades: Cidade[]) => {
            if (cidades.length > 0) {
                this.empresa.cidade = cidades[0];
                this.empresa.estado = cidades[0].estado;
            }

        })
    }), (erro) => {
      this.page.showErrorMsg("CEP_INVALIDO");
    }
}

}
