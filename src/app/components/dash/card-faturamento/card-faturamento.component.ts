import { Component, OnInit } from '@angular/core';
import { CardFaturamentoService } from '../../../services/dash/cardfaturamento.service';
import { moneyReduct } from '../../../global/global-money';
import { SpinnerComponent } from "../../spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { ConfigService } from '../../../services/config.service';
import { globalVars } from '../../../global/globals';

@Component({
  selector: 'app-card-faturamento',
  standalone: true,
  imports: [SpinnerComponent,CommonModule],
  templateUrl: './card-faturamento.component.html',
  styleUrl: './card-faturamento.component.scss'
})
export class CardFaturamentoComponent implements OnInit{
  card : any[]=[];
  esteMes = '';
  esteAno = '';
  private intervalId : any;
  constructor(private cardFaturamento : CardFaturamentoService,
              private configService: ConfigService
  ){}
  ngOnInit(): void {
    this.configService.getConfig().subscribe(config => {
      // Utiliza a função global para converter segundos para milissegundos
      globalVars.intervalTime = (config.atualizacao || 10) * 1000;
      this.getCardFaturamento();
      this.intervalId = setInterval(() => {
        this.card = [];
        this.esteMes = '';
        this.esteAno = '';
        this.getCardFaturamento();
      }, globalVars.intervalTime);
    }, error => {
      console.error('Erro ao carregar configuração', error);
    });
  }

  async getCardFaturamento(){
    (await this.cardFaturamento.getCardFaturamento()).subscribe(dados =>{
      this.card = this.card.concat(dados.body)
      let total = 0.00;
      let cont =0;

      for(let i=0;i<this.card.length;i++){
        cont =0;
        total =this.card[i].total;
        this.card[i].human = moneyReduct(total);
      }

      this.esteMes = this.card[0].human;
      this.esteAno = this.card[1].human;
    })
  }

}
