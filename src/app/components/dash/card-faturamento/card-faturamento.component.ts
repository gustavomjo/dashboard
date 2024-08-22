import { Component, OnInit } from '@angular/core';
import { CardFaturamentoService } from '../../../services/dash/cardfaturamento.service';
import { moneyReduct } from '../../../global/global-money';

@Component({
  selector: 'app-card-faturamento',
  standalone: true,
  imports: [],
  templateUrl: './card-faturamento.component.html',
  styleUrl: './card-faturamento.component.scss'
})
export class CardFaturamentoComponent implements OnInit{
  constructor(private cardFaturamento : CardFaturamentoService){}
  ngOnInit(): void {
    this.getCardFaturamento();
  }

  async getCardFaturamento(){
    (await this.cardFaturamento.getCardFaturamento()).subscribe(dados =>{
      let card :any[]=[];
      card = card.concat(dados.body)

      let total = 0.00;
      let cont =0;

      for(let i=0;i<card.length;i++){
        cont =0;
        total =card[i].total;
        card[i].human = moneyReduct(total);
      }

      let cardfat_mes = document.getElementById('cardfat_mes') as HTMLElement;
      cardfat_mes.innerHTML =card[0].human;
      let cardfat_mesp = document.getElementById('cardfat_mesp') as HTMLElement;
      let cardfat_ano = document.getElementById('cardfat_ano') as HTMLElement;
      cardfat_ano.innerHTML =card[2].human;
    })
  }

}
