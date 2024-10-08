import { Component, OnInit } from '@angular/core';
import { CardLeitosService } from '../../../services/dash/cardleitos.service';
import { SpinnerComponent } from "../../spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { searchIco } from '../../../global/global-icons';
import { globalCoresNome } from '../../../global/global-cores';
import { removeSpecialCharacters } from '../../../global/global-string';

@Component({
  selector: 'app-card-leitos-detalhado',
  standalone: true,
  imports: [SpinnerComponent,CommonModule],
  templateUrl: './card-leitos-detalhado.component.html',
  styleUrl: './card-leitos-detalhado.component.scss'
})
export class CardLeitosDetalhadoComponent implements OnInit {
  color = globalCoresNome;
  card: any[] = [];

  constructor(private cardLeitos: CardLeitosService) {}

  ngOnInit(): void {
    this.getCardLeitos();
  }

  async getCardLeitos() {
    (await this.cardLeitos.getCardLeitosDetalhado()).subscribe(dados => {
      this.card = this.card.concat(dados.body);

      // Função para agrupar os dados por "ds_setor"
      const agrupadoPorSetor = this.card.reduce((acc, curr) => {
        const setor = acc[curr.ds_setor] || {
          ds_setor: removeSpecialCharacters(curr.ds_setor),
          Livre: 0,
          Ocupado: 0,
          totalGeral: 0,
          porcent_ocupado: 0,
          ico: searchIco(curr.ds_setor), // Chama a função para obter o ícone e cor
        };
        // console.log(curr.ds_setor)
        // console.log(searchIco(curr.ds_setor))

        // Adicionar o total ao status correspondente (Livre ou Ocupado)
        setor[curr.status] += curr.total;
        setor.totalGeral += curr.total;
        if (setor.totalGeral > 0) {
          setor.porcent_ocupado = Number((setor.Ocupado * 100) / setor.totalGeral).toFixed(2);
        }

        // Salvar o setor atualizado no acumulador
        acc[curr.ds_setor] = setor;

        return acc;
      }, {} as { [key: string]: { ds_setor: string, Livre: number, Ocupado: number, totalGeral: number, ico: { icon: string, color: string } } });

      // Converter o objeto de agrupamento para um array
      this.card = Object.values(agrupadoPorSetor);
    });
  }

  getColor(porcent: number): string {
    switch (true) {
      case porcent <= 33 :
        return this.color.colorGreen;
      case porcent > 33 && porcent <= 66 :
        return this.color.colorYellow; // Yellow for 21 to 40
      default:
        return this.color.colorRed; // Green for > 40
    }
  }
}
