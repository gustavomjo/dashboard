import { Component, OnInit } from '@angular/core';
import { CardFaturamentoService } from '../../../services/dash/cardfaturamento.service';
import { moneyReduct } from '../../../global/global-money';
import { SpinnerComponent } from "../../spinner/spinner.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-faturamento',
  standalone: true,
  imports: [SpinnerComponent,CommonModule],
  templateUrl: './card-faturamento.component.html',
  styleUrl: './card-faturamento.component.scss'
})
export class CardFaturamentoComponent implements OnInit{
  card : any[]=[];
  constructor(private cardFaturamento : CardFaturamentoService){}
  ngOnInit(): void {
    this.getCardFaturamento();
  }

  async getCardFaturamento(){
    (await this.cardFaturamento.getCardFaturamento()).subscribe(dados =>{
      // let card :any[]=[];
      this.card = this.card.concat(dados.body)
      // console.log(this.card)

      let total = 0.00;
      let cont =0;

      for(let i=0;i<this.card.length;i++){
        cont =0;
        total =this.card[i].total;
        this.card[i].human = moneyReduct(total);
      }

      let cardfat_mes = document.getElementById('cardfat_mes') as HTMLElement;
      cardfat_mes.innerHTML =this.card[0].human;
      // let cardfat_mesp = document.getElementById('cardfat_mesp') as HTMLElement;
      let cardfat_ano = document.getElementById('cardfat_ano') as HTMLElement;
      cardfat_ano.innerHTML =this.card[1].human;
    })
  }

}
