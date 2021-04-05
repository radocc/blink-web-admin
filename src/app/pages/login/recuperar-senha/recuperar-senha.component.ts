import { SolicitaRecuperaSenha } from './../../../models/solicita-recupera-senha';
import { RedefinirSenhaUsuarioService } from '../../../services/base/redefinirsenhausuario-service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';


@Component({
    selector: 'app-recuperar-senha',
    templateUrl: './recuperar-senha.component.html',
    styleUrls: ['./recuperar-senha.component.scss'],
    providers:[RedefinirSenhaUsuarioService, DeviceDetectorService]
})
export class RecuperarSenhaComponent implements OnInit {

    public loading: boolean = false;
    public solicitaRecupera:SolicitaRecuperaSenha = new SolicitaRecuperaSenha();
    constructor(private route: ActivatedRoute, private redefinirService:RedefinirSenhaUsuarioService,
        public rota: Router, private deviceService: DeviceDetectorService) { }

    public form: FormGroup = new FormGroup({
        login: new FormControl()
    });

    ngOnInit() {
        this.route.params.subscribe(data => {
            if(data['login']){
                this.form.controls['login'].setValue(data['login']);
            }
        })
    }

    public enviar(){
        let login = this.form.get('login').value;
        let device = this.deviceService.getDeviceInfo();
        this.solicitaRecupera.plataforma = device.os;
        this.solicitaRecupera.uuid = device.userAgent;
        this.solicitaRecupera.versaoSistema = device.os_version;
        this.solicitaRecupera.serial = device.browser_version;
        this.solicitaRecupera.nome = device.os;
        this.solicitaRecupera.idAplicacao = 1;
        this.solicitaRecupera.versaoAplicacao = 1;
        this.solicitaRecupera.login = login;
        this.loading = true;
        this.form.disable();
        this.redefinirService.solicitar(this.solicitaRecupera).subscribe((value)=>{
            this.loading = false;
            this.form.enable();
            if (value != null){
                this.rota.navigate(['login/recuperacao-senha-enviada',{email: value.email }]);
            }
            
        }, error =>{
            this.loading = false;
            this.form.enable();
            if (error.error ){
                let errorBody = error.error;
                if (errorBody.message){
                    if ( errorBody.codErro == 30 ){
                        this.form.get('login').setErrors({naoExiste:errorBody.message});
                    }
                }
            }
        })
    }
}
