import { Component, OnInit } from '@angular/core';
import { CardAtendService } from '../../../services/dash/cardatend.service';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { SpinnerComponent } from "../../spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { ConfigService } from '../../../services/config.service';
import { globalVars } from '../../../global/globals';

@Component({
  selector: 'app-card-atendimentos',
  standalone: true,
  imports: [CarouselModule, SpinnerComponent,CommonModule],
  templateUrl: './card-atendimentos.component.html',
  styleUrl: './card-atendimentos.component.scss'
})
export class CardAtendimentosComponent implements OnInit{
  carTime = 5000;
  card : any[]=[];
  consMes = '';
  consAno = '';
  intMes = '';
  intAno = '';
  sadtMes = '';
  sadtAno = '';
  private intervalId : any;
  constructor(private cardAtend : CardAtendService,
              private configService: ConfigService ){}

  ngOnInit(): void {

    this.configService.getConfig().subscribe(config => {
      // Utiliza a função global para converter segundos para milissegundos
      globalVars.intervalTime = (config.atualizacao || 10) * 1000;
      this.getCardAtend();
      this.intervalId = setInterval(() => {
        this.card = [];
        this.consMes = '';
        this.consAno = '';
        this.intMes = '';
        this.intAno = '';
        this.sadtMes = '';
        this.sadtAno = '';
        this.getCardAtend();
      }, globalVars.intervalTime);
    }, error => {
      console.error('Erro ao carregar configuração', error);
    });
  }

  async getCardAtend(){
    (await this.cardAtend.getCardAtend()).subscribe(dados =>{
      // let card :any[]=[];
      this.card = this.card.concat(dados.body)
      for(let i=0;i<this.card.length;i++){
        switch (this.card[i].tipo) {
          case 'P':
            switch (this.card[i].periodo) {
              case 'Este Mes':
                this.consMes = this.card[i].total.toString();
                break;
              case 'Este Ano':
                this.consAno = this.card[i].total.toString();
                break;
            }
            break;
          case 'I':
            switch (this.card[i].periodo) {
              case 'Este Mes':
                this.intMes = this.card[i].total.toString();
                break;
              case 'Este Ano':
                this.intAno = this.card[i].total.toString();
                break;
            }
            break;
          case 'S':
            switch (this.card[i].periodo) {
              case 'Este Mes':
                this.sadtMes = this.card[i].total.toString();
                break;
              case 'Este Ano':
                this.sadtAno = this.card[i].total.toString();
                break;
            }
            break;
        }
      }
    })
  }

}
