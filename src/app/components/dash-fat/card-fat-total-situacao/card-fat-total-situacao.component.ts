import { Component, OnInit } from '@angular/core';
import { dashFatService } from '../../../services/dash-fat/dashfat.service';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../../services/config.service';
import { CommonModule } from '@angular/common';
import { globalCoresNome } from '../../../global/global-cores';
import { moneyReduct } from '../../../global/global-money';
import { FiltrodataService } from '../../filtrodata/filtrodata.service';
import { globalData } from '../../../global/global-data';
import { isValid } from 'date-fns';
import { SpinnerComponent } from "../../spinner/spinner.component";

@Component({
  selector: 'app-card-fat-total-situacao',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './card-fat-total-situacao.component.html',
  styleUrl: './card-fat-total-situacao.component.scss'
})
export class CardFatTotalSituacaoComponent implements OnInit {
  fat : any[]=[];
  color = globalCoresNome;
  _pendente = '';
  _fechadoComRPS = '';
  _fechadoSemRPS = '';
  _total = '';
  data_corte? : Date;

  screenWidth: number = 0;
  constructor(private dashFat : dashFatService,
              private route: ActivatedRoute,
              private configService: ConfigService,
              public filtrodataService: FiltrodataService,
          ){}
  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.configService.getConfig().subscribe(config=>{
      this.data_corte = config.data_corte;
      this.getFatTotalSituacao(this.data_corte,this.filtrodataService.data_de.replace(/-/g, '/'), this.filtrodataService.data_ate.replace(/-/g, '/'));
    },error=>{
      console.error('Erro ao carregar configuração',error)
    });
    this.filtrodataService.addOnUpdateCallback(() => this.atualiza());
  }

  public atualiza(): void {
    let rota = ['dash-user', 'dash-fat'].includes(this.route.snapshot.routeConfig?.path || '');
    if (!rota) return;

    let dataDe: Date = globalData.convertToDate(this.filtrodataService.data_de);
    let dataAte: Date = globalData.convertToDate(this.filtrodataService.data_ate);

    let valid = dataDe < globalData.gbData_atual &&
                (isValid(dataDe) && isValid(dataAte)) &&
                dataAte >= dataDe;

    if (valid)
      this.getFatTotalSituacao(this.data_corte,this.filtrodataService.data_de.replace(/-/g, '/'), this.filtrodataService.data_ate.replace(/-/g, '/'));
  }

  headingClass() {
    return {
      'h2': this.screenWidth < 992 || this.screenWidth > 1400,
      'h5': this.screenWidth > 992 && this.screenWidth < 1200,
      'h4': this.screenWidth > 1200 && this.screenWidth < 1300,
      'h3': this.screenWidth > 1300 && this.screenWidth < 1400
    };
  }

  async getFatTotalSituacao(data_corte : any,dataDe : any,dataAte : any){
    (await this.dashFat.getFatTotalSituacao(data_corte,dataDe,dataAte)).subscribe(dados=>{
      // let fat :any[]=[];
      let total : number=0;
      this.fat = this.fat.concat(dados.body);
      this._pendente = '0';
      this._fechadoComRPS = '0';
      this._fechadoSemRPS = '0';
      for(let i=0;i<this.fat.length;i++){
        switch(this.fat[i].situacao_conta){
          case  'Pendente' :
            this._pendente = moneyReduct(this.fat[i].valor_total)
            break;
          case 'Fechada' :
            if(this.fat[i].rps==='N')
              this._fechadoSemRPS = moneyReduct(this.fat[i].valor_total);
            else
              this._fechadoComRPS = moneyReduct(this.fat[i].valor_total);
            break;
        }
        total = total + this.fat[i].valor_total;
      }
      this._total = moneyReduct(total);
    })
  }

}
