import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {dashFatService} from '../../../services/dash-fat/dashfat.service'
import { globalCoresNome, globalData, moneyReduct } from '../../../globals';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-fat-total-ano',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './card-fat-total-ano.component.html',
  styleUrl: './card-fat-total-ano.component.scss'
})
export class CardFatTotalAnoComponent implements OnInit{
  _ano = globalData.gbAno;
  color = globalCoresNome;
  _lbInt = '';
  _lbCons = '';
  _lbSadt = '';
  _total = '';
  screenWidth: number = 0;
  constructor(private dashFat : dashFatService,
              private route: ActivatedRoute
          ){}
  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.getFatTotal();
    console.log(this.screenWidth)
  }

  headingClass() {
    return {
      'h2': this.screenWidth < 992 || this.screenWidth > 1400,
      'h5': this.screenWidth > 992 && this.screenWidth < 1200,
      'h4': this.screenWidth > 1200 && this.screenWidth < 1300,
      'h3': this.screenWidth > 1300 && this.screenWidth < 1400
    };
  }


  async getFatTotal(){
    (await this.dashFat.getFatTotalAno()).subscribe(dados=>{
      let fat : any[]=[];
      fat = fat.concat(dados.body);
      let total : number=0;
      for(let i=0;i<fat.length;i++){
        switch(fat[i].ds_tipo){
          case "Internacao" :
            this._lbInt = moneyReduct(Number(fat[i].valor_total));
            // this.internacao = this.internacao.toFixed(2);
            break;
          case "Consulta" :
            this._lbCons = moneyReduct(Number(fat[i].valor_total));
            break;
          case "SADT" :
            this._lbSadt = moneyReduct(Number(fat[i].valor_total));
            break;
        }
        total = total + fat[i].valor_total;
      }
      this._total = moneyReduct(total);
    })
  }

}
