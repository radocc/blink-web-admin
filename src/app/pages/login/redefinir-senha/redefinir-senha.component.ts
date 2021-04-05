import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RedefinirSenhaUsuarioService } from '@radoccservices/base/redefinirsenhausuario-service';


@Component({
    selector: 'app-redefinir-senha',
    templateUrl: './redefinir-senha.component.html',
    styleUrls: ['./redefinir-senha.component.scss'],
    providers:[
        RedefinirSenhaUsuarioService
    ]
})
export class RedefinirSenhaComponent implements OnInit {

    public loading: boolean = false;
    public usuario:string;
    public token:string;

    constructor(private route: ActivatedRoute, private redefinirService:RedefinirSenhaUsuarioService,
        public rota: Router) { }

    public form: FormGroup = new FormGroup({
        senha: new FormControl(),
        confirme: new FormControl(),
        token: new FormControl()
    })

    ngOnInit() {
        this.route.queryParams.subscribe(() => {
            let tokens = window.location.hash.split('/')
            let token = tokens[tokens.length - 1];
            if(token){
                this.redefinirService.validar(token).subscribe(value =>{
                    if (value != null){
                        this.token = value.token;
                        this.usuario = value.nome;  
                    }else {
                        this.form.get("token").setErrors({expirado:true})
                    }
                }, error=>{
                    this.tratarErro(error);
                    this.form.get("token").setErrors({expirado:true})
                });
            }
        })
    }

    public validarSenha(){
        if(this.form.controls['senha'].valid && this.form.controls['confirme'].touched){
            let value = this.form.controls['senha'].value;
            let confirme = this.form.controls['confirme'].value;
            if(confirme == value){
                this.form.controls['confirme'].setErrors(null)
            }else{
                this.form.controls['confirme'].setErrors({'invalido': true})
            }
        }
    }


    public redefinir(){
        let obj = {
            token:this.token,
            senha:this.form.get('senha').value
        };
        this.redefinirService.redefinir(obj).subscribe(value=>{
            this.rota.navigate(['login']);
        },error =>{
            this.tratarErro(error);
        });
    }

    public tratarErro(error){
        if (error.error ){
            let errorBody = error.error;
            if (errorBody.message){
                if ( errorBody.codErro == 30 ){
                    this.form.get('login').setErrors({naoExiste:errorBody.message});
                }else {
                    this.form.get('token').setErrors({message:errorBody.message});
                }
            }
        }
    }

    public novaSolicitacao(){
        this.rota.navigate(['login/recuperar-senha']);
    }
}
