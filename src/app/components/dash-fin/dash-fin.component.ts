import { finContasRP } from './../../models/dash-fin/finContasRP.model';
import { Chart,registerables } from 'chart.js';
import { finBalancete } from './../../models/dash-fin/finBalancete.model';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { finBalanceteService } from '../../services/dash-fin/finBalancete.service';
import { globalData,globalCores, moneyReduct, globalCoresNome  } from '../../globals';
import { finDREGrupoService } from '../../services/dash-fin/finDRE.service';
import { finDRE } from '../../models/dash-fin/finDRE.model';
import { finContasRPService } from '../../services/dash-fin/finContasRP.service';

Chart.register(...registerables);

@Component({
  selector: 'app-dash-fin',
  standalone: true,
  templateUrl: './dash-fin.component.html',
  styleUrl: './dash-fin.component.scss',
  imports: [CommonModule,MatFormFieldModule, MatDatepickerModule,MatNativeDateModule ]
})
export class DashFinComponent implements OnInit {
  // _data_atual : Date = new Date();
  // _mes_atual : number = this._data_atual.getMonth() + 1;
  // _ano : number = this._data_atual.getFullYear();
  _dreGrupo : any[] =[];
  _dreSubgrupo : any[] =[];
  _dreCC: any[] =[];
  _resExercicio = '';
  _resultado = 0;

  _resReceita = '';
  _resDespesa = '';
  _resDespFin = '';
  color = globalCoresNome;

  _PorcentContasRec = 0;
  _PorcentContasPag = 0;

  constructor(private finBalancete:finBalanceteService,
              public finDRE : finDREGrupoService,
              private finContasRP : finContasRPService,



  ){ }

  ngOnInit(): void {
    this.getFinBalancete('2024');
    this.getDREGrupo('2024');
    this.getDRESubgrupo('2024');
    this.getDRECC('2024');
    this.getContasRP();
  }

  async getDREGrupo(ano:string){
    (await this.finDRE.getDREGrupo(ano)).subscribe(dreBody=>{
      let dre :any[]=[];
      dre = dre.concat(dreBody.body)

      let resReceita =0;
      let resDespesa = 0;
      let resDespFin = 0;

      for(let i=0;i<dre.length;i++){
        switch(dre[i].tipo)
        {
          case 'Despesas':
            resDespesa += Number(dre[i].total);
            this._resultado = this._resultado - Number(dre[i].total);
            break;
          case 'Despesas - Financeiras' :
            resDespFin += Number(dre[i].total);
            this._resultado = this._resultado - Number(dre[i].total);
            break;
          case 'Receitas':
            resReceita += Number(dre[i].total);
            this._resultado = this._resultado + Number(dre[i].total);
            break;
        }
        this._resReceita = moneyReduct(resReceita)
        this._resDespesa = moneyReduct(resDespesa)
        this._resDespFin = moneyReduct(resDespFin)
        let item:finDRE={tipo:dre[i].tipo,
                         descricao:dre[i].descricao,
                         total:moneyReduct(Number(dre[i].total))}
        this._dreGrupo.push(item);
      }
      this._resExercicio = moneyReduct(this._resultado);
    })
  }
  async getDRESubgrupo(ano:string){
    (await this.finDRE.getDRESubgrupo(ano)).subscribe(dreBody=>{

      let dre :any[]=[];
      dre = dre.concat(dreBody.body)

      for(let i=0;i<dre.length;i++){
        let item:finDRE={tipo:dre[i].tipo,
                         descricao:dre[i].descricao,
                         total:moneyReduct(Number(dre[i].total))}
        this._dreSubgrupo.push(item);
      }
    })
  }
  async getDRECC(ano:string){
    (await this.finDRE.getDRECC(ano)).subscribe(dreBody=>{

      let dre :any[]=[];
      dre = dre.concat(dreBody.body)

      for(let i=0;i<dre.length;i++){
        let item:finDRE={tipo:dre[i].tipo,
                         descricao:dre[i].descricao,
                         total:moneyReduct(Number(dre[i].total))}
        this._dreCC.push(item);
      }
    })
  }

  onClick(idx : number) {
    const collDREGrupo = document.querySelector("#collDREGrupo") as HTMLDivElement;
    const collDRESubgrupo = document.querySelector("#collDRESubgrupo") as HTMLDivElement;
    const collDRECCusto = document.querySelector("#collDRECCusto") as HTMLDivElement;

    switch(idx)
    {
      case 1 :
        collDRESubgrupo?.classList.remove('show');
        collDRECCusto?.classList.remove('show');
        break;
      case 2 :
        collDREGrupo?.classList.remove('show');
        collDRECCusto?.classList.remove('show');
        break;
      case 3 :
        collDREGrupo?.classList.remove('show');
        collDRESubgrupo?.classList.remove('show');
        break;
    }
  }

  async getFinBalancete(ano:string){
    (await this.finBalancete.getfinBalancete(ano)).subscribe(dados=>{

      let fin :any[]=[];

      fin = fin.concat(dados.body)
      let cp : any[]=[];
      let cr :any[]=[];
      let tot:any[]=[];
      let mes : any[]=[];

      let m = 0;
      globalData.gbAno==parseInt(ano)?m = globalData.gbAno : m=12;

      for(let i=0;i<m;i++){

        switch(i){
          case 0 :
            if(fin[0].jan>0 || fin[1].jan > 0){
              cp.push(fin[0].jan)
              cr.push(fin[1].jan)
              tot.push((fin[1].jan-fin[0].jan).toFixed(2))
              mes.push(globalData.gbMeses[i]);
            }

            break;
          case 1 :
            if(fin[0].fev>0 || fin[1].fev > 0){
              cp.push(fin[0].fev)
              cr.push(fin[1].fev)
              tot.push((fin[1].fev-fin[0].fev).toFixed(2))
              mes.push(globalData.gbMeses[i]);
            }
            break;
          case 2 :
            if(fin[0].mar>0 || fin[1].mar > 0){
              cp.push(fin[0].mar)
              cr.push(fin[1].mar)
              tot.push((fin[1].mar-fin[0].mar).toFixed(2))
              mes.push(globalData.gbMeses[i]);
            }
            break;
          case 3 :
            if(fin[0].abr>0 || fin[1].abr > 0){
              cp.push(fin[0].abr)
              cr.push(fin[1].abr)
              tot.push((fin[1].abr-fin[0].abr).toFixed(2))
              mes.push(globalData.gbMeses[i]);
            }
            break;
          case 4 :
            if(fin[0].mai>0 || fin[1].mai > 0){
              cp.push(fin[0].mai)
              cr.push(fin[1].mai)
              tot.push((fin[1].mai-fin[0].mai).toFixed(2))
              mes.push(globalData.gbMeses[i]);
            }
            break;
          case 5 :
            if(fin[0].jun>0 || fin[1].jun > 0){
              cp.push(fin[0].jun)
              cr.push(fin[1].jun)
              tot.push((fin[1].jun-fin[0].jun).toFixed(2))
              mes.push(globalData.gbMeses[i]);
            }
            break;
          case 6 :
            if(fin[0].jul>0 || fin[1].jul > 0){
              cp.push(fin[0].jul)
              cr.push(fin[1].jul)
              tot.push((fin[1].jul-fin[0].jul).toFixed(2))
              mes.push(globalData.gbMeses[i]);
            }
            break;
          case 7 :
            if(fin[0].ago>0 || fin[1].ago > 0){
              cp.push(fin[0].ago)
              cr.push(fin[1].ago)
              tot.push((fin[1].ago-fin[0].ago).toFixed(2))
              mes.push(globalData.gbMeses[i]);
            }
            break;
          case 8 :
            if(fin[0].sete>0 || fin[1].sete > 0){
              cp.push(fin[0].sete)
              cr.push(fin[1].sete)
              tot.push((fin[1].sete-fin[0].sete).toFixed(2))
              mes.push(globalData.gbMeses[i]);
            }
            break;
          case 9 :
            if(fin[0].out>0 || fin[1].out > 0){
              cp.push(fin[0].out)
              cr.push(fin[1].out)
              tot.push((fin[1].out-fin[0].out).toFixed(2))
              mes.push(globalData.gbMeses[i]);
            }
            break;
          case 10 :
            if(fin[0].nov>0 || fin[1].nov > 0){
              cp.push(fin[0].nov)
              cr.push(fin[1].nov)
              tot.push((fin[1].nov-fin[0].nov).toFixed(2))
              mes.push(globalData.gbMeses[i]);
            }
            break;
          case 11 :
            if(fin[0].dez>0 || fin[1].dez > 0){
              cp.push(fin[0].dez)
              cr.push(fin[1].dez)
              tot.push((fin[1].dez-fin[0].dez).toFixed(2))
              mes.push(globalData.gbMeses[i]);
            }
            break;
        }
      }
      this._finBalancete(ano,mes,cp,cr,tot)
    })
  }

  _finBalancete(ano:any,meses:any,cp:any,cr:any,tot:any){
    let myChart = Chart.getChart("_rcBalancete"); // <canvas> id
    if (myChart != undefined)
      myChart.destroy();

    myChart = new Chart("_rcBalancete", {
      type: 'line',
      data: {
        labels: meses,
        datasets: [
          {
            type: 'line',
            label: 'Resultado',
            data: tot,
            borderColor: globalCores.gbCores[2],
            backgroundColor: globalCores.gbCores[2],
          },
          {
            type: 'bar',
            label: 'Contas Pagar',
            data: cp,
            borderColor: globalCores.gbCores[1],
            backgroundColor: globalCores.gbCores[1],
          },
          {
            type: 'bar',
            label: 'Contas Receber',
            data: cr,
            borderColor: globalCores.gbCores[0],
            backgroundColor: globalCores.gbCores[0],
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

            text: 'Balancete de '+ meses[0] + ' a '+ meses[meses.length-1] +' '+ano
          },
          subtitle:{
            display: true,
            text : 'teste'

          }

        }
      },
    });

  }

  async getContasRP(){
    (await this.finContasRP.getContasRP()).subscribe(contas=>{
      let lbcontasPagPassado = document.getElementById('lbcontasPagPassado') as HTMLElement;
      let lbcontasPagAtual = document.getElementById('lbcontasPagAtual') as HTMLElement;
      let lbContasRecebPassado = document.getElementById('lbContasRecebPassado') as HTMLElement;
      let lbContasRecebAtual = document.getElementById('lbContasRecebAtual') as HTMLElement;
      let spancontasPagAtual = document.getElementById('spancontasPagAtual') as HTMLElement;
      let spancontasRecAtual = document.getElementById('spancontasRecAtual') as HTMLElement;


      // lbcontasPagPassado.innerHTML = '1';
      // lbcontasPagAtual.innerHTML ='2';
      // lbContasRecebPassado.innerHTML = '3';
      // lbContasRecebAtual.innerHTML = '4';

      let conta :any[]=[];

      conta = conta.concat(contas.body)
      let CRAtual = 0;
      let CRAnt = 0;
      let CPAtual = 0;
      let CPAnt = 0;

      for(let i=0;i<conta.length;i++){
        switch (conta[i].tipo){
          case 'R' :
            conta[i].mes_ano.substring(5,7)==globalData.gbMes_atual?
              CRAtual = conta[i].total :CRAnt = conta[i].total
            break;
          case 'P' :
            conta[i].mes_ano.substring(5,7)==globalData.gbMes_atual?
              CPAtual = conta[i].total : CPAnt = conta[i].total
            break;
        }
      }

      lbContasRecebAtual.innerHTML = moneyReduct(CRAtual)
      lbContasRecebPassado.innerHTML = moneyReduct(CRAnt)
      this._PorcentContasRec = (CRAtual/CRAnt)*100;
      spancontasRecAtual.innerHTML = this._PorcentContasRec.toFixed(2) + '%';

      lbcontasPagAtual.innerHTML = moneyReduct(CPAtual)
      lbcontasPagPassado.innerHTML = moneyReduct(CPAnt)
      this._PorcentContasPag = (CPAtual/CPAnt)*100
      spancontasPagAtual.innerHTML = this._PorcentContasPag.toFixed(2) + '%';


    })
  }

}
