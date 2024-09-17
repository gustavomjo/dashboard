import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ReceitaService } from '../../../services/dash/receita.service';
import { FiltrodataService } from '../../filtrodata/filtrodata.service';
import { ActivatedRoute } from '@angular/router';
import { isValid } from 'date-fns';
import { SpinnerComponent } from "../../spinner/spinner.component";
import { globalData } from '../../../global/global-data';
import { globalCores } from '../../../global/global-cores';
import { CommonModule } from '@angular/common';

Chart.register(...registerables);
@Component({
  selector: 'app-card-receita-natureza',
  standalone: true,
  imports: [SpinnerComponent,CommonModule],
  templateUrl: './card-receita-natureza.component.html',
  styleUrl: './card-receita-natureza.component.scss'
})
export class CardReceitaNaturezaComponent implements OnInit {
  realReceita : any =[];
  constructor(private receitaService : ReceitaService,
              public filtrodataService: FiltrodataService,
              private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    console.log(this.filtrodataService.data_de)
    this.filtrodataService.addOnUpdateCallback(() => this.atualiza());
    this.getReceitasAPI(this.filtrodataService.data_de, this.filtrodataService.data_ate);
  }
  public atualiza():void{
    let rota = ['dash', 'dash-user'].includes(this.route.snapshot.routeConfig?.path || '');
    if (!rota) return;

    let dataDe: Date = globalData.convertToDate(this.filtrodataService.data_de);
    let dataAte: Date = globalData.convertToDate(this.filtrodataService.data_ate);

    let valid = dataDe < globalData.gbData_atual &&
                (isValid(dataDe) && isValid(dataAte)) &&
                dataAte >= dataDe;

    if(valid)
      this.getReceitasAPI(this.filtrodataService.data_de.replace(/-/g, '/'), this.filtrodataService.data_ate.replace(/-/g, '/'));
  }

  async getReceitasAPI(dataDe: string, dataAte: string) {
    let labelReceita: any[] = [];
    let dataset: any = {}; // Objeto para armazenar o dataset do gráfico

    (await this.receitaService.getReceita(dataDe, dataAte)).subscribe(dados => {
        let receitas: any[] = [];
        receitas = receitas.concat(dados.body);

        if (receitas != null) {
            for (const key of Object.keys(receitas[0])) {
                switch (key) {
                    case 'valor_diarias': labelReceita.push('Valor Diaria'); break;
                    case 'valor_taxas': labelReceita.push('Valor Taxas'); break;
                    case 'valor_mat_med': labelReceita.push('Valor Mat/Med'); break;
                    case 'valor_honorarios': labelReceita.push('Valor Honorários'); break;
                    case 'valor_serv_compl': labelReceita.push('Valor SADT'); break;
                    case 'valor_pacotes': labelReceita.push('Valor Pacotes'); break;
                    case 'valor_total': labelReceita.push('Valor Total'); break;
                }
            }

            this.realReceita = Object.values(receitas[0]);

            // Montar o dataset diretamente aqui
            dataset = {
                labels: labelReceita,
                datasets: [{
                    label: 'Receita por Natureza',
                    data: this.realReceita,
                    backgroundColor: [
                        globalCores.gbCores[0], globalCores.gbCores[1],
                        globalCores.gbCores[2], globalCores.gbCores[3],
                        globalCores.gbCores[4], globalCores.gbCores[5]
                    ],
                    // backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
                    borderWidth: 1
                }]
            };

            this._rcNatureza(dataset); // Passar o dataset direto para o método _rcNatureza
        }
    });
}

  //Popular no chart
  _rcNatureza(chartData:any){
    let chartExist = Chart.getChart("_rcNatureza");
    if (chartExist != undefined) {
        chartExist.destroy();
    }

    // let myChart = new Chart("_rcNatureza", {
    //   type: 'bar',
    //   data: chartData,
    //   options: {
    //     scales: {
    //       y: {
    //         beginAtZero: true
    //       }
    //     }
    //   }
    // });

    let myChart = new Chart("_rcNatureza", {
      type: 'bar', // Mude o tipo do gráfico para testar
      data: chartData,
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
  }

}
