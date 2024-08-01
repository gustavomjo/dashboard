import { Component } from '@angular/core';
import { FiltrodataService } from './filtrodata.service';

@Component({
  selector: 'app-filtrodata',
  standalone: true,
  imports: [],
  templateUrl: './filtrodata.component.html',
  styleUrl: './filtrodata.component.scss'
})
export class FiltrodataComponent {

  constructor(public filtrodataService: FiltrodataService) {
    filtrodataService.data = 'oi'
  }



}
