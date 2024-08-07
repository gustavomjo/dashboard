import { Component, OnInit } from '@angular/core';
import { DespesaService } from '../../../services/dash/despesa.service';
import { Chart, registerables } from 'chart.js';
import { globalCores, globalData } from '../../../globals';

Chart.register(...registerables);
@Component({
  selector: 'app-card-comp-despesas',
  standalone: true,
  imports: [],
  templateUrl: './card-comp-despesas.component.html',
  styleUrl: './card-comp-despesas.component.scss'
})
export class CardCompDespesasComponent implements OnInit{

  constructor(private despesaService : DespesaService){
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.getDespesa(globalData.gbDataHoje,globalData.gbDataHoje);
  }

  async getDespesa(dataDe : string,dataAte : string){
    (await this.despesaService.getDespesa(dataDe,dataAte)).subscribe(dados =>{
      let despesa :any[]=[];
      despesa = despesa.concat(dados.body)
      let dsDespesa :any[]=[];
      let vrDespesa :any[]=[];
      if(despesa != null){
        for(let i=0;i< despesa.length;i++){
          dsDespesa.push(despesa[i].ds_subgrupo);
          vrDespesa.push(despesa[i].valor);
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
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  }

}
