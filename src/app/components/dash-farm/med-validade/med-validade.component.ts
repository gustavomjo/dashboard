import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { searchModule } from '../../search.Module';
import { CommonModule } from '@angular/common';
import { farmProdutoValidadeService } from '../../../services/dash-farm/farmProdutoValidade.service';
import { differenceInDays, parseISO } from 'date-fns';
import moment from 'moment';
import { globalData } from '../../../global/global-data';

@Component({
  selector: 'app-med-validade',
  standalone: true,
  imports: [MatFormFieldModule, MatDatepickerModule, FormsModule, searchModule, CommonModule],
  templateUrl: './med-validade.component.html',
  styleUrl: './med-validade.component.scss'
})
export class MedValidadeComponent implements OnInit {

  _searchMedicamento = "";
  _searchGrupo="";
  _dsGrupo : any[]=[];
  _searchVencimento = "";
  _ProdutoValidade : any[]=[];

  _dsSubGrupo : any[]=[];
  constructor(private farmProdutoValidade : farmProdutoValidadeService){}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.getProdutoValidade();
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

}
