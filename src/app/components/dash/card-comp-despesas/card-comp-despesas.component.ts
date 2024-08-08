import { Component, OnInit } from '@angular/core';
import { DespesaService } from '../../../services/dash/despesa.service';
import { Chart, registerables } from 'chart.js';
import { cleanStringUnicode, globalCores, globalData } from '../../../globals';
import { FiltrodataService } from '../../filtrodata/filtrodata.service';
import { isValid } from 'date-fns';
import { ActivatedRoute } from '@angular/router';

Chart.register(...registerables);
@Component({
  selector: 'app-card-comp-despesas',
  standalone: true,
  imports: [],
  templateUrl: './card-comp-despesas.component.html',
  styleUrl: './card-comp-despesas.component.scss'
})

export class CardCompDespesasComponent implements OnInit{

  constructor(private despesaService : DespesaService,
              public filtrodataService: FiltrodataService,
              private route: ActivatedRoute
  ){  }
  ngOnInit(): void {
    this.filtrodataService.addOnUpdateCallback(() => this.atualiza());
    this.getDespesa(this.filtrodataService.data_de, this.filtrodataService.data_ate);
  }

  private atualiza(): void {
    let rota = this.route.snapshot.routeConfig?.path ==='dash';
    if(!rota)
      return;

    let dataDe: Date = globalData.convertToDate(this.filtrodataService.data_de);
    let dataAte: Date = globalData.convertToDate(this.filtrodataService.data_ate);

    let valid = dataDe < globalData.gbData_atual &&
                (isValid(dataDe) && isValid(dataAte)) &&
                dataAte >= dataDe;

    if(valid)
      this.getDespesa(this.filtrodataService.data_de.replaceAll('-','/'),this.filtrodataService.data_ate.replaceAll('-','/'));

  }

  public async getDespesa(dataDe : string,dataAte : string){
    (await this.despesaService.getDespesa(dataDe,dataAte)).subscribe(dados =>{
      let despesa :any[]=[];
      despesa = despesa.concat(dados.body);
      let dsDespesa :any[]=[];
      let vrDespesa :any[]=[];
      if(despesa != null){
        for(let i=0;i< despesa.length;i++){
          dsDespesa.push(cleanStringUnicode(despesa[i].ds_subgrupo));
          vrDespesa.push(despesa[i].valor);
        }
        console.log(dsDespesa)
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
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  }

}
