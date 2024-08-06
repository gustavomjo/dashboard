import { Component } from '@angular/core';
import { CardContasComponent } from "./card-contas/card-contas.component";
import { CardBalanceteComponent } from "./card-balancete/card-balancete.component";
import { CardDreComponent } from "./card-dre/card-dre.component";


@Component({
  selector: 'app-dash-fin',
  standalone: true,
  templateUrl: './dash-fin.component.html',
  styleUrl: './dash-fin.component.scss',
  imports: [CardContasComponent, CardBalanceteComponent, CardDreComponent]
})
export class DashFinComponent  {


}
