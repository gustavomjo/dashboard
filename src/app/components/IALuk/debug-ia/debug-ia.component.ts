import { Component, OnInit } from '@angular/core';
import { DebugIAService } from './debugIA.service';
import { globalCoresNome } from '../../../global/global-cores';
import { ialucService } from '../../../services/ialuc/ialuc.service';
import { formatSQL } from '../../../global/global-string';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { searchModule } from '../../search.Module';

@Component({
  selector: 'app-debug-ia',
  standalone: true,
  imports: [CommonModule,FormsModule,searchModule],
  templateUrl: './debug-ia.component.html',
  styleUrl: './debug-ia.component.scss'
})
export class DebugIAComponent implements OnInit{
  ASQL = '';

  color = globalCoresNome;
  IAInstrucoes : any[]=[];

  searchTable = '';
  searchTipo = '';
  searchCampo = '';

  endIndex: number = 50;


  constructor(private debugService : DebugIAService,
              private IAService : ialucService
   ){
    debugService.addOnUpdateCallback(() => this.atualiza());
  }
  ngOnInit(): void {
    this.getIAInstrucoes()
  }

  public atualiza(): void {
    this.ASQL = this.debugService.ASQL;
  }



  async getIAInstrucoes(){
    (await this.IAService.iaListInstrucoes()).subscribe(dados =>{
      this.IAInstrucoes = [];
      this.IAInstrucoes = this.IAInstrucoes.concat(dados.body);
      for(let i=0;i<this.IAInstrucoes.length;i++){
        this.IAInstrucoes[i].instrucao =  formatSQL(this.IAInstrucoes[i].instrucao);
      }
      // console.log(this.IAInstrucoes)
    })
  }

  onScroll(event: any): void {
    const scrollTop = event.target.scrollTop;
    const scrollHeight = event.target.scrollHeight;
    const offsetHeight = event.target.offsetHeight;

    if (scrollTop + offsetHeight >= scrollHeight - 10) { // Quando chegar ao final
      this.loadMore();  // Carrega mais itens
    }
  }

  loadMore(): void {
    this.endIndex += 50;  // Aumenta o slice em 1000 itens
  }
}
