import { provideHttpClient } from '@angular/common/http';
import { farmProdutoValidadeService } from './../../services/dash-farm/farmProdutoValidade.service';
import { farmDetalheProdutoService } from './../../services/dash-farm/farmDetalheProduto.service';
import { farmCurvaAbcCustoService } from './../../services/dash-farm/farmCurvaAbcCusto.service';

import { CommonModule} from '@angular/common';
import {  AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';

import { Chart,registerables } from 'chart.js';
import { CarouselModule  } from 'ngx-bootstrap/carousel';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import moment from 'moment';
import { globalCores, globalData } from '../../globals';
import { FormsModule } from '@angular/forms';

import { differenceInDays, parseISO } from 'date-fns';

import { searchModule } from '../search.Module';
import { provideNativeDateAdapter } from '@angular/material/core';
import { farmProdutosal2Service } from '../../services/dash-farm/farmProdutosal2.service';
import { FiltrodataService } from './../filtrodata/filtrodata.service';
import { FiltrodataComponent } from "../filtrodata/filtrodata.component";

Chart.register(...registerables);

@Component({
  selector: 'app-dash-farm',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatDatepickerModule, CarouselModule, MatDatepickerModule, FormsModule, searchModule, FiltrodataComponent],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dash-farm.component.html',
  styleUrl: './dash-farm.component.scss'
})



export class DashFarmComponent  implements OnInit {
  @ViewChildren('progressCircle') progressCircles!: QueryList<ElementRef>;

  _curvaAbcCusto : any =[];
  _detalheProdutoLocal : any[]=[];
  _NomeProdDetalhe : any;
  _ProdutoValidade : any[]=[];
  _ProdutoSal : any[]=[];
  _Produtos : any[]=[];
  _saidas : any[]=[];
  _NFEntradaProd : any[]=[];
  _Cotacao : any[]=[];
  _perdas : any[]=[];

  _searchDescricao = "";
  _searchMedicamento = "";
  _searchGrupo="";
  _searchVencimento = "";
  _searchProdutoSal = "";

  _dsGrupo : any[]=[];
  _dsSubGrupo : any[]=[];

  searchTerm: string = '';

  mesanoDe = new Date();
  mesanoAte = new Date();

  constructor(private farmCurvaAbcCusto : farmCurvaAbcCustoService,
              private farmDetalheProduto : farmDetalheProdutoService,
              private farmProdutoValidade : farmProdutoValidadeService,
              private farmProdutoSal : farmProdutosal2Service,
              public filtrodataService: FiltrodataService
  ){}

  ngOnInit(): void {
    this.getCurvaAbcCusto(globalData.gbDataHoje,globalData.gbDataHoje);
    this.getProdutoValidade();
    this.getProdutoSal2();
    console.log(this.filtrodataService.data);


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
        this._ProdutoValidade[i].dias_search = "31";
        if(this._ProdutoValidade[i].dias < 0){
          this._ProdutoValidade[i].dias_search = "-1";
        } else if ((this._ProdutoValidade[i].dias > 0) && (this._ProdutoValidade[i].dias < 16)){
          this._ProdutoValidade[i].dias_search = "15";
        }else if ((this._ProdutoValidade[i].dias > 15) && (this._ProdutoValidade[i].dias < 30)){
          this._ProdutoValidade[i].dias_search = "30";
        }
        let novoItem = {descricao: this._ProdutoValidade[i].ds_grupoprod };
        this.adicionarItem(novoItem,this._dsGrupo);

        novoItem = {descricao: this._ProdutoValidade[i].ds_subgrupo };
        this.adicionarItem(novoItem,this._dsSubGrupo);
      }

    })
  }

  async getProdutoSal2(){
    (await this.farmProdutoSal.getProdutoSal2()).subscribe(dados=>{
      this._ProdutoSal = this._ProdutoSal.concat(dados.body);

    })
  }

  public onProdutoSalChange(){
    this._Produtos =[];
    this._saidas=[];
    this._NFEntradaProd=[];
    this._perdas=[];
    let chartExist = Chart.getChart("_rcNFEntrada");
    chartExist?.destroy;

    if(this._searchProdutoSal == "")
      return;

    let parts :string[]=this._searchProdutoSal.split("-");
    this.getProduto(parts[0]);
    this.getNFEntrada(parts[0]);
    this.getCotacoes(parts[0]);
    this.getPedidosCompra(parts[0]);
    this.getSaidas(parts[0]);
    this.getPerda(parts[0]);

  }

  async getProduto(cod:any){
    (await this.farmProdutoSal.getProdutos(cod)).subscribe(dados=>{
      this._Produtos = this._Produtos.concat(dados.body);
      for(let i=0;i<this._Produtos.length;i++){
        this._Produtos[i].custo_medio = this._Produtos[i].custo_medio.toFixed(2);
      }
      // console.log(this._Produtos)

    })
  }

  async getSaidas(cod: any) {
    (await this.farmProdutoSal.getSaidas(cod)).subscribe(dados => {
      let saida: any[] = [];
      saida = saida.concat(dados.body);

      let total = 0;
      for (let i = 0; i < saida.length; i++) {
        total = total + saida[i].total_saida;
      }
      for (let i = 0; i < saida.length; i++) {
        saida[i].porcent = ((saida[i].total_saida * 100) / total).toFixed(2);
        saida[i].total = total;
      }
      this._saidas = saida;

      // Aguardar a atualização da visualização antes de configurar os círculos
      setTimeout(() => {
        this.configureCircles();
      });
    });
  }

  configureCircles() {
    this.progressCircles.forEach((progressCircle) => {
      const percentage = progressCircle.nativeElement.getAttribute('data-percentage');
      const offset = (percentage / 100) * 100;
      const circle = progressCircle.nativeElement.querySelector('.circle');
      circle.style.strokeDasharray = `${offset}, 100`;
    });
  }

  async getNFEntrada(cod:any){
    (await this.farmProdutoSal.getNFEntrada(cod)).subscribe(dados=>{

      this._NFEntradaProd = this._NFEntradaProd.concat(dados.body);

      let valor :any[]=[];
      let mesano :any[]=[];
      let qtd : any[]=[];
      for(let i=0;i< this._NFEntradaProd.length;i++){
        mesano.push(this._NFEntradaProd[i].mes_ano);
        valor.push(this._NFEntradaProd[i].valor_unitario);
        qtd.push(this._NFEntradaProd[i].qtd_entrada)
      }
      this._rcNfEntradaCusto(mesano,valor,qtd);
    })
  }
  _rcNfEntradaCusto(_mesano:any,_valor:any,_qtd:any){
    let chartExist = Chart.getChart("_rcNFEntrada"); // <canvas> id
    if (chartExist != undefined)
      chartExist.destroy();

    const myChart = new Chart("_rcNFEntrada", {
      type: 'bar',

      data: {
        labels: _mesano,

        datasets: [
          {
            label: 'Valor Un.',
            data:  _valor,
            borderColor :globalCores.gbCores[20],
            backgroundColor:globalCores.gbCoresTransp[20],
            order: 1
          },
          {
            label: 'Quantidade',
            data:  _qtd,
            borderColor :globalCores.gbCores[2],
            backgroundColor:globalCores.gbCoresTransp[2],
            type: 'line',
            order : 0
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Entradas'
          }
        }
      }
    });
  }

  async getPerda(cod:any){
    (await this.farmProdutoSal.getPerda(cod)).subscribe(dados=>{
      this._perdas = this._perdas.concat(dados.body);
      for(let i=0;i<this._perdas.length;i++){
        let date = new Date(this._perdas[i].data);
        let month = ("0" + (date.getMonth() + 1)).slice(-2); // Adiciona zero à esquerda se necessário
        let year = date.getFullYear().toString();
        this._perdas[i].mes_ano = `${month}-${year}`;

        date = new Date(this._perdas[i].validade)
        month = ("0" + (date.getMonth() + 1)).slice(-2);
        year = date.getFullYear().toString();
        this._perdas[i].mes_ano_validade = `${month}-${year}`;


        console.log(this._perdas[i].mes_ano_validade);
      }

    })
  }


  async getCotacoes(cod:any){
    (await this.farmProdutoSal.getCotacao(cod)).subscribe(dados=>{
      this._Cotacao = this._Cotacao.concat(dados.body);
      // console.log(this._Cotacao)

    })
  }

  async getPedidosCompra(cod:any){
    (await this.farmProdutoSal.getPedidoSal2(cod)).subscribe(dados=>{
      let pedido : any[]=[];
      pedido = pedido.concat(dados.body);
      // console.log(this._PedidoCompras)

    })
  }

}
