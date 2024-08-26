import { Component, OnInit } from '@angular/core';
import { dashFatService } from '../../../services/dash-fat/dashfat.service';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../../services/config.service';
import { Chart, registerables } from 'chart.js';
import { globalCores } from '../../../global/global-cores';

Chart.register(...registerables);
@Component({
  selector: 'app-card-graph-conv-faturados',
  standalone: true,
  imports: [],
  templateUrl: './card-graph-conv-faturados.component.html',
  styleUrl: './card-graph-conv-faturados.component.scss'
})
export class CardGraphConvFaturadosComponent implements OnInit {
  constructor(private dashFat : dashFatService,
              private route: ActivatedRoute,
              private configService: ConfigService
          ){}

  ngOnInit(): void {
    this.configService.getConfig().subscribe(config=>{
      this.getFatConvFaturados(config.data_corte)
    },error=>{
      console.error('Erro ao carregar configuração',error)
    })
  }

  async getFatConvFaturados(data_corte: any) {
    (await this.dashFat.getFatConvFaturados(data_corte)).subscribe(dados => {
      const fat = dados.body || []; // Garantir que body esteja definido
      const datasets: any[] = [];
      const cores: string[] = globalCores.gbCoresTransp;

      for (let i = 0; i < fat.length; i++) {
        datasets.push({
          label: fat[i].convenio,
          data: [fat[i].valor_total],
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
