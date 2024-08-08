import { Component, OnInit } from '@angular/core';
import { DespesaService } from '../../../services/dash/despesa.service';
import { Chart, registerables } from 'chart.js';
import { globalCores, globalData } from '../../../globals';
import { FiltrodataService } from '../../filtrodata/filtrodata.service';
import { isValid, parse } from 'date-fns';

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
              public filtrodataService: FiltrodataService
  ){
    filtrodataService.data_de
  }
  ngOnInit(): void {
    this.filtrodataService.setOnUpdateCallback(() => this.atualiza());
    this.getDespesa(this.filtrodataService.data_de,this.filtrodataService.data_ate);
  }

  convertToDate(dateString: string): Date {
    return parse(dateString, 'dd-MM-yyyy', new Date());
  }

  private atualiza(): void {
    let dataDe: Date = this.convertToDate(this.filtrodataService.data_de);
    let dataAte: Date = this.convertToDate(this.filtrodataService.data_ate);

    if(dataDe < globalData.gbData_atual){
      if (isValid(dataDe) && isValid(dataAte)) {
        if (dataAte > dataDe) {
          this.getDespesa(this.filtrodataService.data_de.replaceAll('-','/'),this.filtrodataService.data_ate.replaceAll('-','/'));
        }
      }
    }
  }

  public async getDespesa(dataDe : string,dataAte : string){
    (await this.despesaService.getDespesa(dataDe,dataAte)).subscribe(dados =>{
      let despesa :any[]=[];
      despesa = despesa.concat(dados.body);
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
