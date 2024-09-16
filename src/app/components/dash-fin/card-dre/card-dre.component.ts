import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { finDREGrupoService } from '../../../services/dash-fin/finDRE.service';
import { finDRE } from '../../../models/dash-fin/finDRE.model';
import { globalCoresNome } from '../../../global/global-cores';
import { moneyReduct } from '../../../global/global-money';
import { SpinnerComponent } from "../../spinner/spinner.component";
import { ModalDreDatailsComponent } from "../modal-dre-datails/modal-dre-datails.component";
import { ModalDreDetailsService } from '../modal-dre-datails/modalDreDtails.service';

@Component({
  selector: 'app-card-dre',
  standalone: true,
  imports: [CommonModule, SpinnerComponent, ModalDreDatailsComponent],
  templateUrl: './card-dre.component.html',
  styleUrl: './card-dre.component.scss'
})
export class CardDreComponent implements OnInit {
  color = globalCoresNome;
  _resultado = 0;
  _resExercicio = '';
  _dreGrupo : any[] =[];
  _resReceita = '';
  _resDespesa = '';
  _resDespFin = '';
  _dreSubgrupo : any[] =[];
  _dreCC: any[] =[];

  constructor(public finDRE : finDREGrupoService,
              private ModalDreDetails: ModalDreDetailsService
  ){}
  ngOnInit(): void {
    this.getDREGrupo('2024');
    this.getDRESubgrupo('2024');
    this.getDRECC('2024');
  }

  async getDREGrupo(ano:string){
    (await this.finDRE.getDREGrupo(ano)).subscribe(dreBody=>{
      let dre :any[]=[];
      dre = dre.concat(dreBody.body)
      // console.log(dre)

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
        let item:finDRE={
          tipo: dre[i].tipo,
          descricao: dre[i].descricao,
          total: moneyReduct(Number(dre[i].total)),
          cod_grupo_receita: dre[i].cod_grupo_receita,
          cod_subgrupo_receita: '',
          cod_cc: ''
        }
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
        let item:finDRE={
          tipo: dre[i].tipo,
          descricao: dre[i].descricao,
          total: moneyReduct(Number(dre[i].total)),
          cod_grupo_receita: dre[i].cod_grupo_receita,
          cod_subgrupo_receita: dre[i].cod_subgrupo_receita,
          cod_cc: ''
        }
        this._dreSubgrupo.push(item);
      }
    })
  }
  
  async getDRECC(ano:string){
    (await this.finDRE.getDRECC(ano)).subscribe(dreBody=>{

      let dre :any[]=[];
      dre = dre.concat(dreBody.body);

      for(let i=0;i<dre.length;i++){
        let item:finDRE={
          tipo: dre[i].tipo,
          descricao: dre[i].descricao,
          total: moneyReduct(Number(dre[i].total)),
          cod_grupo_receita: dre[i].cod_grupo_receita,
          cod_subgrupo_receita: dre[i].cod_subgrupo_receita,
          cod_cc: dre[i].cod_cc
        }
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

  detail(descricao:string,tipo:string,cod_grupo : string,cod_subgrupo : string ='',cod_cc:string=''){
    this.ModalDreDetails.change(descricao,tipo,cod_grupo,cod_subgrupo,cod_cc);
  }

}
