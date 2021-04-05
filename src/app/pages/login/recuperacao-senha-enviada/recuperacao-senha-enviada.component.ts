import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-recuperacao-senha-enviada',
    templateUrl: './recuperacao-senha-enviada.component.html',
    styleUrls: ['./recuperacao-senha-enviada.component.scss']
})
export class RecuperacaoSenhaEnviadaComponent implements OnInit {

    public msg: string = '';

    constructor(private route: ActivatedRoute, private translate: TranslateService,
        private router: Router) { }

    ngOnInit() {
        this.route.params.subscribe(data => {
            if(data['email']){
                this.translate.get('MSG_RECUPERACAO_SENHA_ENVIADA').subscribe((MSG: string) => {
                    this.msg = MSG.replace('<<email>>', `<b>${data['email']}</b>`);
                    document.getElementById('content').innerHTML = this.msg;
                })
            }
        })
    }

    public voltar(){
        this.router.navigateByUrl('login');
    }

}
