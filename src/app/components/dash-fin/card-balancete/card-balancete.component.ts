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

  async getFinBalancete(ano: string) {
    (await this.finBalancete.getfinBalancete(ano)).subscribe(dados => {
      this.fin = this.fin.concat(dados.body);
      let cp: number[] = [];
      let cr: number[] = [];
      let tot: number[] = [];
      let mes: string[] = [];

      const maxMeses = globalData.gbAno == parseInt(ano) ? globalData.gbAno : 12;
      const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'sete', 'out', 'nov', 'dez'];

      // Função auxiliar para calcular e adicionar os valores dos meses
      const adicionarValoresMes = (index: number) => {
        const mesKey = meses[index];
        const valorCp = parseFloat(this.fin[0][mesKey]) || 0;
        const valorCr = parseFloat(this.fin[1][mesKey]) || 0;

        if (valorCp > 0 || valorCr > 0) {
          cp.push(valorCp);
          cr.push(valorCr);
          tot.push(parseFloat((valorCr - valorCp).toFixed(2))); // Conversão para número após usar toFixed()
          mes.push(globalData.gbMeses[index]);
        }
      };

      for (let i = 0; i < maxMeses; i++) {
        adicionarValoresMes(i);
      }

      this._finBalancete(ano, mes, cp, cr, tot);
    });
  }

  _finBalancete(ano: string, meses: string[], cp: number[], cr: number[], tot: number[]) {
    let myChart = Chart.getChart("_rcBalancete"); // <canvas> id
    if (myChart) myChart.destroy();

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
            text: `Balancete de ${meses[0]} a ${meses[meses.length - 1]} ${ano}`
          }
        }
      },
    });
  }



}
