import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { searchModule } from '../search.Module';
import { NotificationService } from '../../services/notification.service';
import { NotificationModule } from '../notification/notification.module';
import { PermissoesService } from '../../services/permissoes.service';
import { JwtDecodeService } from '../../services/jwt-decode.service';
import { BoolToString } from '../../global/global-string';

@Component({
  selector: 'app-permissoes',
  standalone: true,
  imports: [ FormsModule,  CommonModule, searchModule, NotificationModule ],
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
  // private previousLength: number = this.selectedUser.length;

  constructor(private user : UserService,
              private notificationService: NotificationService,
              private permissoes : PermissoesService,
              private jwtDecoder : JwtDecodeService
  ){}

  limpa() {
    this.selectedUser = '';
    this.dash = false;
    this.dashreceita = false;
    this.dashfin = false;
    this.dashfat = false;
    this.dashfarm = false;
    this.adm = false;
    this.usuarioSelecionado = null; // Opcional, se desejar limpar o usuário selecionado também
  }

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
    // Limpar os checkboxes antes de configurar os novos valores


    //  console.log('dash '+this.dash);
    //   console.log('dashfin '+this.dashfin);
    //   console.log('dashreceita '+this.dashreceita);
    //   console.log('dashfat '+this.dashfat);
    //   console.log('dashfarm '+this.dashfarm);
    //   console.log('adm '+this.adm);

    if (this.selectedUser) {
      const [codigo] = this.selectedUser.split(' - '); // Extrai o código do usuário
      this.usuarioSelecionado = this.usuario.find(usr => usr.codigo.toString() === codigo); // Encontra o usuário na lista

      if (this.usuarioSelecionado) {
        // Atribui os valores do usuário selecionado aos checkboxes
        this.dash = this.usuarioSelecionado.dash === 'S';
        this.dashreceita = this.usuarioSelecionado.dash_receitas === 'S';
        this.dashfin = this.usuarioSelecionado.dash_fin === 'S';
        this.dashfat = this.usuarioSelecionado.dash_fat === 'S';
        this.dashfarm = this.usuarioSelecionado.dash_farm === 'S';
        this.adm = this.usuarioSelecionado.adm === 'S';

        // console.log(this.usuario)
        // console.log('dash '+this.dash);
        // console.log('dashfin '+this.dashfin);
        // console.log('dashreceita '+this.dashreceita);
        // console.log('dashfat '+this.dashfat);
        // console.log('dashfarm '+this.dashfarm);
        // console.log('adm '+this.adm);
      }
    }
  }


  onClick(dashType: 'dash' | 'dashreceita' | 'dashfin' | 'dashfat' | 'dashfarm' | 'adm') {
    this[dashType] = !this[dashType];
  }


  onSubmit() {
    if (this.selectedUser) {
      const userId =  this.selectedUser.split(' - ');

      this.permissoes.postPermissoes(
        String(userId[0]),
        BoolToString(this.dash),
        BoolToString(this.dashfin),
        BoolToString(this.dashreceita),
        BoolToString(this.dashfat),
        BoolToString(this.dashfarm),
        BoolToString(this.adm)
      ).subscribe(() => {
        // Chama limpa e getUsuarios após postPermissoes ser concluído
        this.limpa();
        this.getUsuarios();
        this.notificationService.showNotification('Permissões gravadas com sucesso!.');
      }, error => {
        // Trata qualquer erro que ocorre durante postPermissoes
        this.notificationService.showNotification('Erro ao atualizar permissões.');
      });
    } else {
      this.notificationService.showNotification('Selecione o usuário.');
    }

  }
}
