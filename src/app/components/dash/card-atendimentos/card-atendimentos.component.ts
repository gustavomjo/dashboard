import { Component, OnInit } from '@angular/core';
import { CardAtendService } from '../../../services/dash/cardatend.service';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { SpinnerComponent } from "../../spinner/spinner.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-atendimentos',
  standalone: true,
  imports: [CarouselModule, SpinnerComponent,CommonModule],
  templateUrl: './card-atendimentos.component.html',
  styleUrl: './card-atendimentos.component.scss'
})
export class CardAtendimentosComponent implements OnInit{
  carTime = 5000;
  card : any[]=[];
  constructor(private cardAtend : CardAtendService){}

  ngOnInit(): void {
    this.getCardAtend();
  }

  async getCardAtend(){
    (await this.cardAtend.getCardAtend()).subscribe(dados =>{
      // let card :any[]=[];
      this.card = this.card.concat(dados.body)

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

      for(let i=0;i<this.card.length;i++){
        switch (this.card[i].tipo) {
          case 'P':
            switch (this.card[i].periodo) {
              case 'Este Mes':
                cardConsM.innerHTML = this.card[i].total.toString();
                break;
              case 'Este Ano':
                cardConsA.innerHTML = this.card[i].total.toString();
                break;
            }
            break;
          case 'I':
            switch (this.card[i].periodo) {
              case 'Este Mes':
                cardIntM.innerHTML = this.card[i].total.toString();
                break;
              case 'Este Ano':
                cardIntA.innerHTML = this.card[i].total.toString();
                break;
            }
            break;
          case 'S':
            switch (this.card[i].periodo) {
              case 'Este Mes':
                cardSADTM.innerHTML = this.card[i].total.toString();
                break;
              case 'Este Ano':
                cardSADTA.innerHTML = this.card[i].total.toString();
                break;
            }
            break;
        }
      }
    })
  }

}
