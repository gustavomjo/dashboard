import { Component } from '@angular/core';
import { CardContasComponent } from "./card-contas/card-contas.component";
import { CardBalanceteComponent } from "./card-balancete/card-balancete.component";
import { CardDreComponent } from "./card-dre/card-dre.component";
import { FiltrodataComponent } from "../filtrodata/filtrodata.component";
import { Router } from '@angular/router';
import { FiltrodataService } from '../filtrodata/filtrodata.service';
import { provideNativeDateAdapter } from '@angular/material/core';


@Component({
  selector: 'app-dash-fin',
  standalone: true,
  templateUrl: './dash-fin.component.html',
  styleUrl: './dash-fin.component.scss',
  // providers: [provideNativeDateAdapter()],
  imports: [CardContasComponent, CardBalanceteComponent, CardDreComponent, FiltrodataComponent]
})
export class DashFinComponent  {
  constructor(private rota: Router, public filtrodataService: FiltrodataService) {
    filtrodataService.data_de = "";
    filtrodataService.data_ate = "";
   }
}
