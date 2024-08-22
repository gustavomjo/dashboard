import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { searchModule } from '../../search.Module';
import { CommonModule } from '@angular/common';
import { farmDetalheProdutoService } from '../../../services/dash-farm/farmDetalheProduto.service';
import { farmProdutosal2Service } from '../../../services/dash-farm/farmProdutosal2.service';
import { FiltrodataService } from '../../filtrodata/filtrodata.service';
import { Chart, registerables } from 'chart.js';
import moment from 'moment';
import { differenceInDays, parseISO } from 'date-fns';
import { AgrupadosPorSetor, farmProdutoLocal } from '../../../models/dash-farm/farmProdutoLocal.model';
import { SpinnerComponent } from "../../spinner/spinner.component";
import { globalData } from '../../../global/global-data';
import { globalCores } from '../../../global/global-cores';

Chart.register(...registerables);

@Component({
  selector: 'app-med-detalhado',
  standalone: true,
  imports: [MatFormFieldModule, MatDatepickerModule, FormsModule, searchModule, CommonModule, SpinnerComponent],
  templateUrl: './med-detalhado.component.html',
  styleUrl: './med-detalhado.component.scss'
})
export class MedDetalhadoComponent implements OnInit {
  @ViewChildren('progressCircle') progressCircles!: QueryList<ElementRef>;
  _searchProdutoSal = "";
  _ProdutoSal : any[]=[];
  _perdas : any[]=[];
  _Produtos : any[]=[];
  _saidas : any[]=[];
  _detalheProdutoFarmLocal: any[] = [];
  _detalheProdutoFarmLocal_agrupado: AgrupadosPorSetor = {};
  _NFEntradaProd : any[]=[];
  _Cotacao : any[]=[];

  // _NomeProdDetalhe : any;

  constructor(private farmDetalheProduto : farmDetalheProdutoService,
    private farmProdutoSal : farmProdutosal2Service,
    public filtrodataService: FiltrodataService
  ){}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.getProdutoSal2();
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
    this._Cotacao=[];
    this._perdas=[];
    this._detalheProdutoFarmLocal=[];
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
    this.getProdutoFarmLocal(parts[0]);

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
      if(this._saidas.length ==0){
        this._saidas.push({
          codprod: null,
          codsal: null,
          nome_fabricante: null,
          porcent: null,
          total: null,
          total_saida: null
        });
      }
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

  async getNFEntrada(cod: any) {
    (await this.farmProdutoSal.getNFEntrada(cod)).subscribe(dados => {
      this._NFEntradaProd = this._NFEntradaProd.concat(dados.body);
      let mesano: any[] = [];
      let datasetMap: { [key: string]: any } = {};
      let datasetMapV2 :{ [key: string]: any } = {};
      let dataset: any[] = [];

      // Popula o array mesano e cria um mapa para os datasets
      for (let i = 0; i < this._NFEntradaProd.length; i++) {
        if (!mesano.includes(this._NFEntradaProd[i].mes_ano)) {
          mesano.push(this._NFEntradaProd[i].mes_ano);
        }

        let fabricante = this._NFEntradaProd[i].nome_fabricante;

        if (!datasetMap[fabricante]) {
          datasetMap[fabricante] = {
            label: fabricante,
            data: Array(mesano.length).fill(0),
            borderColor: globalCores.gbCores[Object.keys(datasetMap).length % globalCores.gbCores.length],
            backgroundColor: globalCores.gbCoresTransp[Object.keys(datasetMap).length % globalCores.gbCoresTransp.length],
            order: 1
          };

        }
        if (!datasetMapV2[fabricante]) {
          datasetMapV2[fabricante] = {
            label: fabricante,
            data: Array(mesano.length).fill(0),
            borderColor: globalCores.gbCores[Object.keys(datasetMapV2).length % globalCores.gbCores.length],
            backgroundColor: globalCores.gbCoresTransp[Object.keys(datasetMapV2).length % globalCores.gbCoresTransp.length],

            order: 0
          };

        }

        let index = mesano.indexOf(this._NFEntradaProd[i].mes_ano);
        datasetMap[fabricante].data[index] = this._NFEntradaProd[i].qtd_entrada;
        datasetMapV2[fabricante].data[index] = this._NFEntradaProd[i].valor_unitario;
      }

      if(this._NFEntradaProd.length ==0){
        this._NFEntradaProd.push({
          codsal : null,
          codprod : null,
          nome_sal : null,
          nome_com : null,
          mes_ano : null,
          valor_unitario : null,
          qtd_entrada : null,
          nome_fabricante : null
        });
      } else {
        // Transforma o mapa em um array de datasets
        dataset = [...Object.values(datasetMapV2)];
        this._rcNFEntradaCusto(mesano, dataset);

        dataset = [...Object.values(datasetMap)];
        this._rcNfEntradaQtd(mesano, dataset);
      }

    });
  }

  _rcNFEntradaCusto(_mesano: any, dataset: any) {
    let chartExist = Chart.getChart("_rcNFEntradaCusto"); // <canvas> id
    if (chartExist != undefined)
      chartExist.destroy();

    const myChart = new Chart("_rcNFEntradaCusto", {
      type: 'bar',
      data: {
        labels: _mesano,
        datasets: dataset
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Entradas - Custo'
          }
        }
      }
    });
  }

  _rcNfEntradaQtd(_mesano: any, dataset: any) {
    let chartExist = Chart.getChart("_rcNfEntradaQtd"); // <canvas> id
    if (chartExist != undefined)
      chartExist.destroy();

    const myChart = new Chart("_rcNfEntradaQtd", {
      type: 'bar',
      data: {
        labels: _mesano,
        datasets: dataset
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Entradas - Quantidade'
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
      }

    })
  }


  async getCotacoes(cod:any){
    (await this.farmProdutoSal.getCotacao(cod)).subscribe(dados=>{
      this._Cotacao = this._Cotacao.concat(dados.body);

      for(let i=0;i<this._Cotacao.length;i++){
        this._Cotacao[i].data_cotacao = moment(this._Cotacao[i].data_cotacao).format('DD-MM-YYYY');
        this._Cotacao[i].data_fechamento = moment(this._Cotacao[i].data_fechamento).format('DD-MM-YYYY');
        if(this._Cotacao[i].data_entrega != null){
          this._Cotacao[i].data_entrega = moment(this._Cotacao[i].data_entrega).format('DD-MM-YYYY');
        }
      }
    })
  }

  async getPedidosCompra(cod:any){
    (await this.farmProdutoSal.getPedidoSal2(cod)).subscribe(dados=>{
      let pedido : any[]=[];
      pedido = pedido.concat(dados.body);
      // console.log(this._PedidoCompras)

    })
  }

  async getProdutoFarmLocal(codsal:string){
    (await this.farmDetalheProduto.getProdutoFarmLocal(codsal)).subscribe(dados =>{
      this._detalheProdutoFarmLocal = [];
      this._detalheProdutoFarmLocal = this._detalheProdutoFarmLocal.concat(dados.body);
      let total = 0;

      this._detalheProdutoFarmLocal_agrupado={};

      for(let i=0;i<this._detalheProdutoFarmLocal.length;i++)
      {
        const validadeDate = parseISO(this._detalheProdutoFarmLocal[i].validade);
        const dataAtual = globalData.gbData_atual;
        this._detalheProdutoFarmLocal[i].dias = differenceInDays(validadeDate, dataAtual);
        this._detalheProdutoFarmLocal[i].validade = moment(this._detalheProdutoFarmLocal[i].validade).format('DD-MM-YYYY');
        total = total + this._detalheProdutoFarmLocal[i].qtd;
        this._detalheProdutoFarmLocal[i].total = total;

        const setor = this._detalheProdutoFarmLocal[i].ds_setor;
        if(!this._detalheProdutoFarmLocal_agrupado[setor]){
          this._detalheProdutoFarmLocal_agrupado[setor]=[]
        }
        this._detalheProdutoFarmLocal_agrupado[setor].push(this._detalheProdutoFarmLocal[i])
      }
      //console.log(this._detalheProdutoFarmLocal_agrupado)
    })
  }

}
