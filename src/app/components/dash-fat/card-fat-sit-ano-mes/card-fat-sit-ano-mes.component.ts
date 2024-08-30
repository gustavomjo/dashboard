import { Component, OnInit } from '@angular/core';
import { dashFatService } from '../../../services/dash-fat/dashfat.service';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../../services/config.service';
import moment from 'moment';
import { Chart, registerables } from 'chart.js';
import { globalData } from '../../../global/global-data';
import { FiltrodataService } from '../../filtrodata/filtrodata.service';
import { isValid } from 'date-fns';
import { SpinnerComponent } from "../../spinner/spinner.component";
import { CommonModule } from '@angular/common';

Chart.register(...registerables);
@Component({
  selector: 'app-card-fat-sit-ano-mes',
  standalone: true,
  imports: [SpinnerComponent,CommonModule],
  templateUrl: './card-fat-sit-ano-mes.component.html',
  styleUrl: './card-fat-sit-ano-mes.component.scss'
})
export class CardFatSitAnoMesComponent implements OnInit{
  data_corte? : Date;
  fat : any[]=[];
  constructor(private dashFat : dashFatService,
              private route: ActivatedRoute,
              private configService: ConfigService,
              public filtrodataService: FiltrodataService,
          ){}
  ngOnInit(): void {
    this.configService.getConfig().subscribe(config => {
      this.data_corte = config.data_corte;
      this.getFatSitAnoMes(this.data_corte,this.filtrodataService.data_de.replace(/-/g, '/'), this.filtrodataService.data_ate.replace(/-/g, '/'));
    }, error => {
      console.error('Erro ao carregar a configuração', error);
    });
    this.filtrodataService.addOnUpdateCallback(() => this.atualiza());
  }

  public atualiza(): void {
    let rota = ['dash', 'dash-fat'].includes(this.route.snapshot.routeConfig?.path || '');
    if (!rota) return;

    let dataDe: Date = globalData.convertToDate(this.filtrodataService.data_de);
    let dataAte: Date = globalData.convertToDate(this.filtrodataService.data_ate);

    let valid = dataDe < globalData.gbData_atual &&
                (isValid(dataDe) && isValid(dataAte)) &&
                dataAte >= dataDe;

    if (valid)
      this.getFatSitAnoMes(this.data_corte,this.filtrodataService.data_de.replace(/-/g, '/'), this.filtrodataService.data_ate.replace(/-/g, '/'));
  }

  async getFatSitAnoMes(data_corte : any,dataDe : any,dataAte : any){
    (await this.dashFat.getFatSitAnoMes(data_corte,dataDe,dataAte)).subscribe(dados=>{
      // let fat :any[]=[];
      this.fat = this.fat.concat(dados.body);
      // console.log(fat)
      let dataMap :{[key:string]:any} = {};
      let lstIntF : any[]=[];
      let lstIntA : any[]=[];
      let lstconsF : any[]=[];
      let lstconsA : any[]=[];
      let lstsadtF : any[]=[];
      let lstsadtA : any[]=[];
      for(let i=0;i<this.fat.length;i++){
        let mes = globalData.gbMeses[Number(moment.utc(this.fat[i].mes_ano).format('MM'))-1];
        let ano =moment.utc(this.fat[i].mes_ano).format('YYYY');
        let dt = mes+'/'+ano

        if (!dataMap[dt]) {
          dataMap[dt] = {
            data: dt
          };
        }
        switch(this.fat[i].ds_tipo){
          case "Internacao" :
            if(this.fat[i].situacao_conta == "Fechada")
              lstIntF.push(this.fat[i].valor_total)
            else
              lstIntA.push(this.fat[i].valor_total)

            break;
          case "Consulta" :
            if(this.fat[i].situacao_conta == "Fechada")
              lstconsF.push(this.fat[i].valor_total)
            else
              lstconsA.push(this.fat[i].valor_total)
            break;

          case "SADT" :
            if(this.fat[i].situacao_conta == "Fechada")
              lstsadtF.push(this.fat[i].valor_total)
            else
              lstsadtA.push(this.fat[i].valor_total)
            break;
        }
      }
      let title = '';
      if(dataDe != '')
        title = 'Faturamento - Int/Cons - Período : de '+dataDe+' a '+dataAte
      else
         title = 'Faturamento - Int/Cons ('+globalData.gbAno+')';


      let dtArray = Object.keys(dataMap);
      this._chart(dtArray, [
        { label: 'Internações Fechadas', data: lstIntF, backgroundColor: 'rgba(75, 192, 192, 0.6)' },
        { label: 'Internações Abertas', data: lstIntA, backgroundColor: 'rgba(255, 99, 132, 0.6)' },
        { label: 'Consultas Fechadas', data: lstconsF, backgroundColor: 'rgba(54, 162, 235, 0.6)' },
        { label: 'Consultas Abertas', data: lstconsA, backgroundColor: 'rgba(255, 206, 86, 0.6)' },
        // { label: 'SADT Fechados', data: lstsadtF, backgroundColor: 'rgba(153, 102, 255, 0.6)' },
        // { label: 'SADT Abertos', data: lstsadtA, backgroundColor: 'rgba(255, 159, 64, 0.6)' }
      ],title);

      if(dataDe != '')
        title = 'Faturamento - SADT - Período : de '+dataDe+' a '+dataAte
      else
         title = 'Faturamento - SADT ('+globalData.gbAno+')';
      this._chartSadt(dtArray, [
        //{ label: 'Internações Fechadas', data: lstIntF, backgroundColor: 'rgba(75, 192, 192, 0.6)' },
        // { label: 'Internações Abertas', data: lstIntA, backgroundColor: 'rgba(255, 99, 132, 0.6)' },
        //{ label: 'Consultas Fechadas', data: lstconsF, backgroundColor: 'rgba(54, 162, 235, 0.6)' },
        // { label: 'Consultas Abertas', data: lstconsA, backgroundColor: 'rgba(255, 206, 86, 0.6)' },
        { label: 'SADT Fechados', data: lstsadtF, backgroundColor: 'rgba(153, 102, 255, 0.6)' },
        { label: 'SADT Abertos', data: lstsadtA, backgroundColor: 'rgba(255, 159, 64, 0.6)' }
      ],title);
    })
  }

  _chart(mes_ano : any,dataset : any,title : string){
    let chartExist = Chart.getChart("_chart"); // <canvas> id
    if (chartExist != undefined)
      chartExist.destroy();

    const myChart = new Chart("_chart", {
      type: 'bar',
      data: {
        labels: mes_ano,
        datasets: dataset
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: title
          }
        }
      }
    });

  }

  _chartSadt(mes_ano : any,dataset : any,title : string){
    // console.log(mes_ano)
    let chartExist = Chart.getChart("_chartSadt"); // <canvas> id
    if (chartExist != undefined)
      chartExist.destroy();

    const myChart = new Chart("_chartSadt", {
      type: 'bar',
      data: {
        labels: mes_ano,
        datasets: dataset
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: title
          }
        }
      }
    });

  }
}
