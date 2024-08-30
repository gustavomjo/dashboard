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
import { ComboCheckService } from '../../combo-check-box/combocheck.service';
import { moneyReduct } from '../../../global/global-money';
import { ComboCheckBoxComponent } from "../../combo-check-box/combo-check-box.component";

Chart.register(...registerables);
@Component({
  selector: 'app-card-graph-conv-faturados',
  standalone: true,
  imports: [SpinnerComponent, CommonModule, ComboCheckBoxComponent],
  templateUrl: './card-graph-conv-faturados.component.html',
  styleUrl: './card-graph-conv-faturados.component.scss'
})
export class CardGraphConvFaturadosComponent implements OnInit {
  data_corte? : Date;
  fat : any[]=[];
  filtroConv : any[]=[];
  constructor(private dashFat : dashFatService,
              private route: ActivatedRoute,
              private configService: ConfigService,
              public filtrodataService: FiltrodataService,
              public combocheck : ComboCheckService
          ){
            //neste caso nao precisa do botao selecionar todos
            combocheck.selectedALL = false;
          }

  ngOnInit(): void {
    this.configService.getConfig().subscribe(config=>{
      //True para no inicio ja atualizar a lista
      this.combocheck.UpdateList = true;

      this.data_corte = config.data_corte;
      this.getFatConvFaturados(this.data_corte,this.filtrodataService.data_de.replace(/-/g, '/'), this.filtrodataService.data_ate.replace(/-/g, '/'),[]);

    },error=>{
      console.error('Erro ao carregar configuração',error)
    });
    this.filtrodataService.addOnUpdateCallback(() => this.atualiza());

    this.combocheck.addOnUpdateCallbackSelected(() => this.atualizaLst());
  }

  public atualiza(): void {
    let rota = ['dash-user', 'dash-fat'].includes(this.route.snapshot.routeConfig?.path || '');
    if (!rota) return;

    let dataDe: Date = globalData.convertToDate(this.filtrodataService.data_de);
    let dataAte: Date = globalData.convertToDate(this.filtrodataService.data_ate);

    let valid = dataDe < globalData.gbData_atual &&
                (isValid(dataDe) && isValid(dataAte)) &&
                dataAte >= dataDe;

    if (valid) {
      //True para quando mudar data ele atualiza a lista
      this.combocheck.UpdateList = true;
      this.getFatConvFaturados(this.data_corte,this.filtrodataService.data_de.replace(/-/g, '/'), this.filtrodataService.data_ate.replace(/-/g, '/'),[]);
    }
  }

  public atualizaLst() : void {

    if(this.filtroConv !== this.combocheck.ListChecked)
      this.filtroConv = this.combocheck.ListChecked;

    this.getFatConvFaturados(this.data_corte,this.filtrodataService.data_de.replace(/-/g, '/'), this.filtrodataService.data_ate.replace(/-/g, '/'),this.combocheck.ListChecked);

  }

  async getFatConvFaturados(data_corte : any,dataDe : any,dataAte : any,filtro :any[]) {
    (await this.dashFat.getFatConvFaturados(data_corte,dataDe,dataAte)).subscribe(dados => {
      let dado : any[] = [];
      dado = dado.concat(dados.body);
      let conv : any[]=[];
      this.fat = [];
      this.fat = this.fat.concat(dados.body) ;
      const datasets: any[] = [];
      const cores: string[] = globalCores.gbCoresTransp;

      this.fat.forEach((c, i) => {
        if (filtro.length === 0 ||filtro.some(f => f.value === c.convenio)) {
          datasets.push({
            label: c.convenio,
            data: [c.valor_total],
            backgroundColor: cores[i % cores.length],
            borderColor: cores[i % cores.length],
            borderWidth: 1
          });
        }

        conv.push({
          value: c.convenio,
          text: [c.convenio + ' - ' + moneyReduct(c.valor_total)]
        });
      });
      this.combocheck.List = conv;
      this.combocheck.notifyUpdateLista();

      let title = '';
      if (dataDe !== '') {
        title = `Faturamento por convênio - Período: de ${dataDe} a ${dataAte}`;
      } else {
        title = `Faturamento por convênio (${globalData.gbAno})`;
      }

      if(this.fat.length > 0)
        this._chart(datasets,title);
    });
  }

  _chart(datasets: any[], title: string) {
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
                    labels: {
                      generateLabels: function(chart) {
                        // Obtém todas as labels existentes
                        const originalLabels = Chart.defaults.plugins.legend.labels.generateLabels(chart);

                        // Limita a quantidade de labels a 10
                        return originalLabels.slice(-10);
                    }
                    }
                    //position: 'top',
                },
                title: {
                    display: true,
                    text: title
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            },
        }
    });
  }



}
