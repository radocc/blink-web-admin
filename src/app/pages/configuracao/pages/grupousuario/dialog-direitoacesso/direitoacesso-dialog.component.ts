import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
import { Direito } from '@radoccmodels/base/direito';
import { GrupoUsuario } from '@radoccmodels/base/grupousuario';
import { Menu } from '@radoccmodels/base/menu';
import { Tela } from '@radoccmodels/base/tela';
import { Playlist } from '@radoccmodels/playlist';
import { DireitoGrupoService } from '@radoccservices/base/direitogrupo-service';
import { MenuService } from '@radoccservices/base/menu-service';
import { TelaService } from '@radoccservices/base/tela-service';
import { MessageService, TreeNode } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog'; ;
@Component({
  selector: 'app-direitoacesso-dialog',
  templateUrl: './direitoacesso-dialog.component.html',
  styleUrls: ['./direitoacesso-dialog.component.scss'],
  providers:[
    MessageService, DireitoGrupoService, MenuService, TelaService
  ]
})
export class DireitoAcessoDialogComponent implements OnInit {
    
  public direitos:Direito[] = [];
  public grupoUsuario:GrupoUsuario;
  public menus:Menu[] = [];
  public telas:Tela[] = [];
  public nodes:TreeNode[] = [];
  public nodesSelected:TreeNode[] = [];
  public buscando:boolean = false;
  // public 
   
  
  
  constructor(public config: DynamicDialogConfig,public ref: DynamicDialogRef, private msgService:MessageService, private direitoGrupoService:DireitoGrupoService,
    private menuService:MenuService,private telaService:TelaService) {
    this.grupoUsuario = config.data;
  }

  ngOnInit(): void {     
    this.montarDireitos();
    
    
  } 

  public async montarDireitos(){
    this.buscando = true;
    await this.direitoGrupoService.montarDireitos(this.grupoUsuario).toPromise();
    this.menus = await this.menuService.buscarMenusParaDireitoAcesso().toPromise();
    for (let w = 0; w < this.menus.length;w++){
      let menu = this.menus[w];
      let treMenu = {
        label:menu.nome,
        data:menu,
        icon:menu.icone,
        expanded:false,
        children:[]
      };
      this.nodes.push(treMenu);
      let telas = await this.telaService.findTelasPorAcessoIdMenu(menu.id).toPromise();  
      for (let x = 0; x < telas.length;x++){
        let tela = telas[x];
        let treTela = {
          label:tela.nome,
          data:tela,
          children:[],
          parent:treMenu,
        };;
        treMenu.children.push(treTela);
        let acoes = await this.direitoGrupoService.findByIdTelaIdGrupo(tela.id,this.grupoUsuario.id).toPromise();
        for (let i = 0; i < acoes.length; i++){
          let acao = acoes[i];
          let treAcao = {
            label:acao.nome,
            data:acao,
            children:[],
            parent:treTela,
            selectable:true
          }
          if (acao.status ){
            this.nodesSelected.push(treAcao);
          }
          treTela.children.push(treAcao);
        }
      }
    }
    // this.direitoGrupoService.
    this.buscando = false;
    
  }

  public nodeUnselect(event){
    console.log(event)
  }

  public nodeSelect(event){
    console.log(event)
  }
  public montarObj(){
    this.direitos = [];
    for (let w = 0; w < this.nodes.length;w++){
      for (let x = 0; x < this.nodes[w].children.length;x++){
        for (let i = 0; i < this.nodes[w].children[x].children.length; i++){
          let nodeDir = this.nodes[w].children[x].children[i];
          let dir = nodeDir.data;
          dir.status = nodeDir.selectable;
          // dir.idGrupoUsuaro = this.grupoUsuario.id;
          this.direitos.push(dir)
        }
      }
    }
  }

 
  public salvar(){
    this.montarObj()
    this.direitoGrupoService.salvarDireitos(this.direitos, null, null).subscribe((value)=>{
      this.ref.close();
    })
    
  }
}
