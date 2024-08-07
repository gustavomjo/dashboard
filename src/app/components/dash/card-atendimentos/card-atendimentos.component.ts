import { Component, OnInit } from '@angular/core';
import { CardAtendService } from '../../../services/dash/cardatend.service';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-card-atendimentos',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './card-atendimentos.component.html',
  styleUrl: './card-atendimentos.component.scss'
})
export class CardAtendimentosComponent implements OnInit{
  carTime = 5000;
  constructor(private cardAtend : CardAtendService){}

  ngOnInit(): void {
    this.getCardAtend();
  }

  async getCardAtend(){
    (await this.cardAtend.getCardAtend()).subscribe(dados =>{
      let card :any[]=[];
      card = card.concat(dados.body)

      let cardConsM = document.getElementById('cardConsultaM') as HTMLElement;
      let cardConsA = document.getElementById('cardConsultaA') as HTMLElement;
      let cardIntM = document.getElementById('cardIntM') as HTMLElement;
      let cardIntA = document.getElementById('cardIntA') as HTMLElement;
      let cardSADTM = document.getElementById('cardSADTM') as HTMLElement;
      let cardSADTA = document.getElementById('cardSADTA') as HTMLElement;

      cardConsM.innerHTML = '0';
      cardConsA.innerHTML = '0';
      cardIntM.innerHTML = '0';
      cardIntA.innerHTML = '0';
      cardSADTM.innerHTML = '0';
      cardSADTA.innerHTML = '0';

      for(let i=0;i<card.length;i++){
        switch (card[i].tipo) {
          case 'P':
            switch (card[i].periodo) {
              case 'Este Mes':
                cardConsM.innerHTML = card[i].total.toString();
                break;
              case 'Este Ano':
                cardConsA.innerHTML = card[i].total.toString();
                break;
            }
            break;
          case 'I':
            switch (card[i].periodo) {
              case 'Este Mes':
                cardIntM.innerHTML = card[i].total.toString();
                break;
              case 'Este Ano':
                cardIntA.innerHTML = card[i].total.toString();
                break;
            }
            break;
          case 'S':
            switch (card[i].periodo) {
              case 'Este Mes':
                cardSADTM.innerHTML = card[i].total.toString();
                break;
              case 'Este Ano':
                cardSADTA.innerHTML = card[i].total.toString();
                break;
            }
            break;
        }
      }
    })
  }

}
