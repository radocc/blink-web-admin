import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'; 
import { Router } from '@angular/router';
import { TranslateService, TranslateStore } from '@ngx-translate/core';
import { Logar } from '@radoccmodels/base/logar';
import { Usuario } from '@radoccmodels/base/usuario';
import { EventsService } from '@radoccservices/base/events.service';
import { LoginService } from '@radoccservices/base/login-service';
import { MD5Service } from '@radoccservices/base/md5.service';
import { SistemaService } from '@radoccservices/base/sistema-service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
    selector: 'app-login',
    templateUrl: './login.html',
    styleUrls: ['./login.scss'],
    providers: [ DeviceDetectorService, SistemaService, MD5Service, EventsService,TranslateService, LoginService]
})

export class LoginPage implements OnInit {
    public form: FormGroup = new FormGroup({
        login:new FormControl(null, [Validators.compose([Validators.required])]),
        senha: new FormControl(null, [Validators.compose([Validators.required])])
    });
    public user: Usuario = new Usuario(); 
    public deviceInfo = null;
    public imagem;
    public inputplaceholder: string = 'Digite seu e-mail';
    public senhaPlaceholder: string = 'Digite sua senha';
    public login:string;
    public token: string = '';
    public logarAuth: Logar = new Logar(); 


    constructor(public translate: TranslateService,
        public router: Router, public loginService: LoginService,private md5Service:MD5Service,
        public deviceService: DeviceDetectorService, public sistemaService: SistemaService,
        public events: EventsService) {
        
    }

    ngOnInit() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        if (localStorage.getItem('login') != null) {
            this.login = localStorage.getItem('login');
        }
        this.sistemaService.buscarLogo().subscribe((res) => this.imagem = res);
        
    }
   
    public keyDownFunction(event) {
        if (event.keyCode == 13) {
            event.stopPropagation();
            this.entrar();
        }
    }

    public entrar() {
        this.logarAuth.login = this.form.controls['login'].value;
        this.logarAuth.senha = this.form.controls['senha'].value;
        let device = this.deviceService.getDeviceInfo();
        this.logarAuth.plataforma = device.os;
        this.logarAuth.uuid = device.userAgent;
        this.logarAuth.versaoSistema = device.os_version;
        this.logarAuth.serial = device.browser_version;
        this.logarAuth.nome = device.os;        
        this.logarAuth.senhaCriptografada = this.md5Service.MD5(this.logarAuth.senha, false, false, 8);
        this.logarAuth.idAplicacao = 1;
        this.logarAuth.versaoAplicacao = 1;
        this.loginService.logar(this.logarAuth).subscribe((res: any) => {
            this.tratarLogin(res);
        }, (resp) => {
            // this.form.controls['senha'].setErrors({login:resp.error.message});
            this.tratarErro(resp);
        })
    }

    public tratarLogin(res) {
        if (res == null) {
            this.form.controls.login.setErrors({ erro: 'USUARIO_OU_SENHA_INVALIDO' })
        } else {
            localStorage.setItem('usuario', JSON.stringify(res));
            localStorage.setItem('token', res.token);
            sessionStorage.setItem('lang', res.idioma);
            this.translate.use(res.idioma);

            this.aposLogar();
        }
    }

    public tratarErro(error) {
        try {
            let erromsg = '';
            if (error['error']) {
                let regraException = error['error'];
                erromsg = regraException.message;
            } else if (error['message']) {
                erromsg = error['error'];
            } else {
                erromsg = JSON.parse(error._body).message
            }
            this.form.controls.senha.setErrors({ erro: erromsg });

        } catch (error) {

            this.translate.get('SENHA_INCORRETA').subscribe((res: string) => {
                this.form.controls.senha.setErrors({ erro: res });
            });
        }
    }

    public aposLogar() {
        this.router.navigate(['/admin/conteudo']);
    }

    public onChangeSenha() {
        this.form.controls['senha'].setErrors(null);
    }

    public onChangeLogin() {
        this.form.controls['login'].setErrors(null);
        this.form.controls['senha'].setErrors(null);
    }


    public esqueciMinhaSenha() {
        let login = this.form.controls['login'].value;
        if (login != null && login.trim() != ''){
            this.router.navigate(['login/recuperar-senha', { login: login }]);
        }else{
            this.router.navigate(['login/recuperar-senha']);
        }
            
    }
}

