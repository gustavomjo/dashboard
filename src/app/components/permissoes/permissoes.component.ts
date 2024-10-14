import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { searchModule } from '../search.Module';

@Component({
  selector: 'app-permissoes',
  standalone: true,
  imports: [ FormsModule,  CommonModule, searchModule ],
  templateUrl: './permissoes.component.html',
  styleUrl: './permissoes.component.scss'
})
export class PermissoesComponent implements OnInit{
  usuario : any[]=[];
  selectedUser = '';
  usuarioSelecionado : any;

  dash : boolean = false;
  dashreceita : boolean = false;
  dashfin : boolean = false;
  dashfat : boolean = false;
  dashfarm : boolean = false;
  adm : boolean = false;
  private previousLength: number = this.selectedUser.length;

  constructor(private user : UserService,
  ){}
  ngOnInit(): void {
    this.getUsuarios();
  }
  async getUsuarios(){
    (await this.user.getUsuarios()).subscribe(dados=>{
      this.usuario = [];
      this.usuario = this.usuario.concat(dados.body);
    })
  }

  public onUsuarioChange() {

    this.dash = false;
    this.dashreceita = false;
    this.dashfin = false;
    this.dashfat = false;
    this.dashfarm = false;
    this.adm = false;

    if (this.selectedUser) {
      const [codigo] = this.selectedUser.split(' - '); // Extrai o código do usuário
      this.usuarioSelecionado = this.usuario.find(usr => usr.codigo.toString() === codigo); // Encontra o usuário na lista
      if (this.usuarioSelecionado) {
        this.dash = this.usuarioSelecionado.dash == 'S';
        this.dashreceita = this.usuarioSelecionado.dashreceita == 'S';
        this.dashfin = this.usuarioSelecionado.dash_fin == 'S';
        this.dashfat = this.usuarioSelecionado.dash_fat == 'S';
        this.dashfarm = this.usuarioSelecionado.dash_farm == 'S';
        this.adm = this.usuarioSelecionado.adm == 'S';
      }
    }
  }

  onSubmit() {
    // Aqui você pode manipular os dados do formulário
    console.log('gravar');
    // Adicione lógica adicional, como enviar os dados para um servidor
  }

}
