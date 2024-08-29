import { Component, OnInit } from '@angular/core';
import { CardLeitosService } from '../../../services/dash/cardleitos.service';
import { SpinnerComponent } from "../../spinner/spinner.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-leitos',
  standalone: true,
  imports: [SpinnerComponent,CommonModule],
  templateUrl: './card-leitos.component.html',
  styleUrl: './card-leitos.component.scss'
})
export class CardLeitosComponent implements OnInit {
  card : any[]=[];
  constructor(private cardLeitos : CardLeitosService){}
  ngOnInit(): void {
    this.getCardLeitos();
  }

  async getCardLeitos(){
    (await this.cardLeitos.getCardLeitos()).subscribe(dados=>{

      // let card :any[]=[];
      this.card = this.card.concat(dados.body)

      let v = ( (this.card[0].total*100)/this.card[2].total ).toFixed(2);
      let lbPorcent = document.getElementById('lbporcent') as HTMLElement;

      let lbLeitosD = document.getElementById('lbLeitosD') as HTMLElement;
      lbLeitosD.innerHTML = this.card[0].total.toString();


      let v1 = ( (this.card[1].total*100)/this.card[2].total ).toFixed(2);
      let lbPorcent1 = document.getElementById('lbporcentO') as HTMLElement;

      let lbLeitosO = document.getElementById('lbLeitosO') as HTMLElement;
      lbLeitosO.innerHTML = this.card[1].total.toString();

      let lbLeitosT = document.getElementById('lbLeitosT') as HTMLElement;
      lbLeitosT.innerHTML = this.card[2].total.toString();
    })
  }

}
