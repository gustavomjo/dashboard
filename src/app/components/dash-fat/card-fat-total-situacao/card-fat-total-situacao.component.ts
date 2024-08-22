import { Component, OnInit } from '@angular/core';
import { dashFatService } from '../../../services/dash-fat/dashfat.service';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../../services/config.service';
import { CommonModule } from '@angular/common';
import { globalCoresNome } from '../../../global/global-cores';
import { moneyReduct } from '../../../global/global-money';

@Component({
  selector: 'app-card-fat-total-situacao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-fat-total-situacao.component.html',
  styleUrl: './card-fat-total-situacao.component.scss'
})
export class CardFatTotalSituacaoComponent implements OnInit {
  color = globalCoresNome;
  _pendente = '';
  _fechadoComRPS = '';
  _fechadoSemRPS = '';
  _total = '';

  screenWidth: number = 0;
  constructor(private dashFat : dashFatService,
              private route: ActivatedRoute,
              private configService: ConfigService
          ){}
  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.configService.getConfig().subscribe(config=>{
      this.getFatTotalSituacao(config.data_corte)
    },error=>{
      console.error('Erro ao carregar configuração',error)
    })
  }

  headingClass() {
    return {
      'h2': this.screenWidth < 992 || this.screenWidth > 1400,
      'h5': this.screenWidth > 992 && this.screenWidth < 1200,
      'h4': this.screenWidth > 1200 && this.screenWidth < 1300,
      'h3': this.screenWidth > 1300 && this.screenWidth < 1400
    };
  }

  async getFatTotalSituacao(data_corte : any){
    (await this.dashFat.getFatTotalSituacao(data_corte)).subscribe(dados=>{
      let fat :any[]=[];
      let total : number=0;
      fat = fat.concat(dados.body);
      for(let i=0;i<fat.length;i++){
        switch(fat[i].situacao_conta){
          case  'Pendente' :
            this._pendente = moneyReduct(fat[i].valor_total)
            break;
          case 'Fechada' :
            if(!fat[i].rps)
              this._fechadoSemRPS = moneyReduct(fat[i].valor_total);
            else
              this._fechadoComRPS = moneyReduct(fat[i].valor_total);
            break;
        }
        total = total + fat[i].valor_total;
      }
      this._total = moneyReduct(total);
    })
  }

}
