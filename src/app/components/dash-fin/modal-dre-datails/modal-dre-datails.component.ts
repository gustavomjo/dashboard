import { Component, OnInit } from '@angular/core';
import { ModalDreDetailsService } from './modalDreDtails.service';
import { finDREGrupoService } from '../../../services/dash-fin/finDRE.service';
import { Chart, registerables } from 'chart.js';
import { globalCores } from '../../../global/global-cores';

Chart.register(...registerables);
@Component({
  selector: 'app-modal-dre-datails',
  standalone: true,
  imports: [],
  templateUrl: './modal-dre-datails.component.html',
  styleUrl: './modal-dre-datails.component.scss'
})
export class ModalDreDatailsComponent implements OnInit{
  descricao : string = '';
  tipo : string = '';
  cod_grupo : string = '';
  cod_subgrupo : string = '';
  cod_cc : string = '';


  constructor(public finDRE : finDREGrupoService,
              private ModalDreDetails: ModalDreDetailsService) {}

  ngOnInit() {
    this.ModalDreDetails.currentdescricao.subscribe(descricao => {
      this.descricao = descricao;
    });

    this.ModalDreDetails.currenttipo.subscribe(tipo => {
      this.tipo = tipo;
    });

    this.ModalDreDetails.currentcod_grupo.subscribe(cod_grupo => {
      this.cod_grupo = cod_grupo;
    });

    this.ModalDreDetails.currentcod_subgrupo.subscribe(cod_subgrupo => {
      this.cod_subgrupo = cod_subgrupo;
    });

    this.ModalDreDetails.currentcod_cc.subscribe(cod_cc => {
      this.cod_cc = cod_cc;
      this.Detail(this.descricao,this.tipo,this.cod_grupo,this.cod_subgrupo,this.cod_cc)
    });
  }

  Detail(descricao:string,tipo : string,cod_grupo : string, cod_subgrupo: string, codigo_cc : string){
    //fazer o de despesas financeiras ainda nao feito por causa do iamada.

    let params = '';
    if(cod_grupo !='')
      params += '&cod_grupo='+cod_grupo;

    if(cod_subgrupo !='')
      params += '&cod_subgrupo='+cod_subgrupo;

    if(codigo_cc !='')
      params += '&cod_cc='+codigo_cc;

    if(cod_grupo!='' || cod_subgrupo!='' ||codigo_cc!=''){
      // console.log(params)
      switch(tipo){
        case 'Receitas' :
          this.DetailReceitas('2024',params);
          break;
        case 'Despesas - Financeiras' :
          this.DetailDespesaFinanceiras('2024',params);
          break;
        case 'Despesas' :
          this.DetailDespesa('2024',params);
          break;
      }
    }
  }

  async DetailReceitas(ano:string,params:string){
    (await this.finDRE.getDREReceitaDetail(ano,params)).subscribe(dreBody=>{
      let dre :any[]=[];
      dre = dre.concat(dreBody.body);
      // console.log(dre)
      this._modaldetails(dre);
    })
  }

  async DetailDespesaFinanceiras(ano:string,params:string){
    (await this.finDRE.getDREDespesaFinanceiraDetail(ano,params)).subscribe(dreBody=>{
      let dre :any[]=[];
      dre = dre.concat(dreBody.body);
      // console.log(dre)
      this._modaldetails(dre);
    })
  }

  async DetailDespesa(ano:string,params:string){
    (await this.finDRE.getDREDespesaDetail(ano,params)).subscribe(dreBody=>{
      let dre :any[]=[];
      dre = dre.concat(dreBody.body);
      // console.log(dre)
      this._modaldetails(dre);
    })
  }

  _modaldetails(tot: any[]) {
    // Extrair os labels (meses) e os dados (totais)
    const labels = tot.map(item => item.mes_ano);
    const data = tot.map(item => item.total);

    let myChart = Chart.getChart("_dreDetail"); // <canvas> id
    if (myChart) myChart.destroy();

    myChart = new Chart("_dreDetail", {
      type: 'line',
      data: {
        labels: labels, // Definir os meses como labels
        datasets: [
          {
            type: 'line',
            label: 'Resultado',
            data: data, // Usar os totais como dados do gráfico
            borderColor: globalCores.gbCores[2],
            backgroundColor: globalCores.gbCores[2],
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
            text: `${this.descricao}` // Título dinâmico
          },
          // subtitle: {
          //   display: true,
          //   text: 'Receitas por Mês'
          // }
        }
      },
    });
}



}
