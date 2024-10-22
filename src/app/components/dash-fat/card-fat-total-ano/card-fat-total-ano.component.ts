import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {dashFatService} from '../../../services/dash-fat/dashfat.service'
import { CommonModule } from '@angular/common';
import { globalData } from '../../../global/global-data';
import { globalCoresNome } from '../../../global/global-cores';
import { moneyReduct } from '../../../global/global-money';
import { SpinnerComponent } from "../../spinner/spinner.component";
import { FiltrodataService } from '../../filtrodata/filtrodata.service';
import { ConfigService } from '../../../services/config.service';
import { globalVars } from '../../../global/globals';

@Component({
  selector: 'app-card-fat-total-ano',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './card-fat-total-ano.component.html',
  styleUrl: './card-fat-total-ano.component.scss'
})
export class CardFatTotalAnoComponent implements OnInit{
  fat :any[]=[];
  _ano = globalData.gbAno;
  color = globalCoresNome;
  _lbInt = '';
  _lbCons = '';
  _lbSadt = '';
  _total = '';
  screenWidth: number = 0;
  private intervalId : any;
  constructor(private dashFat : dashFatService,
              private route: ActivatedRoute,
              public filtrodataService: FiltrodataService,
              private configService: ConfigService
          ){}
  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.configService.getConfig().subscribe(config => {
      globalVars.intervalTime = (config.atualizacao || 10) * 1000;
      this.getFatTotal();
      this.intervalId = setInterval(() => {
        this.fat = [];
        this._lbInt = '';
        this._lbCons = '';
        this._lbSadt = '';
        this._total = '';
        this.getFatTotal();
      }, globalVars.intervalTime);
    }, error => {
      console.error('Erro ao carregar a configuração', error);
    });

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
      // let fat : any[]=[];
      this.fat = this.fat.concat(dados.body);
      let total : number=0;
      for(let i=0;i<this.fat.length;i++){
        switch(this.fat[i].ds_tipo){
          case "Internacao" :
            this._lbInt = moneyReduct(Number(this.fat[i].valor_total));
            // this.internacao = this.internacao.toFixed(2);
            break;
          case "Consulta" :
            this._lbCons = moneyReduct(Number(this.fat[i].valor_total));
            break;
          case "SADT" :
            this._lbSadt = moneyReduct(Number(this.fat[i].valor_total));
            break;
        }
        total = total + this.fat[i].valor_total;
      }
      this._total = moneyReduct(total);
    })
  }

}
