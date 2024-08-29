import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { finBalanceteService } from '../../../services/dash-fin/finBalancete.service';
import { globalData } from '../../../global/global-data';
import { globalCores } from '../../../global/global-cores';
import { SpinnerComponent } from "../../spinner/spinner.component";
import { CommonModule } from '@angular/common';

Chart.register(...registerables);
@Component({
  selector: 'app-card-balancete',
  standalone: true,
  imports: [SpinnerComponent,CommonModule],
  templateUrl: './card-balancete.component.html',
  styleUrl: './card-balancete.component.scss'
})
export class CardBalanceteComponent implements OnInit {
  fin : any[]=[];
  constructor(private finBalancete:finBalanceteService){}
  ngOnInit(): void {
    this.getFinBalancete('2024');
  }

  async getFinBalancete(ano:string){
    (await this.finBalancete.getfinBalancete(ano)).subscribe(dados=>{

      // let fin :any[]=[];

      this.fin = this.fin.concat(dados.body)
      let cp : any[]=[];
      let cr :any[]=[];
      let tot:any[]=[];
      let mes : any[]=[];

      let m = 0;
      globalData.gbAno==parseInt(ano)?m = globalData.gbAno : m=12;

      for(let i=0;i<m;i++){

        switch(i){
          case 0 :
            if(this.fin[0].jan>0 || this.fin[1].jan > 0){
              cp.push(this.fin[0].jan)
              cr.push(this.fin[1].jan)
              tot.push((this.fin[1].jan-this.fin[0].jan).toFixed(2))
              mes.push(globalData.gbMeses[i]);
            }

            break;
          case 1 :
            if(this.fin[0].fev>0 || this.fin[1].fev > 0){
              cp.push(this.fin[0].fev)
              cr.push(this.fin[1].fev)
              tot.push((this.fin[1].fev-this.fin[0].fev).toFixed(2))
              mes.push(globalData.gbMeses[i]);
            }
            break;
          case 2 :
            if(this.fin[0].mar>0 || this.fin[1].mar > 0){
              cp.push(this.fin[0].mar)
              cr.push(this.fin[1].mar)
              tot.push((this.fin[1].mar-this.fin[0].mar).toFixed(2))
              mes.push(globalData.gbMeses[i]);
            }
            break;
          case 3 :
            if(this.fin[0].abr>0 || this.fin[1].abr > 0){
              cp.push(this.fin[0].abr)
              cr.push(this.fin[1].abr)
              tot.push((this.fin[1].abr-this.fin[0].abr).toFixed(2))
              mes.push(globalData.gbMeses[i]);
            }
            break;
          case 4 :
            if(this.fin[0].mai>0 || this.fin[1].mai > 0){
              cp.push(this.fin[0].mai)
              cr.push(this.fin[1].mai)
              tot.push((this.fin[1].mai-this.fin[0].mai).toFixed(2))
              mes.push(globalData.gbMeses[i]);
            }
            break;
          case 5 :
            if(this.fin[0].jun>0 || this.fin[1].jun > 0){
              cp.push(this.fin[0].jun)
              cr.push(this.fin[1].jun)
              tot.push((this.fin[1].jun-this.fin[0].jun).toFixed(2))
              mes.push(globalData.gbMeses[i]);
            }
            break;
          case 6 :
            if(this.fin[0].jul>0 || this.fin[1].jul > 0){
              cp.push(this.fin[0].jul)
              cr.push(this.fin[1].jul)
              tot.push((this.fin[1].jul-this.fin[0].jul).toFixed(2))
              mes.push(globalData.gbMeses[i]);
            }
            break;
          case 7 :
            if(this.fin[0].ago>0 || this.fin[1].ago > 0){
              cp.push(this.fin[0].ago)
              cr.push(this.fin[1].ago)
              tot.push((this.fin[1].ago-this.fin[0].ago).toFixed(2))
              mes.push(globalData.gbMeses[i]);
            }
            break;
          case 8 :
            if(this.fin[0].sete>0 || this.fin[1].sete > 0){
              cp.push(this.fin[0].sete)
              cr.push(this.fin[1].sete)
              tot.push((this.fin[1].sete-this.fin[0].sete).toFixed(2))
              mes.push(globalData.gbMeses[i]);
            }
            break;
          case 9 :
            if(this.fin[0].out>0 || this.fin[1].out > 0){
              cp.push(this.fin[0].out)
              cr.push(this.fin[1].out)
              tot.push((this.fin[1].out-this.fin[0].out).toFixed(2))
              mes.push(globalData.gbMeses[i]);
            }
            break;
          case 10 :
            if(this.fin[0].nov>0 || this.fin[1].nov > 0){
              cp.push(this.fin[0].nov)
              cr.push(this.fin[1].nov)
              tot.push((this.fin[1].nov-this.fin[0].nov).toFixed(2))
              mes.push(globalData.gbMeses[i]);
            }
            break;
          case 11 :
            if(this.fin[0].dez>0 || this.fin[1].dez > 0){
              cp.push(this.fin[0].dez)
              cr.push(this.fin[1].dez)
              tot.push((this.fin[1].dez-this.fin[0].dez).toFixed(2))
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
