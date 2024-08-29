import { Component, OnInit } from '@angular/core';
import { dashFatService } from '../../../services/dash-fat/dashfat.service';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../../services/config.service';
import { Chart, registerables } from 'chart.js';
import { globalCores } from '../../../global/global-cores';
import { isValid } from 'date-fns';
import { globalData } from '../../../global/global-data';
import { FiltrodataService } from '../../filtrodata/filtrodata.service';
import { SpinnerComponent } from "../../spinner/spinner.component";
import { CommonModule } from '@angular/common';

Chart.register(...registerables);
@Component({
  selector: 'app-card-graph-conv-faturados',
  standalone: true,
  imports: [SpinnerComponent,CommonModule],
  templateUrl: './card-graph-conv-faturados.component.html',
  styleUrl: './card-graph-conv-faturados.component.scss'
})
export class CardGraphConvFaturadosComponent implements OnInit {
  data_corte? : Date;
  fat : any[]=[];
  constructor(private dashFat : dashFatService,
              private route: ActivatedRoute,
              private configService: ConfigService,
              public filtrodataService: FiltrodataService,
          ){}

  ngOnInit(): void {
    this.configService.getConfig().subscribe(config=>{
      this.data_corte = config.data_corte;
      this.getFatConvFaturados(this.data_corte,this.filtrodataService.data_de.replace(/-/g, '/'), this.filtrodataService.data_ate.replace(/-/g, '/'));
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
      this.getFatConvFaturados(this.data_corte,this.filtrodataService.data_de.replace(/-/g, '/'), this.filtrodataService.data_ate.replace(/-/g, '/'));
  }

  async getFatConvFaturados(data_corte : any,dataDe : any,dataAte : any) {
    (await this.dashFat.getFatConvFaturados(data_corte,dataDe,dataAte)).subscribe(dados => {
      // const fat = dados.body || []; // Garantir que body esteja definido
      const datasets: any[] = [];
      const cores: string[] = globalCores.gbCoresTransp;

      for (let i = 0; i < this.fat.length; i++) {
        datasets.push({
          label: this.fat[i].convenio,
          data: [this.fat[i].valor_total],
          backgroundColor: cores[i % cores.length], // Usando as cores com segurança
            borderColor: cores[i % cores.length],
          borderWidth: 1
        });
      }
      this._chart(datasets);
    });
  }

  _chart(datasets: any[]) {
    let chartExist = Chart.getChart("_chartFatConvFaturados"); // <canvas> id
    if (chartExist != undefined) chartExist.destroy();

    const myChart = new Chart("_chartFatConvFaturados", {
      type: 'bar',
      data: {
        labels: [''], // Apenas um rótulo, pois cada dataset será uma barra separada
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Permite ajustar a altura livremente
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Faturamento por convênio'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }



}