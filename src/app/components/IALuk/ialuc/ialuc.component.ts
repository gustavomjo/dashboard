import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ialucService } from '../../../services/ialuc/ialuc.service';
import { formatSQL } from '../../../global/global-string';
import { globalVars } from '../../../global/globals';
import { DebugIAComponent } from "../debug-ia/debug-ia.component";
import { DebugIAService } from '../debug-ia/debugIA.service';


@Component({
  selector: 'app-ialuc',
  standalone: true,
  imports: [CommonModule, DebugIAComponent],
  templateUrl: './ialuc.component.html',
  styleUrl: './ialuc.component.scss'
})
export class IALucComponent implements OnInit {
  isSend = true;
  fullText: string = '';
  displayedText: string = '';
  typingSpeed: number = 20;
  question='';
  iaDados : any[]=[];
  categories : any[]=['cat1','cat2']

  developer = false;


  constructor(private IAService : ialucService,
              private debugService : DebugIAService
    ){
      debugService.addOnUpdateCallback(() => this.atualiza());
    }

  public atualiza(): void {  }


  @ViewChild('textElement') textElement!: ElementRef<HTMLHeadingElement>;

  ngOnInit(): void {
    this.fullText = this.saudacaoPorHorario();
    this.fullText += ' Sou o Luk, assistente virtual da Lucedata e estou aqui para '+
                     'ajudar você a obter uma visão mais ampla do hospital. '+
                     'Posso auxiliar nos módulos de Recepção, Farmácia e '+
                     'Financeiro/Faturamento. Para otimizar a busca pela resposta,'+
                     'poderia me informar brevemente qual módulo deseja consultar?';
    this.typeWriterEffect();

    this.developer = globalVars.developer;
  }

  send(){
    let comp = document.getElementById('question') as HTMLInputElement;
    this.question = comp.value;
    if (this.isQuestion(this.question)){

      this.isSend = true;
      this.generateTable([''])
      this.debugService.ASQL = formatSQL('');
      this.debugService.notifyUpdate();
      this.ia(this.question)

      this.isSend = true;
      this.ia(this.question)
    }
  }

  async ia(question: string){
    (await this.IAService.ia(question)).subscribe(dados =>{
      // let rec : any[]=[];
      this.iaDados = [];
      this.iaDados = this.iaDados.concat(dados.body);
      this.debugService.ASQL = formatSQL(this.iaDados[0].sql);
      this.debugService.notifyUpdate();
      this.generateTable(this.iaDados[0].dados);

    })
  }

  typeWriterEffect(): void {
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < this.fullText.length) {
        this.displayedText += this.fullText[index];
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, this.typingSpeed);
  }


  saudacaoPorHorario(): string {
    const horaAtual = new Date().getHours();

    if (horaAtual >= 6 && horaAtual < 12) {
      return "Bom dia!";
    } else if (horaAtual >= 12 && horaAtual < 18) {
      return "Boa tarde!";
    } else {
        return "Boa noite!";
    }
  }

  isQuestion(text: string): boolean {
    if (text.trim().endsWith("?")) {
      return true;
    }

    // Verificar se a frase começa com uma palavra interrogativa
    const questionWords = ["total de", "quantos", "quanto", "quantas",  "quanta",
      "quando", "qual", "quais", "como", "temos", "me de", "liste", "quero", "preciso"];
    const lowerText = text.trim().toLowerCase();

    for (const word of questionWords) {
      if (lowerText.startsWith(word + " ") || lowerText.startsWith(word + "?")) {
        return true;
      }
    }

    return false;
  }

  generateTableColumns(data: any[]): string[] {
    // Obtém os nomes das colunas (keys) do primeiro item no array
    const columns = Object.keys(data[0]);
    return columns;
  }

  generateTable(data: any[]): void {
    const columns = this.generateTableColumns(data);

    // Gerar o cabeçalho da tabela
    let tableHeader = "<tr>";
    columns.forEach(column => {
      tableHeader += `<th>${column}</th>`;
    });
    tableHeader += "</tr>";

    // Gerar as linhas da tabela
    let tableRows = "";
    data.forEach(row => {
      let tableRow = "<tr>";
      columns.forEach(column => {
        tableRow += `<td>${row[column]}</td>`;
      });
      tableRow += "</tr>";
      tableRows += tableRow;
    });

    // Exibir na tela (supondo que tenha um elemento com id 'tabela')
    const tabelaElement = document.getElementById('tabela');
    if (tabelaElement) {
      tabelaElement.innerHTML = `<table>${tableHeader}${tableRows}</table>`;
    } else {
      console.error('Elemento com id "tabela" não encontrado!');
    }
  }

}
