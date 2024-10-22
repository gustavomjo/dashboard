import { Component, OnInit } from '@angular/core';
import { DespesaService } from '../../../services/dash/despesa.service';
import { Chart, registerables } from 'chart.js';
import { FiltrodataService } from '../../filtrodata/filtrodata.service';
import { isValid } from 'date-fns';
import { ActivatedRoute } from '@angular/router';
import { globalData } from '../../../global/global-data';
import { cleanStringUnicode } from '../../../global/global-string';
import { globalCores } from '../../../global/global-cores';
import { SpinnerComponent } from "../../spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { ConfigService } from '../../../services/config.service';
import { globalVars } from '../../../global/globals';

Chart.register(...registerables);
@Component({
  selector: 'app-card-comp-despesas',
  standalone: true,
  imports: [SpinnerComponent,CommonModule],
  templateUrl: './card-comp-despesas.component.html',
  styleUrl: './card-comp-despesas.component.scss'
})

export class CardCompDespesasComponent implements OnInit{
  despesa : any[]=[];
  private intervalId : any;
  constructor(private despesaService : DespesaService,
              public filtrodataService: FiltrodataService,
              private route: ActivatedRoute,
              private configService: ConfigService
  ){  }
  ngOnInit(): void {
    this.filtrodataService.addOnUpdateCallback(() => this.atualiza());

    this.configService.getConfig().subscribe(config => {
      // Utiliza a função global para converter segundos para milissegundos
      this.getDespesa(this.filtrodataService.data_de, this.filtrodataService.data_ate);
      globalVars.intervalTime = (config.atualizacao || 10) * 1000;
      this.intervalId = setInterval(() => {
        this.despesa = [];
        let chartExist = Chart.getChart("_rcDespesa"); // <canvas> id
        if (chartExist != undefined)
          chartExist.destroy();
        this.getDespesa(this.filtrodataService.data_de, this.filtrodataService.data_ate);
      }, globalVars.intervalTime);
    }, error => {
      console.error('Erro ao carregar configuração', error);
    });
  }
  ngAfterViewInit(): void {

  }


  public atualiza(): void {
    let rota = ['dash', 'dash-user'].includes(this.route.snapshot.routeConfig?.path || '');
    if (!rota) return;

    let dataDe: Date = globalData.convertToDate(this.filtrodataService.data_de);
    let dataAte: Date = globalData.convertToDate(this.filtrodataService.data_ate);

    let valid = dataDe < globalData.gbData_atual &&
                (isValid(dataDe) && isValid(dataAte)) &&
                dataAte >= dataDe;

    if (valid)
      this.getDespesa(this.filtrodataService.data_de.replace(/-/g, '/'), this.filtrodataService.data_ate.replace(/-/g, '/'));
  }

  public async getDespesa(dataDe : string,dataAte : string){
    (await this.despesaService.getDespesa(dataDe,dataAte)).subscribe(dados =>{
      // let despesa :any[]=[];
      this.despesa = this.despesa.concat(dados.body);

      let dsDespesa :any[]=[];
      let vrDespesa :any[]=[];
      if(this.despesa != null){
        for(let i=0;i< this.despesa.length;i++){
          dsDespesa.push(cleanStringUnicode(this.despesa[i].ds_subgrupo));
          vrDespesa.push(this.despesa[i].valor);
        }
        this._rcDespesa(dsDespesa,vrDespesa);
      }
    })
  }

  _rcDespesa(_lbDespesa:any,_vrDespesa:any){
    let chartExist = Chart.getChart("_rcDespesa"); // <canvas> id
    if (chartExist != undefined)
      chartExist.destroy();

    const myChart = new Chart("_rcDespesa", {
      type: 'bar',
      data: {
        labels: _lbDespesa,
        datasets: [{
          label: 'Composição de despesas',
          data:  _vrDespesa,
          backgroundColor:[globalCores.gbCores[0],globalCores.gbCores[1],globalCores.gbCores[2],globalCores.gbCores[3],globalCores.gbCores[4],globalCores.gbCores[5]],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            display:false
          },
          title: {
            display: true,
            text: 'Composição de despesas'
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
