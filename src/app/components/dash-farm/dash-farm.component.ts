import { farmProdutoValidadeService } from './../../services/dash-farm/farmProdutoValidade.service';
import { farmDetalheProdutoService } from './../../services/dash-farm/farmDetalheProduto.service';
import { farmCurvaAbcCustoService } from './../../services/dash-farm/farmCurvaAbcCusto.service';

import { CommonModule} from '@angular/common';
import {  Component, Input, OnInit } from '@angular/core';

import { Chart,registerables } from 'chart.js';
import { CarouselModule  } from 'ngx-bootstrap/carousel';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import moment from 'moment';
import { globalCores, globalData } from '../../globals';
import { FormsModule } from '@angular/forms';

import { differenceInDays, parseISO } from 'date-fns';

import { searchModule } from './search.Module';
import { provideNativeDateAdapter } from '@angular/material/core';

Chart.register(...registerables);

@Component({
  selector: 'app-dash-farm',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule, MatDatepickerModule,CarouselModule,MatDatepickerModule,FormsModule,searchModule  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dash-farm.component.html',
  styleUrl: './dash-farm.component.scss'
})

export class DashFarmComponent  implements OnInit{
  _curvaAbcCusto : any =[];
  _detalheProdutoLocal : any[]=[];
  _NomeProdDetalhe : any;
  _ProdutoValidade : any[]=[];
  _searchDescricao = "";
  _searchMedicamento = "";
  _searchGrupo="";

  _dsGrupo : any[]=[];
  _dsSubGrupo : any[]=[];


  searchTerm: string = '';

  mesanoDe = new Date();
  mesanoAte = new Date();

  constructor(private farmCurvaAbcCusto : farmCurvaAbcCustoService,
              private farmDetalheProduto : farmDetalheProdutoService,
              private farmProdutoValidade : farmProdutoValidadeService
  ){}
  ngOnInit(): void {
    this.getCurvaAbcCusto(globalData.gbDataHoje,globalData.gbDataHoje);
    this.getProdutoValidade()
  }

  public onDateIn(event: any): void {
    this.mesanoDe = event;
    this.mesanoDe=new Date(event);
  }

  public onDateUntil(event: any): void {
    this.mesanoAte = event;
    this.mesanoAte = new Date(event);

    const _datade = new Date(this.mesanoDe);
    const dataDe = _datade.toLocaleDateString('pt-BR', {  year: 'numeric', month: 'numeric', day: 'numeric' });

    const _dataate = new Date(event);
    const dataAte = _dataate.toLocaleDateString('pt-BR', {  year: 'numeric', month: 'numeric', day: 'numeric' });

    if(event != null){
      this.getCurvaAbcCusto(dataDe,dataAte);
    }
  }


  filteredCurvaAbcCusto() {

    if (!this.searchTerm) {
      return this._curvaAbcCusto;
    }
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
  }


  async getCurvaAbcCusto(dataDe: string,dataate : string){
    (await this.farmCurvaAbcCusto.getCurvaAbcCusto(dataDe,dataate)).subscribe(curvaBody=>{

      let dados :any[]=[];
      let totCusto = 0;
      let pAcum = 0.00;
      dados = dados.concat(curvaBody.body)
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

  onClickInfo(value:any,name:any){
    this._NomeProdDetalhe = name;
    this.getProdutoLocal(value);
    this.getEntradaSaida(value);
  }

  adicionarItem(item: any,lst:any[]): void {
    // console.log(item.descricao)

    const itemExistente = lst.find(subItem => subItem.descricao === item.descricao);
    if (!itemExistente) {
      lst.push(item);
    }
  }

  async getProdutoValidade(){
    (await this.farmProdutoValidade.getProdutoValidade()).subscribe(dados=>{
      this._ProdutoValidade = this._ProdutoValidade.concat(dados.body);
      const dataAtual = globalData.gbData_atual;


      for(let i=0;i<this._ProdutoValidade.length;i++)
      {
        let validadeDate = parseISO(this._ProdutoValidade[i].validade);
        this._ProdutoValidade[i].dias = differenceInDays(validadeDate, dataAtual);
        this._ProdutoValidade[i].validade = moment(this._ProdutoValidade[i].validade).format('DD-MM-YYYY');

        let novoItem = {descricao: this._ProdutoValidade[i].ds_grupoprod };
        this.adicionarItem(novoItem,this._dsGrupo);

        novoItem = {descricao: this._ProdutoValidade[i].ds_subgrupo };
        this.adicionarItem(novoItem,this._dsSubGrupo);
        // console.log(this._ProdutoValidade[i].ds_grupoprod)

      }

      console.log(this._dsGrupo)
      console.log(this._dsSubGrupo)


    })
  }

}
