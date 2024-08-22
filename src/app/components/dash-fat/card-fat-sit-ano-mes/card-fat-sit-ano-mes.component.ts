import { Component, OnInit } from '@angular/core';
import { dashFatService } from '../../../services/dash-fat/dashfat.service';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../../services/config.service';
import moment from 'moment';
import { Chart, registerables } from 'chart.js';
import { globalData } from '../../../global/global-data';

Chart.register(...registerables);
@Component({
  selector: 'app-card-fat-sit-ano-mes',
  standalone: true,
  imports: [],
  templateUrl: './card-fat-sit-ano-mes.component.html',
  styleUrl: './card-fat-sit-ano-mes.component.scss'
})
export class CardFatSitAnoMesComponent implements OnInit{

  constructor(private dashFat : dashFatService,
              private route: ActivatedRoute,
              private configService: ConfigService
          ){}
  ngOnInit(): void {
    this.configService.getConfig().subscribe(config => {
      this.getFatSitAnoMes(config.data_corte);
    }, error => {
      console.error('Erro ao carregar a configuração', error);
    });
  }

  async getFatSitAnoMes(data_corte : any){
    (await this.dashFat.getFatSitAnoMes(data_corte)).subscribe(dados=>{
      let fat :any[]=[];
      fat = fat.concat(dados.body);
      // console.log(fat)
      let dataMap :{[key:string]:any} = {};
      let lstIntF : any[]=[];
      let lstIntA : any[]=[];
      let lstconsF : any[]=[];
      let lstconsA : any[]=[];
      let lstsadtF : any[]=[];
      let lstsadtA : any[]=[];
      for(let i=0;i<fat.length;i++){
        let mes = globalData.gbMeses[Number(moment.utc(fat[i].mes_ano).format('MM'))-1];
        let ano =moment.utc(fat[i].mes_ano).format('YYYY');
        let dt = mes+'/'+ano

        if (!dataMap[dt]) {
          dataMap[dt] = {
            data: dt
          };
        }
        switch(fat[i].ds_tipo){
          case "Internacao" :
            if(fat[i].situacao_conta == "Fechada")
              lstIntF.push(fat[i].valor_total)
            else
              lstIntA.push(fat[i].valor_total)

            break;
          case "Consulta" :
            if(fat[i].situacao_conta == "Fechada")
              lstconsF.push(fat[i].valor_total)
            else
              lstconsA.push(fat[i].valor_total)
            break;

          case "SADT" :
            if(fat[i].situacao_conta == "Fechada")
              lstsadtF.push(fat[i].valor_total)
            else
              lstsadtA.push(fat[i].valor_total)
            break;
        }
      }

      let dtArray = Object.keys(dataMap);
      this._chart(dtArray, [
        { label: 'Internações Fechadas', data: lstIntF, backgroundColor: 'rgba(75, 192, 192, 0.6)' },
        { label: 'Internações Abertas', data: lstIntA, backgroundColor: 'rgba(255, 99, 132, 0.6)' },
        { label: 'Consultas Fechadas', data: lstconsF, backgroundColor: 'rgba(54, 162, 235, 0.6)' },
        { label: 'Consultas Abertas', data: lstconsA, backgroundColor: 'rgba(255, 206, 86, 0.6)' },
        // { label: 'SADT Fechados', data: lstsadtF, backgroundColor: 'rgba(153, 102, 255, 0.6)' },
        // { label: 'SADT Abertos', data: lstsadtA, backgroundColor: 'rgba(255, 159, 64, 0.6)' }
      ]);
      this._chartSadt(dtArray, [
        //{ label: 'Internações Fechadas', data: lstIntF, backgroundColor: 'rgba(75, 192, 192, 0.6)' },
        // { label: 'Internações Abertas', data: lstIntA, backgroundColor: 'rgba(255, 99, 132, 0.6)' },
        //{ label: 'Consultas Fechadas', data: lstconsF, backgroundColor: 'rgba(54, 162, 235, 0.6)' },
        // { label: 'Consultas Abertas', data: lstconsA, backgroundColor: 'rgba(255, 206, 86, 0.6)' },
        { label: 'SADT Fechados', data: lstsadtF, backgroundColor: 'rgba(153, 102, 255, 0.6)' },
        { label: 'SADT Abertos', data: lstsadtA, backgroundColor: 'rgba(255, 159, 64, 0.6)' }
      ]);
    })
  }

  _chart(mes_ano : any,dataset : any){
    // console.log(mes_ano)
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
            text: 'Entradas - Custo'
          }
        }
      }
    });

  }

  _chartSadt(mes_ano : any,dataset : any){
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
            text: 'Entradas - Custo'
          }
        }
      }
    });

  }
}
