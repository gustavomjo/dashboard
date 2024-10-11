import { Component, OnInit } from '@angular/core';
import { CardLeitosService } from '../../../services/dash/cardleitos.service';
import { SpinnerComponent } from "../../spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { globalCores } from '../../../global/global-cores';
import { ConfigService } from '../../../services/config.service';
import { globalVars } from '../../../global/globals';

@Component({
  selector: 'app-card-leitos',
  standalone: true,
  imports: [SpinnerComponent,CommonModule],
  templateUrl: './card-leitos.component.html',
  styleUrl: './card-leitos.component.scss'
})
export class CardLeitosComponent implements OnInit {
  card : any[]=[];
  leitosDisp = '';
  leitosOcup = '';
  leitosTotal = '';
  private intervalId : any;
  constructor(private cardLeitos : CardLeitosService,
              private configService: ConfigService
  ){}
  ngOnInit(): void {
    this.configService.getConfig().subscribe(config => {
      // Utiliza a função global para converter segundos para milissegundos
      globalVars.intervalTime = (config.atualizacao || 10) * 1000;
      this.intervalId = setInterval(() => {
        this.card = [];
        this.leitosDisp = '';
        this.leitosOcup = '';
        this.leitosTotal = '';
        this.getCardLeitos();
      }, globalVars.intervalTime);
    }, error => {
      console.error('Erro ao carregar configuração', error);
    });
  }

  async getCardLeitos(){
    (await this.cardLeitos.getCardLeitos()).subscribe(dados=>{
      this.card = this.card.concat(dados.body)

      this.leitosDisp = this.card[0].total.toString();
      this.leitosOcup = this.card[1].total.toString();
      this.leitosTotal = this.card[2].total.toString();
    })
  }

}
