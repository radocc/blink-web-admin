import { MD5Service } from './../../../../../services/base/md5.service';
import { CadForm } from '@radocccomponentes/pagecadastro/cadform';
import { Usuario } from './../../../../../models/base/usuario';
import { Idioma } from './../../../../../models/base/idioma';
import { EmailUsuario } from './../../models/emailusuario';
import { idiomaService } from './../../services/idioma-service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { EmpresaService } from './../../services/empresa-service';
import { Empresa } from './../../models/empresa';
import { Estado } from './../../models/estado';
import { EstadoService } from './../../services/estado-service';
import { Cidade } from './../../models/cidade';
import { CidadeService } from './../../services/cidade-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { Plano } from '@basemodel/plano';
import { FuncionalidadeAdicional } from '@basemodel/funcionalidadeadicional';
import { Licenca } from '@basemodel/licenca';
import { Periodo } from '@basemodel/periodo';
import { PeriodoService } from '@baseservice/periodo-service';
import { PlanoService } from '@baseservice/plano-service';
import { AdicionalService } from '@baseservice/adicional-service';
import { LicencaService } from '@baseservice/licenca-service';
import { NovoAmbiente } from '@basemodel/request/novo-ambiente';

@Component({
    selector: 'app-ambientenovo-cadastro',
    templateUrl: './ambientenovo-cadastro.component.html',
    styleUrls: ['./ambientenovo-cadastro.component.scss'],
    providers: [EmpresaService, EstadoService, CidadeService, IdiomaService,PlanoService,PeriodoService,LicencaService,AdicionalService]
})
export class AmbienteNovoCadastroComponent extends CadForm implements OnInit {

    getPorIdEstado: any;
    public empresa: Empresa = new Empresa();
    public formCadastro: FormData;
    public form: FormGroup;
    public listaEstado: Estado[];
    public listaCidade: Cidade[];
    public cidadeChangeObserver: any;
    public estadoChangeObserver: any;
    public usuario: Usuario = new Usuario();
    public listaIdioma: Idioma[];
    public mascara: string = '000000000000000';
    public confirmaSenha: string;
    private md5Service: MD5Service = new MD5Service();

    /*licencas*/
    public plano: Plano;
    public listaPlano: Plano[] = [];
    public listaAdicional: FuncionalidadeAdicional[] = [];
    public licenca: Licenca = new Licenca(null);
    public planoObserver: any;
    public periodo: Periodo;
    public listaPeriodo: Periodo[] = [];
    public periodoObserver: any;
    public marcarTodos: boolean = false;
    public dataFimString: string;

    constructor(private empresaService: EmpresaService,
        public estadoService: EstadoService,
        public cidadeService: CidadeService,
        private router:Router,
        private fb: FormBuilder,public dialog: MatDialog, public snackBar: MatSnackBar,
        public translate: TranslateService, public idiomaService: IdiomaService,
        private periodoService: PeriodoService, private adicionalService: AdicionalService,
        private planoService: PlanoService, private licencaService:LicencaService) {
        super(dialog, snackBar, translate);

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



    ngOnInit() {
        const senha = new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]));
        const confirmeSenha = new FormControl('', CustomValidators.equalTo(senha));
        const me = this;
        this.form = this.fb.group({
            razaoSocialUsuario: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(200)])],
            email: [null, Validators.compose([Validators.required, CustomValidators.email])],
            fantasiaUsuario: [null],            
            login: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50)])],
            cnpjUsuario: [null, Validators.compose([Validators.required, Validators.minLength(8)])],
            celularUsuario: [null],
            telefoneUsuario: [null],
            senha: senha,
            confirmeSenha: confirmeSenha,            
            idioma: [null, Validators.required],

            // EMPRESA
            razaoSocial: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(150)])],
            cnpjEmpresa: [null, Validators.required],
            fantasiaEmpresa: [null],
            cep: [null, Validators.compose([Validators.required, Validators.maxLength(10)])],
            estado: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])],
            cidade: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(150)])],
            emailEmpresa: [null, Validators.compose([Validators.required, CustomValidators.email])],
            telefoneEmpresa: [null],
            bairro: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
            rua: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
            complemento: [null],
            numero: [null],
            site: [null,Validators.required],
            // loginEmpresa: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
            //licencas
            plano: [null, Validators.required],
            periodo: [null, Validators.required],
            valorTotal: [{value:null, disabled:true}],
            numeroUsuario: [null, Validators.required],
            diaVencimento: [null, Validators.required],
            dataInicio: [null, Validators.required],
            dataFim: [{value:null, disabled:true}, Validators.required],
        });

        this.idiomaService.findAll().subscribe((lista: Idioma[]) => {
            this.listaIdioma = lista;
        });
        this.buscarDados();
        this.form.controls['dataInicio'].valueChanges.subscribe((value)=>{
            this.onChangeData();
        })
        this.form.controls['estado'].valueChanges.subscribe((value)=>{
            this.findEstadoPorNome(value);
        })
        this.form.controls['cidade'].valueChanges.subscribe((value)=>{
            this.findCidadePorNomeEIdEstado(value);
        });
        this.form.controls['cep'].valueChanges.subscribe((value)=>{
            this.buscarCep(value);
        })
        this.form.controls['cnpjUsuario'].valueChanges.subscribe((value)=>{
            this.validarMascara(value);
        });
        
    }

    public blurFocusCNPJEmpresa(){
        if (this.form.controls['cnpjUsuario'].value == null || this.form.controls['cnpjUsuario'].value == ''){
            this.form.controls['cnpjUsuario'].setValue(this.form.controls['cnpjEmpresa'].value);
        }
    }

    public blurFocusEmailEmpresa(){
        if (this.form.controls['email'].value == null || this.form.controls['email'].value == ''){
            this.form.controls['email'].setValue(this.form.controls['emailEmpresa'].value);
        }
    }

    public blurFocusEmailUsuario(){
        if (this.form.controls['login'].value == null || this.form.controls['login'].value == ''){
            this.form.controls['login'].setValue(this.form.controls['email'].value);
        }
    }

    public montarEmpresa(){
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
    }

    public montarUsuario(){
        this.usuario.razaoSocial = this.form.controls['razaoSocialUsuario'].value;
        this.usuario.fantasia = this.form.controls['fantasiaUsuario'].value;
        this.usuario.cnpj = this.form.controls['cnpjUsuario'].value;
        this.usuario.email = this.form.controls['email'].value;
        this.usuario.celular = this.form.controls['celularUsuario'].value;
        this.usuario.senha = this.form.controls['senha'].value;
        this.usuario.login = this.form.controls['login'].value;
        this.usuario.telefone = this.form.controls['telefoneUsuario'].value;
        if (this.form.controls['idioma'].value != null){
            this.usuario.idIdioma = this.form.controls['idioma'].value.id;
        }
        
    }

    public montarLicenca(){
        this.licenca.plano = this.form.controls['plano'].value;
        this.licenca.periodo = this.form.controls['periodo'].value;
        this.licenca.numeroVendedores = this.form.controls['numeroUsuario'].value;
        this.licenca.diaVencimento = this.form.controls['diaVencimento'].value;
        this.licenca.dataInicio = new Date(this.form.controls['dataInicio'].value);
        this.licenca.dataFim = new Date(this.form.controls['dataFim'].value);
        this.calcularTotal();
    }

    public salvar() {
        if (this.form.invalid) {
            this.showSnack('EXISTEM_CAMPOS_INVALIDOS');
            return;
        }
        
        
        // this.usuario.cnpj = this.usuario.cnpj.replace(/[^0-9]/g, '');
        this.montarEmpresa();
        
        // this.empresa.cnpj = this.empresa.cnpj.replace(/[^0-9]/g, '');
        this.montarUsuario();
        this.montarLicenca();
        this.usuario.senhaCriptografada = this.md5Service.MD5(this.usuario.senha,false,false,8);
        this.confirmaSenha = this.usuario.senha;
        
        let novoAmbiente = new NovoAmbiente();
        novoAmbiente.empresa = this.empresa;
        novoAmbiente.usuario = this.usuario;
        novoAmbiente.licenca = this.licenca;

        this.empresaService.novoAmbiente(novoAmbiente).subscribe((data: Empresa) => {
            this.empresa = data;
            this.showSnack('SALVO_COM_SUCESSO');
            this.router.navigate(['admin/empresa-pesquisa']);
        }, error => {
            this.showError(error);
        });
    }

    public validarMascara(cnpj) {
        if (cnpj === undefined) {
            return;
        }
        if (cnpj.length <= 11 && this.mascara != '990.000.000-09999') {
            this.mascara = '990.000.000-09999';
        } else if (cnpj.length > 11 && this.mascara != '99.000.000/0000-99') {
            this.mascara = '99.000.000/0000-99';
        }
    }

    public displayFn(value: any): string {
        return value && typeof value === 'object' ? value.nome : value;
    }

    public onChangeCidade(value: any) {
        let me = this;
        if (!this.cidadeChangeObserver) {
            Observable.create(observer => {
                this.cidadeChangeObserver = observer;
            }).debounceTime(700)
                .distinctUntilChanged()
                .subscribe((value) => {
                    if (value == '' || value == undefined) {
                        return;
                    }
                    me.findCidadePorNomeEIdEstado(value);
                });
        }
        this.cidadeChangeObserver.next(value);
    }

    public onChangeEstado(value: any) {
        let me = this;
        if (!this.estadoChangeObserver) {
            Observable.create(observer => {
                this.estadoChangeObserver = observer;
            }).debounceTime(700)
                .distinctUntilChanged()
                .subscribe((value) => {
                    if (value == '' || value == undefined) {
                        return;
                    }
                    me.findEstadoPorNome(value);
                });
        }
        this.estadoChangeObserver.next(value);
    }

    buscarCep(event) {
        if (event == undefined || event.length < 8) {
            return
        }
        this.empresaService.buscarCep(event).then((cep: any) => {
            // this.form.controls['cep'].setValue = cep;
            this.form.controls['bairro'].setValue(cep.bairro);
            this.form.controls['rua'].setValue(cep.logradouro);
            this.form.controls['complemento'].setValue(cep.complemento);
            this.empresa.bairro = cep.bairro
            this.empresa.complemento = cep.complemento
            this.empresa.rua = cep.logradouro;

            let req = {
                cidade : cep.localidade,
                uf :  cep.uf
            }

            this.cidadeService.buscarCidadePeloCep(req).subscribe((cidades: Cidade[]) => {
                if (cidades.length > 0) {
                    this.form.controls['cidade'].setValue(cidades[0]);
                    this.form.controls['estado'].setValue(cidades[0].estado);
                    this.empresa.cidade = cidades[0];
                    this.empresa.estado = cidades[0].estado;
                }

            });

        }, erro => {
            this.showSnack("CEP_INVALIDO")
        });
    }

    /**************** licença ********************* */
    public buscarDados() {
        this.licenca.dataInicio = new Date();
        this.planoService.buscarPlanosComercial().subscribe(data => {
            this.listaPlano = data;
        }, () => {
            this.showSnack('OCORREU_UM_ERRO_AO_BUSCAR_DADOS');
        })

        this.periodoService.findAll().subscribe(data => {
            this.listaPeriodo = data
        }, () => {
            this.showSnack('OCORREU_UM_ERRO_AO_BUSCAR_DADOS')
        })
    }

    public selecionarPlano(value) {
        this.plano = value;
    }

    public selecionarPeriodo(value) {
        this.periodo = value;
    }

    public marcarItem(index: number) {
        let a = !this.listaAdicional[index].marcado;
        setTimeout(() => {
            this.listaAdicional[index].marcado = a;
            this.calcularTotal()
            this.resolveMarcados();
        }, 50);
    }

    //ajustar adicionais para o envio
    public montarAdicionais() {
        this.licenca.adicionais = [];
        this.listaAdicional.forEach(data => {
            if (data.marcado) {
                this.licenca.adicionais.push(data);
            }
        })
    }

    public resolveMarcados() {
        let qtd: number = 0;
        this.listaAdicional.forEach(data => {
            if (data.marcado) {
                qtd++;
            }
        })
        if (qtd == this.listaAdicional.length) {
            this.marcarTodos = true;
            return;
        }
        this.marcarTodos = false;
    }

    public marcar() {
        let qtd: number = 0;
        this.listaAdicional.forEach(data => {
            if (data.marcado) {
                qtd++;
            }
        })

        if (qtd == this.listaAdicional.length) {
            this.listaAdicional.forEach(data => {
                data.marcado = false;
            })
            this.marcarTodos = true;
        } else {
            this.listaAdicional.forEach(data => {
                data.marcado = true;
            })
            this.marcarTodos = false;
        }
        this.calcularTotal();
    }

    public validarDiaVencimento() {
        if (this.licenca.diaVencimento > 30) {
            this.licenca.diaVencimento = 30;
        } else if (this.licenca.diaVencimento < 1) {
            this.licenca.diaVencimento = 1;
        }
    }

    //validação de data de inicio
    public onChangeData() {
        setTimeout(() => {
            this.validarData();
        }, 100);
    }

    //validação de periodo
    public validarData() {
        if (typeof this.form.controls['periodo'].value !== 'object') return;
        if (this.form.controls['dataInicio'].value == null) return;

        this.licenca.dataInicio = new Date(this.form.controls['dataInicio'].value);
        this.periodo = this.form.controls['periodo'].value;

        let mes = this.licenca.dataInicio.getMonth();
        mes = mes + this.periodo.duracao;
        this.licenca.dataFim = new Date(this.licenca.dataInicio.getFullYear(), mes, this.licenca.dataInicio.getDate());
        let d: Date = this.licenca.dataFim;
        this.dataFimString = (d.getDate().toString().length == 1 ? '0' + d.getDate().toString() : d.getDate().toString());
        this.dataFimString += '/' + (d.getMonth().toString().length == 1 ? '0' + d.getMonth().toString() : d.getMonth().toString());
        this.dataFimString += '/' + d.getFullYear();
        this.form.controls['dataFim'].setValue(this.licenca.dataFim);
    }

    public buscarAdicional(sair?) {
        this.listaAdicional = [];
        this.adicionalService.filtrarPorLicenca(this.licenca.id).subscribe((data: FuncionalidadeAdicional[]) => {
            // this.loading = false;
            this.listaAdicional = data;
            this.calcularTotal();
            this.verificarMascaras();
        }, () => {
            // this.loading = false;
            this.showSnack('ERRO_AO_BUSCAR');
        })
    }

    public calcularTotal() {
        this.licenca.valorTotal = 0;
        this.plano = this.form.controls['plano'].value;
        if (typeof this.plano === 'object' && this.plano != null) {

            this.licenca.valor = this.plano.valor;
            this.licenca.valorTotal = this.plano.valor;
        }
        this.licenca.numeroVendedores = this.form.controls['numeroUsuario'].value;
        this.licenca.valorAdicional = 0;
        this.listaAdicional.forEach(data => {
            if (data.marcado && data.valor != null) this.licenca.valorAdicional += data.valor
        })
        this.licenca.valorTotal = ( this.licenca.valor+ this.licenca.valorAdicional) * this.licenca.numeroVendedores;
        this.form.controls['valorTotal'].setValue(this.licenca.valorTotal);
    }

}
