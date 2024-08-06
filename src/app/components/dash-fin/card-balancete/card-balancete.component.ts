import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { finBalanceteService } from '../../../services/dash-fin/finBalancete.service';
import { globalCores, globalData } from '../../../globals';


Chart.register(...registerables);
@Component({
  selector: 'app-card-balancete',
  standalone: true,
  imports: [],
  templateUrl: './card-balancete.component.html',
  styleUrl: './card-balancete.component.scss'
})
export class CardBalanceteComponent implements OnInit {

  constructor(private finBalancete:finBalanceteService){}
  ngOnInit(): void {
    this.getFinBalancete('2024');
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

}
