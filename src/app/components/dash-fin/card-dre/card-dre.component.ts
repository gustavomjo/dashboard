import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { finDREGrupoService } from '../../../services/dash-fin/finDRE.service';
import { finDRE } from '../../../models/dash-fin/finDRE.model';
import { globalCoresNome } from '../../../global/global-cores';
import { moneyReduct } from '../../../global/global-money';
import { SpinnerComponent } from "../../spinner/spinner.component";
import { ModalDreDatailsComponent } from "../modal-dre-datails/modal-dre-datails.component";
import { ModalDreDetailsService } from '../modal-dre-datails/modalDreDtails.service';
import { removeSpecialCharacters } from '../../../global/global-string';
import { FiltrodataService } from '../../filtrodata/filtrodata.service';
import { ActivatedRoute } from '@angular/router';
import { globalData } from '../../../global/global-data';
import { isValid } from 'date-fns';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FiltrodataComponent } from "../../filtrodata/filtrodata.component";

@Component({
  selector: 'app-card-dre',
  standalone: true,
  imports: [CommonModule, SpinnerComponent, ModalDreDatailsComponent, FiltrodataComponent],
  templateUrl: './card-dre.component.html',
  styleUrl: './card-dre.component.scss',
  providers: [provideNativeDateAdapter()],
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
              private ModalDreDetails: ModalDreDetailsService,
              public filtrodataService: FiltrodataService,
              private route: ActivatedRoute
  ){}
  ngOnInit(): void {
    this.filtrodataService.addOnUpdateCallback(() => this.atualiza());
    // this.getDespesa(this.filtrodataService.data_de, this.filtrodataService.data_ate);

    this.getDREGrupo(this.filtrodataService.data_de, this.filtrodataService.data_ate);
    this.getDRESubgrupo(this.filtrodataService.data_de, this.filtrodataService.data_ate);
    this.getDRECC(this.filtrodataService.data_de, this.filtrodataService.data_ate);
  }

  public atualiza(): void {
    let rota = ['dash-fin', 'dash-user'].includes(this.route.snapshot.routeConfig?.path || '');
    if (!rota) return;

    let dataDe: Date = globalData.convertToDate(this.filtrodataService.data_de);
    let dataAte: Date = globalData.convertToDate(this.filtrodataService.data_ate);

    let valid = dataDe < globalData.gbData_atual &&
                (isValid(dataDe) && isValid(dataAte)) &&
                dataAte >= dataDe;

    if (valid){
      this.getDREGrupo(this.filtrodataService.data_de.replace(/-/g, '/'), this.filtrodataService.data_ate.replace(/-/g, '/'));
      this.getDRESubgrupo(this.filtrodataService.data_de.replace(/-/g, '/'), this.filtrodataService.data_ate.replace(/-/g, '/'));
      this.getDRECC(this.filtrodataService.data_de.replace(/-/g, '/'), this.filtrodataService.data_ate.replace(/-/g, '/'));
    }

  }

  async getDREGrupo(dataDe : string,dataAte : string){
    (await this.finDRE.getDREGrupo(dataDe,dataAte)).subscribe(dreBody=>{
      let dre :any[]=[];
      dre = dre.concat(dreBody.body)
      this._dreGrupo=[];

      let resReceita =0;
      let resDespesa = 0;
      let resDespFin = 0;

      this._resReceita = '0';
      this._resDespesa = '0';
      this._resDespFin = '0';
      this._resultado = 0;

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
          descricao: removeSpecialCharacters(dre[i].descricao),
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
  async getDRESubgrupo(dataDe : string,dataAte : string){
    (await this.finDRE.getDRESubgrupo(dataDe,dataAte)).subscribe(dreBody=>{

      let dre :any[]=[];
      dre = dre.concat(dreBody.body)
      this._dreSubgrupo = [];

      for(let i=0;i<dre.length;i++){
        let item:finDRE={
          tipo: dre[i].tipo,
          descricao: removeSpecialCharacters(dre[i].descricao),
          total: moneyReduct(Number(dre[i].total)),
          cod_grupo_receita: dre[i].cod_grupo_receita,
          cod_subgrupo_receita: dre[i].cod_subgrupo_receita,
          cod_cc: ''
        }
        this._dreSubgrupo.push(item);
      }
    })
  }

  async getDRECC(dataDe : string,dataAte : string){
    (await this.finDRE.getDRECC(dataDe,dataAte)).subscribe(dreBody=>{

      let dre :any[]=[];
      dre = dre.concat(dreBody.body);
      this._dreCC = [];

      for(let i=0;i<dre.length;i++){
        let item:finDRE={
          tipo: dre[i].tipo,
          descricao: removeSpecialCharacters(dre[i].descricao),
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
