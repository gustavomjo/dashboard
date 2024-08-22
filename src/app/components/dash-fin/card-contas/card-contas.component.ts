import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { finContasRPService } from '../../../services/dash-fin/finContasRP.service';
import { globalCoresNome } from '../../../global/global-cores';
import { globalData } from '../../../global/global-data';
import { moneyReduct } from '../../../global/global-money';

@Component({
  selector: 'app-card-contas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-contas.component.html',
  styleUrl: './card-contas.component.scss'
})
export class CardContasComponent implements OnInit
{
  color = globalCoresNome;

  _PorcentContasRec = 0;
  _PorcentContasPag = 0;

  constructor(private finContasRP : finContasRPService){}
  ngOnInit(): void {
    this.getContasRP();
  }

  async getContasRP(){
    (await this.finContasRP.getContasRP()).subscribe(contas=>{
      let lbcontasPagPassado = document.getElementById('lbcontasPagPassado') as HTMLElement;
      let lbcontasPagAtual = document.getElementById('lbcontasPagAtual') as HTMLElement;
      let lbContasRecebPassado = document.getElementById('lbContasRecebPassado') as HTMLElement;
      let lbContasRecebAtual = document.getElementById('lbContasRecebAtual') as HTMLElement;
      let spancontasPagAtual = document.getElementById('spancontasPagAtual') as HTMLElement;
      let spancontasRecAtual = document.getElementById('spancontasRecAtual') as HTMLElement;
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
