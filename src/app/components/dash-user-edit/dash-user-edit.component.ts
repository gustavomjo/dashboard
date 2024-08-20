import { Component, ComponentFactory, ComponentFactoryResolver, ElementRef, Injector, OnInit, Renderer2, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { CardLeitosComponent } from '../dash/card-leitos/card-leitos.component';
import { CardFaturamentoComponent } from '../dash/card-faturamento/card-faturamento.component';
import { CardAtendimentosComponent } from '../dash/card-atendimentos/card-atendimentos.component';
import { CardReceitaNaturezaComponent } from '../dash/card-receita-natureza/card-receita-natureza.component';
import { CardCompDespesasComponent } from '../dash/card-comp-despesas/card-comp-despesas.component';
import { CardPrazoMedRecebMesComponent } from '../dash/card-prazo-med-receb-mes/card-prazo-med-receb-mes.component';
import { CardPrazoMedRecebAnoComponent } from '../dash/card-prazo-med-receb-ano/card-prazo-med-receb-ano.component';
import { FiltrodataComponent } from '../filtrodata/filtrodata.component';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { dashUserService } from '../../services/dash-user/dashUser.service';
import { NotificationService } from '../../services/notification.service';
import { NotificationComponent } from '../notification/notification.component';
import { NotificationModule } from '../notification/notification.module';
import { JwtDecodeService } from '../../services/jwt-decode.service';


// Importar Toast diretamente do Bootstrap
declare var bootstrap: any;
@Component({
  selector: 'app-dash-user-edit',
  standalone: true,

  imports: [FormsModule ,
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
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
    SadtTopConvComponent,NotificationModule // Adicione o NotificationComponent aqui
    ],

  templateUrl: './dash-user-edit.component.html',
  styleUrl: './dash-user-edit.component.scss'
})
export class DashUserEditComponent implements OnInit{

  @ViewChild('contentDash', { read: ViewContainerRef, static: true }) contentDash!: ViewContainerRef;

  // cards : string[]=[];
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
    'app-receitas': {card : ReceitasComponent , css : 'mt-1 col-sm-12 col-md-6 col-lg-4'} ,
    'app-card-cirurgias-realizadas': {card : CardCirurgiasRealizadasComponent , css : 'mt-1 col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3 d-flex align-items-center justify-content-center'} ,
    'app-cirurgias-relizadas-conv-top': {card : CirurgiasRelizadasConvTopComponent , css : 'mt-1 col-sm-12 col-md-6 col-lg-4 d-flex align-items-center justify-content-center'} ,
    'app-int-top-conv': {card : IntTopConvComponent , css : 'mt-1 col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3 d-flex align-items-center justify-content-center'} ,
    'app-cons-top-conv': {card : ConsTopConvComponent , css : 'mt-1 col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3 d-flex align-items-center justify-content-center'} ,
    'app-sadt-top-conv': {card : SadtTopConvComponent , css : 'mt-1 col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3 d-flex align-items-center justify-content-center'} ,
  };


  component : string = "";
  selectedComp: string[] = [];

  constructor(private injector: Injector,
              private renderer: Renderer2,
              private dashuser : dashUserService,
              private notificationService: NotificationService,
              private jwtDecoder : JwtDecodeService
  ) {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.getdashBD();
  }

  async getdashBD(){
    (await this.dashuser.getDash(this.jwtDecoder.decodePayloadJWT().cod_user)).subscribe(dados =>{
      let dash :any[]=[];
      dash = dash.concat(dados.body)
      // console.log(dash)
      for(let i=0;i<dash.length;i++){
        this.selectedComp.push(dash[i].dash)

      }
      this.onShow();

    })
  }
  addCard(){

  }

  onShow() {
    if(this.component!=""){
      let b : boolean = false;
      this.selectedComp.forEach((comp) => {
        if (!b)
          b = comp === this.component;
      })

      if(!b){
        this.selectedComp.push(this.component);
        this.dashuser.postComponent(this.jwtDecoder.decodePayloadJWT().cod_user,this.component);
      }else{
        this.notificationService.showNotification('Card já existe!');
        return;
      }
    }

    if (!Array.isArray(this.selectedComp) || this.selectedComp.length === 0) return;
    // this.cards = [];

    const containerNativeElement = this.contentDash.element.nativeElement;

    this.filterDataFirst();
    this.clearContainer(containerNativeElement)

    this.selectedComp.forEach((comp, index) => {

      const component = this.componentMap[comp];

      if (component.card) {
        const containerDiv = this.renderer.createElement('div');

        // Criar o botão excluir
        const deleteButton = this.renderer.createElement('button');
        this.renderer.addClass(deleteButton, 'btnExcluir');
        this.renderer.setProperty(deleteButton, 'textContent', 'X');

        // Adicionar um evento de clique ao botão
        this.renderer.listen(deleteButton, 'click', () => {
          //delete no banco
          this.dashuser.deleteComponent(this.jwtDecoder.decodePayloadJWT().cod_user,componentElement.nodeName);
          this.selectedComp.splice(index,1);
          // console.log(this.selectedComp);

          this.renderer.removeChild(this.contentDash.element.nativeElement, containerDiv);

        });
        // Adicionar o botão à div
        this.renderer.appendChild(containerDiv, deleteButton);

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
  // onSave(){
  //   console.log(this.selectedComp)
  // }


}
