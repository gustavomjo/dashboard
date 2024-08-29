import { Component, OnInit } from '@angular/core';
import { farmCurvaAbcCustoService } from '../../../services/dash-farm/farmCurvaAbcCusto.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { searchModule } from '../../search.Module';
import { CommonModule } from '@angular/common';
import { farmDetalheProdutoService } from '../../../services/dash-farm/farmDetalheProduto.service';
import { differenceInDays, isValid, parseISO } from 'date-fns';
import moment from 'moment';
import { Chart, registerables } from 'chart.js';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FiltrodataComponent } from "../../filtrodata/filtrodata.component";
import { FiltrodataService } from '../../filtrodata/filtrodata.service';
import { ActivatedRoute } from '@angular/router';
import { SpinnerComponent } from "../../spinner/spinner.component";
import { globalData } from '../../../global/global-data';
import { globalCores } from '../../../global/global-cores';

Chart.register(...registerables);

@Component({
  selector: 'app-curva-abc',
  standalone: true,
  imports: [MatFormFieldModule, MatDatepickerModule, MatDatepickerModule, FormsModule, searchModule, CommonModule, FiltrodataComponent, SpinnerComponent],
  providers: [provideNativeDateAdapter()],
  templateUrl: './curva-abc.component.html',
  styleUrl: './curva-abc.component.scss'
})
export class CurvaABCComponent implements OnInit {
  _curvaAbcCusto : any =[];
  _NomeProdDetalhe : any;
  _searchDescricao ="";
  searchTerm: string = '';

  mesanoDe = new Date();
  mesanoAte = new Date();

  _detalheProdutoLocal : any[]=[];

  constructor(private farmCurvaAbcCusto : farmCurvaAbcCustoService,
              private farmDetalheProduto : farmDetalheProdutoService,
              public filtrodataService: FiltrodataService,
              private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.filtrodataService.addOnUpdateCallback(() => this.atualiza());
    this.getCurvaAbcCusto(this.filtrodataService.data_de.replace(/-/g, '/'), this.filtrodataService.data_ate.replace(/-/g, '/'));
  }

  private atualiza(): void {
    let rota = ['dash-farm', 'dash-user'].includes(this.route.snapshot.routeConfig?.path || '');
    if (!rota) return;
    this._curvaAbcCusto = [];

    let dataDe: Date = globalData.convertToDate(this.filtrodataService.data_de);
    let dataAte: Date = globalData.convertToDate(this.filtrodataService.data_ate);

    let valid = dataDe < globalData.gbData_atual &&
                (isValid(dataDe) && isValid(dataAte)) &&
                dataAte >= dataDe;

    if(valid)
      this.getCurvaAbcCusto(this.filtrodataService.data_de.replaceAll('-','/'),this.filtrodataService.data_ate.replaceAll('-','/'));

  }

  async getCurvaAbcCusto(dataDe: string,dataate : string){
    (await this.farmCurvaAbcCusto.getCurvaAbcCusto(dataDe,dataate)).subscribe(curvaBody=>{

      let dados :any[]=[];
      let totCusto = 0;
      let pAcum = 0.00;
      dados = dados.concat(curvaBody.body)
      console.log(dados)

      for(let i=0;i<dados.length;i++){
        totCusto = totCusto+ Number(dados[i].total_custo_medio);
      }
      for(let i=0;i<dados.length;i++){
        dados[i].custo = dados[i].custo.toFixed(2);
        dados[i].total_custo_medio = dados[i].total_custo_medio.toFixed(2);

        dados[i].porcent = (dados[i].total_custo_medio/totCusto) * 100;
        dados[i].porcent = dados[i].porcent.toFixed(4);
        pAcum = pAcum + Number(dados[i].porcent);
        dados[i].porcentac = pAcum.toFixed(5);
        dados[i].curva = (pAcum < 80 ? "A" : pAcum < 95 ? "B" : "C")
      }
      this._curvaAbcCusto = dados;
    })
  }

  onClickInfo(value:any,name:any){
    this._NomeProdDetalhe = name;
    this.getProdutoLocal(value);
    this.getEntradaSaida(value);
  }

  filteredCurvaAbcCusto() {

    if (!this.searchTerm) {
      return this._curvaAbcCusto;
    }
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
  }


  async getProdutoLocal(codprod:number){
    (await this.farmDetalheProduto.getProdutoLocal(codprod)).subscribe(prod =>{
      this._detalheProdutoLocal = [];
      this._detalheProdutoLocal = this._detalheProdutoLocal.concat(prod.body);

      for(let i=0;i<this._detalheProdutoLocal.length;i++)
      {
        const validadeDate = parseISO(this._detalheProdutoLocal[i].validade);
        const dataAtual = globalData.gbData_atual;
        this._detalheProdutoLocal[i].dias = differenceInDays(validadeDate, dataAtual);

        this._detalheProdutoLocal[i].validade = moment(this._detalheProdutoLocal[i].validade).format('DD-MM-YYYY');

      }
    })
  }

  async getEntradaSaida(codprod:number){
    (await this.farmDetalheProduto.getEntradaSaida12(codprod)).subscribe(prod=>{
      let dados : any[]=[];
      dados = dados.concat(prod.body);

      let mes_ano : any[]=[];
      let totalE : any[]=[];
      let totalS : any[]=[];
      for(let i=0;i<dados.length;i++){
        mes_ano.push(dados[i].descricao)
        totalE.push(dados[i].entrada)
        totalS.push(dados[i].saida)
      }
      this._rcEntradaSaida(mes_ano,totalE,totalS);
    })
  }
  _rcEntradaSaida(_mesano:any,_totalE:any,_totalS:any){
    let chartExist = Chart.getChart("_EntradaSaida"); // <canvas> id
    if (chartExist != undefined)
      chartExist.destroy();

    const data = {
      labels: _mesano,
      datasets: [
        {
          label: 'Entradas',
          data: _totalE,
          backgroundColor:globalCores.gbCores[1],
        },
        {
          label: 'Saidas',
          data: _totalS,
          backgroundColor:globalCores.gbCores[2],
        },
      ]
    };

    let myChart = new Chart("_EntradaSaida", {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Entradas e Saídas'
          }
        }
      },
    });
  }
}
