import { Component, OnInit } from '@angular/core';
import { DebugIAService } from './debugIA.service';
import { globalCoresNome } from '../../../global/global-cores';
import { ialucService } from '../../../services/ialuc/ialuc.service';
import { formatSQL } from '../../../global/global-string';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { searchModule } from '../../search.Module';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-debug-ia',
  standalone: true,
  imports: [CommonModule,FormsModule,searchModule],
  templateUrl: './debug-ia.component.html',
  styleUrl: './debug-ia.component.scss'
})
export class DebugIAComponent implements OnInit{
  ASQL = '';
  aError = '';
  codigoInstrucao = 0;

  color = globalCoresNome;
  IAInstrucoes : any[]=[];

  searchTable = '';
  searchTipo = '';
  searchCampo = '';
  instrucao = '';

  endIndex: number = 50;
  listTabela : any[]=[];
  listTipo : any[]=[];
  listCampo : any[]=[];


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
    this.aError = this.debugService.aError;
  }

  async getIAInstrucoes(){
    (await this.IAService.iaListInstrucoes()).subscribe(dados =>{
      this.IAInstrucoes = [];
      this.IAInstrucoes = this.IAInstrucoes.concat(dados.body);
      for(let i=0;i<this.IAInstrucoes.length;i++){
        this.IAInstrucoes[i].instrucao =  formatSQL(this.IAInstrucoes[i].instrucao);

        if (!this.listTabela.some(item => item.tabela === this.IAInstrucoes[i].tabela)) {
          this.listTabela.push({ tabela: this.IAInstrucoes[i].tabela });
        }

        if (!this.listTipo.some(item => item.tipo === this.IAInstrucoes[i].tipo)) {
          this.listTipo.push({ tipo: this.IAInstrucoes[i].tipo });
        }
        if(this.IAInstrucoes[i].campo){
          if (!this.listCampo.some(item => item.campo === this.IAInstrucoes[i].campo)) {
            this.listCampo.push({tabela:this.IAInstrucoes[i].tabela, campo: this.IAInstrucoes[i].campo });
          }

        }
      }
      this.listTabela.sort((a,b)=>a.tabela.localeCompare(b.tabela));
      this.listTipo.sort((a,b)=>a.tipo.localeCompare(b.tipo));
      this.listCampo.sort((a,b)=>a.tabela.localeCompare(b.tabela));

    })
  }

  buscarPorCodigo(codigo: number) {
    const item = this.IAInstrucoes.find(ia => ia.codigo === codigo);

    if (item) {
      return {
        tipo: item.tipo,
        tabela: item.tabela,
        campo: item.campo,
        instrucao: item.instrucao
      };
    } else {
      return null;  // Retorna null se não encontrar o código
    }
  }

  alterarInstrucao(codigo: number): void {
    const dados = this.buscarPorCodigo(codigo);
    if (dados) {
      this.codigoInstrucao = codigo;
      this.searchTable = dados.tabela;
      this.searchTipo = dados.tipo;
      this.searchCampo = dados.campo;
      this.instrucao = dados.instrucao;
      // Agora você pode usar esses dados para realizar a edição
    }
  }


  async gravarDados(): Promise<void> {


    await lastValueFrom(
      this.IAService.upsertInstrucao(this.codigoInstrucao, this.searchTable, this.searchTipo, this.searchCampo, this.instrucao)
    );

    this.getIAInstrucoes();
  }


  limparCampos(): void {
    this.codigoInstrucao = 0;
    this.searchTable = '';
    this.searchTipo = '';
    this.searchCampo =  '';
    this.instrucao =  '';
  }

  async excluirInstrucao(codigo : number): Promise<void>{
    await lastValueFrom(
      this.IAService.deleteInstrucao(codigo)
    );
    this.limparCampos();
    this.getIAInstrucoes();
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
