import { Component, OnInit } from '@angular/core';
import { CardLeitosService } from '../../../services/dash/cardleitos.service';

@Component({
  selector: 'app-card-leitos',
  standalone: true,
  imports: [],
  templateUrl: './card-leitos.component.html',
  styleUrl: './card-leitos.component.scss'
})
export class CardLeitosComponent implements OnInit {

  constructor(private cardLeitos : CardLeitosService){}
  ngOnInit(): void {
    this.getCardLeitos();
  }

  async getCardLeitos(){
    (await this.cardLeitos.getCardLeitos()).subscribe(dados=>{

      let card :any[]=[];
      card = card.concat(dados.body)

      let v = ( (card[0].total*100)/card[2].total ).toFixed(2);
      let lbPorcent = document.getElementById('lbporcent') as HTMLElement;

      let lbLeitosD = document.getElementById('lbLeitosD') as HTMLElement;
      lbLeitosD.innerHTML = card[0].total.toString();


      let v1 = ( (card[1].total*100)/card[2].total ).toFixed(2);
      let lbPorcent1 = document.getElementById('lbporcentO') as HTMLElement;

      let lbLeitosO = document.getElementById('lbLeitosO') as HTMLElement;
      lbLeitosO.innerHTML = card[1].total.toString();

      let lbLeitosT = document.getElementById('lbLeitosT') as HTMLElement;
      lbLeitosT.innerHTML = card[2].total.toString();
    })
  }

}
