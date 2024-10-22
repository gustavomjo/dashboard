import { Component, OnInit } from '@angular/core';
import { dashFatService } from '../../../services/dash-fat/dashfat.service';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../../services/config.service';
import { CommonModule } from '@angular/common';
import { globalCoresNome } from '../../../global/global-cores';
import { FormsModule } from '@angular/forms';
import { fatListPendente } from '../../../models/dash-fat/fatListPendente.model';
import { searchModule } from '../../search.Module';
import { FiltrodataService } from '../../filtrodata/filtrodata.service';
import { globalData } from '../../../global/global-data';
import { isValid } from 'date-fns';
import { SpinnerComponent } from "../../spinner/spinner.component";
import { globalVars } from '../../../global/globals';

@Component({
  selector: 'app-card-list-pendente',
  standalone: true,
  imports: [CommonModule, FormsModule, searchModule, SpinnerComponent],
  templateUrl: './card-list-pendente.component.html',
  styleUrl: './card-list-pendente.component.scss'
})
export class CardListPendenteComponent implements OnInit {
  color = globalCoresNome;
  _list : any[]=[];
  _searchInternacao="";
  _searchConvenio ="";
  _apresentado : string = 'N';
  data_corte? : Date;
  endIndex: number = 50;

  private intervalId : any;

  constructor(private dashFat : dashFatService,
              private route: ActivatedRoute,
              private configService: ConfigService,
              public filtrodataService: FiltrodataService,
          ){}
  ngOnInit(): void {
    this.configService.getConfig().subscribe(config => {
      this.data_corte = config.data_corte;
      this.getFatListPendente(this.data_corte,this.filtrodataService.data_de.replace(/-/g, '/'), this.filtrodataService.data_ate.replace(/-/g, '/'));
      globalVars.intervalTime = (config.atualizacao || 10) * 1000;
      this.intervalId = setInterval(() => {
        this._list = [];
        this.getFatListPendente(this.data_corte,this.filtrodataService.data_de.replace(/-/g, '/'), this.filtrodataService.data_ate.replace(/-/g, '/'));
      }, globalVars.intervalTime);
    }, error => {
      console.error('Erro ao carregar a configuração', error);
    });
    this.filtrodataService.addOnUpdateCallback(() => this.atualiza());
  }

  public atualiza(): void {
    let rota = ['dash', 'dash-fat'].includes(this.route.snapshot.routeConfig?.path || '');
    if (!rota) return;

    let dataDe: Date = globalData.convertToDate(this.filtrodataService.data_de);
    let dataAte: Date = globalData.convertToDate(this.filtrodataService.data_ate);

    let valid = dataDe < globalData.gbData_atual &&
                (isValid(dataDe) && isValid(dataAte)) &&
                dataAte >= dataDe;

    if (valid)
      this.getFatListPendente(this.data_corte,this.filtrodataService.data_de.replace(/-/g, '/'), this.filtrodataService.data_ate.replace(/-/g, '/'));
  }

  async getFatListPendente(data_corte : any,dataDe : any,dataAte : any){
    (await this.dashFat.getFatListPendente(data_corte,dataDe,dataAte)).subscribe(dados=>{
      this._list = [];
      this._list = this._list.concat(dados.body);
      // console.log(this._list)
    })
  }
  MudaStatus(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    // const isChecked = inputElement.checked;
    this._apresentado = inputElement.checked ? 'S':'N';
    // console.log('Checkbox está', isChecked ? 'marcado' : 'desmarcado');
  }

  onScroll(event: any): void {
    const scrollTop = event.target.scrollTop;
    const scrollHeight = event.target.scrollHeight;
    const offsetHeight = event.target.offsetHeight;

    if (scrollTop + offsetHeight >= scrollHeight - 10) { // Quando chegar ao final
      this.loadMore();  // Carrega mais itens
    }
  }

  // Função para aumentar o slice
  loadMore(): void {
    this.endIndex += 50;  // Aumenta o slice em 1000 itens
  }




}
