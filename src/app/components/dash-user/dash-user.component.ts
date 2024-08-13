import { Component, ComponentFactory, ComponentFactoryResolver, ElementRef, Injector, OnInit, Renderer2, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { CardLeitosComponent } from '../dash/card-leitos/card-leitos.component';
import { CardFaturamentoComponent } from '../dash/card-faturamento/card-faturamento.component';
import { CardAtendimentosComponent } from '../dash/card-atendimentos/card-atendimentos.component';
import { CardReceitaNaturezaComponent } from '../dash/card-receita-natureza/card-receita-natureza.component';
import { CardCompDespesasComponent } from '../dash/card-comp-despesas/card-comp-despesas.component';
import { CardPrazoMedRecebMesComponent } from '../dash/card-prazo-med-receb-mes/card-prazo-med-receb-mes.component';
import { CardPrazoMedRecebAnoComponent } from '../dash/card-prazo-med-receb-ano/card-prazo-med-receb-ano.component';
import { FiltrodataComponent } from '../filtrodata/filtrodata.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CardContasComponent } from '../dash-fin/card-contas/card-contas.component';
import { CardBalanceteComponent } from '../dash-fin/card-balancete/card-balancete.component';
import { CardDreComponent } from '../dash-fin/card-dre/card-dre.component';
import { CardCirurgiasRealizadasComponent } from '../dash-receitas/card-cirurgias-realizadas/card-cirurgias-realizadas.component';
import { CirurgiasRelizadasConvTopComponent } from '../dash-receitas/cirurgias-relizadas-conv-top/cirurgias-relizadas-conv-top.component';
import { ReceitasComponent } from '../dash-receitas/receitas/receitas.component';
import { IntTopConvComponent } from '../dash-receitas/int-top-conv/int-top-conv.component';
import { ConsTopConvComponent } from '../dash-receitas/cons-top-conv/cons-top-conv.component';
import { SadtTopConvComponent } from '../dash-receitas/sadt-top-conv/sadt-top-conv.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { dashUserService } from '../../services/dash-user/dashUser.service';
import { FiltrodataService } from '../filtrodata/filtrodata.service';



@Component({
  selector: 'app-dash-user',
  standalone: true,
  templateUrl: './dash-user.component.html',
  styleUrl: './dash-user.component.scss',
  providers: [provideNativeDateAdapter()],
  imports: [FormsModule ,
    CommonModule,
    CardLeitosComponent,
    CardFaturamentoComponent,
    CardAtendimentosComponent,
    CardReceitaNaturezaComponent,
    CardCompDespesasComponent,
    CardPrazoMedRecebMesComponent,
    CardPrazoMedRecebAnoComponent,
    FiltrodataComponent,
    CardContasComponent,
    CardBalanceteComponent,
    CardDreComponent,
    CardCirurgiasRealizadasComponent,
    CirurgiasRelizadasConvTopComponent,
    ReceitasComponent,
    IntTopConvComponent,
    ConsTopConvComponent,
    SadtTopConvComponent

  ]
})
export class DashUserComponent implements OnInit {
  @ViewChild('contentDash', { read: ViewContainerRef, static: true }) contentDash!: ViewContainerRef;


  user_comp: any[] = [
    {value:'app-filtrodata', desc: 'Filtro Data'},
    {value:'app-card-leitos', desc: 'Card Leitos - Dash'},
    {value:'app-card-faturamento', desc: 'Card Faturamento - Dash'},
    {value:'app-card-atendimentos', desc: 'Card Atendimentos - Dash'},
    {value:'app-card-receita-natureza', desc: 'Receita por Natureza - Dash'},
    {value:'app-card-comp-despesas', desc: 'Composição de Despesas - Dash'},
    {value:'app-card-prazo-med-receb-mes', desc: 'Prazo Médio Recebimento(Mês) - Dash'},
    {value:'app-card-prazo-med-receb-ano', desc: 'Prazo Medio Recebimento(Média) - Dash'},
    {value:'app-card-contas', desc: 'Card Contas Pagar/Receber - Dash Financeiro'},
    {value:'app-card-balancete', desc: 'Balancete - Dash Financeiro'},
    {value:'app-card-dre', desc: 'DRE - Dash Financeiro'},
    {value:'app-card-cirurgias-realizadas', desc: 'Card Cirurgias Realizadas - Dash Receitas'},
    {value:'app-receitas', desc: 'Receitas - Dash Receitas'},
    {value:'app-cirurgias-relizadas-conv-top', desc: 'Top 15 Convênios Cirurgias - Dash Receitas'},
    {value:'app-int-top-conv', desc: 'Top 15 Convênios Internação - Dash Receitas'},
    {value:'app-cons-top-conv', desc: 'Top 15 Convênios Consulta - Dash Receitas'},
    {value:'app-sadt-top-conv', desc: 'Top 15 Convênios SADT - Dash Receitas'},
  ];
  componentMap: { [key: string]: any } = {
    'app-card-leitos':{card : CardLeitosComponent , css : 'col-12 sm-12 md-12 col-lg-4 col-xl-4'} ,
    'app-card-faturamento': {card : CardFaturamentoComponent , css : 'col-12 sm-12 md-12 col-lg-4 col-xl-4'} ,
    'app-card-atendimentos': {card : CardAtendimentosComponent , css : 'col-12 sm-12 md-12 col-lg-4 col-xl-4'} ,
    'app-card-receita-natureza': {card : CardReceitaNaturezaComponent , css : 'mt-1 col-sm-12 col-md-8 col-lg-6 col-xl-4'} ,
    'app-card-comp-despesas': {card : CardCompDespesasComponent , css : 'mt-1 col-sm-12 col-md-8 col-lg-6 col-xl-4'} ,
    'app-card-prazo-med-receb-mes': {card : CardPrazoMedRecebMesComponent , css : 'mt-1 col-sm-12 col-md-8 col-lg-6 col-xl-4'} ,
    'app-card-prazo-med-receb-ano': {card : CardPrazoMedRecebAnoComponent , css : 'mt-1 col-sm-12 col-md-8 col-lg-6 col-xl-4'} ,
    'app-filtrodata': {card : FiltrodataComponent , css : 'col-12 sm-12 md-12 col-lg-12 col-xl-12'} ,
    'app-card-contas': {card : CardContasComponent , css : 'mt-1 col-sm-12 col-md-6'} ,
    'app-card-balancete': {card : CardBalanceteComponent , css : 'mt-1 col-sm-12 col-md-6 col-lg-4'} ,
    'app-card-dre': {card : CardDreComponent , css : 'col-5'} ,
    'app-card-cirurgias-realizadas': {card : CardCirurgiasRealizadasComponent , css : 'mt-1 col-sm-12 col-md-6 col-lg-4'} ,
    'app-receitas': {card : ReceitasComponent , css : 'mt-1 col-sm-12 col-md-6 col-lg-4'} ,
    'app-cirurgias-relizadas-conv-top': {card : CirurgiasRelizadasConvTopComponent , css : 'mt-1 col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3 d-flex align-items-center justify-content-center'} ,
    'app-int-top-conv': {card : IntTopConvComponent , css : 'mt-1 col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3 d-flex align-items-center justify-content-center'} ,
    'app-cons-top-conv': {card : ConsTopConvComponent , css : 'mt-1 col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3 d-flex align-items-center justify-content-center'} ,
    'app-sadt-top-conv': {card : SadtTopConvComponent , css : 'mt-1 col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3 d-flex align-items-center justify-content-center'} ,
  };

  selectedComp: string[] = [];


  constructor(private injector: Injector,
              private renderer: Renderer2,
              private dashuser : dashUserService,
              public filtrodataService: FiltrodataService,
            ) {}

  ngOnInit(): void {
    this.constructorDash();
  }
  ngAfterViewChecked(): void {

  }


  async constructorDash(){
    (await this.dashuser.getDash(0)).subscribe(dados =>{
      let dash :any[]=[];
      dash = dash.concat(dados.body)
      // console.log(dash)
      for(let i=0;i<dash.length;i++){
        this.selectedComp.push(dash[i].dash);
      }
      this.buildComponent();

    })
  }

  buildComponent(){
    // this.comp.push(name)

    if (!Array.isArray(this.selectedComp) || this.selectedComp.length === 0) return;

    const containerNativeElement = this.contentDash.element.nativeElement;

    this.filterDataFirst();
    this.clearContainer(containerNativeElement)

    this.selectedComp.forEach((comp, index) => {

      const component = this.componentMap[comp];

      if (component.card) {
        const containerDiv = this.renderer.createElement('div');
        const classes = component.css.split(' ');
        classes.forEach((classes: string) => {
          this.renderer.addClass(containerDiv, classes);
        });

        const componentRef = this.contentDash.createComponent(component.card, { injector: this.injector });
        const componentElement = componentRef.location.nativeElement;

        this.renderer.appendChild(containerDiv, componentElement);
        this.renderer.appendChild(containerNativeElement, containerDiv);

      }
    });
  }
  filterDataFirst(){
    //verificando se o comp de filtro de data ja esta no form
    //caso for adicionado apos o primeiro, reposiciono e coloco ele em primeiro
    //para sempre ficar no topo
    let filtro_data = false;
    this.selectedComp.forEach((comp) => {
      filtro_data = comp === 'app-filtrodata'
    });
    if(filtro_data){
      let selectedComp_tmp: string[] = [];
      selectedComp_tmp.push('app-filtrodata');
      this.selectedComp.forEach((comp) => {
        if(comp != 'app-filtrodata')
          selectedComp_tmp.push(comp)
      });
      this.selectedComp = selectedComp_tmp;
    }
  }
  clearContainer(container : any){
    // Limpar o container para não ter div vazia
    // caso não limpe irá sobrepor um componente e a div ficará vazia
    while (container.firstChild) {
      this.renderer.removeChild(container, container.firstChild);
    }
  }



}
