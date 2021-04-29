import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ajuda',
  templateUrl: './ajuda.component.html',
  styleUrls: ['./ajuda.component.scss']
})
export class AjudaComponent implements OnInit {

  public pesquisa: String;
  public ajudas = [
    {
      titulo: "Para alterar a senha de acesso", conteudo: `
    No canto superior do site, cliqte em "fazer login" e depois em "esqueceu?", acima do campo de
                        senha.
                        Coloque o e-mail que você cadastrou no site para receber as instruções de alteração. Caso não
                        receba
                        o e-mail, entre em contato com nosso time de Atendimento. Confira nossos canail para contato
                        aqui:
    `},
    {
      titulo: "Como se logar utilizando uma conta b2w marketplace", conteudo: `
    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                        totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                        architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                        aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
                        voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
    `},
    {
      titulo: "Como cadastrar outro comprador ?", conteudo: `
    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
                        deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati
                        cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est
                        laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
                        Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
    `},
    {
      titulo: "Quero alterar os dados da empresa", conteudo: `At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
    deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati
    cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est
    laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
    Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
    `}
  ];
  

  constructor() { }

  //public form: FormGroup = new FormGroup({});

  ngOnInit(): void {
  }

}
